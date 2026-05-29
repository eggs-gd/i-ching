import { Capacitor } from '@capacitor/core';
import type { Casting } from '$lib/i-ching/types';
import { LocalJournalRepository } from './journal-local';
import { SqliteJournalRepository } from './journal-sqlite';
import type { JournalRepository } from './journal-repository';

let repository: JournalRepository | null = null;

function getRepository(): JournalRepository {
	if (!repository) {
		repository = Capacitor.isNativePlatform()
			? new SqliteJournalRepository()
			: new LocalJournalRepository();
	}
	return repository;
}

export async function ensureJournalReady(): Promise<void> {
	await getRepository().ensureReady();
}

export async function loadJournalEntries(): Promise<Casting[]> {
	await ensureJournalReady();
	return getRepository().loadAll();
}

export async function saveJournalEntry(casting: Casting): Promise<void> {
	await ensureJournalReady();
	await getRepository().save(casting);
}

export async function deleteJournalEntries(ids: string[]): Promise<void> {
	await ensureJournalReady();
	await getRepository().deleteByIds(ids);
}
