import type { Line, TrigramId } from '../types';
import { trigramFromYangBits, trigramYangBits } from './trigrams';

/** Fu Xi binary index (line 1 = bit 0, yang = 1) → King Wen hexagram number. */
export const BINARY_TO_KING_WEN: readonly number[] = [
	2, 24, 7, 19, 15, 36, 46, 12, 16, 51, 40, 54, 62, 55, 32, 34, 8, 3, 29, 60, 39, 63, 48, 5, 45, 17,
	47, 58, 31, 49, 28, 43, 23, 27, 4, 41, 52, 22, 18, 26, 35, 21, 64, 38, 56, 30, 50, 14, 20, 42, 59,
	61, 53, 37, 57, 9, 11, 25, 6, 10, 33, 13, 44, 1
] as const;

export function linesToBinaryIndex(lines: Line[]): number {
	return lines.reduce((index, line, position) => {
		if (line.value === 'yang') {
			return index | (1 << position);
		}
		return index;
	}, 0);
}

export function kingWenNumberFromLines(lines: Line[]): number {
	return BINARY_TO_KING_WEN[linesToBinaryIndex(lines)];
}

export function binaryIndexToTrigrams(binary: number): { lower: TrigramId; upper: TrigramId } {
	const lines = Array.from({ length: 6 }, (_, i) => (binary >> i) & 1);

	return {
		lower: trigramFromYangBits(lines[0], lines[1], lines[2]),
		upper: trigramFromYangBits(lines[3], lines[4], lines[5])
	};
}

export function trigramsFromLines(lines: Line[]): { lower: TrigramId; upper: TrigramId } {
	const yang = lines.map((line) => (line.value === 'yang' ? 1 : 0));

	return {
		lower: trigramFromYangBits(yang[0], yang[1], yang[2]),
		upper: trigramFromYangBits(yang[3], yang[4], yang[5])
	};
}

export function hexagramNumberFromTrigrams(lower: TrigramId, upper: TrigramId): number {
	const l = trigramYangBits(lower);
	const u = trigramYangBits(upper);
	const binary =
		(l[0] << 0) | (l[1] << 1) | (l[2] << 2) | (u[0] << 3) | (u[1] << 4) | (u[2] << 5);

	return BINARY_TO_KING_WEN[binary];
}

export function binaryForHexagramNumber(number: number): number {
	for (let binary = 0; binary < 64; binary++) {
		if (BINARY_TO_KING_WEN[binary] === number) {
			return binary;
		}
	}

	throw new Error(`Unknown hexagram number: ${number}`);
}

export function trigramsForHexagramNumber(number: number): { lower: TrigramId; upper: TrigramId } {
	return binaryIndexToTrigrams(binaryForHexagramNumber(number));
}

export function lineValuesFromBinary(binary: number): Line['value'][] {
	return Array.from({ length: 6 }, (_, i) => ((binary >> i) & 1 ? 'yang' : 'yin'));
}

export function isValidHexagramNumber(number: number): boolean {
	return Number.isInteger(number) && number >= 1 && number <= 64;
}
