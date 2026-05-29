<script lang="ts">
	import { resolveHexagram } from '$lib/i-ching/catalog';
	import { getRecurringMotifs, groupJournalEntries } from '$lib/i-ching/journal';
	import type { Casting } from '$lib/i-ching/types';
	import { SHOW_PAID_FEATURE_STUBS } from '$lib/config/features';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
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
	let visibleCount = $state(PAGE_SIZE);
	let loadMoreEl = $state<HTMLElement | null>(null);

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

		<JournalMotifsPanel
			motifs={topMotifs}
			{activeMotifNumber}
			onMotifSelect={onMotifSelect}
		/>

		<JournalEntriesGrouped
			grouped={groupedEntries}
			{activeCastingId}
			onEntrySelect={onEntrySelect}
		/>

		{#if hasMore}
			<div class="load-more" bind:this={loadMoreEl} aria-hidden="true"></div>
		{/if}
	</aside>
{/if}

<style>
	.journal {
		margin-top: var(--space-7);
		padding-top: var(--space-6);
		border-top: 1px solid var(--border);
	}

	.journal h2 {
		font-size: var(--text-xl);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--text-muted);
		margin-bottom: var(--space-3);
	}

	.track-form-action {
		margin-bottom: var(--space-5);
	}

	.load-more {
		height: 1px;
		margin-top: var(--space-2);
	}
</style>
