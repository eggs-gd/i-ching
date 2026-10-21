<script lang="ts">
	import type { Snippet } from 'svelte';
	import { portalToBody } from '$lib/actions/portal-to-body';
	import { useI18n } from '$lib/i18n';
	import AppButton from './AppButton.svelte';
	import { useDialog } from './use-dialog.svelte';

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
	const { dismiss, handleDialogClose, handleCancel } = useDialog(
		() => open,
		() => onClose,
		() => dialog
	);
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
		<AppButton variant="popup-close" onclick={dismiss}>{resolvedCloseLabel}</AppButton>
		{#if footer}
			<div class="popup-footer-actions">
				{@render footer()}
			</div>
		{/if}
	</footer>
</dialog>

<style>
	.popup {
		width: min(calc(var(--content-max-width) * 0.9), calc((100dvw - 2.5rem) * 0.9));
		max-width: calc(100dvw - 2.5rem);
		margin: auto;
		padding: var(--space-5) var(--space-5) var(--space-4);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg-paper);
		color: var(--text);
		outline: none;
	}

	/* Closed <dialog> is inert in DOM (portaled to body); must stay hidden */
	.popup:not([open]) {
		display: none;
	}

	.popup.scrollable[open] {
		display: flex;
		flex-direction: column;
		max-height: var(--popup-max-height);
		overflow: hidden;
	}

	.popup::backdrop {
		background: var(--overlay-scrim);
	}

	.popup.paid {
		padding: var(--space-3);
		border-color: var(--border-warning);
		background: var(--fill-warning-strong);
	}

	.popup-title {
		margin: 0 0 var(--space-3);
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		font-weight: 500;
		color: var(--text);
		flex-shrink: 0;
	}

	.popup.paid .popup-title {
		font-family: var(--font-sans);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--line-changing);
	}

	.popup-body {
		margin-bottom: 0;
	}

	.popup-body:not(:last-child) {
		margin-bottom: var(--space-4);
	}

	.popup.scrollable[open] .popup-body {
		flex: 1 1 auto;
		min-height: 3rem;
		max-height: calc(var(--popup-max-height) - 7.5rem);
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior: contain;
	}

	.popup-footer {
		flex-shrink: 0;
		display: grid;
		gap: var(--space-2);
	}

	.popup-footer.has-actions {
		grid-template-columns: auto 1fr;
		align-items: stretch;
	}

	.popup-footer:not(.has-actions) {
		grid-template-columns: 1fr;
	}

	.popup-footer:not(.has-actions) :global(.btn.popup-close) {
		width: 100%;
	}

	.popup-footer-actions {
		display: flex;
		min-width: 0;
		gap: var(--space-2);
	}

	.popup-footer-actions :global(.btn) {
		flex: 1;
		min-width: 0;
	}

	.popup.paid :global(.btn.popup-close) {
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-caps);
		color: var(--line-changing);
		border-color: var(--border-warning);
	}

	.popup.paid :global(.btn.popup-close:not(:disabled):hover) {
		border-color: var(--border-warning-strong);
		color: var(--text);
	}
</style>
