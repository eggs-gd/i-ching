<script lang="ts">
	import AppPopup from './AppPopup.svelte';

	interface Props {
		triggerLabel: string;
		popupTitle: string;
		body: string;
		closeLabel: string;
	}

	let { triggerLabel, popupTitle, body, closeLabel }: Props = $props();

	let open = $state(false);
</script>

<button type="button" class="trigger" onclick={() => (open = true)}>
	<span class="trigger-label">{triggerLabel}</span>
</button>

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
	.trigger {
		width: 100%;
		padding: 0.55rem 0.75rem;
		border: 1px solid rgba(201, 120, 90, 0.4);
		border-radius: 2px;
		background: rgba(201, 120, 90, 0.12);
		color: inherit;
		font: inherit;
		cursor: pointer;
		text-align: left;
		-webkit-tap-highlight-color: transparent;
	}

	.trigger:focus {
		outline: none;
	}

	.trigger-label {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--line-changing);
	}

	.paid-body {
		margin: 0;
		font-size: 0.8rem;
		line-height: 1.55;
		color: var(--text-muted);
	}
</style>
