import { error } from '@sveltejs/kit';
import { DEFAULT_LOCALE, type Locale } from '$lib/i18n';
import { BUILT_LOCALES, HEXAGRAM_NUMBERS, getHexagram } from '$lib/hexagrams';

export const prerender = true;

/** The list in every locale, and the default one also without its prefix. */
export function entries() {
	return [{}, ...BUILT_LOCALES.map((lang) => ({ lang }))];
}

export function load({ params }) {
	const locale = (params.lang ?? DEFAULT_LOCALE) as Locale;
	const items = HEXAGRAM_NUMBERS.map((n) => getHexagram(n, locale)).filter((h) => h !== null);
	if (items.length === 0) error(404, 'Not found');
	return { items, available: BUILT_LOCALES };
}
