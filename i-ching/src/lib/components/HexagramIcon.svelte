<script lang="ts">
	import { staticLinesForHexagram } from '$lib/i-ching/hexagram';
	import LineGlyph from './LineGlyph.svelte';

	interface Props {
		number: number;
	}

	let { number }: Props = $props();

	const lines = $derived(staticLinesForHexagram(number));
	const lineOrder = [6, 5, 4, 3, 2, 1] as const;
</script>

<div class="hex-icon" aria-hidden="true">
	{#each lineOrder as lineNum}
		<LineGlyph line={lines[lineNum - 1]} compact />
	{/each}
</div>

<style>
	.hex-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.hex-icon :global(.glyph.compact) {
		width: 1.15rem;
		height: 0.35rem;
		gap: 0.3rem;
	}

	.hex-icon :global(.glyph.compact .bar) {
		height: 0.12rem;
	}

	.hex-icon :global(.glyph.compact.yin .bar) {
		width: calc(50% - 0.1rem);
	}
</style>
