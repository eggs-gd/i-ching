<script lang="ts">
	interface Props {
		triggerLabel: string;
		popupTitle: string;
		body: string;
		closeLabel: string;
	}

	let { triggerLabel, popupTitle, body, closeLabel }: Props = $props();

	let open = $state(false);
	let dialog = $state<HTMLDialogElement | null>(null);

	function blurActiveElement(): void {
		const active = document.activeElement;
		if (active instanceof HTMLElement) {
			active.blur();
		}
	}

	function closePopup(): void {
		open = false;
		if (dialog?.open) {
			dialog.close();
		}
		requestAnimationFrame(blurActiveElement);
	}

	function openPopup(): void {
		open = true;
	}

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
			requestAnimationFrame(blurActiveElement);
		} else if (!open && dialog.open) {
			dialog.close();
			requestAnimationFrame(blurActiveElement);
		}
	});
</script>

<button type="button" class="trigger" onclick={openPopup}>
	<span class="trigger-label">{triggerLabel}</span>
</button>

<dialog
	bind:this={dialog}
	class="popup"
	tabindex="-1"
	onclose={closePopup}
	onclick={(event) => {
		if (event.target === dialog) closePopup();
	}}
>
	<h3 class="popup-title">{popupTitle}</h3>
	<p class="popup-body">{body}</p>
	<button type="button" class="close-btn" onclick={closePopup}>{closeLabel}</button>
</dialog>

<style>
	.trigger {
		width: 100%;
		padding: 0.55rem 0.75rem;
		border: 1px solid rgba(201, 120, 90, 0.4);
		border-radius: 2px;
		background: rgba(201, 120, 90, 0.12);
		color: inherit;
		font: inherit;
		cursor: pointer;
		text-align: left;
		-webkit-tap-highlight-color: transparent;
	}

	.trigger:focus {
		outline: none;
	}

	.trigger-label {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--line-changing);
	}

	.popup {
		width: min(22rem, calc(100% - 2.5rem));
		max-width: calc(100dvw - 2.5rem);
		padding: 0.75rem;
		border: 1px solid rgba(201, 120, 90, 0.4);
		border-radius: 2px;
		background: rgba(201, 120, 90, 0.25);
		color: var(--text);
		outline: none;
	}

	.popup::backdrop {
		background: rgba(8, 7, 6, 0.72);
	}

	.popup-title {
		margin: 0 0 0.5rem;
		font-size: 0.72rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--line-changing);
	}

	.popup-body {
		margin: 0 0 0.75rem;
		font-size: 0.8rem;
		line-height: 1.55;
		color: var(--text-muted);
	}

	.close-btn {
		font: inherit;
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--line-changing);
		background: none;
		border: 1px solid rgba(201, 120, 90, 0.4);
		border-radius: 2px;
		padding: 0.45rem 0.65rem;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.close-btn:hover {
		border-color: rgba(201, 120, 90, 0.65);
		color: var(--text);
	}

	.close-btn:focus {
		outline: none;
	}
</style>
