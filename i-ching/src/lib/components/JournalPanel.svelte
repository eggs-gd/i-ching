<script lang="ts">
	import { resolveHexagram } from '$lib/data/hexagram-db';
	import { getRecurringMotifs } from '$lib/i-ching/journal';
	import type { Casting, Hexagram } from '$lib/i-ching/types';
	import { SHOW_PAID_FEATURE_STUBS } from '$lib/config/features';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import DisclosurePanel from './DisclosurePanel.svelte';
	import PaidFeaturePopup from './PaidFeaturePopup.svelte';

	const PAGE_SIZE = 20;

	interface Props {
		journal: Casting[];
		activeCastingId?: string | null;
		activeMotifNumber?: number | null;
		onEntrySelect: (entry: Casting) => void;
		onMotifSelect: (hexagramNumber: number) => void;
	}

	let {
		journal,
		activeCastingId = null,
		activeMotifNumber = null,
		onEntrySelect,
		onMotifSelect
	}: Props = $props();

	const i18n = useI18n();
	let visibleCount = $state(PAGE_SIZE);
	let loadMoreEl = $state<HTMLElement | null>(null);

	const visibleEntries = $derived(journal.slice(0, visibleCount));
	const hasMore = $derived(visibleCount < journal.length);

	$effect(() => {
		const len = journal.length;
		if (visibleCount > len) {
			visibleCount = len;
		} else if (len > 0 && visibleCount === 0) {
			visibleCount = Math.min(PAGE_SIZE, len);
		}
	});

	function loadMoreEntries(): void {
		visibleCount = Math.min(visibleCount + PAGE_SIZE, journal.length);
	}

	$effect(() => {
		if (!loadMoreEl || !hasMore) return;

		const sentinel = loadMoreEl;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					loadMoreEntries();
				}
			},
			{ rootMargin: '240px' }
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	});
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

		{#if SHOW_PAID_FEATURE_STUBS}
			<div class="track-form-action">
				<PaidFeaturePopup
					triggerLabel={i18n.t('journal.trackForm')}
					popupTitle={i18n.t('journal.trackForm')}
					body={i18n.t('journal.trackFormPaidBody')}
					closeLabel={i18n.t('reading.helpClose')}
				/>
			</div>
		{/if}

		{#if topMotifs.length > 1}
			<div class="motifs">
				<DisclosurePanel title={i18n.t('journal.motifs')} titleColor="faint">
					<ul class="motifs-list">
						{#each topMotifs as { hexagram, count }}
							<li>
								<button
									type="button"
									class="motif-btn"
									class:active={activeMotifNumber === hexagram.number}
									aria-label={i18n.t('journal.openMotif', { name: hexagram.name })}
									onclick={() => onMotifSelect(hexagram.number)}
								>
									<span class="motif-num">{hexagram.number}</span>
									<span class="motif-name">{hexagram.name}</span>
									<span class="motif-count">×{count}</span>
								</button>
							</li>
						{/each}
					</ul>
				</DisclosurePanel>
			</div>
		{/if}

		<ul class="entries">
			{#each visibleEntries as entry}
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

		{#if hasMore}
			<div class="load-more" bind:this={loadMoreEl} aria-hidden="true"></div>
		{/if}
	</aside>
{/if}

<style>
	.journal {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
	}

	.journal h2 {
		font-size: 1.2rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		margin-bottom: 0.75rem;
	}

	.track-form-action {
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
		border-bottom: 1px solid var(--border);
	}

	.motifs-list li:last-child {
		border-bottom: none;
	}

	.motif-btn {
		width: 100%;
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.5rem 0;
		border: none;
		background: none;
		color: var(--text-muted);
		font: inherit;
		font-size: 0.85rem;
		text-align: left;
		cursor: pointer;
		transition: color 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.motif-btn:hover,
	.motif-btn.active {
		color: var(--text);
	}

	.motif-btn.active .motif-num,
	.motif-btn.active .motif-name {
		color: var(--accent);
	}

	.motif-btn:focus {
		outline: none;
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
	}

	.motif-count {
		margin-left: auto;
		font-size: 0.75rem;
		color: var(--text-faint);
		flex-shrink: 0;
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
		font-size: 0.9rem;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35rem;
	}

	.entry-arrow {
		color: var(--text-faint);
		font-size: 0.9rem;
	}

	.entry-q {
		font-size: 0.9rem;
		color: var(--text-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.load-more {
		height: 1px;
		margin-top: 0.5rem;
	}
</style>
