<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import PaidFeaturePopup from './PaidFeaturePopup.svelte';

	const i18n = useI18n();
</script>

<PaidFeaturePopup
	triggerLabel={i18n.t('flow.explain')}
	popupTitle={i18n.t('flow.explain')}
	body={i18n.t('flow.explanationPaidBody')}
	closeLabel={i18n.t('reading.helpClose')}
/>
