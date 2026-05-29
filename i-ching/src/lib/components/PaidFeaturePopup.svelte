<script lang="ts">
	import { AppButton, AppPopup } from '$lib/components/ui';

	interface Props {
		triggerLabel: string;
		popupTitle: string;
		body: string;
		closeLabel: string;
	}

	let { triggerLabel, popupTitle, body, closeLabel }: Props = $props();

	let open = $state(false);
</script>

<AppButton variant="paid-panel" fullWidth onclick={() => (open = true)}>
	{triggerLabel}
</AppButton>

<AppPopup
	open={open}
	title={popupTitle}
	closeLabel={closeLabel}
	variant="paid"
	onClose={() => (open = false)}
>
	{#snippet children()}
		<p class="paid-body">{body}</p>
	{/snippet}
</AppPopup>

<style>
	.paid-body {
		margin: 0;
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		color: var(--text-muted);
	}
</style>
