<script lang="ts">
	import type { Locale } from '$lib/i-ching/types';
	import { LOCALES } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';

	interface Props {
		/** id of external label when the switcher has no visible group title */
		labelledBy?: string;
	}

	let { labelledBy }: Props = $props();

	const i18n = useI18n();

	const localeMeta: Record<Locale, { flag: string; labelKey: string }> = {
		uk: { flag: '🇺🇦', labelKey: 'locale.uk' },
		en: { flag: '🇬🇧', labelKey: 'locale.en' }
	};

	function selectLocale(locale: Locale) {
		i18n.setLocale(locale);
	}
</script>

<div
	class="switcher"
	role="group"
	aria-label={labelledBy ? undefined : i18n.t('locale.label')}
	aria-labelledby={labelledBy}
>
	{#each LOCALES as locale}
		{@const meta = localeMeta[locale]}
		{@const label = i18n.t(meta.labelKey)}
		<button
			type="button"
			class="locale-btn"
			class:active={i18n.locale === locale}
			aria-label={label}
			aria-pressed={i18n.locale === locale}
			title={label}
			onclick={() => selectLocale(locale)}
		>
			<span class="flag" aria-hidden="true">{meta.flag}</span>
		</button>
	{/each}
</div>

<style>
	.switcher {
		display: flex;
		gap: var(--space-2);
		align-items: center;
	}

	.locale-btn {
		display: grid;
		place-items: center;
		width: var(--size-touch);
		height: var(--size-touch);
		padding: 0;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: var(--overlay-elevated);
		backdrop-filter: blur(6px);
		transition: var(--transition-fade);
	}

	.locale-btn:hover {
		border-color: var(--accent-dim);
		transform: scale(1.05);
	}

	.locale-btn.active {
		border-color: var(--accent);
		background: var(--fill-muted);
		box-shadow: 0 0 0 1px var(--fill-muted);
	}

	.flag {
		font-size: var(--text-lg);
		line-height: 1;
	}

</style>
