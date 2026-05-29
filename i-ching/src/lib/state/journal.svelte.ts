import type { Casting } from '$lib/i-ching/types';
import { loadJournalEntries, saveJournalEntry, deleteJournalEntries } from '$lib/storage';

class JournalStore {
	entries = $state<Casting[]>([]);

	async load(): Promise<void> {
		this.entries = await loadJournalEntries();
	}

	async save(casting: Casting): Promise<void> {
		await saveJournalEntry(casting);
		this.entries = await loadJournalEntries();
	}

	async deleteByIds(ids: string[]): Promise<void> {
		if (ids.length === 0) return;
		await deleteJournalEntries(ids);
		this.entries = await loadJournalEntries();
	}
}

export const journalStore = new JournalStore();
