import { canonicalPath, type Locale } from '$lib/i18n';
import { BUILT_LOCALES, HEXAGRAM_NUMBERS, hexagramLocales } from '$lib/hexagrams';
import { SITE } from '$lib/seo';

export const prerender = true;

interface Entry {
	/** The page's path without a locale prefix. */
	path: string;
	locales: Locale[];
}

/** Pages that are not localized: one address, no prefix. */
const fixed = ['/', '/privacy'];

const pages: Entry[] = [
	{ path: '/hexagrams', locales: BUILT_LOCALES },
	...HEXAGRAM_NUMBERS.map((n) => ({ path: `/hexagrams/${n}`, locales: hexagramLocales(n) }))
];

/** Every real address, each with its alternates (the page itself included). */
export function GET() {
	const plain = fixed.map((path) => `\t<url>\n\t\t<loc>${SITE}${path}</loc>\n\t</url>`);
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
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[...plain, ...urls].join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
