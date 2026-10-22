import { lineFromCoins, tossHexagramWithCoins, tossOneCoin, tossThreeCoins } from './coins';
import { kingWenNumberFromLines, isValidHexagramNumber } from './catalog';
import {
	getChangingLines,
	getRelatingHexagramNumber,
	linesForHexagramPair,
	staticLinesForHexagram
} from './hexagram';
import { createCastingId, getCastingCoinRows } from './journal';
import { journalStore } from '$lib/state/journal.svelte';
import { track } from '$lib/analytics';
import { hapticHexagramComplete, hapticToss } from '$lib/platform/native';
import { COIN_SPIN_MS } from './cast-timing';
import type { Casting, CoinValue, FlowStep, Line, Locale, TossMode } from './types';
import { analyticsConsent } from '$lib/state/analytics-consent.svelte';

/** Gives the reading a moment before the statistics popup (offered once per session). */
const STATISTICS_OFFER_DELAY_MS = 3000;
function offerStatisticsAfterReading(): void {
	setTimeout(() => analyticsConsent.offer(), STATISTICS_OFFER_DELAY_MS);
}

function pause(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function coinSpinSlots(line: number): { line: number; coin: number }[] {
	return [
		{ line, coin: 1 },
		{ line, coin: 2 },
		{ line, coin: 3 }
	];
}

function fullStackSpinSlots(): { line: number; coin: number }[] {
	const slots: { line: number; coin: number }[] = [];
	for (let line = 1; line <= 6; line++) {
		slots.push(...coinSpinSlots(line));
	}
	return slots;
}

export class CastingFlow {
	step = $state<FlowStep>('question');
	question = $state('');
	tossMode = $state<TossMode>('line');
	locale = $state<Locale>('uk');
	lines = $state<Line[]>([]);
	revealedLines = $state(0);
	casting = $state<Casting | null>(null);
	tossing = $state(false);
	coinRows = $state<(CoinValue | undefined)[][]>([]);
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
			this.lines.length + (this.currentLineCoins.length > 0 ? 1 : 0)
		);
	}

	setLocale(locale: Locale): void {
		this.locale = locale;
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
		const casting: Casting = {
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
		this.coinRows = getCastingCoinRows(casting);
		this.currentLineCoins = [];

		await journalStore.save(casting);
		track('casting_completed', { hexagram_number: primaryNumber, method: 'manual' });
		offerStatisticsAfterReading();
		this.casting = casting;
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

	private ensureCoinRow(lineNum: number): void {
		while (this.coinRows.length < lineNum) {
			this.coinRows = [...this.coinRows, [undefined, undefined, undefined]];
		}
	}

	private setCoinValue(lineNum: number, coinNum: number, value: CoinValue): void {
		this.ensureCoinRow(lineNum);
		const row = [...this.coinRows[lineNum - 1]];
		row[coinNum - 1] = value;
		this.coinRows = this.coinRows.map((existing, index) =>
			index === lineNum - 1 ? row : existing
		);
	}

	/** Spin one coin, haptic, then call `onLand` so the face shows immediately. */
	private async spinRevealCoin(
		runId: number,
		lineNum: number,
		coinNum: number,
		onLand: () => void
	): Promise<boolean> {
		if (!this.isCurrentRun(runId)) return false;

		this.tossing = true;
		this.spinningLine = lineNum;
		this.spinningCoin = coinNum;
		await pause(COIN_SPIN_MS);
		if (!this.isCurrentRun(runId)) return false;

		await hapticToss();
		onLand();
		this.spinningCoin = null;

		return this.isCurrentRun(runId);
	}

	private resolvedCoinRows(): CoinValue[][] {
		return this.coinRows.map((row) => row as CoinValue[]);
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
		this.coinRows = [];
		this.lines = [];
		this.revealedLines = 0;
		const { lines: result, coinRows: fullRows } = tossHexagramWithCoins();

		for (const { line, coin } of fullStackSpinSlots()) {
			const value = fullRows[line - 1][coin - 1];
			const lineResult = result[line - 1];
			const ok = await this.spinRevealCoin(runId, line, coin, () => {
				this.setCoinValue(line, coin, value);
				if (coin === 3) {
					this.lines = [...this.lines, lineResult];
					this.revealedLines = line;
				}
			});
			if (!ok) return;
		}

		this.tossing = false;
		this.spinningLine = null;
		if (!this.isCurrentRun(runId)) return;
		await this.finishCasting(result);
	}

	private async tossNextLine(): Promise<void> {
		if (this.lines.length >= 6 || this.tossing) return;

		const runId = this.runId;
		const lineNum = this.lines.length + 1;
		const toss = tossThreeCoins();

		this.currentLineCoins = [];

		for (let coin = 1; coin <= 3; coin++) {
			const value = toss.coins[coin - 1];
			const ok = await this.spinRevealCoin(runId, lineNum, coin, () => {
				this.currentLineCoins = [...this.currentLineCoins, value];
			});
			if (!ok) return;
		}

		this.tossing = false;
		this.spinningLine = null;

		this.coinRows = [...this.coinRows, [...toss.coins]];
		this.currentLineCoins = [];
		const result = [...this.lines, toss.lines[0]];
		this.lines = result;
		this.revealedLines = result.length;

		if (result.length === 6) {
			await pause(400);
			if (!this.isCurrentRun(runId)) return;
			await this.finishCasting(result);
		}
	}

	private async tossNextCoin(): Promise<void> {
		await this.tossCoin(tossOneCoin());
	}

	async tossRealCoin(value: CoinValue): Promise<void> {
		await this.tossCoin(value);
	}

	private async tossCoin(value: CoinValue): Promise<void> {
		if (this.lines.length >= 6 || this.tossing) return;

		const runId = this.runId;
		const lineNum = this.lines.length + 1;
		const coinNum = this.currentLineCoins.length + 1;

		const ok = await this.spinRevealCoin(runId, lineNum, coinNum, () => {
			this.currentLineCoins = [...this.currentLineCoins, value];
		});
		if (!ok) return;

		this.tossing = false;
		this.spinningLine = null;

		const coins = this.currentLineCoins;
		if (coins.length < 3) return;

		this.coinRows = [...this.coinRows, coins];
		const result = [...this.lines, lineFromCoins(coins as [CoinValue, CoinValue, CoinValue])];
		this.lines = result;
		this.revealedLines = result.length;
		this.currentLineCoins = [];

		if (result.length === 6) {
			await pause(400);
			if (!this.isCurrentRun(runId)) return;
			await this.finishCasting(result);
		}
	}

	private async finishCasting(result: Line[]): Promise<void> {
		await hapticHexagramComplete();

		const primaryNumber = kingWenNumberFromLines(result);
		const relatingNumber = getRelatingHexagramNumber(result);
		const changingLines = getChangingLines(result);

		const casting: Casting = {
			id: createCastingId(),
			createdAt: new Date().toISOString(),
			question: this.question.trim(),
			primaryNumber,
			relatingNumber,
			changingLines,
			lines: result,
			coinRows: this.resolvedCoinRows(),
			locale: this.locale,
			method: this.tossMode
		};

		await journalStore.save(casting);
		track('casting_completed', { hexagram_number: primaryNumber, method: this.tossMode });
		offerStatisticsAfterReading();
		this.casting = casting;
		this.step = 'reading';
	}
}

export function createCastingFlow(): CastingFlow {
	return new CastingFlow();
}
