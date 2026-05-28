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
		empty
			? i18n.t('coins.pending')
			: side === 'yang'
				? i18n.t('coins.yang')
				: i18n.t('coins.yin')
	);
</script>

<div
	class="coin-face"
	class:yang={side === 'yang'}
	class:yin={side === 'yin'}
	class:empty={empty}
	class:spinning={spinning}
	role="img"
	aria-label={label}
>
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

<style>
	.coin-face {
		width: 2.75rem;
		height: 2.75rem;
		transition:
			transform 0.35s ease,
			opacity 0.35s ease;
	}

	.coin-face.spinning {
		animation: coin-toss 0.55s ease-in-out infinite;
	}

	.coin-face.empty {
		opacity: 0.22;
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
		--coin-fill: rgba(196, 165, 116, 0.22);
		--coin-stroke: var(--accent);
		--coin-mark: var(--line-yang);
	}

	.yin {
		--coin-fill: rgba(90, 84, 76, 0.35);
		--coin-stroke: var(--line-yin);
		--coin-mark: var(--text-muted);
	}

	.empty {
		--coin-fill: transparent;
		--coin-stroke: var(--border);
		--coin-mark: transparent;
	}

	@keyframes coin-toss {
		0%,
		100% {
			transform: translateY(0) rotateY(0deg);
		}
		50% {
			transform: translateY(-6px) rotateY(180deg);
		}
	}
</style>
