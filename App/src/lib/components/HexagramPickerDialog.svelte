<script lang="ts">
	import { AppPopup } from '$lib/components/ui';
	import HexagramTrigramSelectView from './HexagramTrigramSelectView.svelte';

	interface Props {
		open: boolean;
		title: string;
		titleId: string;
		value?: number | null;
		onSelect: (number: number) => void;
		onClose: () => void;
	}

	let { open, title, titleId, value = null, onSelect, onClose }: Props = $props();
</script>

<AppPopup {open} {title} {titleId} {onClose} size="wide" scrollable bodyClass="hex-picker-body">
	{#snippet children()}
		<HexagramTrigramSelectView {value} {onSelect} />
	{/snippet}
</AppPopup>

<style>
	:global(.hex-picker-body .trigram-view .rows) {
		justify-content: flex-start;
	}

	:global(.hex-picker-body .symbol) {
		font-size: clamp(1.2rem, 4vw, 1.65rem);
	}
</style>
