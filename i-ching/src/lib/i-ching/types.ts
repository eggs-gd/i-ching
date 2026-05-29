export type Locale = 'uk' | 'en';

export const LOCALES: Locale[] = ['uk', 'en'];

export const DEFAULT_LOCALE: Locale = 'uk';

export interface SymbolicReading {
	/** Symbolic picture — short imagistic scene without the composition line */
	scene: string;
	/** Movement between upper and lower trigram */
	dynamics: string;
	/** Where the process quietly drifts */
	vector: string;
}

export interface HexagramLocaleContent {
	name: string;
	/** Trigram composition line, e.g. "Heaven over heaven." */
	composition: string;
	reading: SymbolicReading;
	judgment: string;
	image: string;
}

export interface HexagramRecord {
	number: number;
	chinese: string;
	pinyin: string;
	lower: TrigramId;
	upper: TrigramId;
	locales: Record<Locale, HexagramLocaleContent>;
}

export interface Hexagram extends HexagramLocaleContent {
	number: number;
	chinese: string;
	pinyin: string;
	upper: TrigramId;
	lower: TrigramId;
}

export type LineValue = 'yin' | 'yang';

export type LineKind = 'young' | 'old';

export interface Line {
	value: LineValue;
	kind: LineKind;
	changing: boolean;
}

export type CoinValue = 2 | 3;

export interface TossResult {
	lines: Line[];
	sum: number;
	coins: [CoinValue, CoinValue, CoinValue];
}

export interface HexagramToss {
	lines: Line[];
	coinRows: CoinValue[][];
}

export interface Trigram {
	id: TrigramId;
	symbol: string;
	name: string;
}

export type TrigramId = 'qian' | 'kun' | 'zhen' | 'kan' | 'gen' | 'xun' | 'li' | 'dui';

export interface Casting {
	id: string;
	createdAt: string;
	question: string;
	primaryNumber: number;
	relatingNumber?: number;
	changingLines: number[];
	lines: Line[];
	coinRows?: CoinValue[][];
	locale?: Locale;
	method?: CastMethod;
	note?: string;
}

export type FlowStep = 'question' | 'toss' | 'building' | 'reading';

export type TossMode = 'single' | 'line' | 'all';

export type CastMethod = TossMode | 'manual' | 'motif';

/** @deprecated legacy journal shape */
export interface LegacyCasting extends Omit<Casting, 'primaryNumber'> {
	primary?: { number: number; nameUk?: string; name?: string };
	relating?: { number: number };
}
