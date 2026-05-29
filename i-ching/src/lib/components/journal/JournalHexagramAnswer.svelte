<script lang="ts">
	import type { Hexagram } from '$lib/i-ching/types';
	import { HexagramFontIcon } from '$lib/components/primitives';

	interface Props {
		hexagram: Hexagram;
	}

	let { hexagram }: Props = $props();
</script>

<span class="hex-answer">
	<span class="hex-answer__num">{hexagram.number}</span>
	<HexagramFontIcon number={hexagram.number} label={hexagram.name} compact />
	<span class="hex-answer__name">{hexagram.name}</span>
</span>

<style>
	.hex-answer {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
	}

	.hex-answer__num {
		font-family: var(--font-serif);
		color: var(--accent-dim);
		flex-shrink: 0;
	}

	.hex-answer__name {
		font-family: var(--font-serif);
		min-width: 0;
	}
</style>
