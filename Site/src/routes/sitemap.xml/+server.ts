import { canonicalPath, type Locale } from '$lib/i18n';
import { BUILT_LOCALES, HEXAGRAM_NUMBERS, hexagramLocales } from '$lib/hexagrams';
import { SITE } from '$lib/seo';

export const prerender = true;

interface Entry {
	/** The page's canonical path in the default locale. */
	path: string;
	locales: Locale[];
}

const pages: Entry[] = [
	{ path: '/', locales: ['en'] },
	{ path: '/privacy', locales: ['en'] },
	{ path: '/hexagrams', locales: BUILT_LOCALES },
	...HEXAGRAM_NUMBERS.map((n) => ({ path: `/hexagrams/${n}`, locales: hexagramLocales(n) }))
];

/** Every canonical URL, each with its alternates (the page itself included). */
export function GET() {
	const urls = pages.flatMap(({ path, locales }) =>
		locales.map((locale) => {
			const links =
				locales.length > 1
					? locales
							.map(
								(l) =>
									`\t\t<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${canonicalPath(l, path)}"/>`
							)
							.join('\n')
					: '';
			return `\t<url>\n\t\t<loc>${SITE}${canonicalPath(locale, path)}</loc>${links ? `\n${links}` : ''}\n\t</url>`;
		})
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
