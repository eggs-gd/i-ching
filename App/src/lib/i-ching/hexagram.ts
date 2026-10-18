import { binaryForHexagramNumber, kingWenNumberFromLines, lineValuesFromBinary } from './catalog';
import type { Line } from './types';

export function staticLinesForHexagram(number: number): Line[] {
	return lineValuesFromBinary(binaryForHexagramNumber(number)).map((value) => ({
		value,
		kind: 'young',
		changing: false
	}));
}

export function linesForHexagramPair(primaryNumber: number, relatingNumber?: number): Line[] {
	const base = staticLinesForHexagram(primaryNumber);

	if (!relatingNumber || relatingNumber === primaryNumber) {
		return base;
	}

	const targetValues = lineValuesFromBinary(binaryForHexagramNumber(relatingNumber));

	return base.map((line, index) => ({
		value: line.value,
		kind: line.kind,
		changing: line.value !== targetValues[index]
	}));
}

export function getTransformedLines(lines: Line[]): Line[] {
	return lines.map((line) =>
		line.changing
			? {
					...line,
					value: line.value === 'yang' ? ('yin' as const) : ('yang' as const),
					changing: false
				}
			: line
	);
}

export function getChangingLines(lines: Line[]): number[] {
	return lines
		.map((line, index) => (line.changing ? index + 1 : null))
		.filter((line): line is number => line !== null);
}

export function getRelatingHexagramNumber(lines: Line[]): number | undefined {
	const changing = getChangingLines(lines);

	if (changing.length === 0) {
		return undefined;
	}

	return kingWenNumberFromLines(getTransformedLines(lines));
}

