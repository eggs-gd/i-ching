<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'paid-panel' | 'popup-close' | 'text';
	type PrimaryTone = 'solid' | 'soft';

	interface Props {
		variant?: ButtonVariant;
		/** Primary only: filled (popup) vs tinted (cast grid) */
		primaryTone?: PrimaryTone;
		fullWidth?: boolean;
		type?: 'button' | 'submit';
		form?: string;
		disabled?: boolean;
		/** For toggle/list selection buttons */
		pressed?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'secondary',
		primaryTone = 'solid',
		fullWidth = false,
		type = 'button',
		form,
		disabled = false,
		pressed,
		class: className = '',
		onclick,
		children
	}: Props = $props();
</script>

<button
	{type}
	{form}
	{disabled}
	class="btn {className}"
	class:primary={variant === 'primary'}
	class:primary-soft={variant === 'primary' && primaryTone === 'soft'}
	class:secondary={variant === 'secondary'}
	class:danger={variant === 'danger'}
	class:paid-panel={variant === 'paid-panel'}
	class:popup-close={variant === 'popup-close'}
	class:text={variant === 'text'}
	class:full-width={fullWidth}
	class:pressed={pressed === true}
	aria-pressed={pressed}
	{onclick}
>
	{@render children()}
</button>

<style>
	.btn {
		font: inherit;
		border-radius: var(--radius);
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.btn:focus {
		outline: none;
	}

	.btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.btn.full-width {
		width: 100%;
	}

	/* Primary — accent CTA (cast modes, popup submit) */
	.btn.primary {
		padding: var(--space-3) var(--space-2);
		border: 1px solid var(--accent-dim);
		background: var(--accent-dim);
		color: var(--bg);
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
	}

	.btn.primary:not(:disabled):hover {
		background: var(--accent);
		border-color: var(--accent);
	}

	.btn.primary-soft {
		padding: var(--space-3) var(--space-2);
		background: var(--fill-subtle);
		color: var(--accent);
		transition: var(--transition-all);
	}

	.btn.primary-soft:not(:disabled):hover {
		background: var(--accent-dim);
		color: var(--bg);
		border-color: var(--accent-dim);
	}

	.btn.primary-soft:disabled {
		opacity: 0.35;
	}

	/* Secondary — bordered actions */
	.btn.secondary {
		padding: var(--space-3) var(--space-3);
		border: 1px solid var(--border);
		background: var(--bg-elevated);
		color: var(--text-muted);
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		text-align: left;
		transition: var(--transition-interactive);
	}

	.btn.secondary:not(:disabled):hover {
		border-color: var(--accent-dim);
		color: var(--text);
	}

	/* Danger — destructive popup action */
	.btn.danger {
		flex: 1;
		min-width: 0;
		padding: var(--space-3) var(--space-2);
		border: 1px solid var(--border-warning);
		background: var(--fill-warning);
		color: var(--line-changing);
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
	}

	.btn.danger:not(:disabled):hover {
		border-color: var(--line-changing);
		background: var(--fill-warning-strong);
		color: var(--text);
	}

	/* Paid-feature panel trigger */
	.btn.paid-panel {
		padding: var(--space-3) var(--space-3);
		border: 1px solid var(--border-warning);
		background: var(--fill-warning);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--line-changing);
		text-align: left;
	}

	/* Popup shell close */
	.btn.popup-close {
		font-size: var(--text-base);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--text-muted);
		background: none;
		border: 1px solid var(--border);
		padding: var(--space-3) var(--space-3);
		white-space: nowrap;
	}

	.btn.popup-close:not(:disabled):hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}

	/* Text-only toolbar (archive select-all, back links) */
	.btn.text {
		padding: var(--space-2) 0;
		border: none;
		background: none;
		font-size: var(--text-sm);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		text-align: left;
		color: var(--text-faint);
		transition: var(--transition);
	}

	.btn.text:not(:disabled):hover,
	.btn.text.pressed {
		color: var(--text);
	}

	.btn.text.pressed {
		color: var(--accent);
	}
</style>
