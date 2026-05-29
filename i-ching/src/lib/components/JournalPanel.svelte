<script lang="ts">
	import { resolveHexagram } from '$lib/data/hexagram-db';
	import { getRecurringMotifs, groupJournalEntries } from '$lib/i-ching/journal';
	import type { Casting, Hexagram } from '$lib/i-ching/types';
	import { SHOW_PAID_FEATURE_STUBS } from '$lib/config/features';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import DisclosurePanel from './DisclosurePanel.svelte';
	import HexagramFontIcon from './HexagramFontIcon.svelte';
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
	const groupedEntries = $derived(
		groupJournalEntries(visibleEntries, getLocaleDateFormat(i18n.locale))
	);
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

	const dateLocale = $derived(getLocaleDateFormat(i18n.locale));

	function formatEntryTime(iso: string): string {
		return new Date(iso).toLocaleTimeString(dateLocale, {
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

{#snippet hexagramAnswer(hexagram: Hexagram)}
	<span class="entry-hex-row">
		<span class="entry-num">{hexagram.number}</span>
		<HexagramFontIcon number={hexagram.number} label={hexagram.name} compact />
		<span class="entry-name">{hexagram.name}</span>
	</span>
{/snippet}

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

		<div class="entries-grouped">
			{#each groupedEntries as year (year.key)}
				<section class="group-year" aria-labelledby="journal-year-{year.key}">
					<h3 class="group-year-label" id="journal-year-{year.key}">{year.label}</h3>
					{#each year.months as month (month.key)}
						<section class="group-month" aria-labelledby="journal-month-{month.key}">
							<h4 class="group-month-label" id="journal-month-{month.key}">{month.label}</h4>
							{#each month.days as day (day.key)}
								<section class="group-day" aria-labelledby="journal-day-{day.key}">
									<h5 class="group-day-label" id="journal-day-{day.key}">{day.label}</h5>
									<ul class="entries">
										{#each day.entries as entry (entry.id)}
											{@const primary = resolveHexagram(entry.primaryNumber, i18n.locale)}
											{@const relating = entry.relatingNumber
												? resolveHexagram(entry.relatingNumber, i18n.locale)
												: null}
											<li>
												<button
													type="button"
													class="entry-btn"
													class:active={activeCastingId === entry.id}
													aria-label={i18n.t('journal.openEntry')}
													onclick={() => onEntrySelect(entry)}
												>
													<div class="entry-head">
														<span
															class="entry-q"
															class:entry-q-empty={!entry.question.trim()}
														>
															{entry.question.trim() || '\u2014'}
														</span>
														<time class="entry-time" datetime={entry.createdAt}>
															{formatEntryTime(entry.createdAt)}
														</time>
													</div>
													<span class="entry-answer">
														{@render hexagramAnswer(primary)}
														{#if relating}
															<span class="entry-arrow" aria-hidden="true">→</span>
															{@render hexagramAnswer(relating)}
														{/if}
													</span>
												</button>
											</li>
										{/each}
									</ul>
								</section>
							{/each}
						</section>
					{/each}
				</section>
			{/each}
		</div>

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

	.entries-grouped {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.group-year,
	.group-month,
	.group-day {
		margin: 0;
	}

	.group-year-label,
	.group-month-label,
	.group-day-label {
		margin: 0;
		font-weight: 400;
	}

	.group-year-label {
		font-family: var(--font-serif);
		font-size: 1.35rem;
		color: var(--text-muted);
		letter-spacing: 0.04em;
		margin-bottom: 1rem;
	}

	.group-month {
		margin-bottom: 1.25rem;
	}

	.group-month:last-child {
		margin-bottom: 0;
	}

	.group-month-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-faint);
		margin-bottom: 0.65rem;
	}

	.group-day {
		margin-bottom: 1rem;
	}

	.group-day:last-child {
		margin-bottom: 0;
	}

	.group-day-label {
		font-family: var(--font-serif);
		font-size: 0.95rem;
		color: var(--text-muted);
		margin-bottom: 0.25rem;
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
		font-family: var(--font-serif);
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
		gap: 0.35rem;
		text-align: left;
		transition: color 0.2s ease;
	}

	.entry-btn:hover,
	.entry-btn.active {
		color: var(--text);
	}

	.entry-btn.active .entry-name {
		color: var(--accent);
	}

	.entry-btn.active .entry-num {
		color: var(--accent-dim);
	}

	.entry-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.entry-q {
		flex: 1;
		min-width: 0;
		text-align: left;
		font-size: 0.85rem;
		color: var(--text-soft);
		line-height: 1.35;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.entry-q-empty {
		color: var(--text-faint);
	}

	.entry-time {
		flex-shrink: 0;
		font-size: 0.7rem;
		color: var(--text-faint);
		white-space: nowrap;
	}

	.entry-answer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem 0.5rem;
		font-size: 0.95rem;
		color: var(--text-muted);
	}

	.entry-hex-row {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		min-width: 0;
	}

	.entry-num {
		font-family: var(--font-serif);
		color: var(--accent-dim);
		flex-shrink: 0;
	}

	.entry-name {
		font-family: var(--font-serif);
		min-width: 0;
	}

	.entry-arrow {
		color: var(--text-faint);
		font-size: 0.85rem;
	}

	.load-more {
		height: 1px;
		margin-top: 0.5rem;
	}
</style>
