<script lang="ts">
	import type { Line } from '$lib/i-ching/types';

	interface Props {
		line: Line;
		compact?: boolean;
	}

	let { line, compact = false }: Props = $props();
</script>

<div
	class="glyph"
	class:compact
	class:yang={line.value === 'yang'}
	class:yin={line.value === 'yin'}
	class:changing={line.changing}
	aria-hidden="true"
>
	{#if line.value === 'yang'}
		<span class="bar"></span>
	{:else}
		<span class="bar"></span>
		<span class="bar"></span>
	{/if}
</div>

<style>
	.glyph {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		gap: 0.8rem;
	}

	.bar {
		display: block;
		height: 0.2rem;
		border-radius: 1px;
		background: var(--line-yang);
	}

	.yang .bar {
		width: 100%;
	}

	.yin .bar {
		width: calc(50% - 0.175rem);
	}

	.changing .bar {
		background: var(--line-changing);
	}

	.compact {
		width: 1.65rem;
		height: 1rem;
		gap: 0.2rem;
	}

	.compact .bar {
		height: 0.14rem;
	}

	.compact.yin .bar {
		width: calc(50% - 0.1rem);
	}
</style>
