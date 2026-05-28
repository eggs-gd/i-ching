import { resolveHexagram } from '$lib/data/hexagram-db';
import type { Hexagram, Line, Locale, Trigram, TrigramId } from './types';

/** King Wen order lookup: Fu Xi binary index (line 1 = bit 0, yang = 1) → hexagram number */
const BINARY_TO_KING_WEN = [
	2, 24, 7, 19, 15, 36, 46, 12, 16, 51, 40, 54, 62, 55, 32, 34, 8, 3, 29, 60, 39, 63, 48, 5, 45,
	17, 47, 58, 31, 49, 28, 43, 23, 27, 4, 41, 52, 22, 18, 26, 35, 21, 64, 38, 56, 30, 50, 14, 20,
	42, 59, 61, 53, 37, 57, 9, 11, 25, 6, 10, 33, 13, 44, 1
] as const;

export const trigramSymbols: Record<TrigramId, string> = {
	qian: '☰',
	kun: '☷',
	zhen: '☳',
	kan: '☵',
	gen: '☶',
	xun: '☴',
	li: '☲',
	dui: '☱'
};

export function getTrigram(id: TrigramId, name: string): Trigram {
	return { id, symbol: trigramSymbols[id], name };
}

export function linesToBinaryIndex(lines: Line[]): number {
	return lines.reduce((index, line, position) => {
		if (line.value === 'yang') {
			// Line 1 (bottom) → bit 0 … line 6 (top) → bit 5
			return index | (1 << position);
		}
		return index;
	}, 0);
}

/** Bottom line first: line 1 → bit 0 … line 3 → bit 2 (Wilhelm / King Wen) */
const BOTTOM_PATTERN_TO_TRIGRAM: Record<string, TrigramId> = {
	'000': 'kun',
	'100': 'zhen',
	'011': 'xun',
	'010': 'kan',
	'101': 'li',
	'001': 'gen',
	'110': 'dui',
	'111': 'qian'
};

function yangBitsToTrigramId(y0: number, y1: number, y2: number): TrigramId {
	const key = `${y0}${y1}${y2}`;
	const id = BOTTOM_PATTERN_TO_TRIGRAM[key];

	if (!id) {
		throw new Error(`Invalid trigram line pattern: ${key}`);
	}

	return id;
}

export function trigramsFromLines(lines: Line[]): { lower: TrigramId; upper: TrigramId } {
	const yang = lines.map((line) => (line.value === 'yang' ? 1 : 0));

	return {
		lower: yangBitsToTrigramId(yang[0], yang[1], yang[2]),
		upper: yangBitsToTrigramId(yang[3], yang[4], yang[5])
	};
}

export function binaryIndexToTrigrams(binary: number): { lower: TrigramId; upper: TrigramId } {
	const lines = Array.from({ length: 6 }, (_, i) => (binary >> i) & 1);

	return {
		lower: yangBitsToTrigramId(lines[0], lines[1], lines[2]),
		upper: yangBitsToTrigramId(lines[3], lines[4], lines[5])
	};
}

export function getHexagramNumber(lines: Line[]): number {
	return BINARY_TO_KING_WEN[linesToBinaryIndex(lines)];
}

export function binaryForHexagramNumber(number: number): number {
	for (let binary = 0; binary < 64; binary++) {
		if (BINARY_TO_KING_WEN[binary] === number) {
			return binary;
		}
	}

	throw new Error(`Unknown hexagram number: ${number}`);
}

export function lineValuesFromBinary(binary: number): Line['value'][] {
	return Array.from({ length: 6 }, (_, i) => ((binary >> i) & 1 ? 'yang' : 'yin'));
}

export function staticLinesForHexagram(number: number): Line[] {
	return lineValuesFromBinary(binaryForHexagramNumber(number)).map((value) => ({
		value,
		kind: 'young',
		changing: false
	}));
}

export function getTransformedLines(lines: Line[]): Line[] {
	return lines.map((line) =>
		line.changing
			? {
					...line,
					value: line.value === 'yang' ? ('yin' as const) : ('yang' as const),
					changing: false
				}
			: line
	);
}

export function getHexagram(lines: Line[], locale: Locale): Hexagram {
	return resolveHexagram(getHexagramNumber(lines), locale);
}

export function getChangingLines(lines: Line[]): number[] {
	return lines
		.map((line, index) => (line.changing ? index + 1 : null))
		.filter((line): line is number => line !== null);
}

export function getRelatingHexagramNumber(lines: Line[]): number | undefined {
	const changing = getChangingLines(lines);

	if (changing.length === 0) {
		return undefined;
	}

	const transformed = getTransformedLines(lines);

	return getHexagramNumber(transformed);
}

export function getRelatingHexagram(lines: Line[], locale: Locale): Hexagram | undefined {
	const number = getRelatingHexagramNumber(lines);
	return number ? resolveHexagram(number, locale) : undefined;
}

export function lineDisplay(line: Line): string {
	if (line.value === 'yang') {
		return line.changing ? '—○—' : '———';
	}
	return line.changing ? '— × —' : '—   —';
}
