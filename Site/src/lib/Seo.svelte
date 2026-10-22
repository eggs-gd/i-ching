<script lang="ts">
	import { OG_IMAGE, SITE, SITE_NAME } from '$lib/seo';
	import { DEFAULT_LOCALE, localeInfo, type Locale } from '$lib/i18n';

	interface Props {
		title: string;
		description: string;
		/** Absolute path from the site root, no trailing slash except for "/". The canonical one. */
		path: string;
		jsonLd?: object;
		/** The page's locale. */
		locale?: Locale;
		/** The other locales this page exists in, and their canonical paths (this page's too). */
		alternates?: { locale: Locale; path: string }[];
	}

	let {
		title,
		description,
		path,
		jsonLd,
		locale = DEFAULT_LOCALE,
		alternates = []
	}: Props = $props();

	const others = $derived(alternates.filter((a) => a.locale !== locale));
	const defaultAlternate = $derived(alternates.find((a) => a.locale === DEFAULT_LOCALE));

	const url = $derived(`${SITE}${path}`);
	// "<" is escaped so the JSON can never close the script element.
	const ld = $derived(jsonLd ? JSON.stringify(jsonLd).replace(/</g, '\\u003c') : '');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#each alternates as alternate}
		<link rel="alternate" hreflang={alternate.locale} href="{SITE}{alternate.path}" />
	{/each}
	{#if defaultAlternate}
		<link rel="alternate" hreflang="x-default" href="{SITE}{defaultAlternate.path}" />
	{/if}
	<meta property="og:locale" content={localeInfo(locale).og} />
	{#each others as alternate}
		<meta property="og:locale:alternate" content={localeInfo(alternate.locale).og} />
	{/each}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={SITE_NAME} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={OG_IMAGE} />
	{#if ld}
		{@html `<script type="application/ld+json">${ld}</script>`}
	{/if}
</svelte:head>
