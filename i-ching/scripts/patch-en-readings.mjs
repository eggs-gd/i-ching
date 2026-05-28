import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const hexDir = join(__dirname, '../src/lib/data/hexagrams');
const enReadings = JSON.parse(readFileSync(join(__dirname, 'en-readings.json'), 'utf8'));

const files = readdirSync(hexDir).filter((f) => f.endsWith('.json'));

for (const file of files) {
	const path = join(hexDir, file);
	const record = JSON.parse(readFileSync(path, 'utf8'));
	const en = enReadings[String(record.number)];

	if (!en) {
		console.warn(`Missing EN readings for ${record.number}`);
		continue;
	}

	record.locales.en = en;
	writeFileSync(path, JSON.stringify(record, null, '\t') + '\n');
}

console.log(`Patched ${files.length} hexagram files`);
