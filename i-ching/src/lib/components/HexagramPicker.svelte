<script lang="ts">
	import { getHexagramList } from '$lib/data/hexagram-db';
	import { useI18n } from '$lib/i18n';
	import HexagramIcon from './HexagramIcon.svelte';

	interface Props {
		label: string;
		value?: number | null;
		placeholder?: string;
		onOpen: () => void;
		onClear: () => void;
	}

	let { label, value = null, placeholder, onOpen, onClear }: Props = $props();

	const i18n = useI18n();

	const hexagrams = $derived(getHexagramList(i18n.locale));
	const selected = $derived(
		value !== null && value !== undefined ? hexagrams.find((hex) => hex.number === value) : null
	);
	const placeholderText = $derived(placeholder ?? i18n.t('flow.selectHexagram'));

	function clearSelection(event: MouseEvent): void {
		event.stopPropagation();
		onClear();
	}
</script>

<div class="picker">
	<span class="picker-label">{label}</span>

	<div class="picker-row">
		<button type="button" class="trigger" onclick={onOpen}>
			{#if selected}
				<HexagramIcon number={selected.number} />
				<span class="trigger-text">
					<span class="trigger-num">{selected.number}</span>
					<span class="trigger-name">{selected.name}</span>
				</span>
			{:else}
				<span class="placeholder">{placeholderText}</span>
			{/if}
			<span class="chevron" aria-hidden="true"></span>
		</button>

		{#if selected}
			<button type="button" class="clear-btn" aria-label={i18n.t('flow.clearHexagram')} onclick={clearSelection}>
				×
			</button>
		{/if}
	</div>
</div>

<style>
	.picker {
		min-width: 0;
	}

	.picker-label {
		display: block;
		margin-bottom: 0.35rem;
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}

	.picker-row {
		display: flex;
		align-items: stretch;
		gap: 0.35rem;
	}

	.trigger {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.55rem 0.65rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-elevated);
		color: var(--text);
		font: inherit;
		text-align: left;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.trigger:focus {
		outline: none;
		border-color: var(--accent-dim);
	}

	.trigger-text {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: baseline;
		gap: 0.45rem;
	}

	.trigger-num {
		font-family: var(--font-serif);
		color: var(--accent-dim);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
		font-size: 0.95rem;
	}

	.trigger-name {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.85rem;
		color: var(--text);
	}

	.placeholder {
		flex: 1;
		font-size: 0.85rem;
		color: var(--text-faint);
	}

	.clear-btn {
		flex-shrink: 0;
		width: 2.25rem;
		align-self: stretch;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-elevated);
		color: var(--text-muted);
		font-size: 1.1rem;
		line-height: 1;
		cursor: pointer;
	}

	.clear-btn:hover {
		color: var(--text);
	}

	.clear-btn:focus {
		outline: none;
	}

	.chevron {
		flex-shrink: 0;
		width: 0.45rem;
		height: 0.45rem;
		border-right: 1.5px solid var(--text-faint);
		border-bottom: 1.5px solid var(--text-faint);
		transform: rotate(-45deg);
	}
</style>
