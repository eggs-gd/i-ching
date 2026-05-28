<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import { initI18n, useI18n } from '$lib/i18n';

	let { children } = $props();

	initI18n();
	const i18n = useI18n();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{i18n.t('app.title')}</title>
	<meta name="description" content={i18n.t('app.description')} />
</svelte:head>

<div class="app">
	{@render children()}
	<footer class="footer">
		<LocaleSwitcher />
	</footer>
</div>

<style>
	.app {
		position: relative;
		z-index: 1;
		min-height: 100dvh;
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.75rem 1rem 1rem;
		pointer-events: none;
	}

	.footer :global(.switcher) {
		pointer-events: auto;
	}
</style>
