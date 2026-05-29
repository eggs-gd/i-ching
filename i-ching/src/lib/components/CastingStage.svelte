<script lang="ts">
	import type { CoinValue, FlowStep, Line, TossMode } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';
	import { CoinGrid } from '$lib/components/primitives';

	interface Props {
		step: FlowStep;
		tossMode: TossMode;
		lineCoins: ((CoinValue | undefined)[] | undefined)[];
		lines: Line[];
		spinningLine: number | null;
		spinningCoin: number | null;
		revealedLines: number;
		coinGridRevealed: number;
		activeLine: number | null;
		tossing: boolean;
		onTossNext: () => void;
		immersive?: boolean;
	}

	let {
		step,
		tossMode,
		lineCoins,
		lines,
		spinningLine,
		spinningCoin,
		revealedLines,
		coinGridRevealed,
		activeLine,
		tossing,
		onTossNext,
		immersive = false
	}: Props = $props();

	const i18n = useI18n();
	const tossActionLabel = $derived(
		tossMode === 'single' ? i18n.t('flow.tossSingle') : i18n.t('flow.tossLine')
	);
</script>

<section class="step cast-step" class:cast-step--immersive={immersive}>
	<CoinGrid
		{lineCoins}
		{lines}
		spinningLine={step === 'reading' ? null : spinningLine}
		spinningCoin={step === 'reading' ? null : spinningCoin}
		revealedLines={step === 'reading' ? 6 : coinGridRevealed}
		activeLine={step === 'reading' ? null : activeLine}
	/>

	{#if step === 'toss' && tossMode !== 'all'}
		{#if lines.length < 6}
			<button class="primary-btn toss-action" onclick={onTossNext} disabled={tossing}>
				{tossActionLabel}
			</button>
		{/if}
	{:else if step === 'toss'}
		<p class="status">{i18n.t('flow.tossing')}</p>
	{/if}
</section>

<style>
	.step {
		margin-bottom: 2rem;
	}

	.cast-step {
		text-align: center;
		padding: 1rem 0 2rem;
	}

	.primary-btn {
		width: 100%;
		padding: var(--space-5) var(--space-6);
		border-radius: var(--radius);
		background: var(--accent-dim);
		color: var(--bg);
		font-size: var(--text-base);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		transition: var(--transition-all);
	}

	.primary-btn:hover:not(:disabled) {
		background: var(--accent);
	}

	.primary-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.toss-action {
		margin-top: var(--space-5);
	}

	.status {
		font-size: var(--text-sm);
		color: var(--text-faint);
		font-variant-numeric: tabular-nums;
		letter-spacing: var(--tracking-caps);
		margin: 1rem 0 0;
	}

	.cast-step--immersive {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 0;
		margin: 0;
		padding: 0;
		text-align: center;
	}

	.cast-step--immersive :global(.coin-grid) {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		max-width: 28rem;
		gap: clamp(0.45rem, 2.8vh, 1.1rem);
		margin: 0;
	}

	.cast-step--immersive :global(.coin-row) {
		grid-template-columns: var(--text-xl) 1fr var(--size-hex);
		gap: clamp(0.5rem, 2vw, 1rem);
	}

	.cast-step--immersive :global(.coins) {
		gap: clamp(0.5rem, 3vw, 1.1rem);
	}

	.cast-step--immersive :global(.coin-face),
	.cast-step--immersive :global(.glyph-placeholder),
	.cast-step--immersive :global(.glyph) {
		width: clamp(2.75rem, 14vw, 4.25rem);
		height: clamp(2.75rem, 14vw, 4.25rem);
	}

	.cast-step--immersive .toss-action {
		flex-shrink: 0;
		width: 100%;
		max-width: 28rem;
		margin-top: clamp(1rem, 4vh, 2rem);
	}

	.cast-step--immersive .status {
		flex-shrink: 0;
		margin-top: clamp(1rem, 4vh, 2rem);
	}
</style>
