import type { Locale } from '../types';

export interface WilhelmTrigramRef {
	chinese: string;
	symbolic: string;
	alchemical: string;
}

export interface WilhelmTextBlock {
	text: string;
	comments: string;
}

/** Full Wilhelm extended record (all fields from source; UI uses a subset). */
export interface HexagramExtendedContent {
	number: number;
	hex: number;
	hex_font: string;
	trad_chinese: string;
	pinyin: string;
	english: string;
	binary: number | string;
	od: number | string;
	wilhelm_above: WilhelmTrigramRef;
	wilhelm_below: WilhelmTrigramRef;
	wilhelm_symbolic: string;
	wilhelm_judgment: WilhelmTextBlock;
	wilhelm_image: WilhelmTextBlock;
	wilhelm_lines: Record<string, WilhelmTextBlock>;
}

const extendedModules = {
	en: import.meta.glob('../../data/hexagrams_ext/en/*.json', {
		eager: true,
		import: 'default'
	}) as Record<string, HexagramExtendedContent>,
	uk: import.meta.glob('../../data/hexagrams_ext/uk/*.json', {
		eager: true,
		import: 'default'
	}) as Record<string, HexagramExtendedContent>
};

const extendedByLocale: Record<Locale, Record<number, HexagramExtendedContent>> = {
	en: {},
	uk: {}
};

for (const locale of ['en', 'uk'] as const) {
	for (const record of Object.values(extendedModules[locale])) {
		extendedByLocale[locale][record.number] = record;
	}
}

export function getHexagramExtended(
	number: number,
	locale: Locale
): HexagramExtendedContent | null {
	return extendedByLocale[locale][number] ?? extendedByLocale.uk[number] ?? null;
}

function hasWilhelmBlock(block: WilhelmTextBlock): boolean {
	return Boolean(block.comments.trim());
}

export function hasHexagramExtended(number: number, locale: Locale): boolean {
	const record = getHexagramExtended(number, locale);
	if (!record) return false;
	return Boolean(
		record.wilhelm_symbolic.trim() ||
			hasWilhelmBlock(record.wilhelm_judgment) ||
			hasWilhelmBlock(record.wilhelm_image)
	);
}
