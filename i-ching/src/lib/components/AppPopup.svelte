<script lang="ts">
	import type { Snippet } from 'svelte';
	import { portalToBody } from '$lib/actions/portal-to-body';
	import { useI18n } from '$lib/i18n';

	type PopupSize = 'default' | 'wide';
	type PopupVariant = 'default' | 'paid';

	interface Props {
		open: boolean;
		title: string;
		onClose: () => void;
		closeLabel?: string;
		titleId?: string;
		size?: PopupSize;
		variant?: PopupVariant;
		/** Scrollable content area between title and footer */
		scrollable?: boolean;
		/** Extra class on scrollable/content body (for styles when using snippets) */
		bodyClass?: string;
		children: Snippet;
		/** Extra footer buttons (close is always provided by AppPopup) */
		footer?: Snippet;
	}

	let {
		open,
		title,
		onClose,
		closeLabel,
		titleId,
		size = 'default',
		variant = 'default',
		scrollable = false,
		bodyClass = '',
		children,
		footer
	}: Props = $props();

	const i18n = useI18n();
	const resolvedCloseLabel = $derived(closeLabel ?? i18n.t('reading.helpClose'));

	let dialog = $state<HTMLDialogElement | null>(null);

	function blurActiveElement(): void {
		const active = document.activeElement;
		if (active instanceof HTMLElement) {
			active.blur();
		}
	}

	function notifyClosed(): void {
		if (!open) return;
		onClose();
		requestAnimationFrame(blurActiveElement);
	}

	function handleDialogClose(): void {
		notifyClosed();
	}

	function dismiss(): void {
		if (dialog?.open) {
			dialog.close();
			return;
		}
		notifyClosed();
	}

	function handleCancel(event: Event): void {
		event.preventDefault();
		dismiss();
	}

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			dialog.showModal();
			requestAnimationFrame(blurActiveElement);
		} else if (!open && dialog.open) {
			dialog.close();
		}
	});
</script>

<dialog
	use:portalToBody
	bind:this={dialog}
	class="popup"
	class:wide={size === 'wide'}
	class:paid={variant === 'paid'}
	class:scrollable={scrollable}
	tabindex="-1"
	aria-labelledby={titleId}
	onclose={handleDialogClose}
	oncancel={handleCancel}
	onclick={(event) => {
		if (event.target === dialog) dismiss();
	}}
>
	<h3 id={titleId} class="popup-title">{title}</h3>

	<div class="popup-body {bodyClass}">
		{@render children()}
	</div>

	<footer class="popup-footer" class:has-actions={!!footer}>
		<button type="button" class="close-btn" onclick={dismiss}>{resolvedCloseLabel}</button>
		{#if footer}
			<div class="popup-footer-actions">
				{@render footer()}
			</div>
		{/if}
	</footer>
</dialog>

<style>
	.popup {
		width: min(
			calc(var(--content-max-width) * 0.9),
			calc((100dvw - 2.5rem) * 0.9)
		);
		max-width: calc(100dvw - 2.5rem);
		margin: auto;
		padding: 1.25rem 1.25rem 1rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-paper);
		color: var(--text);
		outline: none;
	}

	.popup.scrollable {
		max-height: min(90dvh, 40rem);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.popup::backdrop {
		background: rgba(8, 7, 6, 0.72);
	}

	.popup.paid {
		padding: 0.75rem;
		border-color: rgba(201, 120, 90, 0.4);
		background: rgba(201, 120, 90, 0.25);
	}

	.popup-title {
		margin: 0 0 0.75rem;
		font-family: var(--font-serif);
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--text);
		flex-shrink: 0;
	}

	.popup.paid .popup-title {
		font-family: var(--font-sans);
		font-size: 0.72rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--line-changing);
	}

	.popup-body {
		margin-bottom: 0;
	}

	.popup-body:not(:last-child) {
		margin-bottom: 1rem;
	}

	.popup.scrollable .popup-body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	.popup-footer {
		flex-shrink: 0;
		display: grid;
		gap: 0.5rem;
	}

	.popup-footer.has-actions {
		grid-template-columns: auto 1fr;
		align-items: stretch;
	}

	.popup-footer:not(.has-actions) {
		grid-template-columns: 1fr;
	}

	.popup-footer-actions {
		display: flex;
		min-width: 0;
		gap: 0.5rem;
	}

	.popup-footer-actions :global(.popup-action) {
		flex: 1;
		min-width: 0;
		padding: 0.55rem 0.5rem;
		border-radius: 2px;
		font: inherit;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.popup-footer-actions :global(.popup-action:disabled) {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.popup-footer-actions :global(.popup-action--primary) {
		border: 1px solid var(--accent-dim);
		background: var(--accent-dim);
		color: var(--bg);
	}

	.popup-footer-actions :global(.popup-action--primary:hover:not(:disabled)) {
		background: var(--accent);
		border-color: var(--accent);
	}

	.popup-footer-actions :global(.popup-action--danger) {
		border: 1px solid rgba(201, 120, 90, 0.5);
		background: rgba(201, 120, 90, 0.15);
		color: var(--line-changing);
	}

	.popup-footer-actions :global(.popup-action--danger:hover:not(:disabled)) {
		border-color: var(--line-changing);
		background: rgba(201, 120, 90, 0.25);
		color: var(--text);
	}

	.popup-footer-actions :global(.popup-action:focus) {
		outline: none;
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
		padding: 0.55rem 0.75rem;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		white-space: nowrap;
	}

	.popup-footer:not(.has-actions) .close-btn {
		width: 100%;
	}

	.close-btn:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}

	.close-btn:focus {
		outline: none;
	}

	.popup.paid .close-btn {
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		color: var(--line-changing);
		border-color: rgba(201, 120, 90, 0.4);
	}

	.popup.paid .close-btn:hover {
		border-color: rgba(201, 120, 90, 0.65);
		color: var(--text);
	}
</style>
