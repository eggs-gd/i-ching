<script lang="ts">
	import type { Snippet } from 'svelte';
	import { portalToBody } from '$lib/actions/portal-to-body';
	import { useI18n } from '$lib/i18n';

	interface Props {
		open: boolean;
		title: string;
		onClose: () => void;
		titleId?: string;
		/** Toolbar row below title (tabs, filters, …) */
		toolbar?: Snippet;
		children: Snippet;
	}

	let { open, title, onClose, titleId, toolbar, children }: Props = $props();

	const i18n = useI18n();

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
	class="fullscreen"
	tabindex="-1"
	aria-labelledby={titleId}
	onclose={handleDialogClose}
	oncancel={handleCancel}
>
	<header class="shell-header">
		<button type="button" class="back-btn" onclick={dismiss}>
			{i18n.t('flow.back')}
		</button>
		<h1 id={titleId} class="shell-title">{title}</h1>
		{#if toolbar}
			<div class="shell-toolbar">
				{@render toolbar()}
			</div>
		{/if}
	</header>

	<div class="shell-body">
		{@render children()}
	</div>
</dialog>

<style>
	.fullscreen {
		position: fixed;
		inset: 0;
		width: 100%;
		max-width: none;
		height: 100%;
		max-height: none;
		margin: 0;
		padding: 0;
		border: none;
		border-radius: 0;
		background: var(--bg);
		color: var(--text);
		outline: none;
		overflow: hidden;
	}

	.fullscreen:not([open]) {
		display: none;
	}

	.fullscreen[open] {
		display: flex;
		flex-direction: column;
	}

	.fullscreen::backdrop {
		background: var(--overlay-scrim);
	}

	.shell-header {
		flex-shrink: 0;
		padding: calc(var(--space-3) + env(safe-area-inset-top, 0px))
			calc(var(--space-4) + env(safe-area-inset-right, 0px)) var(--space-2)
			calc(var(--space-4) + env(safe-area-inset-left, 0px));
		border-bottom: 1px solid var(--border);
	}

	.back-btn {
		padding: var(--space-2) 0;
		margin-bottom: var(--space-2);
		border: none;
		background: none;
		color: var(--text-muted);
		font: inherit;
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.back-btn:hover {
		color: var(--text);
	}

	.back-btn:focus {
		outline: none;
	}

	.shell-title {
		margin: 0;
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		font-weight: 500;
		color: var(--text);
	}

	.shell-toolbar {
		margin-top: var(--space-3);
	}

	.shell-body {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding: 0 calc(var(--space-4) + env(safe-area-inset-right, 0px))
			calc(var(--space-4) + env(safe-area-inset-bottom, 0px))
			calc(var(--space-4) + env(safe-area-inset-left, 0px));
	}

	.shell-body > :global(*) {
		flex: 1 1 auto;
		min-height: 0;
	}
</style>
