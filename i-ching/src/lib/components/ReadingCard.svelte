<script lang="ts">
	import type { Hexagram, Line, TrigramId } from '$lib/i-ching/types';
	import {
		staticLinesForHexagram,
		trigramSymbols,
		trigramsFromLines
	} from '$lib/i-ching/hexagram';
	import { useI18n } from '$lib/i18n';
	import HelpPopup from './HelpPopup.svelte';
	import InfoButton from './InfoButton.svelte';

	interface Props {
		hexagram: Hexagram;
		lines?: Line[];
		label?: string;
		helpTitleKey?: string;
		helpBodyKey?: string;
	}

	let { hexagram, lines, label, helpTitleKey, helpBodyKey }: Props = $props();

	const i18n = useI18n();
	let helpOpen = $state(false);

	const helpTitle = $derived(helpTitleKey ? i18n.t(helpTitleKey) : '');
	const helpBody = $derived(helpBodyKey ? i18n.t(helpBodyKey) : '');

	const displayTrigrams = $derived(
		trigramsFromLines(lines ?? staticLinesForHexagram(hexagram.number))
	);

	function trigramName(id: TrigramId): string {
		return i18n.t(`trigrams.${id}`);
	}

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
		<div class="trigrams">
			<span title={trigramName(displayTrigrams.upper)}>{trigramSymbols[displayTrigrams.upper]}</span>
			<span title={trigramName(displayTrigrams.lower)}>{trigramSymbols[displayTrigrams.lower]}</span>
		</div>
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
</article>

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
		border-radius: 2px;
		padding: 1.5rem;
	}

	.label-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin: 0 0 1rem;
	}

	.label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		margin: 0;
	}

	.title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
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
		background: rgba(196, 165, 116, 0.04);
		font-family: var(--font-serif);
		font-size: 0.875rem;
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
		gap: 1rem;
		align-items: start;
		margin-bottom: 1.25rem;
	}

	.composition {
		margin: 0 0 1rem;
		font-family: var(--font-serif);
		font-size: 1.25rem;
		color: var(--text-muted);
	}

	.number {
		font-family: var(--font-serif);
		font-size: 2.5rem;
		color: var(--accent-dim);
		line-height: 1;
	}

	h2 {
		font-size: 1.55rem;
	}

	.meta {
		margin: 0;
		font-size: 1rem;
		color: var(--text-muted);
		display: flex;
		gap: 0.75rem;
	}

	.chinese {
		font-size: 1rem;
	}

	.trigrams {
		font-size: 2rem;
		display: flex;
		flex-direction: column;
		color: var(--text-muted);
	}

	.layers {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.layer-body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.layer-body p {
		margin: 0;
		font-size: 1rem;
		color: var(--text);
		line-height: 1.55;
	}

	.layer-mark {
		margin-right: 0.35rem;
		font-family: var(--font-serif);
		font-size: 1rem;
		color: var(--accent-dim);
		font-style: normal;
	}

	.layer.vector .layer-body p {
		font-size: 1rem;
		font-weight: 500;
	}

	.layer.vector .layer-mark {
		font-size: 1rem;
	}
</style>
