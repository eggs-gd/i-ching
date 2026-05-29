<script lang="ts">
	import type { Casting, Hexagram } from '$lib/i-ching/types';
	import { SHOW_PAID_FEATURE_STUBS } from '$lib/config/features';
	import { AppButton } from '$lib/components/ui';
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

	<AppButton variant="secondary" fullWidth class="new-cast" onclick={onReset}>
		{i18n.t('flow.newCast')}
	</AppButton>
</section>

<style>
	.step {
		margin-bottom: 2rem;
	}

	.reading-step {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.question-echo {
		font-family: var(--font-serif);
		font-style: italic;
		color: var(--text-muted);
		text-align: center;
		margin: 0;
		font-size: var(--text-lg);
	}

	:global(.new-cast) {
		margin-top: var(--space-5);
		padding: var(--space-5) var(--space-6);
		font-size: var(--text-base);
		letter-spacing: var(--tracking-wide);
		text-align: center;
	}
</style>
