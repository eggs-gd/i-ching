import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, isLocale } from '$lib/i18n';

/** Puts the page's locale into <html lang>; pages without a locale prefix are the default one. */
export const handle: Handle = ({ event, resolve }) => {
	const lang = isLocale(event.params.lang) ? event.params.lang : DEFAULT_LOCALE;
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
