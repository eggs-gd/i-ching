<script lang="ts">
	import type { Casting, Hexagram } from '$lib/i-ching/types';
	import { SHOW_PAID_FEATURE_STUBS } from '$lib/config/features';
	import { useI18n } from '$lib/i18n';
	import CastExplanationPanel from './CastExplanationPanel.svelte';
	import ChangingLinesPanel from './ChangingLinesPanel.svelte';
	import ReadingCard from './ReadingCard.svelte';

	interface Props {
		casting: Casting;
		primaryHexagram: Hexagram;
		relatingHexagram?: Hexagram | null;
		onReset: () => void;
	}

	let { casting, primaryHexagram, relatingHexagram = null, onReset }: Props = $props();

	const i18n = useI18n();
	const hexagramOnly = $derived(casting.method === 'motif');
	const hasChangingLines = $derived(!hexagramOnly && casting.changingLines.length > 0);
</script>

<section class="step reading-step">
	{#if !hexagramOnly && casting.question.trim()}
		<p class="question-echo">«{casting.question}»</p>
	{/if}

	<ReadingCard
		hexagram={primaryHexagram}
		label={i18n.t(hasChangingLines ? 'reading.entryHexagramLabel' : 'reading.stateHexagramLabel')}
		helpTitleKey={hasChangingLines
			? 'reading.primaryHexagramHelpTitle'
			: 'reading.stateHexagramHelpTitle'}
		helpBodyKey={hasChangingLines
			? 'reading.primaryHexagramHelpBody'
			: 'reading.stateHexagramHelpBody'}
	/>

	{#if hasChangingLines}
	<ChangingLinesPanel changingLines={casting.changingLines} lines={casting.lines} />
	{/if}

	{#if relatingHexagram}
		<ReadingCard
			hexagram={relatingHexagram}
			label={i18n.t('reading.relatingLabel')}
			helpTitleKey="reading.relatingHexagramHelpTitle"
			helpBodyKey="reading.relatingHexagramHelpBody"
		/>
	{/if}

	{#if SHOW_PAID_FEATURE_STUBS}
		<CastExplanationPanel />
	{/if}

	<button class="secondary-btn" onclick={onReset}>{i18n.t('flow.newCast')}</button>
</section>

<style>
	.step {
		margin-bottom: 2rem;
	}

	.reading-step {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.question-echo {
		font-family: var(--font-serif);
		font-style: italic;
		color: var(--text-muted);
		text-align: center;
		margin: 0;
		font-size: 1.1rem;
	}

	.secondary-btn {
		width: 100%;
		margin-top: 1.5rem;
		padding: 0.9rem 1.5rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		color: var(--text-muted);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		transition: all 0.2s ease;
	}

	.secondary-btn:hover {
		border-color: var(--accent-dim);
		color: var(--text);
	}
</style>
