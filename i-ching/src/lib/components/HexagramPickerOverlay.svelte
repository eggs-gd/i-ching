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
	}

	let { title, value = null, onSelect, onBack }: Props = $props();

	const i18n = useI18n();
	let mode = $state<PickerMode>(SHOW_HEXAGRAM_LIST_PICKER ? 'list' : 'trigram');

	function setMode(next: PickerMode): void {
		mode = next;
	}
</script>

<div class="overlay">
	<header class="header">
		<button type="button" class="back-btn" onclick={onBack}>
			{i18n.t('flow.back')}
		</button>
		<h2 class="title">{title}</h2>

		{#if SHOW_HEXAGRAM_LIST_PICKER}
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
		{/if}
	</header>

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
		height: 100%;
		min-height: 0;
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

	.header:has(.mode-switch) .title {
		margin-bottom: 0.65rem;
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

	.overlay > :global(.select-view.embedded),
	.overlay > :global(.trigram-view) {
		flex: 1;
		min-height: 0;
	}
</style>
