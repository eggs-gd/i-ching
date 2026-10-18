<script lang="ts">
	import {
		TRIGRAM_ORDER,
		hexagramNumberFromTrigrams,
		resolveHexagram,
		trigramGlyph,
		trigramsForHexagramNumber
	} from '$lib/i-ching/catalog';
	import type { TrigramId } from '$lib/i-ching/types';
	import { FieldLabel } from '$lib/components/ui';
	import { HexagramFontIcon } from '$lib/components/primitives';
	import { useI18n } from '$lib/i18n';

	interface Props {
		value?: number | null;
		onSelect: (number: number) => void;
	}

	let { value = null, onSelect }: Props = $props();

	const i18n = useI18n();

	let selectedLower = $state<TrigramId | null>(null);
	let selectedUpper = $state<TrigramId | null>(null);

	$effect(() => {
		if (value === null || value === undefined) {
			selectedLower = null;
			selectedUpper = null;
			return;
		}

		const { lower, upper } = trigramsForHexagramNumber(value);
		selectedLower = lower;
		selectedUpper = upper;
	});

	const previewNumber = $derived(
		selectedLower && selectedUpper ? hexagramNumberFromTrigrams(selectedLower, selectedUpper) : null
	);

	const previewHexagram = $derived(
		previewNumber !== null ? resolveHexagram(previewNumber, i18n.locale) : null
	);

	function trigramName(id: TrigramId): string {
		return i18n.t(`trigrams.${id}`);
	}

	function pickLower(id: TrigramId): void {
		selectedLower = id;
		tryConfirm();
	}

	function pickUpper(id: TrigramId): void {
		selectedUpper = id;
		tryConfirm();
	}

	function tryConfirm(): void {
		if (!selectedLower || !selectedUpper) return;
		onSelect(hexagramNumberFromTrigrams(selectedLower, selectedUpper));
	}
</script>

<div class="trigram-view">
	{#if previewHexagram}
		<div class="preview">
			<HexagramFontIcon number={previewHexagram.number} label={previewHexagram.name} compact />
			<div class="preview-text">
				<span class="preview-num">{previewHexagram.number}</span>
				<span class="preview-name">{previewHexagram.name}</span>
			</div>
		</div>
	{/if}

	<div class="rows">
		<div class="row" role="group" aria-label={i18n.t('flow.upperTrigram')}>
			<FieldLabel size="row">{i18n.t('flow.upperTrigram')}</FieldLabel>
			<ul class="trigram-list">
				{#each TRIGRAM_ORDER as id}
					<li>
						<button
							type="button"
							class="trigram-btn"
							class:selected={selectedUpper === id}
							aria-pressed={selectedUpper === id}
							onclick={() => pickUpper(id)}
						>
							<span class="symbol" aria-hidden="true">{trigramGlyph(id)}</span>
							<span class="name">{trigramName(id)}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>

		<div class="row" role="group" aria-label={i18n.t('flow.lowerTrigram')}>
			<FieldLabel size="row">{i18n.t('flow.lowerTrigram')}</FieldLabel>
			<ul class="trigram-list">
				{#each TRIGRAM_ORDER as id}
					<li>
						<button
							type="button"
							class="trigram-btn"
							class:selected={selectedLower === id}
							aria-pressed={selectedLower === id}
							onclick={() => pickLower(id)}
						>
							<span class="symbol" aria-hidden="true">{trigramGlyph(id)}</span>
							<span class="name">{trigramName(id)}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.trigram-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		gap: var(--space-3);
	}

	.preview {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border);
	}

	.preview-text {
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
		min-width: 0;
	}

	.preview-num {
		font-family: var(--font-serif);
		font-size: var(--text-base);
		color: var(--accent-dim);
	}

	.preview-name {
		font-size: var(--text-sm);
		color: var(--text);
	}

	.rows {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--space-4);
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		min-width: 0;
	}

	.trigram-list {
		display: grid;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.trigram-list li {
		min-width: 0;
	}

	.trigram-btn {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-1);
		border: 1px solid transparent;
		border-radius: 2px;
		background: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition: var(--transition-interactive);
	}

	.trigram-btn:hover,
	.trigram-btn.selected {
		background: var(--fill-muted);
		border-color: var(--border);
	}

	.trigram-btn:focus {
		outline: none;
		background: var(--fill-strong);
	}

	.symbol {
		font-size: clamp(1.5rem, 5.5vw, 2.35rem);
		line-height: 1;
	}

	.name {
		font-size: clamp(0.5rem, 2.2vw, 0.6rem);
		color: var(--text-muted);
		text-align: center;
		line-height: 1.15;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	.trigram-btn.selected .name {
		color: var(--accent);
	}
</style>
