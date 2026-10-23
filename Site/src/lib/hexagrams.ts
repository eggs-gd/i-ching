import { LOCALES, type Locale } from './i18n';

interface Reading {
	scene: string;
	dynamics: string;
	vector: string;
}

interface LocaleContent {
	name: string;
	composition: string;
	reading: Reading;
}

interface Record_ {
	number: number;
	chinese: string;
	pinyin: string;
	locales: Partial<Record<Locale, Partial<LocaleContent> & { reading?: Partial<Reading> }>>;
}

export interface Hexagram extends LocaleContent {
	number: number;
	chinese: string;
	pinyin: string;
}

const files = import.meta.glob<Record_>('$content/hexagrams/*.json', {
	eager: true,
	import: 'default'
});

const records = Object.values(files).sort((a, b) => a.number - b.number);

export const HEXAGRAM_NUMBERS = records.map((r) => r.number);

/**
 * A hexagram in a locale, or null when the file has no such locale. A locale that is there
 * but incomplete stops the build: a page is either whole or not built.
 */
export function getHexagram(number: number, locale: Locale): Hexagram | null {
	const record = records.find((r) => r.number === number);
	const content = record?.locales[locale];
	if (!record || !content) return null;

	const { name, composition, reading } = content;
	const { scene, dynamics, vector } = reading ?? {};
	if (!name || !composition || !scene || !dynamics || !vector) {
		throw new Error(`Hexagram ${number} has an incomplete "${locale}" locale`);
	}
	return {
		number,
		chinese: record.chinese,
		pinyin: record.pinyin,
		name,
		composition,
		reading: { scene, dynamics, vector }
	};
}

/** The locales a hexagram is available in. */
export function hexagramLocales(number: number): Locale[] {
	return LOCALES.map((l) => l.code).filter((locale) => getHexagram(number, locale) !== null);
}

/** The locales that have at least one hexagram: the ones that get pages. */
export const BUILT_LOCALES: Locale[] = LOCALES.map((l) => l.code).filter((locale) =>
	HEXAGRAM_NUMBERS.some((n) => getHexagram(n, locale) !== null)
);
