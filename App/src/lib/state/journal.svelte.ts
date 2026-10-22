import type { Casting, JournalSnapshot } from '$lib/i-ching/types';
import {
	loadJournalEntries,
	loadJournalTombstones,
	saveJournalEntry,
	deleteJournalEntries,
	replaceJournal
} from '$lib/storage';

class JournalStore {
	entries = $state<Casting[]>([]);
	/** True once the saved journal has been read, so "empty" is known to be real. */
	loaded = $state(false);

	/** Set by the sync controller; fired after user-initiated mutations only. */
	#onMutate: (() => void) | null = null;

	setMutationListener(fn: (() => void) | null): void {
		this.#onMutate = fn;
	}

	async load(): Promise<void> {
		this.entries = await loadJournalEntries();
		this.loaded = true;
	}

	async save(casting: Casting): Promise<void> {
		await saveJournalEntry(casting);
		this.entries = await loadJournalEntries();
		this.#onMutate?.();
	}

	async deleteByIds(ids: string[]): Promise<void> {
		if (ids.length === 0) return;
		await deleteJournalEntries(ids);
		this.entries = await loadJournalEntries();
		this.#onMutate?.();
	}

	async snapshot(): Promise<JournalSnapshot> {
		return { entries: this.entries, tombstones: await loadJournalTombstones() };
	}

	/** Apply a merged snapshot from sync. Does not fire the mutation listener. */
	async applyMerged(snapshot: JournalSnapshot): Promise<void> {
		await replaceJournal(snapshot.entries, snapshot.tombstones);
		this.entries = await loadJournalEntries();
	}
}

export const journalStore = new JournalStore();
