import type { HexagramRecord } from '../types';

const recordModules = import.meta.glob('../../data/hexagrams/*.json', {
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

export const hexagramRecords = records;
