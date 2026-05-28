<script lang="ts">
	import type { Locale } from '$lib/i-ching/types';
	import { LOCALES } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();

	function selectLocale(locale: Locale) {
		i18n.setLocale(locale);
	}
</script>

<div class="switcher" role="group" aria-label={i18n.t('locale.label')}>
	{#each LOCALES as locale}
		<button
			type="button"
			class:active={i18n.locale === locale}
			onclick={() => selectLocale(locale)}
		>
			{i18n.t(`locale.${locale}`)}
		</button>
	{/each}
</div>

<style>
	.switcher {
		display: flex;
		gap: 0.25rem;
		justify-content: center;
		margin-top: 1rem;
	}

	button {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.35rem 0.65rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		color: var(--text-faint);
		transition: all 0.2s ease;
	}

	button:hover {
		color: var(--text-muted);
		border-color: var(--accent-dim);
	}

	button.active {
		color: var(--accent);
		border-color: var(--accent-dim);
		background: rgba(196, 165, 116, 0.08);
	}
</style>
