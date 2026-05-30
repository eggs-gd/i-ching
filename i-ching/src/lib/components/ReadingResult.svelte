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
		<div class="question-block">
			<p class="question-echo">«{casting.question}»</p>
			<AppButton variant="text" class="new-cast-link" onclick={onReset}>
				{i18n.t('flow.newCastLink')}
			</AppButton>
		</div>
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

	<AppButton variant="primary" primaryTone="soft" fullWidth class="cast-btn new-cast" onclick={onReset}>
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

	.question-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.question-echo {
		margin: 0;
		width: 100%;
		font-family: var(--font-serif);
		font-style: italic;
		font-size: var(--text-lg);
		color: var(--text-muted);
		text-align: center;
	}

	.question-block :global(.btn.text.new-cast-link) {
		align-self: flex-end;
		padding: 0;
		font-size: var(--text-sm);
		font-weight: 400;
		text-transform: none;
		letter-spacing: normal;
		color: var(--accent);
	}

	.question-block :global(.btn.text.new-cast-link:not(:disabled):hover) {
		color: var(--text);
		text-decoration: underline;
	}

	:global(.new-cast.cast-btn) {
		margin-top: var(--space-2);
		text-align: center;
	}
</style>
