<script lang="ts">
	import { hexFontGlyph } from '$lib/data/hex-font';

	interface Props {
		number: number;
		/** Accessible label, e.g. hexagram name */
		label?: string;
		/** Inline size for lists (journal, motifs) */
		compact?: boolean;
	}

	let { number, label, compact = false }: Props = $props();

	const glyph = $derived(hexFontGlyph(number));
</script>

<span
	class="hex-font-icon"
	class:compact
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : true}
>
	<span class="glyph" aria-hidden="true">{glyph}</span>
</span>

<style>
	.hex-font-icon:not(.compact) {
		display: block;
		font-family: var(--font-hexagram);
		font-size: 3.25rem;
		line-height: 2;
		color: var(--line-yang);
		font-variant-emoji: text;
	}

	.glyph {
		display: block;
		line-height: 2;
	}

	/* Tune per context via --hex-compact-shift if needed */
	.hex-font-icon.compact {
		--hex-compact-shift: 0.11em;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1em;
		height: 1em;
		font-size: 1rem;
		line-height: 0;
		vertical-align: middle;
		flex-shrink: 0;
		overflow: hidden;
	}

	.hex-font-icon.compact .glyph {
		font-size: 2rem;
		transform: translateY(var(--hex-compact-shift));
	}
</style>
