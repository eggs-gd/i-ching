import { Capacitor } from '@capacitor/core';
import type { Casting, Tombstone } from '$lib/i-ching/types';
import { LocalJournalRepository } from './journal-local';
import { SqliteJournalRepository } from './journal-sqlite';
import { MemoryJournalRepository } from './journal-memory';
import type { JournalRepository } from './journal-repository';
import { hasStoredConsent } from '$lib/analytics';

let persistent: JournalRepository | null = null;
let memory: MemoryJournalRepository | null = null;

function getPersistent(): JournalRepository {
	if (!persistent) {
		persistent = Capacitor.isNativePlatform()
			? new SqliteJournalRepository()
			: new LocalJournalRepository();
	}
	return persistent;
}

/** Saves to the device only after the user allowed it; until then the journal is session-only. */
function getRepository(): JournalRepository {
	if (hasStoredConsent()) return getPersistent();
	memory ??= new MemoryJournalRepository();
	return memory;
}

/** Called when the user allows saving: moves what was written this session onto the device. */
export async function enablePersistence(): Promise<void> {
	if (!memory) return;
	const session = await memory.loadAll();
	const target = getPersistent();
	await target.ensureReady();
	// Oldest first, so the newest entry ends up on top.
	for (const entry of [...session].reverse()) await target.save(entry);
	memory = null;
}

export async function ensureJournalReady(): Promise<void> {
	await getRepository().ensureReady();
}

export async function loadJournalEntries(): Promise<Casting[]> {
	await ensureJournalReady();
	return getRepository().loadAll();
}

export async function loadJournalTombstones(): Promise<Tombstone[]> {
	await ensureJournalReady();
	return getRepository().loadTombstones();
}

export async function saveJournalEntry(casting: Casting): Promise<void> {
	await ensureJournalReady();
	await getRepository().save(casting);
}

export async function deleteJournalEntries(ids: string[]): Promise<void> {
	await ensureJournalReady();
	await getRepository().deleteByIds(ids);
}

/** Wholesale replace of the local journal after a sync merge. */
export async function replaceJournal(entries: Casting[], tombstones: Tombstone[]): Promise<void> {
	await ensureJournalReady();
	await getRepository().replace(entries, tombstones);
}
