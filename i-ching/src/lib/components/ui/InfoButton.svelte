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
	onmousedown={(event) => {
		// Keep focus from sticking on the trigger (esp. inside <summary>)
		event.preventDefault();
	}}
	onclick={(event) => {
		event.preventDefault();
		event.stopPropagation();
		onclick();
		(event.currentTarget as HTMLButtonElement).blur();
	}}
>
	i
</button>

<style>
	.info-btn {
		width: 1.2rem;
		height: 1.2rem;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-muted);
		font-family: var(--font-serif);
		font-size: var(--text-base);
		font-style: italic;
		line-height: 1;
		cursor: pointer;
		flex-shrink: 0;
	}

	.info-btn:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}

	.info-btn:focus {
		outline: none;
	}
</style>
