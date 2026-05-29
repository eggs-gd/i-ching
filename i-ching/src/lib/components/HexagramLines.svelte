<script lang="ts">
	import type { Line } from '$lib/i-ching/types';
	import { lineDisplay } from '$lib/i-ching/hexagram';

	interface Props {
		lines: Line[];
		revealed?: number;
		compact?: boolean;
	}

	let { lines, revealed = 6, compact = false }: Props = $props();

	/** Line numbers top → bottom (6 at top, 1 at bottom) */
	const lineOrder = [6, 5, 4, 3, 2, 1] as const;
</script>

<div class="hexagram" class:compact>
	{#each lineOrder as lineNum, i}
		{@const line = lines[lineNum - 1]}
		{#if line}
			<div
				class="line-row"
				class:visible={lineNum <= revealed}
				class:changing={line.changing}
				style:--delay="{(6 - lineNum) * 120}ms"
			>
				<span class="line-num">{lineNum}</span>
				<span class="line-glyph">{lineDisplay(line)}</span>
			</div>
		{/if}
	{/each}
</div>

<style>
	.hexagram {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}

	.hexagram.compact {
		gap: 0.25rem;
	}

	.line-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		opacity: 0;
		transform: translateY(8px);
		transition:
			opacity 0.6s ease var(--delay),
			transform 0.6s ease var(--delay);
	}

	.line-row.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.line-num {
		font-size: 0.85rem;
		color: var(--text-faint);
		width: 1rem;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.line-glyph {
		font-family: var(--font-serif);
		font-size: 1.5rem;
		letter-spacing: 0.15em;
		color: var(--line-yang);
		min-width: 5rem;
		text-align: center;
	}

	.compact .line-glyph {
		font-size: 1.1rem;
	}

	.line-row.changing .line-glyph {
		color: var(--line-changing);
	}
</style>
