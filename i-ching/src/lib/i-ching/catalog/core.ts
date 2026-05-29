import type { TrigramId } from '../types';
import { binaryIndexToTrigrams, BINARY_TO_KING_WEN, hexagramNumberFromTrigrams } from './binary';
import { hexGlyph } from './hex-glyphs';

export interface HexagramCore {
	/** King Wen sequence 1–64 */
	number: number;
	/** Fu Xi binary index 0–63 (line 1 = bit 0, yang = 1) */
	binary: number;
	lower: TrigramId;
	upper: TrigramId;
	glyph: string;
}

const coreByNumber = new Map<number, HexagramCore>();

for (let binary = 0; binary < 64; binary++) {
	const number = BINARY_TO_KING_WEN[binary];
	const { lower, upper } = binaryIndexToTrigrams(binary);
	coreByNumber.set(number, {
		number,
		binary,
		lower,
		upper,
		glyph: hexGlyph(number)
	});
}

export function getHexagramCore(number: number): HexagramCore {
	const core = coreByNumber.get(number);
	if (!core) {
		throw new Error(`Unknown hexagram number: ${number}`);
	}
	return core;
}

/** All 64 hexagrams in King Wen order with structural fields (no locale text). */
export function getAllHexagramCores(): readonly HexagramCore[] {
	return Array.from({ length: 64 }, (_, i) => getHexagramCore(i + 1));
}

export function getHexagramCoreByBinary(binary: number): HexagramCore {
	return getHexagramCore(BINARY_TO_KING_WEN[binary]);
}

export function getHexagramCoreFromTrigrams(lower: TrigramId, upper: TrigramId): HexagramCore {
	return getHexagramCore(hexagramNumberFromTrigrams(lower, upper));
}
