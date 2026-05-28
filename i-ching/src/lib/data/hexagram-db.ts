import type { Hexagram, HexagramRecord, Locale } from '$lib/i-ching/types';

const recordModules = import.meta.glob('./hexagrams/*.json', {
	eager: true,
	import: 'default'
}) as Record<string, HexagramRecord>;

const records: Record<number, HexagramRecord> = {};

for (const [path, record] of Object.entries(recordModules)) {
	if (!path.endsWith('.json')) continue;
	records[record.number] = record;
}

export function getHexagramRecord(number: number): HexagramRecord {
	const record = records[number];
	if (!record) {
		throw new Error(`Unknown hexagram number: ${number}`);
	}
	return record;
}

export function resolveHexagram(number: number, locale: Locale): Hexagram {
	const record = getHexagramRecord(number);
	const content = record.locales[locale] ?? record.locales.uk;

	return {
		number: record.number,
		chinese: record.chinese,
		pinyin: record.pinyin,
		upper: record.upper,
		lower: record.lower,
		...content
	};
}

export function getHexagramList(locale: Locale): Hexagram[] {
	return Object.values(records)
		.sort((a, b) => a.number - b.number)
		.map((record) => resolveHexagram(record.number, locale));
}

export const hexagramRecords = records;
