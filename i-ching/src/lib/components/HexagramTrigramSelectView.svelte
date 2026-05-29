<script lang="ts">
	import { resolveHexagram } from '$lib/data/hexagram-db';
	import {
		TRIGRAM_ORDER,
		hexagramNumberFromTrigrams,
		trigramSymbols,
		trigramsForHexagramNumber
	} from '$lib/i-ching/hexagram';
	import type { TrigramId } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';
	import HexagramIcon from './HexagramIcon.svelte';

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
		selectedLower && selectedUpper
			? hexagramNumberFromTrigrams(selectedLower, selectedUpper)
			: null
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
			<HexagramIcon number={previewHexagram.number} />
			<div class="preview-text">
				<span class="preview-num">{previewHexagram.number}</span>
				<span class="preview-name">{previewHexagram.name}</span>
			</div>
		</div>
	{/if}

	<div class="rows">
		<div class="row" role="group" aria-label={i18n.t('flow.upperTrigram')}>
			<h3 class="row-title">{i18n.t('flow.upperTrigram')}</h3>
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
							<span class="symbol" aria-hidden="true">{trigramSymbols[id]}</span>
							<span class="name">{trigramName(id)}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>

		<div class="row" role="group" aria-label={i18n.t('flow.lowerTrigram')}>
			<h3 class="row-title">{i18n.t('flow.lowerTrigram')}</h3>
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
							<span class="symbol" aria-hidden="true">{trigramSymbols[id]}</span>
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
		gap: 0.75rem;
	}

	.preview {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid var(--border);
	}

	.preview-text {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		min-width: 0;
	}

	.preview-num {
		font-family: var(--font-serif);
		font-size: 1rem;
		color: var(--accent-dim);
	}

	.preview-name {
		font-size: 0.9rem;
		color: var(--text);
	}

	.rows {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 0;
	}

	.row-title {
		flex-shrink: 0;
		margin: 0;
		font-size: 0.65rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
		text-align: center;
	}

	.trigram-list {
		display: grid;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		gap: 0.35rem;
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
		gap: 0.3rem;
		padding: 0.5rem 0.15rem;
		border: 1px solid transparent;
		border-radius: 2px;
		background: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.trigram-btn:hover,
	.trigram-btn.selected {
		background: rgba(196, 165, 116, 0.1);
		border-color: rgba(196, 165, 116, 0.25);
	}

	.trigram-btn:focus {
		outline: none;
		background: rgba(196, 165, 116, 0.14);
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
