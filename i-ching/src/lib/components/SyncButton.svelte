<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import { authStore } from '$lib/state/auth.svelte';
	import SyncPopup from './SyncPopup.svelte';

	const i18n = useI18n();
	let popupOpen = $state(false);

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
		class:busy={authStore.busy}
		disabled={authStore.busy}
		aria-label={authStore.user ? i18n.t('sync.title') : i18n.t('sync.signIn')}
		title={authStore.user ? i18n.t('sync.title') : i18n.t('sync.signIn')}
		aria-haspopup={authStore.user ? 'dialog' : undefined}
		onclick={handleClick}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
		</svg>
		{#if authStore.user}
			<span class="sync-btn__dot" aria-hidden="true"></span>
		{/if}
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

	.sync-btn:hover {
		border-color: var(--accent-dim);
		color: var(--text);
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

	.sync-btn__dot {
		position: absolute;
		top: 2px;
		right: 2px;
		width: 7px;
		height: 7px;
		border-radius: var(--radius-full);
		background: var(--accent);
		box-shadow: 0 0 0 2px var(--bg);
	}
</style>
