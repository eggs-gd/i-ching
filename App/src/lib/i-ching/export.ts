import { groupJournalEntries } from '$lib/i-ching/journal';
import type { Casting } from '$lib/i-ching/types';

function formatTime(iso: string, dateLocale: string): string {
	return new Date(iso).toLocaleTimeString(dateLocale, {
		hour: '2-digit',
		minute: '2-digit'
	});
}

function hexLine(entry: Casting): string {
	if (entry.relatingNumber) {
		return `${entry.primaryNumber} -> ${entry.relatingNumber}`;
	}
	return String(entry.primaryNumber);
}

/** Markdown export grouped by day (newest day first, same order as the journal list). */
export function buildArchiveMarkdown(entries: Casting[], dateLocale: string): string {
	if (!entries.length) return '';

	const groups = groupJournalEntries(entries, dateLocale);
	let md = '';

	for (const year of groups) {
		for (const month of year.months) {
			for (const day of month.days) {
				md += `## ${day.label}\n\n`;
				for (const entry of day.entries) {
					const time = formatTime(entry.createdAt, dateLocale);
					const question = entry.question.trim() || '—';
					md += `${time} ${question}\n`;
					md += `${hexLine(entry)}\n\n`;
				}
			}
		}
	}

	return md.trimEnd();
}

export function archiveFilename(): string {
	const d = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return `iching-archive-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}.md`;
}
