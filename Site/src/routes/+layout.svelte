<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import ConsentBanner from '$lib/analytics/ConsentBanner.svelte';
	import { DEFAULT_LOCALE, isLocale } from '$lib/i18n';
	import '../app.css';

	let { children } = $props();

	// The server sets <html lang> for the page it renders; after a client-side navigation
	// (the language switcher, a link back to the landing) this keeps it in step.
	$effect(() => {
		document.documentElement.lang = isLocale(page.params.lang) ? page.params.lang : DEFAULT_LOCALE;
	});
</script>

{@render children()}

<ConsentBanner privacyHref="{base}/privacy" />
