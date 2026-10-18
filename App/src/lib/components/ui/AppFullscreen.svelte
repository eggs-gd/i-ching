<script lang="ts">
	import type { Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import { portalToBody } from '$lib/actions/portal-to-body';
	import { useI18n } from '$lib/i18n';
	import AppButton from './AppButton.svelte';
	import { useDialog } from './use-dialog.svelte';

	interface Props {
		open: boolean;
		title: string;
		onClose: () => void;
		titleId?: string;
		closeLabel?: string;
		/** Custom title row (e.g. number + glyph + name) */
		titleContent?: Snippet;
		/** Toolbar row below title (tabs, filters, …) */
		toolbar?: Snippet;
		children: Snippet;
	}

	let { open, title, onClose, titleId, closeLabel, titleContent, toolbar, children }: Props =
		$props();

	const i18n = useI18n();
	const resolvedCloseLabel = $derived(closeLabel ?? i18n.t('reading.helpClose'));

	let dialog = $state<HTMLDialogElement | null>(null);
	let scrollLockY = 0;
	const { dismiss, handleDialogClose, handleCancel } = useDialog(
		() => open,
		() => onClose,
		() => dialog
	);

	$effect(() => {
		if (!browser) return;
		if (!open) return;

		scrollLockY = window.scrollY;
		document.documentElement.classList.add('scroll-locked');
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollLockY}px`;
		document.body.style.left = '0';
		document.body.style.right = '0';
		document.body.style.width = '100%';

		return () => {
			document.documentElement.classList.remove('scroll-locked');
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.left = '';
			document.body.style.right = '';
			document.body.style.width = '';
			window.scrollTo(0, scrollLockY);
		};
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
		<h1 id={titleId} class="shell-title">
			{#if titleContent}
				{@render titleContent()}
			{:else}
				{title}
			{/if}
		</h1>
		{#if toolbar}
			<div class="shell-toolbar">
				{@render toolbar()}
			</div>
		{/if}
	</header>

	<div class="shell-body">
		{@render children()}
	</div>

	<div class="shell-close">
		<AppButton variant="popup-close" onclick={dismiss}>{resolvedCloseLabel}</AppButton>
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
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior: contain;
		padding: var(--space-4) calc(var(--space-4) + env(safe-area-inset-right, 0px))
			calc(5rem + env(safe-area-inset-bottom, 0px))
			calc(var(--space-4) + env(safe-area-inset-left, 0px));
	}

	.shell-close {
		position: absolute;
		right: calc(var(--space-4) + env(safe-area-inset-right, 0px));
		bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
		z-index: 2;
		pointer-events: auto;
	}
</style>
