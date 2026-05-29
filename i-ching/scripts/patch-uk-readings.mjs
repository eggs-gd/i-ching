import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');
const hexDir = join(__dirname, '../src/lib/data/hexagrams');
const ukReadings = JSON.parse(readFileSync(join(dataDir, 'uk-readings.json'), 'utf8'));

const files = readdirSync(hexDir).filter((f) => f.endsWith('.json'));

for (const file of files) {
	const path = join(hexDir, file);
	const record = JSON.parse(readFileSync(path, 'utf8'));
	const uk = ukReadings[String(record.number)];

	if (!uk) {
		console.warn(`Missing UK readings for ${record.number}`);
		continue;
	}

	record.locales.uk = uk;
	writeFileSync(path, JSON.stringify(record, null, '\t') + '\n');
}

console.log(`Patched ${files.length} hexagram files with Ukrainian readings`);
