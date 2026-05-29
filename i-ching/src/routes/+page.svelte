<script lang="ts">
	import { onMount, tick } from 'svelte';
	import CastingStage from '$lib/components/CastingStage.svelte';
	import JournalPanel from '$lib/components/JournalPanel.svelte';
	import QuestionForm from '$lib/components/QuestionForm.svelte';
	import ReadingResult from '$lib/components/ReadingResult.svelte';
	import { resolveHexagram } from '$lib/data/hexagram-db';
	import { createCastingFlow } from '$lib/i-ching/casting-flow.svelte';
	import type { Casting } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';
	import { journalBridge } from '$lib/state/journal-bridge.svelte';

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
		onTossNext: () => flow.tossNext()
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

	onMount(() => {
		journalBridge.registerDelete((ids) => flow.deleteJournalEntries(ids));
		void flow.loadJournal();
		return () => document.documentElement.classList.remove('immersive-cast');
	});

	$effect(() => {
		journalBridge.setJournal(flow.journal);
	});

	async function viewJournalEntry(entry: Casting) {
		flow.viewJournalEntry(entry);
		await tick();
		readingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	async function viewMotifHexagram(hexagramNumber: number) {
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
		<CastingStage
			{...castingStageProps}
			step={overlayVisible ? flow.step : 'toss'}
			immersive
		/>
	</div>
{/if}

<main class="main" class:main--faded={mainFaded}>
	<header class="site-header">
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

	{#if flow.step === 'building' || (flow.step === 'reading' && flow.casting?.method !== 'motif')}
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
		journal={flow.journal}
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
		padding: calc(1rem + env(safe-area-inset-top, 0px))
			calc(1rem + env(safe-area-inset-right, 0px))
			calc(1rem + env(safe-area-inset-bottom, 0px))
			calc(1rem + env(safe-area-inset-left, 0px));
		background: var(--bg);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.5s ease;
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
		padding: calc(3.25rem + env(safe-area-inset-top, 0px))
			calc(1.25rem + env(safe-area-inset-right, 0px)) calc(2rem + env(safe-area-inset-bottom, 0px))
			calc(1.25rem + env(safe-area-inset-left, 0px));
		opacity: 1;
		transition: opacity 0.5s ease;
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
		text-align: center;
		margin-bottom: 3rem;
	}

	.logo {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		color: var(--accent);
		letter-spacing: 0.2em;
	}

	.tagline {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--text-faint);
		margin: 0.5rem 0 0;
	}
</style>
