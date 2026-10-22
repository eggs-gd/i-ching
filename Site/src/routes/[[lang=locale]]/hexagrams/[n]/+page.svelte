<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/Seo.svelte';
	import LocaleSwitcher from '$lib/LocaleSwitcher.svelte';
	import { canonicalPath, href } from '$lib/i18n';
	import { SITE, SITE_NAME } from '$lib/seo';
	import { t } from '$lib/strings';

	let { data } = $props();
	const locale = $derived(data.locale);
	const hexagram = $derived(data.hexagram);
	const path = $derived(`/hexagrams/${hexagram.number}`);

	const params = $derived({
		number: hexagram.number,
		name: hexagram.name,
		chinese: hexagram.chinese,
		pinyin: hexagram.pinyin
	});

	/** A reading's paragraphs: the texts separate them with a blank line. */
	const paragraphs = (text: string) => text.split(/\n{2,}/).filter(Boolean);

	const first = $derived(paragraphs(hexagram.reading.scene).join(' '));
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: t(locale, 'hexagramTitle', params),
		inLanguage: locale,
		url: `${SITE}${canonicalPath(locale, path)}`,
		description: first,
		isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE}/` },
		publisher: { '@type': 'Organization', name: 'earwiG Games', url: 'https://eggs.gd/' }
	});
</script>

<Seo
	title={t(locale, 'hexagramPageTitle', params)}
	description={first}
	path={canonicalPath(locale, path)}
	{locale}
	alternates={data.available.map((l) => ({ locale: l, path: canonicalPath(l, path) }))}
	{jsonLd}
/>

<section class="intro" aria-labelledby="hexagram-title">
	<a class="back-link" href={href(locale, '/hexagrams')}>{t(locale, 'allHexagrams')}</a>
	<div class="title-row">
		<p class="glyphs" aria-hidden="true">{hexagram.chinese}</p>
		<h1 id="hexagram-title">{hexagram.number}. {hexagram.name}</h1>
	</div>
	<p class="promo">{hexagram.pinyin} · {hexagram.composition}</p>
	<LocaleSwitcher {locale} available={data.available} {path} />
</section>

<article class="description" aria-label={hexagram.name}>
	{#each ['scene', 'dynamics', 'vector'] as const as part}
		<h2>{t(locale, part)}</h2>
		{#each paragraphs(hexagram.reading[part]) as paragraph}
			<p>{paragraph}</p>
		{/each}
	{/each}

	<h2>{t(locale, 'cast')}</h2>
	<p>
		{t(locale, 'castLead')}
		<a href="{base}/pwa/" rel="external" data-cta="web_app" data-cta-placement="hexagram">
			{t(locale, 'site')}
		</a>
	</p>

	<nav class="pager" aria-label={t(locale, 'hexagrams')}>
		{#if data.previous}
			<a rel="prev" href={href(locale, `/hexagrams/${data.previous.number}`)}>
				← {t(locale, 'previous')}: {data.previous.number}. {data.previous.name}
			</a>
		{/if}
		{#if data.next}
			<a rel="next" href={href(locale, `/hexagrams/${data.next.number}`)}>
				{t(locale, 'next')}: {data.next.number}. {data.next.name} →
			</a>
		{/if}
	</nav>
</article>
