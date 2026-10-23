<script lang="ts">
	import { reopenConsent } from '$lib/analytics/consent';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<main class="page">
	{@render children()}

	<footer>
		<span>© 2026 earwiG Games</span>
		<a href="https://eggs.gd">eggs.gd</a>
		<a href="{base}/privacy">Privacy Policy</a>
		<button type="button" class="cookie-link" onclick={reopenConsent}>Cookie settings</button>
	</footer>
</main>
