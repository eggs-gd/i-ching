<script lang="ts">
	import { resolveHexagram } from '$lib/data/hexagram-db';
	import { getRecurringMotifs } from '$lib/i-ching/journal';
	import type { Casting, Hexagram } from '$lib/i-ching/types';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import DisclosurePanel from './DisclosurePanel.svelte';

	interface Props {
		journal: Casting[];
		activeCastingId?: string | null;
		onEntrySelect: (entry: Casting) => void;
	}

	let { journal, activeCastingId = null, onEntrySelect }: Props = $props();

	const i18n = useI18n();
	const motifs = $derived(getRecurringMotifs(journal));
	const topMotifs = $derived(
		[...motifs.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(([num, count]) => ({
				hexagram: resolveHexagram(num, i18n.locale),
				count
			}))
	);

	function formatDate(iso: string) {
		return new Date(iso).toLocaleDateString(getLocaleDateFormat(i18n.locale), {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function hexagramLabel(hexagram: Hexagram) {
		return `${hexagram.number} ${hexagram.name}`;
	}
</script>

{#if journal.length > 0}
	<aside class="journal">
		<h2>{i18n.t('journal.title')}</h2>

		{#if topMotifs.length > 1}
			<div class="motifs">
				<DisclosurePanel title={i18n.t('journal.motifs')} titleColor="faint">
					<ul class="motifs-list">
						{#each topMotifs as { hexagram, count }}
							<li>
								<span class="motif-num">{hexagram.number}</span>
								{hexagram.name}
								<span class="motif-count">×{count}</span>
							</li>
						{/each}
					</ul>
				</DisclosurePanel>
			</div>
		{/if}

		<ul class="entries">
			{#each journal.slice(0, 10) as entry}
				{@const primary = resolveHexagram(entry.primaryNumber, i18n.locale)}
				{@const relating = entry.relatingNumber ? resolveHexagram(entry.relatingNumber, i18n.locale) : null}
				<li>
					<button
						type="button"
						class="entry-btn"
						class:active={activeCastingId === entry.id}
						aria-label={i18n.t('journal.openEntry')}
						onclick={() => onEntrySelect(entry)}
					>
						<time datetime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
						<span class="entry-hex">
							{hexagramLabel(primary)}
							{#if relating}
								<span class="entry-arrow" aria-hidden="true">→</span>
								{hexagramLabel(relating)}
							{/if}
						</span>
						<span class="entry-q">{entry.question}</span>
					</button>
				</li>
			{/each}
		</ul>
	</aside>
{/if}

<style>
	.journal {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
	}

	.journal h2 {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		margin-bottom: 1.5rem;
	}

	.motifs {
		margin-bottom: 1.5rem;
	}

	.motifs-list,
	.entries {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.motifs-list li {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-muted);
		padding: 0.35rem 0;
	}

	.motif-num {
		font-family: var(--font-serif);
		color: var(--accent-dim);
		min-width: 1.5rem;
	}

	.motif-count {
		margin-left: auto;
		font-size: 0.75rem;
		color: var(--text-faint);
	}

	.entries li {
		border-bottom: 1px solid var(--border);
	}

	.entry-btn {
		width: 100%;
		padding: 0.75rem 0;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		display: grid;
		gap: 0.2rem;
		text-align: left;
		transition: color 0.2s ease;
	}

	.entry-btn:hover,
	.entry-btn.active {
		color: var(--text);
	}

	.entry-btn.active .entry-hex {
		color: var(--accent);
	}

	time {
		font-size: 0.7rem;
		color: var(--text-faint);
	}

	.entry-hex {
		font-family: var(--font-serif);
		font-size: 0.95rem;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35rem;
	}

	.entry-arrow {
		color: var(--text-faint);
		font-size: 0.85rem;
	}

	.entry-q {
		font-size: 0.8rem;
		color: var(--text-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
