/** Hexagram & trigram catalog: glyphs, bit patterns, King Wen numbers, locale records. */

export type { HexagramCore } from './core';
export {
	getAllHexagramCores,
	getHexagramCore,
	getHexagramCoreByBinary,
	getHexagramCoreFromTrigrams
} from './core';

export {
	BINARY_TO_KING_WEN,
	binaryForHexagramNumber,
	binaryIndexToTrigrams,
	hexagramNumberFromTrigrams,
	isValidHexagramNumber,
	kingWenNumberFromLines,
	lineValuesFromBinary,
	linesToBinaryIndex,
	trigramsForHexagramNumber,
	trigramsFromLines
} from './binary';

export { HEX_FONT_GLYPHS, hexGlyph } from './hex-glyphs';

export { getHexagramList, resolveHexagram } from './resolve';
export { getHexagramRecord, hexagramRecords } from './records';

export type { TrigramCatalogEntry } from './trigrams';
export {
	TRIGRAM_ORDER,
	TRIGRAMS,
	getTrigram,
	trigramFromYangBits,
	trigramGlyph,
	trigramYangBits
} from './trigrams';
