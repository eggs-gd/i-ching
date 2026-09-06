import type { Casting, Tombstone } from '$lib/i-ching/types';

export interface JournalRepository {
	ensureReady(): Promise<void>;
	loadAll(): Promise<Casting[]>;
	loadTombstones(): Promise<Tombstone[]>;
	save(casting: Casting): Promise<void>;
	/** User-initiated delete: removes the entries and records fresh tombstones. */
	deleteByIds(ids: string[]): Promise<void>;
	/** Wholesale replace of both sets — used by sync after a merge. */
	replace(entries: Casting[], tombstones: Tombstone[]): Promise<void>;
}

export const JOURNAL_STORAGE_KEY = 'i-ching-journal';
export const JOURNAL_TOMBSTONES_KEY = 'i-ching-tombstones';
export const JOURNAL_MIGRATED_KEY = 'journal_migrated';

/** Union by id, keeping the earliest `deletedAt`. */
export function mergeTombstones(...lists: Tombstone[][]): Tombstone[] {
	const byId = new Map<string, Tombstone>();
	for (const list of lists) {
		for (const t of list) {
			const prev = byId.get(t.id);
			if (!prev || t.deletedAt < prev.deletedAt) byId.set(t.id, t);
		}
	}
	return [...byId.values()];
}
