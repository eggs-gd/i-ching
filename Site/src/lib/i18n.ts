import { base } from '$app/paths';

export type Locale = 'en' | 'uk';

export interface LocaleInfo {
	code: Locale;
	/** The language's own name, for the switcher. */
	name: string;
	/** For og:locale. */
	og: string;
}

/** The site's locales. The first one is the default. */
export const LOCALES: LocaleInfo[] = [
	{ code: 'en', name: 'English', og: 'en_US' },
	{ code: 'uk', name: 'Українська', og: 'uk_UA' }
];

export const DEFAULT_LOCALE: Locale = LOCALES[0].code;

export function isLocale(value: string | undefined): value is Locale {
	return LOCALES.some((l) => l.code === value);
}

export function localeInfo(locale: Locale): LocaleInfo {
	return LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
}

/**
 * The real address of a page in a locale: always with its prefix, whichever locale is the
 * default. It is what the canonical link, hreflang, the sitemap and every link on the site
 * use, so it does not change when the default does. `path` starts with "/" ("/" for the
 * root of the locale).
 */
export function canonicalPath(locale: Locale, path: string): string {
	return `/${locale}${path === '/' ? '' : path}`;
}

/** The real address, for a link in a page: with the base path in front. */
export function href(locale: Locale, path: string): string {
	return `${base}${canonicalPath(locale, path)}`;
}
