import type { Casting } from '$lib/i-ching/types';

export interface JournalRepository {
	ensureReady(): Promise<void>;
	loadAll(): Promise<Casting[]>;
	save(casting: Casting): Promise<void>;
	deleteByIds(ids: string[]): Promise<void>;
}

export const JOURNAL_STORAGE_KEY = 'i-ching-journal';
export const JOURNAL_MIGRATED_KEY = 'journal_migrated';
