<script lang="ts">
	import { SHOW_HEXAGRAM_LIST_PICKER } from '$lib/config/features';
	import { useI18n } from '$lib/i18n';
	import HexagramSelectView from './HexagramSelectView.svelte';
	import HexagramTrigramSelectView from './HexagramTrigramSelectView.svelte';

	type PickerMode = 'list' | 'trigram';

	interface Props {
		title: string;
		value?: number | null;
		onSelect: (number: number) => void;
		onBack: () => void;
		/** Standard modal dialog (not fullscreen) */
		dialog?: boolean;
	}

	let { title, value = null, onSelect, onBack, dialog = false }: Props = $props();

	const i18n = useI18n();
	let mode = $state<PickerMode>(SHOW_HEXAGRAM_LIST_PICKER ? 'list' : 'trigram');

	function setMode(next: PickerMode): void {
		mode = next;
	}
</script>

<div class="overlay" class:dialog>
	{#if !dialog}
		<header class="header">
			<button type="button" class="back-btn" onclick={onBack}>
				{i18n.t('flow.back')}
			</button>
			<h2 class="title">{title}</h2>
		</header>
	{/if}

	{#if SHOW_HEXAGRAM_LIST_PICKER}
		<header class="header mode-header">
			<div class="mode-switch" role="tablist" aria-label={title}>
				<button
					type="button"
					class="mode-btn"
					class:active={mode === 'list'}
					role="tab"
					aria-selected={mode === 'list'}
					onclick={() => setMode('list')}
				>
					{i18n.t('flow.pickerList')}
				</button>
				<button
					type="button"
					class="mode-btn"
					class:active={mode === 'trigram'}
					role="tab"
					aria-selected={mode === 'trigram'}
					onclick={() => setMode('trigram')}
				>
					{i18n.t('flow.pickerTrigram')}
				</button>
			</div>
		</header>
	{/if}

	{#if SHOW_HEXAGRAM_LIST_PICKER && mode === 'list'}
		<HexagramSelectView {title} {value} {onSelect} onBack={onBack} embedded />
	{:else}
		<HexagramTrigramSelectView {value} {onSelect} />
	{/if}
</div>

<style>
	.overlay {
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.overlay.dialog {
		gap: 0.5rem;
	}

	.header {
		flex-shrink: 0;
		margin-bottom: 0.5rem;
	}

	.back-btn {
		padding: 0.35rem 0;
		margin-bottom: 0.35rem;
		border: none;
		background: none;
		color: var(--text-muted);
		font: inherit;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.back-btn:hover {
		color: var(--text);
	}

	.back-btn:focus {
		outline: none;
	}

	.title {
		margin: 0;
		font-family: var(--font-serif);
		font-size: 1.15rem;
		font-weight: 500;
		color: var(--text);
	}

	.mode-header {
		margin-bottom: 0.5rem;
	}

	.mode-switch {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.35rem;
	}

	.mode-btn {
		padding: 0.5rem 0.35rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-elevated);
		color: var(--text-muted);
		font: inherit;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.mode-btn.active {
		border-color: var(--accent-dim);
		background: rgba(196, 165, 116, 0.12);
		color: var(--text);
	}

	.mode-btn:focus {
		outline: none;
	}

	.overlay:not(.dialog) > :global(.select-view.embedded),
	.overlay:not(.dialog) > :global(.trigram-view) {
		flex: 1;
		min-height: 0;
	}

	.overlay.dialog > :global(.trigram-view .rows) {
		justify-content: flex-start;
	}

	.overlay.dialog :global(.symbol) {
		font-size: clamp(1.2rem, 4vw, 1.65rem);
	}
</style>
