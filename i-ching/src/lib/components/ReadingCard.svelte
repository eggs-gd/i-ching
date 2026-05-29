<script lang="ts">
	import type { Hexagram } from '$lib/i-ching/types';
	import { getHexagramExtended, hasHexagramExtended } from '$lib/i-ching/catalog';
	import type { HexagramExtendedContent } from '$lib/i-ching/catalog';
	import { useI18n } from '$lib/i18n';
	import { HexagramFontIcon } from '$lib/components/primitives';
	import HexagramExtendedPopup from './HexagramExtendedPopup.svelte';
	import HelpPopup from './HelpPopup.svelte';
	import { InfoButton, MoreTextButton } from '$lib/components/ui';

	interface Props {
		hexagram: Hexagram;
		label?: string;
		helpTitleKey?: string;
		helpBodyKey?: string;
	}

	let { hexagram, label, helpTitleKey, helpBodyKey }: Props = $props();

	const i18n = useI18n();
	let helpOpen = $state(false);
	let extendedOpen = $state(false);
	let extendedLoading = $state(false);
	let extended = $state<HexagramExtendedContent | null>(null);
	let extendedRequest = 0;

	const showExtended = $derived(hasHexagramExtended(hexagram.number, i18n.locale));

	const helpTitle = $derived(helpTitleKey ? i18n.t(helpTitleKey) : '');
	const helpBody = $derived(helpBodyKey ? i18n.t(helpBodyKey) : '');

	function paragraphs(text: string): string[] {
		return text
			.split(/\n\s*\n/)
			.map((part) => part.trim())
			.filter(Boolean);
	}

	const readingLayers = $derived([
		hexagram.reading.scene,
		hexagram.reading.dynamics,
		hexagram.reading.vector
	]);

	const classicalTexts = $derived([hexagram.judgment, hexagram.image].filter(Boolean));

	$effect(() => {
		hexagram.number;
		i18n.locale;
		extendedRequest++;
		extended = null;
		extendedOpen = false;
		extendedLoading = false;
	});

	async function openExtended(): Promise<void> {
		if (!showExtended || extendedLoading) return;

		if (extended) {
			extendedOpen = true;
			return;
		}

		const request = ++extendedRequest;
		extendedLoading = true;
		const loaded = await getHexagramExtended(hexagram.number, i18n.locale);
		if (request !== extendedRequest) return;

		extended = loaded;
		extendedLoading = false;
		if (loaded) {
			extendedOpen = true;
		}
	}
</script>

<article class="reading">
	{#if label}
		<div class="label-row">
			<p class="label">{label}</p>
			{#if helpTitleKey}
				<InfoButton label={helpTitle} onclick={() => (helpOpen = true)} />
			{/if}
		</div>
	{/if}

	<header class="header">
		<span class="number">{hexagram.number}</span>
		<div class="title-block">
			<div class="title-row">
				<h2>{hexagram.name}</h2>
				{#if !label && helpTitleKey}
					<InfoButton label={helpTitle} onclick={() => (helpOpen = true)} />
				{/if}
			</div>
			<p class="meta">
				<span class="chinese">{hexagram.chinese}</span>
				<span class="pinyin">{hexagram.pinyin}</span>
			</p>
			<p class="composition">{hexagram.composition}</p>
		</div>
		<HexagramFontIcon number={hexagram.number} label={hexagram.name} />
	</header>

	{#if classicalTexts.length > 0}
		<blockquote class="classical">
			{#each classicalTexts as text}
				{#each paragraphs(text) as paragraph}
					<p>{paragraph}</p>
				{/each}
			{/each}
		</blockquote>
	{/if}

	<section class="layers">
		{#each readingLayers as layerText, layerIndex}
			<div class="layer" class:vector={layerIndex === 2}>
				<div class="layer-body">
					{#each paragraphs(layerText) as paragraph, index}
						<p>
							{#if index === 0}
								<span class="layer-mark" aria-hidden="true">¶</span>
							{/if}
							{paragraph}
						</p>
					{/each}
				</div>
			</div>
		{/each}
	</section>

	{#if showExtended}
		<footer class="extended-footer">
			<MoreTextButton label={i18n.t('reading.extendedOpen')} onclick={openExtended} />
		</footer>
	{/if}
</article>

{#if showExtended && extended}
	<HexagramExtendedPopup
		open={extendedOpen}
		{hexagram}
		{extended}
		onClose={() => (extendedOpen = false)}
	/>
{/if}

{#if helpTitleKey}
	<HelpPopup
		open={helpOpen}
		title={helpTitle}
		body={helpBody}
		closeLabel={i18n.t('reading.helpClose')}
		onClose={() => (helpOpen = false)}
	/>
{/if}

<style>
	.reading {
		background: var(--bg-paper);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--space-5);
	}

	.label-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		margin: 0 0 1rem;
	}

	.label {
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--text-muted);
		margin: 0;
	}

	.title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: 0.25rem;
	}

	.title-row h2 {
		margin: 0;
	}

	.classical {
		margin: 0 0 1rem;
		padding: 0.65rem 0 0.65rem 0.85rem;
		border: none;
		border-left: 2px solid var(--border);
		background: var(--fill-subtle);
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		font-style: italic;
		color: var(--text-muted);
		line-height: 1.5;
	}

	.classical p {
		margin: 0;
	}

	.classical p + p {
		margin-top: 0.55rem;
	}

	.header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: var(--space-4);
		align-items: start;
		margin-bottom: var(--space-5);
	}

	.composition {
		margin: 0 0 1rem;
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		color: var(--text-muted);
	}

	.number {
		font-family: var(--font-serif);
		font-size: var(--text-hero);
		color: var(--accent-dim);
		line-height: 1.5;
	}

	h2 {
		font-size: var(--text-xl);
	}

	.meta {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--text-muted);
		display: flex;
		gap: var(--space-3);
	}

	.chinese {
		font-size: var(--text-lg);
	}

	.layers {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.layer-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.layer-body p {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--text);
		line-height: var(--leading-normal);
	}

	.layer-mark {
		margin-right: 0.35rem;
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--accent-dim);
		font-style: normal;
	}

	.layer.vector .layer-body p {
		font-size: var(--text-lg);
		font-weight: 500;
	}

	.layer.vector .layer-mark {
		font-size: var(--text-lg);
	}

	.extended-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: var(--space-4);
		padding-top: var(--space-3);
		border-top: 1px solid var(--border);
	}
</style>
