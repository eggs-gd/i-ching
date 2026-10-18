<script lang="ts">
	import type { CoinValue, Line } from '$lib/i-ching/types';
	import CoinFace from './CoinFace.svelte';
	import LineGlyph from './LineGlyph.svelte';
	import { useI18n } from '$lib/i18n';

	interface Props {
		/** Index 0 = line 1 (bottom) … index 5 = line 6 (top) */
		lineCoins: ((CoinValue | undefined)[] | undefined)[];
		lines?: Line[];
		spinningLine?: number | null;
		spinningCoin?: number | null;
		revealedLines?: number;
		activeLine?: number | null;
	}

	let {
		lineCoins,
		lines = [],
		spinningLine = null,
		spinningCoin = null,
		revealedLines = 6,
		activeLine = null
	}: Props = $props();

	const i18n = useI18n();
	const lineOrder = [6, 5, 4, 3, 2, 1] as const;

	function lineLabelState(lineNum: number): 'pending' | 'complete' | 'building' {
		if (activeLine !== null && lineNum === activeLine) return 'building';

		const hasLine = lineNum <= lines.length && lines[lineNum - 1] !== undefined;
		if (hasLine && lineNum <= revealedLines) return 'complete';

		return 'pending';
	}
</script>

<div class="coin-grid" aria-label={i18n.t('coins.gridLabel')}>
	{#each lineOrder as lineNum}
		{@const row = lineCoins[lineNum - 1]}
		{@const line = lines[lineNum - 1]}
		{@const rowVisible =
			lineNum <= revealedLines || (spinningLine !== null && lineNum === spinningLine)}
		<div class="coin-row" class:visible={rowVisible}>
			<span
				class="line-label"
				class:complete={lineLabelState(lineNum) === 'complete'}
				class:building={lineLabelState(lineNum) === 'building'}
			>
				{lineNum}
			</span>
			<div class="coins">
				{#each [0, 1, 2] as coinIndex}
					{@const value = row?.[coinIndex]}
					{@const isSpinning = spinningLine === lineNum && spinningCoin === coinIndex + 1}
					<CoinFace {value} empty={value === undefined} spinning={isSpinning && rowVisible} />
				{/each}
			</div>
			{#if line && lineNum <= revealedLines}
				<LineGlyph {line} />
			{:else}
				<span class="glyph-placeholder" aria-hidden="true"></span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.coin-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-bottom: var(--space-5);
	}

	.coin-row {
		display: grid;
		grid-template-columns: var(--space-5) 1fr var(--size-glyph);
		align-items: center;
		gap: var(--space-3);
		opacity: 0.35;
		transition: opacity var(--duration) var(--ease);
	}

	.coin-row.visible {
		opacity: 1;
	}

	.line-label {
		font-size: var(--text-xs);
		color: var(--text-faint);
		text-align: right;
		font-variant-numeric: tabular-nums;
		transition: color 0.3s var(--ease);
	}

	.line-label.complete {
		color: var(--accent);
	}

	.line-label.building {
		color: var(--line-changing);
	}

	.coins {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--space-3);
		min-height: var(--size-glyph);
	}

	.glyph-placeholder {
		width: var(--size-glyph);
		height: var(--size-glyph);
	}
</style>
