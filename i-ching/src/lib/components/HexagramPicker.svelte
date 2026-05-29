<script lang="ts">
	import { getHexagramList } from '$lib/i-ching/catalog';
	import { Chevron, FieldLabel } from '$lib/components/ui';
	import { HexagramFontIcon } from '$lib/components/primitives';
	import { useI18n } from '$lib/i18n';

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
	<FieldLabel size="compact">{label}</FieldLabel>

	<div class="picker-row">
		<button type="button" class="trigger" onclick={onOpen}>
			{#if selected}
				<HexagramFontIcon number={selected.number} label={selected.name} compact />
				<span class="trigger-text">
					<span class="trigger-num">{selected.number}</span>
					<span class="trigger-name">{selected.name}</span>
				</span>
			{:else}
				<span class="placeholder">{placeholderText}</span>
			{/if}
			<Chevron direction="forward" />
		</button>

		{#if selected}
			<button
				type="button"
				class="clear-btn"
				aria-label={i18n.t('flow.clearHexagram')}
				onclick={clearSelection}
			>
				×
			</button>
		{/if}
	</div>
</div>

<style>
	.picker {
		min-width: 0;
	}

	.picker-row {
		display: flex;
		align-items: stretch;
		gap: var(--space-2);
	}

	.trigger {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3);
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
		gap: var(--space-2);
	}

	.trigger-num {
		font-family: var(--font-serif);
		color: var(--accent-dim);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
		font-size: var(--text-sm);
	}

	.trigger-name {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: var(--text-sm);
		color: var(--text);
	}

	.placeholder {
		flex: 1;
		font-size: var(--text-sm);
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
</style>
