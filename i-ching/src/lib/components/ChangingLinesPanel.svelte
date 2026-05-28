<script lang="ts">
	import type { Line } from '$lib/i-ching/types';
	import { getLinePositionText, LINE_ORDER } from '$lib/i18n/line-positions';
	import { useI18n } from '$lib/i18n';
	import DisclosurePanel from './DisclosurePanel.svelte';
	import HelpPopup from './HelpPopup.svelte';
	import InfoButton from './InfoButton.svelte';
	import LineGlyph from './LineGlyph.svelte';

	interface Props {
		changingLines: number[];
		lines?: Line[];
	}

	let { changingLines, lines }: Props = $props();

	const i18n = useI18n();
	const changingSet = $derived(new Set(changingLines));
	let helpOpen = $state(false);
</script>

<DisclosurePanel title={i18n.t('reading.changingLinesTitle', { lines: changingLines.join(', ') })}>
	{#snippet summaryEnd()}
		<InfoButton
			label={i18n.t('reading.changingLinesHelpTitle')}
			onclick={() => (helpOpen = true)}
		/>
	{/snippet}

	<ol class="line-list">
		{#each LINE_ORDER as lineNumber}
			{@const active = changingSet.has(lineNumber)}
			{@const line = lines?.[lineNumber - 1]}
			<li class="line-item" class:active class:inactive={!active}>
				<span class="line-num">{lineNumber}</span>
				<span class="line-text">{getLinePositionText(lineNumber, i18n.locale)}</span>
				{#if line}
					<LineGlyph {line} compact />
				{/if}
			</li>
		{/each}
	</ol>
</DisclosurePanel>

<HelpPopup
	open={helpOpen}
	title={i18n.t('reading.changingLinesHelpTitle')}
	body={i18n.t('reading.changingLinesHelpBody')}
	closeLabel={i18n.t('reading.helpClose')}
	onClose={() => (helpOpen = false)}
/>

<style>
	.line-list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.line-item {
		display: grid;
		grid-template-columns: 1.1rem 1fr auto;
		gap: 0.5rem;
		align-items: center;
		transition: opacity 0.2s ease;
	}

	.line-item.inactive {
		opacity: 0.35;
	}

	.line-item.active {
		opacity: 1;
	}

	.line-num {
		font-size: 0.65rem;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
		text-align: center;
	}

	.line-text {
		font-size: 0.75rem;
		line-height: 1.35;
		color: var(--text-muted);
	}

	.line-item.active .line-num,
	.line-item.active .line-text {
		color: var(--text);
	}
</style>
