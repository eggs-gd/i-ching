#!/usr/bin/env node
/** One-time: weather/forces/topology -> composition/scene/dynamics/vector */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');
const root = join(__dirname, '..');

function migrateReading(reading) {
	if (!reading) return reading;
	if (reading.composition && reading.scene) return reading;

	return {
		composition: reading.composition ?? '',
		scene: reading.weather ?? reading.scene ?? '',
		dynamics: reading.forces ?? reading.dynamics ?? '',
		vector: reading.topology ?? reading.vector ?? ''
	};
}

function migrateLocale(locale) {
	if (!locale?.reading) return locale;
	const reading = migrateReading(locale.reading);
	const composition = locale.composition ?? reading?.composition ?? '';
	if (reading && 'composition' in reading) {
		delete reading.composition;
	}
	return { ...locale, composition, reading };
}

function migrateRecord(record) {
	record.locales ??= {};
	for (const loc of ['uk', 'en']) {
		if (record.locales[loc]) {
			record.locales[loc] = migrateLocale(record.locales[loc]);
		}
	}
	return record;
}

function migrateJsonFile(path) {
	const data = JSON.parse(readFileSync(path, 'utf8'));
	if (typeof data.number === 'number') {
		writeFileSync(path, JSON.stringify(migrateRecord(data), null, '\t') + '\n');
		return 'hexagram';
	}

	let changed = false;
	for (const key of Object.keys(data)) {
		if (data[key]?.reading) {
			data[key] = migrateLocale(data[key]);
			changed = true;
		}
	}
	if (changed) {
		writeFileSync(path, JSON.stringify(data, null, '\t') + '\n');
		return 'bundle';
	}
	return null;
}

const hexDir = join(root, 'src/lib/data/hexagrams');
let count = 0;

for (const file of readdirSync(hexDir).filter((f) => f.endsWith('.json'))) {
	migrateJsonFile(join(hexDir, file));
	count++;
}

for (const name of ['en-readings.json', 'uk-readings.json']) {
	const p = join(dataDir, name);
	if (migrateJsonFile(p)) count++;
}

console.log(`Migrated reading fields in ${count} files`);
