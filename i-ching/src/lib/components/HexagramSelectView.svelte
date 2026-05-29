<script lang="ts">
	import { getHexagramList } from '$lib/data/hexagram-db';
	import type { Hexagram } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';
	import HexagramIcon from './HexagramIcon.svelte';

	interface Props {
		title: string;
		value?: number | null;
		onSelect: (number: number) => void;
		onBack: () => void;
		/** Hide header when used inside HexagramPickerOverlay */
		embedded?: boolean;
	}

	let { title, value = null, onSelect, onBack, embedded = false }: Props = $props();

	const i18n = useI18n();
	const hexagrams = $derived(getHexagramList(i18n.locale));

	function choose(hex: Hexagram): void {
		onSelect(hex.number);
	}
</script>

<div class="select-view" class:embedded>
	{#if !embedded}
		<header class="header">
			<button type="button" class="back-btn" onclick={onBack}>
				{i18n.t('flow.back')}
			</button>
			<h2 class="title">{title}</h2>
		</header>
	{/if}

	<ul class="list" role="listbox" aria-label={title}>
		{#each hexagrams as hex (hex.number)}
			<li role="presentation">
				<button
					type="button"
					class="option"
					class:selected={value === hex.number}
					role="option"
					aria-selected={value === hex.number}
					onclick={() => choose(hex)}
				>
					<HexagramIcon number={hex.number} />
					<span class="option-num">{hex.number}</span>
					<span class="option-name">{hex.name}</span>
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.select-view {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
	}

	.select-view.embedded {
		flex: 1;
		min-height: 0;
	}

	.header {
		flex-shrink: 0;
		margin-bottom: 0.75rem;
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

	.list {
		flex: 1;
		min-height: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		border-top: 1px solid var(--border);
	}

	.embedded .list {
		border-top: none;
	}

	.option {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 0;
		border: none;
		border-bottom: 1px solid var(--border);
		background: none;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.option:hover,
	.option.selected {
		background: rgba(196, 165, 116, 0.08);
	}

	.option:focus {
		outline: none;
		background: rgba(196, 165, 116, 0.12);
	}

	.option-num {
		width: 1.5rem;
		font-family: var(--font-serif);
		font-size: 0.95rem;
		color: var(--accent-dim);
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}

	.option-name {
		flex: 1;
		min-width: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.option.selected .option-name {
		color: var(--text);
	}
</style>
