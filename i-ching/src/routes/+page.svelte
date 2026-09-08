<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import CastingStage from '$lib/components/CastingStage.svelte';
	import JournalPanel from '$lib/components/JournalPanel.svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import SyncButton from '$lib/components/SyncButton.svelte';
	import QuestionForm from '$lib/components/QuestionForm.svelte';
	import ReadingResult from '$lib/components/ReadingResult.svelte';
	import { resolveHexagram } from '$lib/i-ching/catalog';
	import { createCastingFlow } from '$lib/i-ching/casting-flow.svelte';
	import { parseDeeplinkQuestion } from '$lib/i-ching/deeplink';
	import type { Casting, CoinValue } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';
	import { journalStore } from '$lib/state/journal.svelte';
	import { track } from '$lib/analytics';

	const i18n = useI18n();
	const flow = createCastingFlow();

	const IMMERSIVE_FADE_MS = 1500;

	let readingSection = $state<HTMLElement | null>(null);
	let questionForm = $state<{ focusInput: () => void } | null>(null);
	let overlayActive = $state(false);
	let overlayVisible = $state(false);
	let mainFaded = $state(false);

	const primaryHexagram = $derived(
		flow.casting ? resolveHexagram(flow.casting.primaryNumber, i18n.locale) : null
	);

	const relatingHexagram = $derived(
		flow.casting?.relatingNumber ? resolveHexagram(flow.casting.relatingNumber, i18n.locale) : null
	);

	const castingStageProps = {
		get step() {
			return flow.step;
		},
		get tossMode() {
			return flow.tossMode;
		},
		get lineCoins() {
			return flow.lineCoins;
		},
		get lines() {
			return flow.lines;
		},
		get spinningLine() {
			return flow.spinningLine;
		},
		get spinningCoin() {
			return flow.spinningCoin;
		},
		get revealedLines() {
			return flow.revealedLines;
		},
		get coinGridRevealed() {
			return flow.coinGridRevealed;
		},
		get activeLine() {
			return flow.activeLine;
		},
		get tossing() {
			return flow.tossing;
		},
		onTossNext: () => flow.tossNext(),
		onRealCoin: (value: CoinValue) => flow.tossRealCoin(value)
	};

	$effect(() => {
		flow.setLocale(i18n.locale);
	});

	$effect(() => {
		if (flow.step === 'toss') {
			overlayActive = true;
			document.documentElement.classList.add('immersive-cast');

			const frame = requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					overlayVisible = true;
					mainFaded = true;
				});
			});

			return () => cancelAnimationFrame(frame);
		}

		if (!overlayActive) return;

		overlayVisible = false;
		mainFaded = false;

		const timer = setTimeout(() => {
			overlayActive = false;
			document.documentElement.classList.remove('immersive-cast');
		}, IMMERSIVE_FADE_MS);

		return () => clearTimeout(timer);
	});

	$effect(() => {
		const c = flow.casting;
		if (!c || c.method === 'motif') return;
		if (!journalStore.entries.some((e) => e.id === c.id)) {
			flow.reset();
		}
	});

	function consumeDeeplinkQuestion(): string | null {
		const question = parseDeeplinkQuestion(page.url.searchParams);
		if (!question) return null;

		// One-shot request: drop q so a refresh does not restart the auto cast.
		// Use SvelteKit's replaceState so page.url stays in sync with the router.
		const next = new URL(page.url);
		next.searchParams.delete('q');
		replaceState(`${next.pathname}${next.search}${next.hash}`, page.state);

		return question;
	}

	onMount(() => {
		let cancelled = false;

		void (async () => {
			await journalStore.load();
			if (cancelled) return;

			const deeplinkQuestion = consumeDeeplinkQuestion();
			if (!deeplinkQuestion) return;

			flow.setQuestion(deeplinkQuestion);
			track('cast_started', { method: 'all' });
			void flow.startCast('all');
		})();

		return () => {
			cancelled = true;
			document.documentElement.classList.remove('immersive-cast');
		};
	});

	async function viewJournalEntry(entry: Casting) {
		track('journal_entry_opened', { hexagram_number: entry.primaryNumber });
		flow.viewJournalEntry(entry);
		await tick();
		readingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	async function viewMotifHexagram(hexagramNumber: number) {
		track('motif_viewed', { hexagram_number: hexagramNumber });
		flow.viewHexagram(hexagramNumber);
		await tick();
		readingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	async function resetToQuestion() {
		flow.reset();
		await tick();
		questionForm?.focusInput();
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}

	async function handleManualCast(params: {
		question: string;
		primaryNumber: number;
		relatingNumber?: number;
	}): Promise<boolean> {
		const ok = await flow.startManualCast(
			params.question,
			params.primaryNumber,
			params.relatingNumber
		);
		if (!ok) return false;
		await tick();
		readingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		return true;
	}
</script>

{#if overlayActive}
	<div class="cast-overlay" class:cast-overlay--visible={overlayVisible}>
		<CastingStage {...castingStageProps} step={overlayVisible ? flow.step : 'toss'} immersive />
	</div>
{/if}

<main class="main" class:main--faded={mainFaded}>
	<header class="site-header">
		<div class="site-header__sync">
			<SyncButton />
		</div>
		<div class="site-header__locale">
			<LocaleSwitcher />
		</div>
		<h1 class="logo">易經</h1>
		<p class="tagline">{i18n.t('app.tagline')}</p>
	</header>

	{#if flow.step === 'question'}
		<QuestionForm
			bind:this={questionForm}
			question={flow.question}
			onQuestionInput={(value) => flow.setQuestion(value)}
			onStartCast={(mode) => flow.startCast(mode)}
			onManualCast={handleManualCast}
		/>
	{/if}

	{#if flow.step === 'reading' && flow.casting?.method !== 'motif'}
		<CastingStage {...castingStageProps} />
	{/if}

	{#if flow.step === 'reading' && flow.casting && primaryHexagram}
		<div bind:this={readingSection}>
			<ReadingResult
				casting={flow.casting}
				{primaryHexagram}
				{relatingHexagram}
				onReset={resetToQuestion}
			/>
		</div>
	{/if}

	<JournalPanel
		journal={journalStore.entries}
		activeCastingId={flow.step === 'reading' && flow.casting?.method !== 'motif'
			? flow.casting?.id
			: null}
		activeMotifNumber={flow.step === 'reading' && flow.casting?.method === 'motif'
			? flow.casting.primaryNumber
			: null}
		onEntrySelect={viewJournalEntry}
		onMotifSelect={viewMotifHexagram}
	/>
</main>

<style>
	.cast-overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: calc(1rem + env(safe-area-inset-top, 0px)) calc(1rem + env(safe-area-inset-right, 0px))
			calc(1rem + env(safe-area-inset-bottom, 0px)) calc(1rem + env(safe-area-inset-left, 0px));
		background: var(--bg);
		opacity: 0;
		pointer-events: none;
		transition: var(--transition-fade);
	}

	.cast-overlay--visible {
		opacity: 1;
		pointer-events: auto;
	}

	.main {
		width: 100%;
		max-width: var(--content-max-width);
		margin: 0 auto;
		overflow-x: hidden;
		padding: calc(var(--size-hex) + env(safe-area-inset-top, 0px))
			calc(var(--space-5) + env(safe-area-inset-right, 0px))
			calc(var(--space-6) + env(safe-area-inset-bottom, 0px))
			calc(var(--space-5) + env(safe-area-inset-left, 0px));
		opacity: 1;
		transition: var(--transition-fade);
	}

	.main--faded {
		opacity: 0;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.cast-overlay,
		.main {
			transition-duration: 0.01ms;
		}
	}

	.site-header {
		position: relative;
		text-align: center;
		margin-bottom: var(--space-7);
	}

	.site-header__locale {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
	}

	.site-header__sync {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
	}

	.logo {
		font-family: var(--font-serif);
		font-size: var(--text-hero);
		color: var(--accent);
		letter-spacing: var(--tracking-hero);
	}

	.tagline {
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-hero);
		color: var(--text-faint);
		margin: var(--space-2) 0 0;
	}
</style>
