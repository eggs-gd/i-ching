<script lang="ts">
	import type { Casting } from '$lib/i-ching/types';
	import type { JournalYearGroup } from '$lib/i-ching/journal';
	import JournalEntryButton from './JournalEntryButton.svelte';

	interface Props {
		grouped: JournalYearGroup[];
		activeCastingId?: string | null;
		onEntrySelect: (entry: Casting) => void;
	}

	let { grouped, activeCastingId = null, onEntrySelect }: Props = $props();
</script>

<div class="entries-grouped">
	{#each grouped as year (year.key)}
		<section class="group-year" aria-labelledby="journal-year-{year.key}">
			<h3 class="group-year-label" id="journal-year-{year.key}">{year.label}</h3>
			{#each year.months as month (month.key)}
				<section class="group-month" aria-labelledby="journal-month-{month.key}">
					<h4 class="group-month-label" id="journal-month-{month.key}">{month.label}</h4>
					{#each month.days as day (day.key)}
						<section class="group-day" aria-labelledby="journal-day-{day.key}">
							<h5 class="group-day-label" id="journal-day-{day.key}">{day.label}</h5>
							<ul class="entries">
								{#each day.entries as entry (entry.id)}
									<li>
										<JournalEntryButton
											{entry}
											active={activeCastingId === entry.id}
											onSelect={onEntrySelect}
										/>
									</li>
								{/each}
							</ul>
						</section>
					{/each}
				</section>
			{/each}
		</section>
	{/each}
</div>

<style>
	.entries-grouped {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.group-year,
	.group-month,
	.group-day {
		margin: 0;
	}

	.group-year-label,
	.group-month-label,
	.group-day-label {
		margin: 0;
		font-weight: 400;
	}

	.group-year-label {
		font-family: var(--font-serif);
		font-size: var(--text-xl);
		color: var(--text-muted);
		letter-spacing: var(--tracking-caps);
		margin-bottom: var(--space-4);
	}

	.group-month {
		margin-bottom: var(--space-5);
	}

	.group-month:last-child {
		margin-bottom: 0;
	}

	.group-month-label {
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--text-faint);
		margin-bottom: var(--space-3);
	}

	.group-day {
		margin-bottom: var(--space-4);
	}

	.group-day:last-child {
		margin-bottom: 0;
	}

	.group-day-label {
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--text-muted);
		margin-bottom: var(--space-1);
	}

	.entries {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.entries li {
		border-bottom: 1px solid var(--border);
	}
</style>
