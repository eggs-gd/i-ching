<script lang="ts">
	import { resolveHexagram } from '$lib/i-ching/catalog';
	import type { Casting } from '$lib/i-ching/types';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import { AppButton, AppPopup } from '$lib/components/ui';

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
	const allSelected = $derived(journal.length > 0 && selectedCount === journal.length);

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
			selected = new Set();
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
			<AppButton
				variant="text"
				fullWidth
				pressed={allSelected}
				class="journal-archive__select-all"
				onclick={toggleAll}
			>
				{i18n.t('profile.selectAll')}
			</AppButton>

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
		<AppButton
			variant="danger"
			disabled={selectedCount === 0 || deleting || journal.length === 0}
			onclick={() => void deleteSelected()}
		>
			{i18n.t('profile.deleteSelected', { count: selectedCount })}
		</AppButton>
	{/snippet}
</AppPopup>

<style>
	:global(.journal-archive) {
		display: block;
	}

	:global(.journal-archive__empty) {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--text-muted);
	}

	:global(.journal-archive__select-all) {
		margin-bottom: var(--space-2);
		border-bottom: 1px solid var(--border);
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
		padding: var(--space-3) 0;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		display: grid;
		gap: var(--space-2);
		text-align: left;
		transition: var(--transition);
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
		gap: var(--space-3);
	}

	:global(.journal-archive__q) {
		flex: 1;
		min-width: 0;
		font-size: var(--text-base);
		color: var(--text-soft);
		line-height: var(--leading-tight);
	}

	:global(.journal-archive__q--empty) {
		color: var(--text-faint);
	}

	:global(.journal-archive__entry.active .journal-archive__q) {
		color: var(--text);
	}

	:global(.journal-archive__time) {
		flex-shrink: 0;
		font-size: var(--text-sm);
		color: var(--text-faint);
		white-space: nowrap;
	}

	:global(.journal-archive__hex) {
		font-family: var(--font-serif);
		font-size: var(--text-sm);
		color: var(--text-muted);
		line-height: 1.3;
	}
</style>
