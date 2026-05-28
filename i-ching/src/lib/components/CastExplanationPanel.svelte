<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import DisclosurePanel from './DisclosurePanel.svelte';

	const i18n = useI18n();
</script>

<DisclosurePanel title={i18n.t('flow.explanationTitle')} tone="warning">
	<p class="body">{i18n.t('flow.explanationPaidBody')}</p>
</DisclosurePanel>

<style>
	.body {
		margin: 0;
		font-size: 0.8rem;
		line-height: 1.55;
		color: var(--text-muted);
	}
</style>
