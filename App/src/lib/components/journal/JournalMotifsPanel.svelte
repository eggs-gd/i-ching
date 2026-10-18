<script lang="ts">
	import type { Hexagram } from '$lib/i-ching/types';
	import { DisclosurePanel } from '$lib/components/ui';
	import { useI18n } from '$lib/i18n';
	import { HexagramFontIcon } from '$lib/components/primitives';

	export interface JournalMotifItem {
		hexagram: Hexagram;
		count: number;
	}

	interface Props {
		motifs: JournalMotifItem[];
		activeMotifNumber?: number | null;
		onMotifSelect: (hexagramNumber: number) => void;
	}

	let { motifs, activeMotifNumber = null, onMotifSelect }: Props = $props();

	const i18n = useI18n();
</script>

{#if motifs.length > 1}
	<div class="motifs">
		<DisclosurePanel title={i18n.t('journal.motifs')} titleColor="faint">
			<ul class="motifs-list">
				{#each motifs as { hexagram, count } (hexagram.number)}
					<li>
						<button
							type="button"
							class="motif-btn"
							class:active={activeMotifNumber === hexagram.number}
							aria-label={i18n.t('journal.openMotif', { name: hexagram.name })}
							onclick={() => onMotifSelect(hexagram.number)}
						>
							<span class="motif-num">{hexagram.number}</span>
							<HexagramFontIcon number={hexagram.number} label={hexagram.name} compact />
							<span class="motif-name">{hexagram.name}</span>
							<span class="motif-count">×{count}</span>
						</button>
					</li>
				{/each}
			</ul>
		</DisclosurePanel>
	</div>
{/if}

<style>
	.motifs {
		margin-bottom: var(--space-5);
	}

	.motifs-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.motifs-list li {
		border-bottom: 1px solid var(--border);
	}

	.motifs-list li:last-child {
		border-bottom: none;
	}

	.motif-btn {
		width: 100%;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) 0;
		border: none;
		background: none;
		color: var(--text-muted);
		font: inherit;
		font-size: var(--text-base);
		text-align: left;
		cursor: pointer;
		transition: var(--transition);
		-webkit-tap-highlight-color: transparent;
	}

	.motif-btn:hover,
	.motif-btn.active {
		color: var(--text);
	}

	.motif-btn:focus {
		outline: none;
	}

	.motif-btn.active .motif-num,
	.motif-btn.active .motif-name {
		color: var(--accent);
	}

	.motif-num {
		font-family: var(--font-serif);
		color: var(--accent-dim);
		min-width: 1.5rem;
		flex-shrink: 0;
	}

	.motif-name {
		flex: 1;
		min-width: 0;
		font-family: var(--font-serif);
	}

	.motif-count {
		margin-left: auto;
		font-size: var(--text-sm);
		color: var(--text-faint);
		flex-shrink: 0;
	}
</style>
