import type { Casting, CoinValue } from './types';
import { coinRowsFromLines } from './coins';
import { loadJournalEntries, saveJournalEntry } from '$lib/storage';

export function getCastingCoinRows(casting: Casting): CoinValue[][] {
	if (casting.coinRows?.length) {
		return casting.coinRows.map((row) => [...row]);
	}

	return coinRowsFromLines(casting.lines, casting.id);
}

export async function loadJournal(): Promise<Casting[]> {
	return loadJournalEntries();
}

export async function saveCasting(casting: Casting): Promise<void> {
	await saveJournalEntry(casting);
}

export function getRecurringMotifs(journal: Casting[]): Map<number, number> {
	const counts = new Map<number, number>();

	for (const entry of journal) {
		counts.set(entry.primaryNumber, (counts.get(entry.primaryNumber) ?? 0) + 1);
	}

	return counts;
}

export function createCastingId(): string {
	return crypto.randomUUID();
}
