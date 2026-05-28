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

	const i18n = useI18n();
	const flow = createCastingFlow();

	let readingSection = $state<HTMLElement | null>(null);

	const primaryHexagram = $derived(
		flow.casting ? resolveHexagram(flow.casting.primaryNumber, i18n.locale) : null
	);

	const relatingHexagram = $derived(
		flow.casting?.relatingNumber ? resolveHexagram(flow.casting.relatingNumber, i18n.locale) : null
	);

	onMount(() => {
		flow.loadJournal();
	});

	async function viewJournalEntry(entry: Casting) {
		flow.viewJournalEntry(entry);
		await tick();
		readingSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<main class="main">
	<header class="site-header">
		<h1 class="logo">易經</h1>
		<p class="tagline">{i18n.t('app.tagline')}</p>
	</header>

	{#if flow.step === 'question'}
		<QuestionForm
			question={flow.question}
			onQuestionInput={(value) => flow.setQuestion(value)}
			onStartCast={(mode) => flow.startCast(mode)}
		/>
	{/if}

	{#if flow.step === 'toss' || flow.step === 'building' || flow.step === 'reading'}
		<CastingStage
			step={flow.step}
			tossMode={flow.tossMode}
			lineCoins={flow.lineCoins}
			lines={flow.lines}
			spinningLine={flow.spinningLine}
			spinningCoin={flow.spinningCoin}
			revealedLines={flow.revealedLines}
			coinGridRevealed={flow.coinGridRevealed}
			activeLine={flow.activeLine}
			tossing={flow.tossing}
			onTossNext={() => flow.tossNext()}
		/>
	{/if}

	{#if flow.step === 'reading' && flow.casting && primaryHexagram}
		<div bind:this={readingSection}>
			<ReadingResult
				casting={flow.casting}
				{primaryHexagram}
				{relatingHexagram}
				onReset={() => flow.reset()}
			/>
		</div>
	{/if}

	<JournalPanel
		journal={flow.journal}
		activeCastingId={flow.step === 'reading' ? flow.casting?.id : null}
		onEntrySelect={viewJournalEntry}
	/>
</main>

<style>
	.main {
		max-width: 32rem;
		margin: 0 auto;
		padding: 2rem 1.25rem 5rem;
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
