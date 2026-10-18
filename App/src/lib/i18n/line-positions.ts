import type { Locale } from '$lib/i-ching/types';
import en from './locales/line-positions.en.json';
import uk from './locales/line-positions.uk.json';

export type LinePositionTexts = Record<string, string>;

const linePositions: Record<Locale, LinePositionTexts> = { uk, en };

export const LINE_ORDER = [6, 5, 4, 3, 2, 1] as const;

/** Universal structural meaning of a line position (1 = bottom … 6 = top). */
export function getLinePositionText(lineNumber: number, locale: Locale): string {
	const text = linePositions[locale]?.[String(lineNumber)];
	if (text) return text;

	return linePositions.en[String(lineNumber)] ?? '';
}
