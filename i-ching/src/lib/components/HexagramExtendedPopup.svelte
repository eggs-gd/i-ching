<script lang="ts">
	import type { Hexagram } from '$lib/i-ching/types';
	import type { HexagramExtendedContent } from '$lib/i-ching/catalog/extended';
	import { HexagramFontIcon } from '$lib/components/primitives';
	import { AppFullscreen } from '$lib/components/ui';
	import { splitParagraphs } from '$lib/utils/text';

	interface Props {
		open: boolean;
		hexagram: Hexagram;
		extended: HexagramExtendedContent;
		onClose: () => void;
	}

	let { open, hexagram, extended, onClose }: Props = $props();

	const titleId = 'hex-extended-title';

	const symbolicParagraphs = $derived(splitParagraphs(extended.wilhelm_symbolic));
	const judgmentComments = $derived(splitParagraphs(extended.wilhelm_judgment.comments));
	const imageComments = $derived(splitParagraphs(extended.wilhelm_image.comments));
</script>

<AppFullscreen {open} title={hexagram.name} {titleId} {onClose}>
	{#snippet titleContent()}
		<span class="title-row">
			<span class="title-num">{hexagram.number}</span>
			<HexagramFontIcon number={hexagram.number} compact />
			<span class="title-name">{hexagram.name}</span>
		</span>
	{/snippet}

	<article class="extended" aria-labelledby={titleId}>
		{#if symbolicParagraphs.length > 0}
			<div class="block">
				{#each symbolicParagraphs as paragraph, index}
					<p>
						{#if index === 0}
							<span class="layer-mark" aria-hidden="true">¶</span>
						{/if}
						{paragraph}
					</p>
				{/each}
			</div>
		{/if}

		{#if judgmentComments.length > 0}
			<div class="block">
				{#each judgmentComments as paragraph, index}
					<p>
						{#if index === 0}
							<span class="layer-mark" aria-hidden="true">¶</span>
						{/if}
						{paragraph}
					</p>
				{/each}
			</div>
		{/if}

		{#if imageComments.length > 0}
			<div class="block">
				{#each imageComments as paragraph, index}
					<p>
						{#if index === 0}
							<span class="layer-mark" aria-hidden="true">¶</span>
						{/if}
						{paragraph}
					</p>
				{/each}
			</div>
		{/if}
	</article>
</AppFullscreen>

<style>
	:global(.shell-title .title-row) {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-width: 0;
	}

	:global(.shell-title .title-num) {
		font-family: var(--font-serif);
		color: var(--accent-dim);
		flex-shrink: 0;
	}

	:global(.shell-title .title-name) {
		font-family: var(--font-serif);
		min-width: 0;
	}

	.block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.block + .block {
		margin-top: var(--space-5);
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
	}

	p {
		margin: 0;
		font-size: var(--text-lg);
		line-height: var(--leading-normal);
		color: var(--text);
	}

	.layer-mark {
		margin-right: 0.35rem;
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--accent-dim);
		font-style: normal;
	}
</style>
