#!/usr/bin/env node
/** Apply curated reference-readings-uk.json to hexagram JSON files (uk locale reading + name). */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');
const hexDir = join(__dirname, '../App/src/lib/data/hexagrams');
const reference = JSON.parse(readFileSync(join(dataDir, 'reference-readings-uk.json'), 'utf8'));

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

	applied++;
}

console.log(`Applied ${applied} reference readings to hexagram files`);
