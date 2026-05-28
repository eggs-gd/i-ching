<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		tone?: 'neutral' | 'warning';
		titleColor?: 'muted' | 'faint' | 'changing';
		children?: Snippet;
		summaryEnd?: Snippet;
	}

	let {
		title,
		tone = 'neutral',
		titleColor = 'changing',
		children,
		summaryEnd
	}: Props = $props();
</script>

<details class="panel" class:warning={tone === 'warning'}>
	<summary class="summary">
		<span class="summary-title" class:faint={titleColor === 'faint'} class:muted={titleColor === 'muted'}>
			{title}
		</span>
		{@render summaryEnd?.()}
	</summary>
	<div class="body">
		{@render children?.()}
	</div>
</details>

<style>
	.panel {
		margin: 0;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: rgba(196, 165, 116, 0.03);
		text-align: left;
	}

	.panel.warning {
		border-color: rgba(201, 120, 90, 0.4);
		background: rgba(201, 120, 90, 0.12);
	}

	.summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.55rem 0.75rem;
		cursor: pointer;
		list-style: none;
	}

	.summary::-webkit-details-marker {
		display: none;
	}

	.summary-title {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--line-changing);
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
