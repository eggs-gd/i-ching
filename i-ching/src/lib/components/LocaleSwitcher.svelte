<script lang="ts">
	import type { Locale } from '$lib/i-ching/types';
	import { LOCALES } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();

	const localeMeta: Record<Locale, { flag: string; labelKey: string }> = {
		uk: { flag: '🇺🇦', labelKey: 'locale.uk' },
		en: { flag: '🇬🇧', labelKey: 'locale.en' }
	};

	function selectLocale(locale: Locale) {
		i18n.setLocale(locale);
	}
</script>

<div class="switcher" role="group" aria-label={i18n.t('locale.label')}>
	{#each LOCALES as locale}
		{@const meta = localeMeta[locale]}
		<button
			type="button"
			class="locale-btn"
			class:active={i18n.locale === locale}
			aria-label={i18n.t(meta.labelKey)}
			aria-pressed={i18n.locale === locale}
			title={i18n.t(meta.labelKey)}
			onclick={() => selectLocale(locale)}
		>
			<span class="flag" aria-hidden="true">{meta.flag}</span>
		</button>
	{/each}
</div>

<style>
	.switcher {
		display: flex;
		gap: 0.35rem;
		align-items: center;
	}

	.locale-btn {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: rgba(22, 20, 17, 0.72);
		backdrop-filter: blur(6px);
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			transform 0.15s ease;
	}

	.locale-btn:hover {
		border-color: var(--accent-dim);
		transform: scale(1.05);
	}

	.locale-btn.active {
		border-color: var(--accent);
		background: rgba(196, 165, 116, 0.14);
		box-shadow: 0 0 0 1px rgba(196, 165, 116, 0.2);
	}

	.flag {
		font-size: 1.15rem;
		line-height: 1;
	}
</style>
