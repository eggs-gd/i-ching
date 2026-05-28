import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const hexDir = join(__dirname, '../src/lib/data/hexagrams');

const BINARY_TO_KING_WEN = [
	2, 24, 7, 19, 15, 36, 46, 12, 16, 51, 40, 54, 62, 55, 32, 34, 8, 3, 29, 60, 39, 63, 48, 5, 45,
	17, 47, 58, 31, 49, 28, 43, 23, 27, 4, 41, 52, 22, 18, 26, 35, 21, 64, 38, 56, 30, 50, 14, 20,
	42, 59, 61, 53, 37, 57, 9, 11, 25, 6, 10, 33, 13, 44, 1
];

const BOTTOM_PATTERN_TO_TRIGRAM = {
	'000': 'kun',
	'100': 'zhen',
	'011': 'xun',
	'010': 'kan',
	'101': 'li',
	'001': 'gen',
	'110': 'dui',
	'111': 'qian'
};

function binaryForHexagram(number) {
	for (let binary = 0; binary < 64; binary++) {
		if (BINARY_TO_KING_WEN[binary] === number) return binary;
	}
	throw new Error(`No binary for hexagram ${number}`);
}

function yangBitsToTrigramId(y0, y1, y2) {
	const key = `${y0}${y1}${y2}`;
	const id = BOTTOM_PATTERN_TO_TRIGRAM[key];
	if (!id) throw new Error(`Invalid trigram line pattern: ${key}`);
	return id;
}

function trigramsFromBinary(binary) {
	const lines = Array.from({ length: 6 }, (_, i) => (binary >> i) & 1);

	return {
		lower: yangBitsToTrigramId(lines[0], lines[1], lines[2]),
		upper: yangBitsToTrigramId(lines[3], lines[4], lines[5])
	};
}

const files = readdirSync(hexDir).filter((f) => f.endsWith('.json'));

for (const file of files) {
	const path = join(hexDir, file);
	const record = JSON.parse(readFileSync(path, 'utf8'));
	const binary = binaryForHexagram(record.number);
	const { lower, upper } = trigramsFromBinary(binary);

	record.lower = lower;
	record.upper = upper;
	writeFileSync(path, JSON.stringify(record, null, '\t') + '\n');
}

console.log(`Fixed trigrams in ${files.length} hexagram files`);

const h11 = JSON.parse(readFileSync(join(hexDir, '11.json'), 'utf8'));
const h42 = JSON.parse(readFileSync(join(hexDir, '42.json'), 'utf8'));
console.log('Hex 11:', h11.upper, 'over', h11.lower);
console.log('Hex 42:', h42.upper, 'over', h42.lower);
