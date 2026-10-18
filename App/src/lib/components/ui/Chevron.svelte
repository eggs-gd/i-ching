<script lang="ts">
	type ChevronDirection = 'disclosure' | 'forward';

	interface Props {
		direction?: ChevronDirection;
	}

	let { direction = 'disclosure' }: Props = $props();
</script>

<span class="chevron" class:forward={direction === 'forward'} aria-hidden="true"></span>

<style>
	.chevron {
		display: block;
		width: 0.45rem;
		height: 0.45rem;
		border-right: 1.5px solid var(--text-faint);
		border-bottom: 1.5px solid var(--text-faint);
		transform: rotate(45deg);
		transition: var(--transition);
		flex-shrink: 0;
	}

	.chevron.forward {
		transform: rotate(-45deg);
	}
</style>
