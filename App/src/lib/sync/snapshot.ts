import type { Casting, JournalSnapshot, Tombstone } from '$lib/i-ching/types';
import { mergeTombstones } from '$lib/storage/journal-repository';

/**
 * Merge two journal snapshots. Entries are write-once and keyed by UUID, so:
 * entries = union by id minus anything tombstoned; tombstones = union by id
 * (earliest `deletedAt` wins). Delete always beats a stray duplicate entry.
 */
export function mergeSnapshots(a: JournalSnapshot, b: JournalSnapshot): JournalSnapshot {
	const tombstones = mergeTombstones(a.tombstones, b.tombstones);
	const dead = new Set(tombstones.map((t) => t.id));

	const byId = new Map<string, Casting>();
	for (const entry of [...a.entries, ...b.entries]) {
		if (dead.has(entry.id) || byId.has(entry.id)) continue;
		byId.set(entry.id, entry);
	}

	const entries = [...byId.values()].sort((x, y) => y.createdAt.localeCompare(x.createdAt));
	return { entries, tombstones };
}

/** What `merged` contains that `remote` does not yet — the push payload. */
export function diffForRemote(
	remote: JournalSnapshot,
	merged: JournalSnapshot
): { entries: Casting[]; tombstones: Tombstone[] } {
	const knownEntries = new Set(remote.entries.map((e) => e.id));
	const knownTombstones = new Set(remote.tombstones.map((t) => t.id));
	return {
		entries: merged.entries.filter((e) => !knownEntries.has(e.id)),
		tombstones: merged.tombstones.filter((t) => !knownTombstones.has(t.id))
	};
}
