import { lineFromCoins, tossHexagramWithCoins, tossOneCoin, tossThreeCoins } from './coins';
import {
	getChangingLines,
	getHexagramNumber,
	getRelatingHexagramNumber,
	isValidHexagramNumber,
	linesForHexagramPair,
	staticLinesForHexagram
} from './hexagram';
import {
	createCastingId,
	deleteJournalEntries as removeJournalEntries,
	getCastingCoinRows,
	loadJournal,
	saveCasting
} from './journal';
import { hapticToss } from '$lib/platform/native';
import type { Casting, CoinValue, FlowStep, Line, Locale, TossMode } from './types';

function pause(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export class CastingFlow {
	step = $state<FlowStep>('question');
	question = $state('');
	tossMode = $state<TossMode>('line');
	locale = $state<Locale>('uk');
	lines = $state<Line[]>([]);
	revealedLines = $state(0);
	casting = $state<Casting | null>(null);
	journal = $state<Casting[]>([]);
	tossing = $state(false);
	coinRows = $state<CoinValue[][]>([]);
	currentLineCoins = $state<CoinValue[]>([]);
	spinningLine = $state<number | null>(null);
	spinningCoin = $state<number | null>(null);

	private runId = 0;

	get activeLine(): number | null {
		if (this.lines.length >= 6) return null;
		if (this.spinningLine !== null) return this.spinningLine;
		if (this.currentLineCoins.length > 0) return this.lines.length + 1;
		return null;
	}

	get lineCoins(): ((CoinValue | undefined)[] | undefined)[] {
		const grid: ((CoinValue | undefined)[] | undefined)[] = Array.from({ length: 6 });

		for (let i = 0; i < this.coinRows.length; i++) {
			grid[i] = [...this.coinRows[i]];
		}

		if (this.currentLineCoins.length > 0) {
			const slots: (CoinValue | undefined)[] = [undefined, undefined, undefined];
			for (let i = 0; i < this.currentLineCoins.length; i++) {
				slots[i] = this.currentLineCoins[i];
			}
			grid[this.coinRows.length] = slots;
		}

		return grid;
	}

	get coinGridRevealed(): number {
		return Math.max(
			this.revealedLines,
			this.spinningLine ?? 0,
			this.lines.length + (this.currentLineCoins.length > 0 ? 1 : 0)
		);
	}

	setLocale(locale: Locale): void {
		this.locale = locale;
	}

	async loadJournal(): Promise<void> {
		this.journal = await loadJournal();
	}

	async deleteJournalEntries(ids: string[]): Promise<void> {
		if (ids.length === 0) return;

		await removeJournalEntries(ids);
		if (this.casting && ids.includes(this.casting.id)) {
			this.reset();
		}
		await this.loadJournal();
	}

	setQuestion(question: string): void {
		this.question = question;
	}

	async startCast(mode: TossMode): Promise<void> {
		if (!this.question.trim()) return;

		const runId = this.startRun();
		this.tossMode = mode;
		this.clearCurrentCast();

		if (mode === 'all') {
			await this.runAllToss(runId);
			return;
		}

		if (!this.isCurrentRun(runId)) return;
		this.step = 'toss';
	}

	async startManualCast(
		question: string,
		primaryNumber: number,
		relatingNumber?: number
	): Promise<boolean> {
		const trimmed = question.trim();
		if (!trimmed || !isValidHexagramNumber(primaryNumber)) return false;
		if (relatingNumber !== undefined && !isValidHexagramNumber(relatingNumber)) return false;

		this.startRun();
		this.clearCurrentCast();
		this.question = trimmed;

		const lines = linesForHexagramPair(primaryNumber, relatingNumber);
		const changingLines = getChangingLines(lines);
		const resolvedRelating =
			relatingNumber !== undefined && relatingNumber !== primaryNumber
				? relatingNumber
				: changingLines.length > 0
					? getRelatingHexagramNumber(lines)
					: undefined;

		const id = createCastingId();

		this.casting = {
			id,
			createdAt: new Date().toISOString(),
			question: trimmed,
			primaryNumber,
			relatingNumber: resolvedRelating,
			changingLines,
			lines,
			locale: this.locale,
			method: 'manual'
		};

		this.lines = lines;
		this.revealedLines = 6;
		this.coinRows = getCastingCoinRows(this.casting);
		this.currentLineCoins = [];

		await saveCasting(this.casting);
		this.journal = await loadJournal();
		this.step = 'reading';
		return true;
	}

	async tossNext(): Promise<void> {
		if (this.tossMode === 'line') {
			await this.tossNextLine();
		} else if (this.tossMode === 'single') {
			await this.tossNextCoin();
		}
	}

	reset(): void {
		this.runId++;
		this.step = 'question';
		this.question = '';
		this.clearCurrentCast();
		this.tossing = false;
	}

	viewJournalEntry(entry: Casting): void {
		this.runId++;
		this.question = entry.question;
		this.lines = entry.lines;
		this.revealedLines = 6;
		this.coinRows = getCastingCoinRows(entry);
		this.currentLineCoins = [];
		this.spinningLine = null;
		this.spinningCoin = null;
		this.tossing = false;
		this.casting = entry;
		this.step = 'reading';
	}

	viewHexagram(hexagramNumber: number): void {
		if (!isValidHexagramNumber(hexagramNumber)) return;

		this.runId++;
		const lines = staticLinesForHexagram(hexagramNumber);

		this.casting = {
			id: `motif-${hexagramNumber}`,
			createdAt: new Date().toISOString(),
			question: '',
			primaryNumber: hexagramNumber,
			changingLines: [],
			lines,
			locale: this.locale,
			method: 'motif'
		};

		this.question = '';
		this.lines = lines;
		this.revealedLines = 6;
		this.coinRows = getCastingCoinRows(this.casting);
		this.currentLineCoins = [];
		this.spinningLine = null;
		this.spinningCoin = null;
		this.tossing = false;
		this.step = 'reading';
	}

	private startRun(): number {
		this.runId++;
		return this.runId;
	}

	private isCurrentRun(runId: number): boolean {
		return runId === this.runId;
	}

	private clearCurrentCast(): void {
		this.lines = [];
		this.revealedLines = 0;
		this.casting = null;
		this.coinRows = [];
		this.currentLineCoins = [];
		this.spinningLine = null;
		this.spinningCoin = null;
	}

	private async runAllToss(runId: number): Promise<void> {
		this.step = 'toss';
		this.tossing = true;
		this.spinningLine = 1;
		this.spinningCoin = null;
		await pause(800);
		if (!this.isCurrentRun(runId)) return;

		await hapticToss();
		const { lines: result, coinRows } = tossHexagramWithCoins();
		this.coinRows = coinRows;
		this.lines = result;
		this.tossing = false;
		this.spinningLine = null;
		this.spinningCoin = null;
		this.step = 'building';

		for (let i = 0; i < 6; i++) {
			await pause(600);
			if (!this.isCurrentRun(runId)) return;
			this.revealedLines = i + 1;
		}

		await pause(400);
		if (!this.isCurrentRun(runId)) return;
		this.finishCasting(result);
	}

	private async tossNextLine(): Promise<void> {
		if (this.lines.length >= 6 || this.tossing) return;

		const runId = this.runId;
		const lineNum = this.lines.length + 1;
		this.spinningLine = lineNum;
		this.spinningCoin = null;
		this.tossing = true;
		await pause(600);
		if (!this.isCurrentRun(runId)) return;

		await hapticToss();
		const toss = tossThreeCoins();
		this.tossing = false;
		this.spinningLine = null;

		this.coinRows = [...this.coinRows, [...toss.coins]];
		const result = [...this.lines, toss.lines[0]];
		this.lines = result;
		this.revealedLines = result.length;

		if (result.length === 6) {
			await pause(400);
			if (!this.isCurrentRun(runId)) return;
			this.finishCasting(result);
		}
	}

	private async tossNextCoin(): Promise<void> {
		if (this.lines.length >= 6 || this.tossing) return;

		const runId = this.runId;
		const lineNum = this.lines.length + 1;
		const coinNum = this.currentLineCoins.length + 1;
		this.spinningLine = lineNum;
		this.spinningCoin = coinNum;
		this.tossing = true;
		await pause(400);
		if (!this.isCurrentRun(runId)) return;

		await hapticToss();
		this.tossing = false;
		this.spinningLine = null;
		this.spinningCoin = null;

		const coins = [...this.currentLineCoins, tossOneCoin()] as CoinValue[];
		this.currentLineCoins = coins;

		if (coins.length < 3) return;

		this.coinRows = [...this.coinRows, coins];
		const result = [...this.lines, lineFromCoins(coins as [CoinValue, CoinValue, CoinValue])];
		this.lines = result;
		this.revealedLines = result.length;
		this.currentLineCoins = [];

		if (result.length === 6) {
			await pause(400);
			if (!this.isCurrentRun(runId)) return;
			this.finishCasting(result);
		}
	}

	private async finishCasting(result: Line[]): Promise<void> {
		const primaryNumber = getHexagramNumber(result);
		const relatingNumber = getRelatingHexagramNumber(result);
		const changingLines = getChangingLines(result);

		this.casting = {
			id: createCastingId(),
			createdAt: new Date().toISOString(),
			question: this.question.trim(),
			primaryNumber,
			relatingNumber,
			changingLines,
			lines: result,
			coinRows: this.coinRows.map((row) => [...row]),
			locale: this.locale,
			method: this.tossMode
		};

		await saveCasting(this.casting);
		this.journal = await loadJournal();
		this.step = 'reading';
	}
}

export function createCastingFlow(): CastingFlow {
	return new CastingFlow();
}
