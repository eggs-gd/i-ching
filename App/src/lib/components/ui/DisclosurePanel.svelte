<script lang="ts">
	import type { Snippet } from 'svelte';
	import Chevron from './Chevron.svelte';

	interface Props {
		title: string;
		tone?: 'neutral' | 'warning';
		titleColor?: 'muted' | 'faint' | 'changing';
		children?: Snippet;
		summaryEnd?: Snippet;
	}

	let { title, tone = 'neutral', titleColor = 'changing', children, summaryEnd }: Props = $props();
</script>

<details class="panel" class:warning={tone === 'warning'}>
	<summary class="summary">
		<span
			class="summary-title"
			class:faint={titleColor === 'faint'}
			class:muted={titleColor === 'muted'}
		>
			{title}
		</span>
		<span class="summary-end">
			{@render summaryEnd?.()}
			<Chevron />
		</span>
	</summary>
	<div class="body">
		{@render children?.()}
	</div>
</details>

<style>
	.panel {
		margin: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--fill-subtle);
		text-align: left;
	}

	.panel.warning {
		border-color: var(--border-warning);
		background: var(--fill-warning);
	}

	.summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-3);
		cursor: pointer;
		list-style: none;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
	}

	.summary:focus {
		outline: none;
	}

	.summary::-webkit-details-marker {
		display: none;
	}

	.summary-title {
		flex: 1;
		min-width: 0;
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--line-changing);
	}

	.summary-end {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.panel[open] :global(.chevron) {
		transform: rotate(-135deg);
	}

	.summary-title.faint {
		color: var(--text-faint);
	}

	.summary-title.muted {
		color: var(--text-muted);
	}

	.body {
		padding: 0 0.75rem 0.75rem;
	}
</style>
