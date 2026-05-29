<script lang="ts">
	import { resolveHexagram } from '$lib/i-ching/catalog';
	import type { Casting } from '$lib/i-ching/types';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import JournalHexagramAnswer from './JournalHexagramAnswer.svelte';

	interface Props {
		entry: Casting;
		active?: boolean;
		onSelect: (entry: Casting) => void;
	}

	let { entry, active = false, onSelect }: Props = $props();

	const i18n = useI18n();
	const dateLocale = $derived(getLocaleDateFormat(i18n.locale));

	const primary = $derived(resolveHexagram(entry.primaryNumber, i18n.locale));
	const relating = $derived(
		entry.relatingNumber ? resolveHexagram(entry.relatingNumber, i18n.locale) : null
	);

	const timeLabel = $derived(
		new Date(entry.createdAt).toLocaleTimeString(dateLocale, {
			hour: '2-digit',
			minute: '2-digit'
		})
	);
</script>

<button
	type="button"
	class="entry-btn"
	class:active
	aria-label={i18n.t('journal.openEntry')}
	onclick={() => onSelect(entry)}
>
	<div class="entry-head">
		<span class="entry-q" class:entry-q--empty={!entry.question.trim()}>
			{entry.question.trim() || '\u2014'}
		</span>
		<time class="entry-time" datetime={entry.createdAt}>{timeLabel}</time>
	</div>
	<span class="entry-answer">
		<JournalHexagramAnswer hexagram={primary} />
		{#if relating}
			<span class="entry-arrow" aria-hidden="true">→</span>
			<JournalHexagramAnswer hexagram={relating} />
		{/if}
	</span>
</button>

<style>
	.entry-btn {
		width: 100%;
		padding: var(--space-3) 0;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		display: grid;
		gap: var(--space-2);
		text-align: left;
		transition: var(--transition);
		-webkit-tap-highlight-color: transparent;
	}

	.entry-btn:hover,
	.entry-btn.active {
		color: var(--text);
	}

	.entry-btn.active :global(.hex-answer__name) {
		color: var(--accent);
	}

	.entry-btn.active :global(.hex-answer__num) {
		color: var(--accent-dim);
	}

	.entry-btn:focus {
		outline: none;
	}

	.entry-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-3);
	}

	.entry-q {
		flex: 1;
		min-width: 0;
		text-align: left;
		font-size: var(--text-base);
		color: var(--text-soft);
		line-height: var(--leading-tight);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.entry-q--empty {
		color: var(--text-faint);
	}

	.entry-time {
		flex-shrink: 0;
		font-size: var(--text-sm);
		color: var(--text-faint);
		white-space: nowrap;
	}

	.entry-answer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2) var(--space-2);
		font-size: var(--text-lg);
		color: var(--text-muted);
	}

	.entry-arrow {
		color: var(--text-faint);
		font-size: var(--text-base);
	}
</style>
