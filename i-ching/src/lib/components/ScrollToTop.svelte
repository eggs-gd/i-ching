<script lang="ts">
	import { onMount } from 'svelte';
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();
	const SHOW_AFTER_PX = 320;

	let visible = $state(false);

	onMount(() => {
		const onScroll = () => {
			visible = window.scrollY > SHOW_AFTER_PX;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollToTop(): void {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}
</script>

<button
	type="button"
	class="scroll-top-btn"
	class:visible
	aria-label={i18n.t('app.scrollToTop')}
	title={i18n.t('app.scrollToTop')}
	onclick={scrollToTop}
>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M12 6.5 6 14h4.5v3.5h3V14H18L12 6.5z" />
	</svg>
</button>

<style>
	.scroll-top-btn {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: rgba(22, 20, 17, 0.72);
		backdrop-filter: blur(6px);
		color: var(--text-muted);
		cursor: pointer;
		opacity: 0;
		pointer-events: none;
		transform: translateY(0.35rem) scale(0.92);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease,
			border-color 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.scroll-top-btn.visible {
		opacity: 1;
		pointer-events: auto;
		transform: translateY(0) scale(1);
	}

	.scroll-top-btn:hover {
		border-color: var(--accent-dim);
		color: var(--text);
		transform: translateY(0) scale(1.05);
	}

	.scroll-top-btn:focus {
		outline: none;
	}

	svg {
		width: 1.15rem;
		height: 1.15rem;
		display: block;
		fill: currentColor;
	}
</style>
