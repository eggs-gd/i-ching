<script lang="ts">
	import AppPopup from './AppPopup.svelte';

	interface Props {
		open: boolean;
		title: string;
		body: string;
		closeLabel: string;
		onClose: () => void;
	}

	let { open, title, body, closeLabel, onClose }: Props = $props();

	const paragraphs = $derived(
		body
			.split(/\n\s*\n/)
			.map((part) => part.trim())
			.filter(Boolean)
	);
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
		gap: 0.75rem;
	}

	.help-body p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.55;
		color: var(--text-muted);
	}
</style>
