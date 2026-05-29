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

	function blurActiveElement(): void {
		const active = document.activeElement;
		if (active instanceof HTMLElement) {
			active.blur();
		}
	}

	function closePopup(): void {
		if (dialog?.open) {
			dialog.close();
		}
		onClose();
		// Dialog returns focus to the opener; clear so no "browser" ring on i or summary
		requestAnimationFrame(() => {
			blurActiveElement();
		});
	}

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
			// showModal() auto-focuses the first focusable (close) — undo on touch UIs
			requestAnimationFrame(() => {
				blurActiveElement();
			});
		} else if (!open && dialog.open) {
			dialog.close();
			requestAnimationFrame(blurActiveElement);
		}
	});
</script>

<dialog
	bind:this={dialog}
	class="popup"
	tabindex="-1"
	onclose={closePopup}
	onclick={(event) => {
		if (event.target === dialog) closePopup();
	}}
>
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
	<button type="button" class="close-btn" onclick={closePopup}>{closeLabel}</button>
</dialog>

<style>
	.popup {
		width: min(22rem, calc(100% - 2.5rem));
		max-width: calc(100dvw - 2.5rem);
		padding: 1.25rem 1.25rem 1rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-paper);
		color: var(--text);
		outline: none;
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
		font-size: 1rem;
		line-height: 1.55;
		color: var(--text-muted);
	}

	.close-btn {
		font: inherit;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		background: none;
		border: 1px solid var(--border);
		border-radius: 2px;
		padding: 0.35rem 0.65rem;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.close-btn:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}

	.close-btn:focus {
		outline: none;
	}
</style>
