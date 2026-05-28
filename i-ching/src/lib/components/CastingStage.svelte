<script lang="ts">
	import type { CoinValue, FlowStep, Line, TossMode } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';
	import CoinGrid from './CoinGrid.svelte';

	interface Props {
		step: FlowStep;
		tossMode: TossMode;
		lineCoins: ((CoinValue | undefined)[] | undefined)[];
		lines: Line[];
		spinningLine: number | null;
		spinningCoin: number | null;
		revealedLines: number;
		coinGridRevealed: number;
		activeLine: number | null;
		tossing: boolean;
		onTossNext: () => void;
	}

	let {
		step,
		tossMode,
		lineCoins,
		lines,
		spinningLine,
		spinningCoin,
		revealedLines,
		coinGridRevealed,
		activeLine,
		tossing,
		onTossNext
	}: Props = $props();

	const i18n = useI18n();
	const tossActionLabel = $derived(
		tossMode === 'single' ? i18n.t('flow.tossSingle') : i18n.t('flow.tossLine')
	);
</script>

<section class="step cast-step">
	<CoinGrid
		{lineCoins}
		{lines}
		spinningLine={step === 'reading' ? null : spinningLine}
		spinningCoin={step === 'reading' ? null : spinningCoin}
		revealedLines={step === 'reading' ? 6 : coinGridRevealed}
		activeLine={step === 'reading' || step === 'building' ? null : activeLine}
	/>

	{#if step === 'toss' && tossMode !== 'all'}
		{#if lines.length < 6}
			<button class="primary-btn toss-action" onclick={onTossNext} disabled={tossing}>
				{tossActionLabel}
			</button>
		{/if}
	{:else if step === 'toss'}
		<p class="status">{i18n.t('flow.tossing')}</p>
	{:else if step === 'building'}
		<p class="status">{i18n.t('flow.building')}</p>
	{/if}
</section>

<style>
	.step {
		margin-bottom: 2rem;
	}

	.cast-step {
		text-align: center;
		padding: 1rem 0 2rem;
	}

	.primary-btn {
		width: 100%;
		padding: 0.9rem 1.5rem;
		border-radius: 2px;
		background: var(--accent-dim);
		color: var(--bg);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		transition: all 0.2s ease;
	}

	.primary-btn:hover:not(:disabled) {
		background: var(--accent);
	}

	.primary-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.toss-action {
		margin-top: 1.5rem;
	}

	.status {
		font-size: 0.75rem;
		color: var(--text-faint);
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.04em;
		margin: 1rem 0 0;
	}
</style>
