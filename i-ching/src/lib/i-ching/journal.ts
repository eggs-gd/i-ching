import type { Casting, CoinValue, LegacyCasting } from './types';
import { coinRowsFromLines } from './coins';

const STORAGE_KEY = 'i-ching-journal';

function normalizeCasting(raw: LegacyCasting): Casting {
	if ('primaryNumber' in raw && typeof raw.primaryNumber === 'number') {
		return {
			...(raw as Casting),
			relatingNumber: (raw as Casting).relatingNumber ?? raw.relating?.number
		};
	}

	return {
		id: raw.id,
		createdAt: raw.createdAt,
		question: raw.question,
		primaryNumber: raw.primary?.number ?? 1,
		relatingNumber: raw.relating?.number,
		changingLines: raw.changingLines,
		lines: raw.lines,
		coinRows: raw.coinRows
	};
}

export function getCastingCoinRows(casting: Casting): CoinValue[][] {
	return casting.coinRows ?? coinRowsFromLines(casting.lines, casting.id);
}

export function loadJournal(): Casting[] {
	if (typeof localStorage === 'undefined') return [];

	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as LegacyCasting[];
		return parsed.map(normalizeCasting);
	} catch {
		return [];
	}
}

export function saveCasting(casting: Casting): void {
	if (typeof localStorage === 'undefined') return;

	const journal = loadJournal();
	journal.unshift(casting);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(journal.slice(0, 200)));
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
