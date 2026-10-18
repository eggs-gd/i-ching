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

type ExtendedLoader = () => Promise<HexagramExtendedContent>;

const extendedModules = {
	en: import.meta.glob('../../data/hexagrams_ext/en/*.json', {
		import: 'default'
	}) as Record<string, ExtendedLoader>,
	uk: import.meta.glob('../../data/hexagrams_ext/uk/*.json', {
		import: 'default'
	}) as Record<string, ExtendedLoader>
};

const loadersByLocale: Record<Locale, Record<number, ExtendedLoader>> = {
	en: {},
	uk: {}
};

const extendedCache: Record<Locale, Record<number, HexagramExtendedContent>> = {
	en: {},
	uk: {}
};

for (const locale of ['en', 'uk'] as const) {
	for (const [filePath, loader] of Object.entries(extendedModules[locale])) {
		const match = filePath.match(/\/(\d{2})\.json$/);
		if (!match) continue;
		loadersByLocale[locale][Number(match[1])] = loader;
	}
}

export async function getHexagramExtended(
	number: number,
	locale: Locale
): Promise<HexagramExtendedContent | null> {
	const resolvedLocale = loadersByLocale[locale][number] ? locale : 'uk';
	const loader = loadersByLocale[resolvedLocale][number];
	if (!loader) return null;

	extendedCache[resolvedLocale][number] ??= await loader();
	return extendedCache[resolvedLocale][number];
}

export function hasHexagramExtended(number: number, locale: Locale): boolean {
	return Boolean(loadersByLocale[locale][number] ?? loadersByLocale.uk[number]);
}
