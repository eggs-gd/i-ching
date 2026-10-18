import { firebaseApp } from '$lib/firebase';
import type { Casting, JournalSnapshot, Tombstone } from '$lib/i-ching/types';

let modPromise: Promise<typeof import('firebase/database')> | null = null;
const mod = (): Promise<typeof import('firebase/database')> =>
	(modPromise ??= import('firebase/database'));

/** RTDB rejects objects containing `undefined`. Round-trip to drop them. */
function clean<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

export async function pullJournal(uid: string): Promise<JournalSnapshot> {
	const { getDatabase, ref, get } = await mod();
	const db = getDatabase(firebaseApp!);
	const snap = await get(ref(db, `journals/${uid}`));
	const value = (snap.val() ?? {}) as {
		entries?: Record<string, Casting>;
		tombstones?: Record<string, { deletedAt: string }>;
	};

	const entries = Object.values(value.entries ?? {});
	const tombstones: Tombstone[] = Object.entries(value.tombstones ?? {}).map(([id, t]) => ({
		id,
		deletedAt: t.deletedAt
	}));

	return { entries, tombstones };
}

export async function pushChanges(
	uid: string,
	changes: { entries: Casting[]; tombstones: Tombstone[] }
): Promise<void> {
	if (changes.entries.length === 0 && changes.tombstones.length === 0) return;

	const { getDatabase, ref, update } = await mod();
	const db = getDatabase(firebaseApp!);

	const patch: Record<string, unknown> = {};
	for (const entry of changes.entries) {
		patch[`journals/${uid}/entries/${entry.id}`] = clean(entry);
	}
	for (const tombstone of changes.tombstones) {
		patch[`journals/${uid}/tombstones/${tombstone.id}`] = { deletedAt: tombstone.deletedAt };
		patch[`journals/${uid}/entries/${tombstone.id}`] = null;
	}

	await update(ref(db), patch);
}
