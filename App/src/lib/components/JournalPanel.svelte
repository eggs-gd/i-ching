<script lang="ts">
	import { resolveHexagram } from '$lib/i-ching/catalog';
	import { getRecurringMotifs, groupJournalEntries } from '$lib/i-ching/journal';
	import type { Casting } from '$lib/i-ching/types';
	import { SHOW_PAID_FEATURE_STUBS } from '$lib/config/features';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import { track, trackVisible } from '$lib/analytics';
	import { journalStore } from '$lib/state/journal.svelte';
	import { InfoButton } from '$lib/components/ui';
	import HelpPopup from './HelpPopup.svelte';
	import JournalArchiveExport from './JournalArchiveExport.svelte';
	import JournalArchivePopup from './JournalArchivePopup.svelte';
	import JournalEntriesGrouped from './journal/JournalEntriesGrouped.svelte';
	import JournalMotifsPanel from './journal/JournalMotifsPanel.svelte';
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
	let journalHelpOpen = $state(false);
	let exportOpen = $state(false);
	let archiveOpen = $state(false);
	let visibleCount = $state(PAGE_SIZE);
	let loadMoreEl = $state<HTMLElement | null>(null);

	function openExport(): void {
		track('archive_export_opened');
		exportOpen = true;
	}

	function openArchive(): void {
		track('archive_opened');
		archiveOpen = true;
	}

	async function deleteEntries(ids: string[]): Promise<void> {
		track('archive_entries_deleted', { count: ids.length });
		await journalStore.deleteByIds(ids);
	}

	const visibleEntries = $derived(journal.slice(0, visibleCount));
	const groupedEntries = $derived(
		groupJournalEntries(visibleEntries, getLocaleDateFormat(i18n.locale))
	);
	const hasMore = $derived(visibleCount < journal.length);

	const topMotifs = $derived(
		[...getRecurringMotifs(journal).entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(([num, count]) => ({
				hexagram: resolveHexagram(num, i18n.locale),
				count
			}))
	);

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
</script>

{#if journal.length > 0}
	<aside class="journal" use:trackVisible={{ event: 'journal_panel_viewed', threshold: 0.3 }}>
		<div class="journal-head">
			<h2>{i18n.t('journal.title')}</h2>
			<div class="journal-head__actions">
				<button
					type="button"
					class="journal-action"
					aria-label={i18n.t('profile.export')}
					title={i18n.t('profile.export')}
					onclick={openExport}
				>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M12 15V4m0 0L8 8m4-4 4 4" />
						<path d="M5 13v6h14v-6" />
					</svg>
				</button>
				<button
					type="button"
					class="journal-action"
					aria-label={i18n.t('profile.clearArchive')}
					title={i18n.t('profile.clearArchive')}
					onclick={openArchive}
				>
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
					</svg>
				</button>
				<InfoButton label={i18n.t('journal.helpTitle')} onclick={() => (journalHelpOpen = true)} />
			</div>
		</div>

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

		<JournalMotifsPanel motifs={topMotifs} {activeMotifNumber} {onMotifSelect} />

		<JournalEntriesGrouped grouped={groupedEntries} {activeCastingId} {onEntrySelect} />

		{#if hasMore}
			<div class="load-more" bind:this={loadMoreEl} aria-hidden="true"></div>
		{/if}
	</aside>
{/if}

<HelpPopup
	open={journalHelpOpen}
	title={i18n.t('journal.helpTitle')}
	body={i18n.t('journal.helpBody')}
	closeLabel={i18n.t('reading.helpClose')}
	onClose={() => (journalHelpOpen = false)}
/>

<JournalArchiveExport open={exportOpen} {journal} onClose={() => (exportOpen = false)} />

<JournalArchivePopup
	open={archiveOpen}
	{journal}
	onClose={() => (archiveOpen = false)}
	onDelete={deleteEntries}
/>

<style>
	.journal {
		margin-top: var(--space-7);
		padding-top: var(--space-6);
		border-top: 1px solid var(--border);
	}

	.journal-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.journal-head__actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.journal-action {
		display: grid;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		flex-shrink: 0;
		-webkit-tap-highlight-color: transparent;
		transition: var(--transition);
	}

	.journal-action:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}

	.journal-action:focus {
		outline: none;
	}

	.journal-action svg {
		width: 0.85rem;
		height: 0.85rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.journal h2 {
		margin: 0;
		font-size: var(--text-xl);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--text-muted);
	}

	.track-form-action {
		margin-bottom: var(--space-5);
	}

	.load-more {
		height: 1px;
		margin-top: var(--space-2);
	}
</style>
