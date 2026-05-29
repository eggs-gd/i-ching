<script lang="ts">
	interface Props {
		label: string;
		onclick: () => void;
	}

	let { label, onclick }: Props = $props();
</script>

<button
	type="button"
	class="more-text-btn"
	aria-label={label}
	title={label}
	onmousedown={(event) => {
		event.preventDefault();
	}}
	onclick={(event) => {
		event.preventDefault();
		event.stopPropagation();
		onclick();
		(event.currentTarget as HTMLButtonElement).blur();
	}}
>
	<svg viewBox="0 0 16 16" aria-hidden="true">
		<path d="M3 3.5h10M3 6.5h10M3 9.5h7" stroke="currentColor" stroke-width="1.15" fill="none" />
		<path
			d="M9.5 11.5 11.5 13.5 13.5 11.5"
			stroke="currentColor"
			stroke-width="1.15"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>

<style>
	.more-text-btn {
		display: grid;
		place-items: center;
		width: 1.35rem;
		height: 1.35rem;
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		flex-shrink: 0;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
	}

	.more-text-btn:hover {
		color: var(--text);
		border-color: var(--accent-dim);
	}

	.more-text-btn:focus {
		outline: none;
	}

	.more-text-btn svg {
		width: 0.85rem;
		height: 0.85rem;
		display: block;
	}
</style>
