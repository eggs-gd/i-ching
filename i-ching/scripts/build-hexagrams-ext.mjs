import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sourcePath = path.join(__dirname, 'data/iching_wilhelm_translation.js');
const outRoot = path.join(root, 'src/lib/data/hexagrams_ext');

const raw = fs.readFileSync(sourcePath, 'utf8');
const jsonText = raw.replace(/^export default\s*/, '').trim().replace(/;$/, '');
const data = JSON.parse(jsonText);

for (const entry of Object.values(data)) {
	const number = entry.hex;
	const pad = String(number).padStart(2, '0');
	const record = { ...entry, number };
	const serialized = `${JSON.stringify(record, null, '\t')}\n`;

	for (const locale of ['en', 'uk']) {
		const dir = path.join(outRoot, locale);
		fs.mkdirSync(dir, { recursive: true });
		fs.writeFileSync(path.join(dir, `${pad}.json`), serialized);
	}
}

console.log(`Wrote ${Object.keys(data).length} hexagrams × 2 locales → ${outRoot}`);
