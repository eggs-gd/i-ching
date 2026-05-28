<script lang="ts">
	interface Props {
		label: string;
		onclick: () => void;
	}

	let { label, onclick }: Props = $props();
</script>

<button
	type="button"
	class="info-btn"
	aria-label={label}
	onclick={(event) => {
		event.preventDefault();
		event.stopPropagation();
		onclick();
	}}
>
	i
</button>

<style>
	.info-btn {
		width: 1.1rem;
		height: 1.1rem;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: transparent;
		color: var(--text-muted);
		font-family: var(--font-serif);
		font-size: 0.62rem;
		font-style: italic;
		line-height: 1;
		cursor: pointer;
		flex-shrink: 0;
	}

	.info-btn:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}
</style>
