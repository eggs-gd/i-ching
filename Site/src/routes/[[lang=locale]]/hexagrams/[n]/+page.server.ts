import { error } from '@sveltejs/kit';
import { DEFAULT_LOCALE, type Locale } from '$lib/i18n';
import { HEXAGRAM_NUMBERS, getHexagram, hexagramLocales } from '$lib/hexagrams';

export const prerender = true;

/** Every hexagram in every locale it has, and the default locale also without its prefix. */
export function entries() {
	return HEXAGRAM_NUMBERS.flatMap((n) =>
		hexagramLocales(n).flatMap((lang) =>
			lang === DEFAULT_LOCALE
				? [{ n: String(n) }, { lang, n: String(n) }]
				: [{ lang, n: String(n) }]
		)
	);
}

export function load({ params }) {
	const locale = (params.lang ?? DEFAULT_LOCALE) as Locale;
	const number = Number(params.n);
	const hexagram = getHexagram(number, locale);
	if (!hexagram) error(404, 'Not found');

	const previous = number > 1 ? getHexagram(number - 1, locale) : null;
	const next = number < HEXAGRAM_NUMBERS.length ? getHexagram(number + 1, locale) : null;
	return { hexagram, previous, next, available: hexagramLocales(number) };
}
