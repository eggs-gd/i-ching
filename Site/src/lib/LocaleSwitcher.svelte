<script lang="ts">
	import { href, LOCALES, type Locale } from '$lib/i18n';
	import { t } from '$lib/strings';

	interface Props {
		locale: Locale;
		/** The locales the page exists in. */
		available: Locale[];
		/** The page's path in the default locale ("/hexagrams/1"). */
		path: string;
	}

	let { locale, available, path }: Props = $props();
</script>

<nav class="locale-switcher" aria-label={t(locale, 'language')}>
	{#each LOCALES.filter((l) => available.includes(l.code)) as l}
		{#if l.code === locale}
			<span aria-current="true">{l.name}</span>
		{:else}
			<a href={href(l.code, path)} hreflang={l.code} lang={l.code}>{l.name}</a>
		{/if}
	{/each}
</nav>
