import { error } from '@sveltejs/kit';
import { BUILT_LOCALES, HEXAGRAM_NUMBERS, getHexagram } from '$lib/hexagrams';

export const prerender = true;

/** The list in every locale, and the default one also without its prefix. */
export function entries() {
	return [{}, ...BUILT_LOCALES.map((lang) => ({ lang }))];
}

export async function load({ parent }) {
	const { locale } = await parent();
	const items = HEXAGRAM_NUMBERS.map((n) => getHexagram(n, locale)).filter((h) => h !== null);
	if (items.length === 0) error(404, 'Not found');
	return { items, available: BUILT_LOCALES };
}
