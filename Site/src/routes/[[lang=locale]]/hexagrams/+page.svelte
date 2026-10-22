<script lang="ts">
	import { base } from '$app/paths';
	import Seo from '$lib/Seo.svelte';
	import LocaleSwitcher from '$lib/LocaleSwitcher.svelte';
	import { canonicalPath, href } from '$lib/i18n';
	import { t } from '$lib/strings';

	let { data } = $props();
	const locale = $derived(data.locale);
	const path = '/hexagrams';
</script>

<Seo
	title="{t(locale, 'hexagramsTitle')} · {t(locale, 'site')}"
	description={t(locale, 'hexagramsDescription')}
	path={canonicalPath(locale, path)}
	{locale}
	alternates={data.available.map((l) => ({ locale: l, path: canonicalPath(l, path) }))}
/>

<section class="intro" aria-labelledby="hexagrams-title">
	<a class="back-link" href="{base}/">{t(locale, 'site')}</a>
	<h1 id="hexagrams-title">{t(locale, 'hexagramsTitle')}</h1>
	<p class="promo">{t(locale, 'hexagramsLead')}</p>
	<LocaleSwitcher {locale} available={data.available} {path} />
</section>

<section class="hexagram-list" aria-label={t(locale, 'hexagrams')}>
	<ol>
		{#each data.items as item}
			<li>
				<a href={href(locale, `/hexagrams/${item.number}`)}>
					<span class="glyph" aria-hidden="true">{item.chinese}</span>
					<span class="number">{item.number}</span>
					<span class="name">{item.name}</span>
				</a>
			</li>
		{/each}
	</ol>
</section>
