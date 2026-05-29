<script lang="ts">
	import { AppPopup } from '$lib/components/ui';
	import { splitParagraphs } from '$lib/utils/text';

	interface Props {
		open: boolean;
		title: string;
		body: string;
		closeLabel: string;
		onClose: () => void;
	}

	let { open, title, body, closeLabel, onClose }: Props = $props();

	const paragraphs = $derived(splitParagraphs(body));
</script>

<AppPopup {open} {title} {onClose} {closeLabel}>
	{#snippet children()}
		<div class="help-body">
			{#if paragraphs.length > 0}
				{#each paragraphs as paragraph}
					<p>{paragraph}</p>
				{/each}
			{:else}
				<p>&nbsp;</p>
			{/if}
		</div>
	{/snippet}
</AppPopup>

<style>
	.help-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.help-body p {
		margin: 0;
		font-size: var(--text-lg);
		line-height: var(--leading-normal);
		color: var(--text-muted);
	}
</style>
