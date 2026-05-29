import type { Trigram, TrigramId } from '../types';

/** Picker / display order (columns left to right). */
export const TRIGRAM_ORDER: readonly TrigramId[] = [
	'qian',
	'kun',
	'zhen',
	'xun',
	'kan',
	'li',
	'gen',
	'dui'
] as const;

export interface TrigramCatalogEntry {
	id: TrigramId;
	/** Lines 1–3 bottom to top: 1 = yang, 0 = yin (King Wen / Wilhelm). */
	yangBits: readonly [0 | 1, 0 | 1, 0 | 1];
	/** Unicode trigram symbol (☰ …). */
	glyph: string;
}

export const TRIGRAMS: Record<TrigramId, TrigramCatalogEntry> = {
	kun: { id: 'kun', yangBits: [0, 0, 0], glyph: '☷' },
	zhen: { id: 'zhen', yangBits: [1, 0, 0], glyph: '☳' },
	xun: { id: 'xun', yangBits: [0, 1, 1], glyph: '☴' },
	kan: { id: 'kan', yangBits: [0, 1, 0], glyph: '☵' },
	li: { id: 'li', yangBits: [1, 0, 1], glyph: '☲' },
	gen: { id: 'gen', yangBits: [0, 0, 1], glyph: '☶' },
	dui: { id: 'dui', yangBits: [1, 1, 0], glyph: '☱' },
	qian: { id: 'qian', yangBits: [1, 1, 1], glyph: '☰' }
};

const PATTERN_TO_TRIGRAM = Object.fromEntries(
	(Object.values(TRIGRAMS) as TrigramCatalogEntry[]).map((t) => [
		t.yangBits.join(''),
		t.id
	])
) as Record<string, TrigramId>;

export function trigramGlyph(id: TrigramId): string {
	return TRIGRAMS[id].glyph;
}

export function trigramYangBits(id: TrigramId): readonly [0 | 1, 0 | 1, 0 | 1] {
	return TRIGRAMS[id].yangBits;
}

export function trigramFromYangBits(y0: number, y1: number, y2: number): TrigramId {
	const key = `${y0}${y1}${y2}`;
	const id = PATTERN_TO_TRIGRAM[key];
	if (!id) {
		throw new Error(`Invalid trigram line pattern: ${key}`);
	}
	return id;
}

export function getTrigram(id: TrigramId, name: string): Trigram {
	return { id, symbol: trigramGlyph(id), name };
}
