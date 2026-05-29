import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const shortDir = path.join(root, 'src/lib/data/hexagrams');
const sourceDir = path.join(root, 'src/lib/data/hexagrams_ext/en');
const targetRoot = path.join(root, 'src/lib/data/hexagrams_ext');

const delimiter = 'ZXQZXQZXQ';
const maxBatchChars = 3000;
const delayMs = 500;
const retryDelayMs = 30_000;

const args = parseArgs(process.argv.slice(2));
const lang = args.lang;

if (!lang) {
	console.error(
		'Usage: node scripts/translate-hexagrams-ext.mjs --lang <locale> [--force] [--sync-only]'
	);
	process.exit(1);
}

if (lang === 'en') {
	console.error('English is the source locale. Choose another target language.');
	process.exit(1);
}

const targetDir = path.join(targetRoot, lang);

const copyKeys = new Set([
	'hex',
	'hex_font',
	'trad_chinese',
	'pinyin',
	'binary',
	'od',
	'number',
	'chinese'
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseArgs(values) {
	const parsed = {
		force: false,
		syncOnly: false
	};

	for (let index = 0; index < values.length; index += 1) {
		const value = values[index];
		if (value === '--lang' || value === '-l') {
			parsed.lang = values[++index];
		} else if (value.startsWith('--lang=')) {
			parsed.lang = value.slice('--lang='.length);
		} else if (value === '--force') {
			parsed.force = true;
		} else if (value === '--sync-only') {
			parsed.syncOnly = true;
		} else {
			console.error(`Unknown argument: ${value}`);
			process.exit(1);
		}
	}

	return parsed;
}

async function readJson(filePath) {
	return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

async function pathExists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

function isTranslatable(pathParts, value) {
	if (typeof value !== 'string') return false;
	if (copyKeys.has(pathParts.at(-1))) return false;
	return value.trim().length > 0;
}

function collectStrings(node, pathParts = [], entries = []) {
	if (Array.isArray(node)) {
		node.forEach((item, index) => collectStrings(item, [...pathParts, String(index)], entries));
		return entries;
	}

	if (node && typeof node === 'object') {
		for (const [key, value] of Object.entries(node)) {
			collectStrings(value, [...pathParts, key], entries);
		}
		return entries;
	}

	if (isTranslatable(pathParts, node)) {
		entries.push({ pathParts, source: node });
	}

	return entries;
}

function setAtPath(node, pathParts, value) {
	let cursor = node;
	for (const part of pathParts.slice(0, -1)) {
		cursor = cursor[part];
	}
	cursor[pathParts.at(-1)] = value;
}

function cleanTranslation(value) {
	return value
		.replace(/\s+([,.;:!?])/g, '$1')
		.replace(/[ \t]+\n/g, '\n')
		.trim();
}

function decodeHtml(value) {
	return value
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}

async function translateWebText(text) {
	const url = new URL('https://translate.google.com/m');
	url.searchParams.set('sl', 'en');
	url.searchParams.set('tl', lang);
	url.searchParams.set('q', text);

	const response = await fetch(url, {
		headers: { 'user-agent': 'Mozilla/5.0' }
	});

	if (!response.ok) {
		throw new Error(`Fallback translate request failed: ${response.status} ${response.statusText}`);
	}

	const html = await response.text();
	const match = html.match(/class="result-container">([\s\S]*?)<\/div>/);
	if (!match) {
		throw new Error('Fallback translate response did not contain result-container');
	}

	return cleanTranslation(decodeHtml(match[1]));
}

async function translateText(text) {
	const body = new URLSearchParams({ q: text });

	for (let attempt = 1; attempt <= 5; attempt += 1) {
		const response = await fetch(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t`,
			{
				method: 'POST',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				body
			}
		);

		if (response.ok) {
			const json = await response.json();
			return cleanTranslation(json[0].map((segment) => segment[0]).join(''));
		}

		if (response.status === 429) {
			try {
				return await translateWebText(text);
			} catch (error) {
				if (attempt === 5) throw error;
			}
		} else if (attempt === 5) {
			throw new Error(`Translate request failed: ${response.status} ${response.statusText}`);
		}

		const wait = retryDelayMs * attempt;
		console.log(`rate limited; retrying in ${Math.round(wait / 1000)}s`);
		await sleep(wait);
	}

	throw new Error('Translate request failed');
}

async function translateBatch(sources) {
	const joined = sources.join(`\n${delimiter}\n`);
	const translated = await translateText(joined);
	const parts = translated.split(new RegExp(`\\n?${delimiter}\\n?`, 'g'));

	if (parts.length === sources.length) {
		return parts.map(cleanTranslation);
	}

	const result = [];
	for (const source of sources) {
		result.push(await translateText(source));
		await sleep(delayMs);
	}
	return result;
}

function makeBatches(entries) {
	const batches = [];
	let batch = [];
	let chars = 0;

	for (const entry of entries) {
		const nextChars = entry.source.length + delimiter.length + 2;
		if (batch.length > 0 && chars + nextChars > maxBatchChars) {
			batches.push(batch);
			batch = [];
			chars = 0;
		}
		batch.push(entry);
		chars += nextChars;
	}

	if (batch.length > 0) batches.push(batch);
	return batches;
}

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function loadCatalog() {
	const files = (await fs.readdir(shortDir)).filter((file) => file.endsWith('.json')).sort();
	const catalog = new Map();

	for (const file of files) {
		const shortHexagram = await readJson(path.join(shortDir, file));
		const locale = shortHexagram.locales?.[lang];
		const en = shortHexagram.locales?.en;
		if (!locale) continue;

		catalog.set(file, {
			name: locale.name,
			composition: locale.composition,
			enName: en?.name,
			enComposition: en?.composition
		});
	}

	return catalog;
}

async function loadGlossary(catalog) {
	const glossary = [];
	const files = (await fs.readdir(sourceDir)).filter((file) => file.endsWith('.json')).sort();

	for (const file of files) {
		const anchor = catalog.get(file);
		if (!anchor?.name) continue;

		if (anchor.enName) {
			glossary.push([anchor.enName, anchor.name]);
		}

		if (anchor.enComposition && anchor.composition) {
			glossary.push([
				anchor.enComposition.replace(/\.$/, ''),
				anchor.composition.replace(/\.$/, '')
			]);
		}

		const extended = await readJson(path.join(sourceDir, file));
		if (extended.english && extended.english !== anchor.enName) {
			glossary.push([extended.english, anchor.name]);
		}
	}

	return glossary
		.filter(([source]) => source.length >= 4)
		.sort((a, b) => b[0].length - a[0].length)
		.map(([source, target]) => [new RegExp(`\\b${escapeRegExp(source)}\\b`, 'gi'), target]);
}

function applyCatalogAnchors(data, anchor) {
	if (!anchor) return 0;

	let count = 0;

	if (anchor.name) {
		setAtPath(data, ['english'], anchor.name);
		count += 1;
	}

	return count;
}

function applyGlossary(node, glossary) {
	if (typeof node === 'string') {
		return glossary.reduce(
			(value, [pattern, replacement]) => value.replace(pattern, replacement),
			node
		);
	}

	if (Array.isArray(node)) {
		return node.map((item) => applyGlossary(item, glossary));
	}

	if (node && typeof node === 'object') {
		for (const [key, value] of Object.entries(node)) {
			if (copyKeys.has(key)) continue;
			node[key] = applyGlossary(value, glossary);
		}
	}

	return node;
}

await fs.mkdir(targetDir, { recursive: true });

const files = (await fs.readdir(sourceDir)).filter((file) => file.endsWith('.json')).sort();
const catalog = await loadCatalog();
const glossary = await loadGlossary(catalog);

if (catalog.size === 0) {
	console.warn(
		`No short hexagram locale found for "${lang}". Extended texts will use machine translation only.`
	);
}

for (const file of files) {
	const sourcePath = path.join(sourceDir, file);
	const targetPath = path.join(targetDir, file);
	const sourceText = await fs.readFile(sourcePath, 'utf8');
	const hasTarget = await pathExists(targetPath);
	const anchor = catalog.get(file);

	let data;
	let translatedCount = 0;

	if (hasTarget && !args.force) {
		data = await readJson(targetPath);
	} else {
		if (args.syncOnly) {
			console.log(`${file}: missing target, skipped sync-only`);
			continue;
		}

		data = JSON.parse(sourceText);
		const entries = collectStrings(data);
		const anchoredPaths = new Set([anchor?.name ? 'english' : null].filter(Boolean));
		const toTranslate = entries.filter((entry) => {
			const pathKey = entry.pathParts.join('.');
			return !anchoredPaths.has(pathKey);
		});

		for (const batch of makeBatches(toTranslate)) {
			const translations = await translateBatch(batch.map((entry) => entry.source));
			batch.forEach((entry, index) => {
				setAtPath(data, entry.pathParts, translations[index]);
			});
			translatedCount += batch.length;
			await sleep(delayMs);
		}
	}

	const anchorCount = applyCatalogAnchors(data, anchor);
	applyGlossary(data, glossary);
	await fs.writeFile(targetPath, `${JSON.stringify(data, null, '\t')}\n`);

	const mode = hasTarget && !args.force ? 'synced' : 'translated';
	console.log(`${file}: ${mode}; ${translatedCount} translated, ${anchorCount} catalog anchors`);
}
