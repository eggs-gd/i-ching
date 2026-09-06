<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import { authStore } from '$lib/state/auth.svelte';
	import { syncController } from '$lib/sync/controller.svelte';
	import { AppButton, AppPopup } from '$lib/components/ui';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open, onClose }: Props = $props();

	const i18n = useI18n();
	const account = $derived(authStore.user?.email ?? authStore.user?.name ?? '');

	const statusLine = $derived.by(() => {
		if (!syncController.enabled) return null;
		switch (syncController.status) {
			case 'syncing':
				return i18n.t('sync.syncing');
			case 'error':
				return i18n.t('sync.error');
			default:
				return syncController.lastSyncedAt
					? i18n.t('sync.lastSynced', { when: relativeTime(syncController.lastSyncedAt) })
					: i18n.t('sync.blurb');
		}
	});

	function relativeTime(ts: number): string {
		const s = Math.round((Date.now() - ts) / 1000);
		if (s < 60) return i18n.t('sync.justNow');
		const m = Math.round(s / 60);
		if (m < 60) return i18n.t('sync.minutesAgo', { n: m });
		const h = Math.round(m / 60);
		if (h < 24) return i18n.t('sync.hoursAgo', { n: h });
		return i18n.t('sync.daysAgo', { n: Math.round(h / 24) });
	}

	async function signOut(): Promise<void> {
		await authStore.signOut();
		onClose();
	}
</script>

<AppPopup {open} title={i18n.t('sync.title')} titleId="sync-popup-title" {onClose}>
	{#snippet children()}
		<div class="sync-body">
			<p class="sync-account">{i18n.t('sync.signedInAs', { account })}</p>
			{#if statusLine}
				<p class="sync-status">{statusLine}</p>
			{/if}
		</div>
	{/snippet}

	{#snippet footer()}
		{#if syncController.enabled}
			<AppButton
				variant="secondary"
				disabled={syncController.status === 'syncing'}
				onclick={() => void syncController.syncNow()}
			>
				{i18n.t('sync.syncNow')}
			</AppButton>
		{/if}
		<AppButton variant="danger" onclick={() => void signOut()}>
			{i18n.t('sync.signOut')}
		</AppButton>
	{/snippet}
</AppPopup>

<style>
	.sync-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.sync-account {
		margin: 0;
		font-size: var(--text-base);
		color: var(--text);
		word-break: break-word;
	}

	.sync-status {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--text-muted);
		line-height: var(--leading-normal);
	}
</style>
