import type { Casting } from '$lib/i-ching/types';

type DeleteEntriesFn = (ids: string[]) => Promise<void>;

let entries = $state<Casting[]>([]);
let deleteEntriesFn: DeleteEntriesFn | null = null;

export const journalBridge = {
	get journal(): Casting[] {
		return entries;
	},
	setJournal(next: Casting[]): void {
		entries = next;
	},
	registerDelete(fn: DeleteEntriesFn): void {
		deleteEntriesFn = fn;
	},
	async deleteEntries(ids: string[]): Promise<void> {
		if (!deleteEntriesFn || ids.length === 0) return;
		await deleteEntriesFn(ids);
	}
};
