import type { Casting, Tombstone } from '$lib/i-ching/types';
import { mergeTombstones, type JournalRepository } from './journal-repository';

/**
 * Session-only journal: lives in memory and is gone on reload. Used until the user allows saving,
 * so nothing is written to the device (not even locally).
 */
export class MemoryJournalRepository implements JournalRepository {
	#entries: Casting[] = [];
	#tombstones: Tombstone[] = [];

	async ensureReady(): Promise<void> {}

	async loadAll(): Promise<Casting[]> {
		return [...this.#entries];
	}

	async loadTombstones(): Promise<Tombstone[]> {
		return [...this.#tombstones];
	}

	async save(casting: Casting): Promise<void> {
		this.#entries.unshift(casting);
	}

	async deleteByIds(ids: string[]): Promise<void> {
		if (ids.length === 0) return;
		const remove = new Set(ids);
		const deletedAt = new Date().toISOString();
		this.#entries = this.#entries.filter((entry) => !remove.has(entry.id));
		this.#tombstones = mergeTombstones(
			this.#tombstones,
			ids.map((id) => ({ id, deletedAt }))
		);
	}

	async replace(entries: Casting[], tombstones: Tombstone[]): Promise<void> {
		this.#entries = [...entries];
		this.#tombstones = [...tombstones];
	}
}
