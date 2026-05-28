<script lang="ts">
	interface Props {
		open: boolean;
		title: string;
		body: string;
		closeLabel: string;
		onClose: () => void;
	}

	let { open, title, body, closeLabel, onClose }: Props = $props();
	let dialog = $state<HTMLDialogElement | null>(null);

	const paragraphs = $derived(
		body
			.split(/\n\s*\n/)
			.map((part) => part.trim())
			.filter(Boolean)
	);

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	});
</script>

<dialog bind:this={dialog} class="popup" onclose={onClose} onclick={(event) => {
	if (event.target === dialog) onClose();
}}>
	<h3>{title}</h3>
	<div class="body">
		{#if paragraphs.length > 0}
			{#each paragraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		{:else}
			<p>&nbsp;</p>
		{/if}
	</div>
	<button type="button" class="close-btn" onclick={onClose}>{closeLabel}</button>
</dialog>

<style>
	.popup {
		width: min(calc(100vw - 2.5rem), 22rem);
		padding: 1.25rem 1.25rem 1rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-paper);
		color: var(--text);
	}

	.popup::backdrop {
		background: rgba(8, 7, 6, 0.72);
	}

	h3 {
		margin: 0 0 0.75rem;
		font-family: var(--font-serif);
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--text);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	p {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.55;
		color: var(--text-muted);
	}

	.close-btn {
		font: inherit;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		background: none;
		border: 1px solid var(--border);
		border-radius: 2px;
		padding: 0.35rem 0.65rem;
		cursor: pointer;
	}

	.close-btn:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}
</style>
