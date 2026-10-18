import type { Hexagram, Locale } from '../types';
import { getHexagramCore } from './core';
import { getHexagramRecord, hexagramRecords } from './records';

export function resolveHexagram(number: number, locale: Locale): Hexagram {
	const record = getHexagramRecord(number);
	const core = getHexagramCore(number);
	const content = record.locales[locale] ?? record.locales.uk;

	return {
		number: core.number,
		chinese: record.chinese,
		pinyin: record.pinyin,
		upper: core.upper,
		lower: core.lower,
		...content
	};
}

export function getHexagramList(locale: Locale): Hexagram[] {
	return Object.values(hexagramRecords)
		.sort((a, b) => a.number - b.number)
		.map((record) => resolveHexagram(record.number, locale));
}
