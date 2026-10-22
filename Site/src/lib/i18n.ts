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
 * The path of a page in a locale: the one place that decides which of a page's addresses is
 * the real one. The default locale is served both with and without its prefix; the unprefixed
 * address is the canonical one. `path` starts with "/" ("/" for the root of the locale).
 */
export function canonicalPath(locale: Locale, path: string): string {
	const rest = path === '/' ? '' : path;
	if (locale === DEFAULT_LOCALE) return rest || '/';
	return `/${locale}${rest}`;
}

/** The same, for a link in a page: with the base path in front. */
export function href(locale: Locale, path: string): string {
	const p = canonicalPath(locale, path);
	return p === '/' ? `${base}/` : `${base}${p}`;
}
