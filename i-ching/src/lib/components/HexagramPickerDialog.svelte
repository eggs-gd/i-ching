<script lang="ts">
	import AppPopup from './AppPopup.svelte';
	import HexagramPickerOverlay from './HexagramPickerOverlay.svelte';

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

<AppPopup {open} {title} {titleId} {onClose} size="wide" scrollable>
	{#snippet children()}
		<HexagramPickerOverlay {title} {value} {onSelect} onBack={onClose} dialog />
	{/snippet}
</AppPopup>
