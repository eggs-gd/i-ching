import { DEFAULT_LOCALE, type Locale } from '$lib/i18n';

export const prerender = true;

export function load({ params }: { params: { lang?: string } }) {
	return { locale: (params.lang ?? DEFAULT_LOCALE) as Locale };
}
