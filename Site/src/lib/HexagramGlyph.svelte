<script lang="ts">
	interface Props {
		number: number;
		/** Accessible label, e.g. the hexagram's name; without it the glyph is decorative. */
		label?: string;
	}

	let { number, label }: Props = $props();

	// The hexagram pictograms are U+4DC0..U+4DFF, in the King Wen order.
	const glyph = $derived(String.fromCodePoint(0x4dc0 + number - 1));
</script>

<span
	class="hexagram-glyph"
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : true}>{glyph}</span
>

<style>
	.hexagram-glyph {
		display: block;
		font-family: var(--font-hexagram);
		line-height: 1;
		color: var(--accent);
		font-variant-emoji: text;
	}
</style>
