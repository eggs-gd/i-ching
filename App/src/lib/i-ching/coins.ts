import type { CoinValue, Line, LineKind, LineValue, HexagramToss, TossResult } from './types';

/** Three-coin method: heads = 3 (yang), tails = 2 (yin) */
export function tossOneCoin(rng: () => number = Math.random): CoinValue {
	return rng() < 0.5 ? 2 : 3;
}

export function coinToSide(value: CoinValue): LineValue {
	return value === 3 ? 'yang' : 'yin';
}

export function tossThreeCoins(rng: () => number = Math.random): TossResult {
	const coins: [CoinValue, CoinValue, CoinValue] = [
		tossOneCoin(rng),
		tossOneCoin(rng),
		tossOneCoin(rng)
	];
	const sum = coins.reduce((total, value) => total + value, 0);

	return { lines: [lineFromSum(sum)], sum, coins };
}

export function lineFromCoins(coins: [CoinValue, CoinValue, CoinValue]): Line {
	return lineFromSum(coins.reduce((total, value) => total + value, 0));
}

/** Valid three-coin outcomes for each line sum */
const COINS_BY_SUM: Record<number, [CoinValue, CoinValue, CoinValue][]> = {
	6: [[2, 2, 2]],
	7: [
		[2, 2, 3],
		[2, 3, 2],
		[3, 2, 2]
	],
	8: [
		[2, 3, 3],
		[3, 2, 3],
		[3, 3, 2]
	],
	9: [[3, 3, 3]]
};

function lineSum(line: Line): number {
	if (line.value === 'yin' && line.kind === 'old') return 6;
	if (line.value === 'yang' && line.kind === 'young') return 7;
	if (line.value === 'yin' && line.kind === 'young') return 8;
	return 9;
}

export function randomCoinsFromLine(
	line: Line,
	rng: () => number = Math.random
): [CoinValue, CoinValue, CoinValue] {
	const options = COINS_BY_SUM[lineSum(line)];
	return [...options[Math.floor(rng() * options.length)]];
}

/** Reconstruct coin rows from lines — random valid faces, stable when seeded */
export function coinRowsFromLines(lines: Line[], seed?: string): CoinValue[][] {
	const rng = seed ? seededRng(seed) : Math.random;

	return lines.map((line) => [...randomCoinsFromLine(line, rng)]);
}

export function tossHexagramWithCoins(rng: () => number = Math.random): HexagramToss {
	const lines: Line[] = [];
	const coinRows: CoinValue[][] = [];

	for (let i = 0; i < 6; i++) {
		const toss = tossThreeCoins(rng);
		lines.push(toss.lines[0]);
		coinRows.push([...toss.coins]);
	}

	return { lines, coinRows };
}

function lineFromSum(sum: number): Line {
	switch (sum) {
		case 6:
			return line('yin', 'old');
		case 7:
			return line('yang', 'young');
		case 8:
			return line('yin', 'young');
		case 9:
			return line('yang', 'old');
		default:
			throw new Error(`Invalid coin sum: ${sum}`);
	}
}

function line(value: LineValue, kind: LineKind): Line {
	return { value, kind, changing: kind === 'old' };
}

function seededRng(seed: string): () => number {
	let state = hashSeed(seed);

	return () => {
		state = (state * 1664525 + 1013904223) >>> 0;
		return state / 0x100000000;
	};
}

function hashSeed(seed: string): number {
	let hash = 2166136261;

	for (const char of seed) {
		hash ^= char.charCodeAt(0);
		hash = Math.imul(hash, 16777619);
	}

	return hash >>> 0;
}
