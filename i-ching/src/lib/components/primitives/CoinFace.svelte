<script lang="ts">
	import type { CoinValue } from '$lib/i-ching/types';
	import { coinToSide } from '$lib/i-ching/coins';
	import { useI18n } from '$lib/i18n';

	interface Props {
		value?: CoinValue;
		empty?: boolean;
		spinning?: boolean;
	}

	let { value, empty = false, spinning = false }: Props = $props();

	const i18n = useI18n();

	const side = $derived(value ? coinToSide(value) : null);
	const label = $derived(
		empty ? i18n.t('coins.pending') : side === 'yang' ? i18n.t('coins.yang') : i18n.t('coins.yin')
	);
</script>

<div
	class="coin-face"
	class:yang={side === 'yang'}
	class:yin={side === 'yin'}
	class:empty
	class:spinning
	role="img"
	aria-label={label}
>
	<div class="coin-spin-inner">
		<svg viewBox="0 0 48 48" aria-hidden="true">
			<circle cx="24" cy="24" r="21" class="ring" />
			<rect x="18.5" y="18.5" width="11" height="11" class="hole" rx="0.5" />
			{#if side === 'yang'}
				<line x1="11" y1="24" x2="37" y2="24" class="mark" />
			{:else if side === 'yin'}
				<line x1="11" y1="22" x2="19" y2="22" class="mark" />
				<line x1="29" y1="26" x2="37" y2="26" class="mark" />
			{/if}
		</svg>
	</div>
</div>

<style>
	.coin-face {
		flex-shrink: 0;
		width: var(--size-glyph);
		height: var(--size-glyph);
		overflow: hidden;
		isolation: isolate;
	}

	.coin-spin-inner {
		width: 100%;
		height: 100%;
		transform-origin: center center;
		backface-visibility: hidden;
	}

	.coin-face:not(.spinning) {
		transition: opacity var(--coin-fade-duration) var(--ease);
	}

	.coin-face.empty:not(.spinning) {
		opacity: var(--coin-dim-opacity);
	}

	.coin-face.spinning {
		perspective: 14rem;
		animation: coin-toss-fade var(--coin-spin-duration) linear infinite;
	}

	.coin-face.spinning .coin-spin-inner {
		animation: coin-toss-spin var(--coin-spin-duration) ease-in-out infinite;
	}

	svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.ring {
		fill: var(--coin-fill);
		stroke: var(--coin-stroke);
		stroke-width: 1.5;
	}

	.hole {
		fill: var(--bg);
		stroke: var(--coin-stroke);
		stroke-width: 1;
	}

	.mark {
		stroke: var(--coin-mark);
		stroke-width: 2.25;
		stroke-linecap: round;
	}

	.yang {
		--coin-fill: var(--fill-strong);
		--coin-stroke: var(--accent);
		--coin-mark: var(--line-yang);
	}

	.yin {
		--coin-fill: var(--coin-yin);
		--coin-stroke: var(--line-yin);
		--coin-mark: var(--text-muted);
	}

	.empty {
		--coin-fill: transparent;
		--coin-stroke: var(--border);
		--coin-mark: transparent;
	}

	@keyframes coin-toss-spin {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(540deg);
		}
	}

	@keyframes coin-toss-fade {
		from {
			opacity: var(--coin-spin-start-opacity);
		}
		to {
			opacity: 1;
		}
	}
</style>
