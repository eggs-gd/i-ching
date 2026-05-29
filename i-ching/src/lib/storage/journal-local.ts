import type { Casting, LegacyCasting } from '$lib/i-ching/types';
import { JOURNAL_STORAGE_KEY, type JournalRepository } from './journal-repository';

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
		coinRows: raw.coinRows,
		locale: raw.locale,
		method: raw.method,
		note: raw.note
	};
}

export class LocalJournalRepository implements JournalRepository {
	async ensureReady(): Promise<void> {
		// localStorage is always available in browser contexts we target
	}

	async loadAll(): Promise<Casting[]> {
		if (typeof localStorage === 'undefined') return [];

		try {
			const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
			if (!raw) return [];
			const parsed = JSON.parse(raw) as LegacyCasting[];
			return parsed.map(normalizeCasting);
		} catch {
			return [];
		}
	}

	async save(casting: Casting): Promise<void> {
		if (typeof localStorage === 'undefined') return;

		const journal = await this.loadAll();
		journal.unshift(casting);
		localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journal));
	}

	async deleteByIds(ids: string[]): Promise<void> {
		if (typeof localStorage === 'undefined' || ids.length === 0) return;

		const remove = new Set(ids);
		const journal = (await this.loadAll()).filter((entry) => !remove.has(entry.id));
		localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(journal));
	}
}
