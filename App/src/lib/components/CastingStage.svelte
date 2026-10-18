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
		onRealCoin?: (value: CoinValue) => void;
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
		onRealCoin,
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

	{#if step === 'toss'}
		{#if tossMode === 'real'}
			{#if lines.length < 6}
				<div class="coin-picker" class:coin-picker--disabled={tossing}>
					<button
						class="coin-pick-btn yin"
						onclick={() => onRealCoin?.(2)}
						disabled={tossing}
						aria-label={i18n.t('coins.yin')}
					>
						<svg viewBox="0 0 48 48" aria-hidden="true">
							<circle cx="24" cy="24" r="21" class="ring" />
							<rect x="18.5" y="18.5" width="11" height="11" rx="0.5" class="hole" />
							<line x1="11" y1="22" x2="19" y2="22" class="mark" />
							<line x1="29" y1="26" x2="37" y2="26" class="mark" />
						</svg>
					</button>
					<button
						class="coin-pick-btn yang"
						onclick={() => onRealCoin?.(3)}
						disabled={tossing}
						aria-label={i18n.t('coins.yang')}
					>
						<svg viewBox="0 0 48 48" aria-hidden="true">
							<circle cx="24" cy="24" r="21" class="ring" />
							<rect x="18.5" y="18.5" width="11" height="11" rx="0.5" class="hole" />
							<line x1="11" y1="24" x2="37" y2="24" class="mark" />
						</svg>
					</button>
				</div>
			{/if}
		{:else if tossMode !== 'all'}
			{#if lines.length < 6}
				<button class="primary-btn toss-action" onclick={onTossNext} disabled={tossing}>
					{tossActionLabel}
				</button>
			{/if}
		{:else}
			<p class="status">{i18n.t('flow.tossing')}</p>
		{/if}
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

	.coin-picker {
		display: flex;
		gap: var(--space-5);
		justify-content: center;
		margin-top: var(--space-5);
	}

	.coin-pick-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-3);
		border: none;
		background: transparent;
		cursor: pointer;
		transition: var(--transition-all);
		-webkit-tap-highlight-color: transparent;
	}

	.coin-pick-btn svg {
		width: clamp(3.5rem, 18vw, 5rem);
		height: clamp(3.5rem, 18vw, 5rem);
		display: block;
	}

	.coin-pick-btn.yang {
		--coin-fill: var(--fill-strong);
		--coin-stroke: var(--accent);
		--coin-mark: var(--line-yang);
	}

	.coin-pick-btn.yin {
		--coin-fill: var(--coin-yin);
		--coin-stroke: var(--line-yin);
		--coin-mark: var(--text-muted);
	}

	.coin-pick-btn:not(:disabled):hover {
		transform: scale(1.04);
	}

	.coin-pick-btn:active:not(:disabled) {
		transform: scale(0.97);
	}

	.coin-pick-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.coin-pick-btn .ring {
		fill: var(--coin-fill);
		stroke: var(--coin-stroke);
		stroke-width: 1.5;
	}

	.coin-pick-btn .hole {
		fill: var(--bg);
		stroke: var(--coin-stroke);
		stroke-width: 1;
	}

	.coin-pick-btn .mark {
		stroke: var(--coin-mark);
		stroke-width: 2.25;
		stroke-linecap: round;
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

	.cast-step--immersive .coin-picker {
		flex-shrink: 0;
		margin-top: clamp(1rem, 4vh, 2rem);
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
