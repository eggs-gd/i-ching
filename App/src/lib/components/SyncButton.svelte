<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import { authStore } from '$lib/state/auth.svelte';
	import { syncController } from '$lib/sync/controller.svelte';
	import SyncPopup from './SyncPopup.svelte';

	const i18n = useI18n();
	let popupOpen = $state(false);

	/** Successful idle sync — the active appearance for the control. */
	const synchronized = $derived(
		Boolean(authStore.user) &&
			syncController.status === 'idle' &&
			syncController.lastSyncedAt != null
	);

	const appearance = $derived.by(() => {
		if (!authStore.user || syncController.status === 'off') return 'muted';
		if (syncController.status === 'syncing') return 'syncing';
		if (syncController.status === 'error') return 'error';
		if (synchronized) return 'active';
		return 'muted';
	});

	const label = $derived.by(() => {
		if (!authStore.user) return i18n.t('sync.signIn');
		switch (syncController.status) {
			case 'syncing':
				return i18n.t('sync.syncing');
			case 'error':
				return i18n.t('sync.error');
			default:
				return syncController.lastSyncedAt
					? i18n.t('sync.lastSynced', { when: relativeTime(syncController.lastSyncedAt) })
					: i18n.t('sync.notSynced');
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

	function handleClick(): void {
		if (authStore.busy) return;
		if (authStore.user) popupOpen = true;
		else void authStore.signIn();
	}
</script>

{#if authStore.available}
	<button
		type="button"
		class="sync-btn"
		class:sync-btn--muted={appearance === 'muted'}
		class:sync-btn--active={appearance === 'active'}
		class:sync-btn--syncing={appearance === 'syncing'}
		class:sync-btn--error={appearance === 'error'}
		class:busy={authStore.busy}
		disabled={authStore.busy}
		aria-label={label}
		title={label}
		aria-haspopup={authStore.user ? 'dialog' : undefined}
		onclick={handleClick}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
		</svg>
	</button>

	<SyncPopup open={popupOpen} onClose={() => (popupOpen = false)} />
{/if}

<style>
	.sync-btn {
		position: relative;
		display: grid;
		place-items: center;
		width: var(--size-touch);
		height: var(--size-touch);
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: var(--overlay-elevated);
		backdrop-filter: blur(6px);
		color: var(--text-muted);
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition: var(--transition-fade);
	}

	/* Unsynchronized / signed-out: subdued inactive look — still clickable. */
	.sync-btn--muted {
		color: var(--text-faint);
		border-color: color-mix(in srgb, var(--text-faint) 28%, transparent);
		background: color-mix(in srgb, var(--bg-elevated) 45%, transparent);
	}

	.sync-btn--muted:hover:not(:disabled) {
		color: var(--text-muted);
		border-color: color-mix(in srgb, var(--text-muted) 40%, transparent);
		transform: scale(1.05);
	}

	/* Synchronized: clearly active. */
	.sync-btn--active {
		color: var(--text);
		border-color: var(--accent);
		background: var(--fill-muted);
	}

	.sync-btn--active:hover:not(:disabled) {
		border-color: var(--accent);
		color: var(--text);
		background: var(--fill-strong);
		transform: scale(1.05);
	}

	.sync-btn--syncing {
		color: var(--accent);
		border-color: var(--accent-dim);
		background: var(--fill-subtle);
	}

	.sync-btn--syncing svg {
		animation: sync-pulse 1.1s ease-in-out infinite;
	}

	.sync-btn--error {
		color: var(--line-changing);
		border-color: var(--border-warning-strong);
		background: var(--fill-warning);
	}

	.sync-btn--error:hover:not(:disabled) {
		border-color: var(--line-changing);
		transform: scale(1.05);
	}

	.sync-btn:focus {
		outline: none;
	}

	.sync-btn.busy {
		opacity: 0.5;
		cursor: default;
	}

	.sync-btn svg {
		width: 1.15rem;
		height: 1.15rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@keyframes sync-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.45;
		}
	}
</style>
