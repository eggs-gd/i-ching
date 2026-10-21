<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { initI18n, useI18n } from '$lib/i18n';
	import { initNativePlatform, teardownNativePlatform } from '$lib/platform/native';
	import { applySystemTextZoom } from '$lib/platform/text-scale';
	import { track } from '$lib/analytics';
	import AnalyticsConsentPopup from '$lib/components/AnalyticsConsentPopup.svelte';
	import { analyticsConsent } from '$lib/state/analytics-consent.svelte';
	import { authStore } from '$lib/state/auth.svelte';
	import { syncController } from '$lib/sync/controller.svelte';

	let { children } = $props();

	initI18n();
	const i18n = useI18n();

	// Start / stop sync as the user signs in and out.
	$effect(() => {
		const signedIn = !!authStore.user;
		untrack(() => (signedIn ? syncController.start() : syncController.stop()));
	});

	onMount(() => {
		analyticsConsent.init();
		track('app_open');
		authStore.init();
		void applySystemTextZoom();
		void initNativePlatform(() => {
			if (typeof history !== 'undefined' && history.length > 1) {
				history.back();
			}
		});

		// Time in the app, reported coarsely each time it goes to the background.
		let visibleSince = performance.now();
		const onVisible = () => {
			if (document.visibilityState === 'visible') {
				visibleSince = performance.now();
				syncController.resumeSync();
			} else {
				const seconds = Math.round((performance.now() - visibleSince) / 1000);
				if (seconds > 0) track('app_hidden', { engaged_s: seconds });
			}
		};
		document.addEventListener('visibilitychange', onVisible);

		return () => {
			document.removeEventListener('visibilitychange', onVisible);
			teardownNativePlatform();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{i18n.t('app.title')}</title>
	<meta name="description" content={i18n.t('app.description')} />
</svelte:head>

<AnalyticsConsentPopup />

<div class="app">
	<div class="scroll-top-bar">
		<ScrollToTop />
	</div>
	{@render children()}
</div>

<style>
	.app {
		position: relative;
		z-index: 1;
		min-height: 100dvh;
		width: 100%;
		max-width: 100%;
		overflow-x: hidden;
	}

	.scroll-top-bar {
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: 100;
		display: flex;
		justify-content: flex-end;
		padding: 0 calc(0.75rem + env(safe-area-inset-right, 0px))
			calc(0.75rem + env(safe-area-inset-bottom, 0px)) 0;
		pointer-events: none;
	}

	.scroll-top-bar :global(.scroll-top-btn) {
		pointer-events: auto;
	}
</style>
