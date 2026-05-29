<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import { journalBridge } from '$lib/state/journal-bridge.svelte';
	import AppPopup from './AppPopup.svelte';
	import JournalArchivePopup from './JournalArchivePopup.svelte';
	import LocaleSwitcher from './LocaleSwitcher.svelte';

	const i18n = useI18n();
	const journal = $derived(journalBridge.journal);

	let profileOpen = $state(false);
	let archiveOpen = $state(false);

	function closeProfile(): void {
		archiveOpen = false;
		profileOpen = false;
	}

	function openArchive(): void {
		archiveOpen = true;
	}

	function closeArchive(): void {
		archiveOpen = false;
	}
</script>

<button
	type="button"
	class="profile-btn"
	aria-label={i18n.t('profile.open')}
	aria-haspopup="dialog"
	aria-expanded={profileOpen}
	title={i18n.t('profile.open')}
	onclick={() => (profileOpen = true)}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path
			d="M12 12a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Zm0 2c-3.9 0-7.1 2.2-7.1 5v1.5h14.2V19c0-2.8-3.2-5-7.1-5Z"
		/>
	</svg>
</button>

<AppPopup
	open={profileOpen}
	title={i18n.t('profile.title')}
	titleId="profile-popup-title"
	onClose={closeProfile}
>
	{#snippet children()}
		<div class="locale-row">
			<span class="row-label" id="profile-locale-heading">{i18n.t('locale.label')}</span>
			<LocaleSwitcher labelledBy="profile-locale-heading" />
		</div>

		<button type="button" class="archive-btn" onclick={openArchive}>
			{i18n.t('profile.clearArchive')}
		</button>
	{/snippet}
</AppPopup>

<JournalArchivePopup
	open={archiveOpen}
	{journal}
	onClose={closeArchive}
	onDelete={(ids) => journalBridge.deleteEntries(ids)}
/>

<style>
	.profile-btn {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: rgba(22, 20, 17, 0.72);
		backdrop-filter: blur(6px);
		color: var(--text-muted);
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			color 0.2s ease,
			transform 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.profile-btn:hover {
		border-color: var(--accent-dim);
		color: var(--text);
		transform: scale(1.05);
	}

	.profile-btn:focus {
		outline: none;
	}

	.profile-btn[aria-expanded='true'] {
		border-color: var(--accent);
		background: rgba(196, 165, 116, 0.14);
		color: var(--text);
	}

	svg {
		width: 1.15rem;
		height: 1.15rem;
		display: block;
		fill: currentColor;
	}

	.locale-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 1rem;
	}

	.row-label {
		font-size: 0.7rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-faint);
		flex-shrink: 0;
	}

	.archive-btn {
		width: 100%;
		padding: 0.6rem 0.75rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-elevated);
		color: var(--text-muted);
		font: inherit;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		text-align: left;
		cursor: pointer;
		transition:
			border-color 0.2s ease,
			color 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.archive-btn:hover {
		border-color: var(--accent-dim);
		color: var(--text);
	}

	.archive-btn:focus {
		outline: none;
	}
</style>
