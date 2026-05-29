import type { Casting, CoinValue } from './types';
import { coinRowsFromLines } from './coins';
import {
	deleteJournalEntries as deleteStoredEntries,
	loadJournalEntries,
	saveJournalEntry
} from '$lib/storage';

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

export async function deleteJournalEntries(ids: string[]): Promise<void> {
	await deleteStoredEntries(ids);
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

export interface JournalDayGroup {
	key: string;
	label: string;
	entries: Casting[];
}

export interface JournalMonthGroup {
	key: string;
	label: string;
	days: JournalDayGroup[];
}

export interface JournalYearGroup {
	key: string;
	label: string;
	months: JournalMonthGroup[];
}

function localDateKey(iso: string): string {
	const d = new Date(iso);
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

/** Groups entries in display order (newest first), preserving journal list order. */
export function groupJournalEntries(entries: Casting[], locale: string): JournalYearGroup[] {
	const years: JournalYearGroup[] = [];
	const yearIndex = new Map<string, JournalYearGroup>();
	const monthIndex = new Map<string, JournalMonthGroup>();
	const dayIndex = new Map<string, JournalDayGroup>();

	for (const entry of entries) {
		const date = new Date(entry.createdAt);
		const yearKey = String(date.getFullYear());
		const monthKey = `${yearKey}-${date.getMonth()}`;
		const dayKey = localDateKey(entry.createdAt);

		let year = yearIndex.get(yearKey);
		if (!year) {
			year = {
				key: yearKey,
				label: yearKey,
				months: []
			};
			yearIndex.set(yearKey, year);
			years.push(year);
		}

		let month = monthIndex.get(monthKey);
		if (!month) {
			month = {
				key: monthKey,
				label: date.toLocaleDateString(locale, { month: 'long', year: 'numeric' }),
				days: []
			};
			monthIndex.set(monthKey, month);
			year.months.push(month);
		}

		let day = dayIndex.get(dayKey);
		if (!day) {
			day = {
				key: dayKey,
				label: date.toLocaleDateString(locale, {
					weekday: 'long',
					day: 'numeric',
					month: 'long'
				}),
				entries: []
			};
			dayIndex.set(dayKey, day);
			month.days.push(day);
		}

		day.entries.push(entry);
	}

	return years;
}
