<script lang="ts">
	import { resolveHexagram } from '$lib/data/hexagram-db';
	import type { Casting } from '$lib/i-ching/types';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import AppPopup from './AppPopup.svelte';

	interface Props {
		open: boolean;
		journal: Casting[];
		onClose: () => void;
		onDelete: (ids: string[]) => Promise<void>;
	}

	let { open, journal, onClose, onDelete }: Props = $props();

	const i18n = useI18n();
	const dateLocale = $derived(getLocaleDateFormat(i18n.locale));

	let selected = $state<Set<string>>(new Set());
	let deleting = $state(false);

	const selectedCount = $derived(selected.size);
	const allSelected = $derived(
		journal.length > 0 && selectedCount === journal.length
	);

	function closeArchive(): void {
		selected = new Set();
		deleting = false;
		onClose();
	}

	$effect(() => {
		if (open) {
			selected = new Set();
			deleting = false;
		}
	});

	function formatEntryTime(iso: string): string {
		return new Date(iso).toLocaleString(dateLocale, {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function hexLabel(entry: Casting): string {
		const primary = resolveHexagram(entry.primaryNumber, i18n.locale);
		const relating = entry.relatingNumber
			? resolveHexagram(entry.relatingNumber, i18n.locale)
			: null;
		if (relating) {
			return `${primary.number} ${primary.name} → ${relating.number} ${relating.name}`;
		}
		return `${primary.number} ${primary.name}`;
	}

	function toggleEntry(id: string): void {
		const next = new Set(selected);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		selected = next;
	}

	function toggleAll(): void {
		selected = allSelected ? new Set() : new Set(journal.map((entry) => entry.id));
	}

	async function deleteSelected(): Promise<void> {
		if (selectedCount === 0 || deleting) return;
		deleting = true;
		try {
			await onDelete([...selected]);
			closeArchive();
		} finally {
			deleting = false;
		}
	}
</script>

<AppPopup
	{open}
	title={i18n.t('profile.archiveTitle')}
	titleId="journal-archive-popup"
	bodyClass="journal-archive"
	scrollable
	onClose={closeArchive}
>
	{#snippet children()}
		{#if journal.length === 0}
			<p class="journal-archive__empty">{i18n.t('profile.archiveEmpty')}</p>
		{:else}
			<button
				type="button"
				class="journal-archive__select-all"
				class:active={allSelected}
				aria-pressed={allSelected}
				onclick={toggleAll}
			>
				{i18n.t('profile.selectAll')}
			</button>

			<ul class="journal-archive__list">
				{#each journal as entry (entry.id)}
					<li>
						<button
							type="button"
							class="journal-archive__entry"
							class:active={selected.has(entry.id)}
							aria-pressed={selected.has(entry.id)}
							onclick={() => toggleEntry(entry.id)}
						>
							<span class="journal-archive__head">
								<span
									class="journal-archive__q"
									class:journal-archive__q--empty={!entry.question.trim()}
								>
									{entry.question.trim() || '—'}
								</span>
								<time class="journal-archive__time" datetime={entry.createdAt}>
									{formatEntryTime(entry.createdAt)}
								</time>
							</span>
							<span class="journal-archive__hex">{hexLabel(entry)}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	{/snippet}

	{#snippet footer()}
		<button
			type="button"
			class="popup-action popup-action--danger"
			disabled={selectedCount === 0 || deleting || journal.length === 0}
			onclick={() => void deleteSelected()}
		>
			{i18n.t('profile.deleteSelected', { count: selectedCount })}
		</button>
	{/snippet}
</AppPopup>

<style>
	:global(.journal-archive) {
		display: block;
	}

	:global(.journal-archive__empty) {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	:global(.journal-archive__select-all) {
		display: block;
		width: 100%;
		margin-bottom: 0.5rem;
		padding: 0.5rem 0;
		border: none;
		border-bottom: 1px solid var(--border);
		background: none;
		font: inherit;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		text-align: left;
		color: var(--text-faint);
		cursor: pointer;
		transition: color 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	:global(.journal-archive__select-all:hover),
	:global(.journal-archive__select-all.active) {
		color: var(--text);
	}

	:global(.journal-archive__select-all.active) {
		color: var(--accent);
	}

	:global(.journal-archive__select-all:focus) {
		outline: none;
	}

	:global(.journal-archive__list) {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	:global(.journal-archive__list li) {
		border-bottom: 1px solid var(--border);
	}

	:global(.journal-archive__list li:last-child) {
		border-bottom: none;
	}

	:global(.journal-archive__entry) {
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
		-webkit-tap-highlight-color: transparent;
	}

	:global(.journal-archive__entry:hover),
	:global(.journal-archive__entry.active) {
		color: var(--text);
	}

	:global(.journal-archive__entry.active .journal-archive__hex) {
		color: var(--accent);
	}

	:global(.journal-archive__entry:focus) {
		outline: none;
	}

	:global(.journal-archive__head) {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}

	:global(.journal-archive__q) {
		flex: 1;
		min-width: 0;
		font-size: 0.85rem;
		color: var(--text-soft);
		line-height: 1.35;
	}

	:global(.journal-archive__q--empty) {
		color: var(--text-faint);
	}

	:global(.journal-archive__entry.active .journal-archive__q) {
		color: var(--text);
	}

	:global(.journal-archive__time) {
		flex-shrink: 0;
		font-size: 0.7rem;
		color: var(--text-faint);
		white-space: nowrap;
	}

	:global(.journal-archive__hex) {
		font-family: var(--font-serif);
		font-size: 0.8rem;
		color: var(--text-muted);
		line-height: 1.3;
	}
</style>
