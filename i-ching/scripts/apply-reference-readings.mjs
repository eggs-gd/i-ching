#!/usr/bin/env node
/** Apply curated reference-readings-uk.json to hexagram JSON files (uk locale reading + name). */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const hexDir = join(__dirname, '../src/lib/data/hexagrams');
const ukReadingsPath = join(__dirname, 'uk-readings.json');
const reference = JSON.parse(
	readFileSync(join(__dirname, 'reference-readings-uk.json'), 'utf8')
);

const ukReadings = existsSync(ukReadingsPath)
	? JSON.parse(readFileSync(ukReadingsPath, 'utf8'))
	: {};

let applied = 0;

for (const file of readdirSync(hexDir).filter((f) => /^\d{2}\.json$/.test(f))) {
	const path = join(hexDir, file);
	const record = JSON.parse(readFileSync(path, 'utf8'));
	const ref = reference[String(record.number)];

	if (!ref) continue;

	record.locales ??= {};
	record.locales.uk ??= {};
	record.locales.uk.name = ref.name;
	record.locales.uk.reading = ref.reading;

	writeFileSync(path, JSON.stringify(record, null, '\t') + '\n');

	if (ukReadings[String(record.number)]) {
		ukReadings[String(record.number)] = {
			...ukReadings[String(record.number)],
			name: ref.name,
			reading: ref.reading
		};
	}

	applied++;
}

if (applied > 0 && existsSync(ukReadingsPath)) {
	writeFileSync(ukReadingsPath, JSON.stringify(ukReadings, null, '\t') + '\n');
}

console.log(`Applied ${applied} reference readings to hexagram files`);
