import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const shortDir = path.join(root, 'src/lib/data/hexagrams');
const extDir = path.join(root, 'src/lib/data/hexagrams_ext/en');

const copyKeys = new Set(['hex', 'hex_font', 'trad_chinese', 'pinyin', 'binary', 'od', 'number', 'chinese']);

const trigramNames = new Map([
	['THE CREATIVE,', 'The Creative'],
	['THE RECEPTIVE,', 'The Receptive'],
	['THE AROUSING,', 'The Arousing'],
	['THE ABYSMAL,', 'The Abysmal'],
	['KEEPING STILL,', 'Keeping Still'],
	['THE GENTLE,', 'The Gentle'],
	['THE CLINGING,', 'The Clinging'],
	['THE JOYOUS,', 'The Joyous']
]);

const elementNames = new Map([
	['HEAVEN', 'Heaven'],
	['EARTH', 'Earth'],
	['THUNDER', 'Thunder'],
	['WATER', 'Water'],
	['MOUNTAIN', 'Mountain'],
	['WIND,', 'Wind'],
	['WIND', 'Wind'],
	['FIRE', 'Fire'],
	['FLAME', 'Fire'],
	['LAKE', 'Lake']
]);

const classicalNameAliases = new Map([
	['THE CREATIVE', 'The Creative'],
	['THE RECEPTIVE', 'The Receptive'],
	['DIFFICULTY AT THE BEGINNING', 'Difficulty at the Beginning'],
	['YOUTHFUL FOLLY', 'Youthful Folly'],
	['WAITING', 'Waiting'],
	['CONFLICT', 'Conflict'],
	['THE ARMY', 'The Army'],
	['HOLDING TOGETHER', 'Holding Together'],
	['THE TAMING POWER OF THE SMALL', 'Gentle Influence'],
	['TREADING', 'Treading'],
	['PEACE', 'Peace'],
	['STANDSTILL', 'Disconnection'],
	['FELLOWSHIP WITH MEN', 'Fellowship'],
	['POSSESSION IN GREAT MEASURE', 'Great Abundance'],
	['MODESTY', 'Humility'],
	['ENTHUSIASM', 'Joy in Motion'],
	['FOLLOWING', 'Following'],
	['WORK ON WHAT HAS BEEN SPOILED', 'Restoration'],
	['APPROACH', 'Approach'],
	['CONTEMPLATION', 'Observation'],
	['BITING THROUGH', 'Biting Through'],
	['GRACE', 'Beauty in Simplicity'],
	['SPLITTING APART', 'Splitting Apart'],
	['RETURN', 'Return'],
	['INNOCENCE', 'Non-Interference'],
	['THE TAMING POWER OF THE GREAT', 'Great Accumulation'],
	['THE CORNERS OF THE MOUTH', 'Nourishment'],
	['PREPONDERANCE OF THE GREAT', 'Great Exceeding'],
	['THE ABYSMAL', 'Repeated Water'],
	['THE CLINGING', 'The Clinging'],
	['INFLUENCE', 'Influence'],
	['DURATION', 'Enduring Stability'],
	['RETREAT', 'Retreat'],
	['THE POWER OF THE GREAT', 'Great Power'],
	['PROGRESS', 'Progress'],
	['DARKENING OF THE LIGHT', 'Shadow of Fire'],
	['THE FAMILY', 'The Family'],
	['OPPOSITION', 'Contradiction'],
	['OBSTRUCTION', 'Obstacle'],
	['DELIVERANCE', 'Release'],
	['DECREASE', 'Reduction'],
	['INCREASE', 'Enhancement'],
	['BREAK-THROUGH', 'Breakthrough'],
	['COMING TO MEET', 'Coming to Meet'],
	['GATHERING TOGETHER', 'Gathering'],
	['PUSHING UPWARD', 'Pushing Upward'],
	['OPPRESSION', 'Oppression'],
	['THE WELL', 'The Well'],
	['REVOLUTION', 'Revolution'],
	['THE CALDRON', 'The Cauldron'],
	['THE AROUSING', 'Sudden Awakening'],
	['KEEPING STILL', 'Keeping Still'],
	['DEVELOPMENT', 'Gradual Growth'],
	['THE MARRYING MAIDEN', 'The Marrying Maiden'],
	['ABUNDANCE', 'Abundance'],
	['THE WANDERER', 'The Wanderer'],
	['THE GENTLE', 'The Gentle'],
	['THE JOYOUS', 'The Joyous Lake'],
	['YOUTH', 'Youthful Folly'],
	['DECAY', 'Restoration'],
	['THE TURNING POINT', 'Return'],
	['PROVIDING NOURISHMENT', 'Nourishment'],
	['EXHAUSTION', 'Oppression'],
	['SHOCK', 'Sudden Awakening'],
	['THE GENTLY PENETRATING', 'The Gently Penetrating'],
	['DISPERSION', 'Dispersion'],
	['LIMITATION', 'Limitation'],
	['INNER TRUTH', 'Inner Truth'],
	['PREPONDERANCE OF THE SMALL', 'Small Exceeding'],
	['AFTER COMPLETION', 'After Completion'],
	['BEFORE COMPLETION', 'Before Completion']
]);

const textualFixes = [
	[/\bIT is\b/g, 'It is'],
	[/\bcompetent each other\b/g, 'complement each other'],
	[/\bdescending form heaven\b/g, 'descending from heaven'],
	[/\beverything one earth\b/g, 'everything on earth'],
	[/\bresisted from the fist\b/g, 'resisted from the first'],
	[/\bneither less not more\b/g, 'neither less nor more'],
	[/\blined with sone\b/g, 'lined with stone'],
	[/\bworks greatly t his advantage\b/g, 'works greatly to his advantage'],
	[/\bgoof fortune\b/g, 'good fortune'],
	[/\bgoof humor\b/g, 'good humor'],
	[/\bclear indication, and rest is disturbed\b/g, 'clear indications, and rest is disturbed'],
	[/\bas thought hey did not exist\b/g, 'as though they did not exist'],
	[/\bactin\b/g, 'action'],
	[/\bsage or sage\b/g, 'sage'],
	[
		/The tie that hold the family together lies in the loyalty and perseverance of the wife\. The tie that holds the family together lies in the loyalty and perseverance of the wife\./g,
		'The tie that holds the family together lies in the loyalty and perseverance of the wife.'
	],
	[/\bnone- or\b/g, 'none - or'],
	[/\bWHEN A man\b/g, 'When a man'],
	[/\bThe image of FIRE\b/g, 'The image of Fire'],
	[/\bThe image of The Army\b/g, 'The image of the army'],
	[/\bThe image of The Family\b/g, 'The image of the family'],
	[/\bthe image of The Well\b/g, 'the image of the well'],
	[/\bThe image of The Cauldron\b/g, 'The image of the cauldron'],
	[/\bThe image of The Marrying Maiden\b/g, 'The image of the marrying maiden'],
	[/\bThe image of The Wanderer\b/g, 'The image of the wanderer'],
	[/\bThe image of The Gently Penetrating\b/g, 'The image of the gently penetrating'],
	[/\bThe image of The Joyous Lake\b/g, 'The image of the joyous lake'],
	[/\bKuan, Observation \( VIEW\)/g, 'Kuan, Observation'],
	[/\bfar form his people\b/g, 'far from his people'],
	[/\n\n\. /g, '\n\n'],
	[/\.Thus/g, '.\nThus'],
	[/Thus the noble person\n\nSpreads/g, 'Thus the noble person\nSpreads'],
	[/\. The superior man carries things through\./g, 'The superior man carries things through.'],
	[/When the eighth month comes,\n\n\. There will be misfortune\./g, 'When the eighth month comes,\nThere will be misfortune.']
];

const roleTerms = [
	[/\bsuperior men\b/g, 'noble people'],
	[/\bsuperior man\b/g, 'noble person'],
	[/\bSuperior man\b/g, 'Noble person'],
	[/\binferior men\b/g, 'lesser people'],
	[/\binferior people\b/g, 'lesser people'],
	[/\binferior man\b/g, 'lesser person'],
	[/\bInferior people\b/g, 'Lesser people'],
	[/\bInferior man\b/g, 'Lesser person'],
	[/\bholy man\b/g, 'sage']
];

function escapeRegExp(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceAliases(value) {
	let next = value;

	for (const [source, target] of classicalNameAliases) {
		next = next.replace(new RegExp(`\\b${escapeRegExp(source)}\\b`, 'g'), target);
	}

	return next;
}

function normalizeString(value) {
	let next = replaceAliases(value);

	for (const [pattern, replacement] of textualFixes) {
		next = next.replace(pattern, replacement);
	}

	for (const [pattern, replacement] of roleTerms) {
		next = next.replace(pattern, replacement);
	}

	return next
		.replace(/\bThus does the noble person proceed\b/g, 'Thus the noble person proceeds')
		.replace(/[ \t]+\n/g, '\n')
		.replace(/\n{3,}/g, '\n\n')
		.replace(/\s+([,.;:!?])/g, '$1')
		.trim();
}

function splitSentences(paragraph) {
	const matches = paragraph.match(/[^.!?]+[.!?]+(?:["”])?|[^.!?]+$/g);
	return matches ? matches.map((sentence) => sentence.trim()).filter(Boolean) : [paragraph.trim()];
}

function paragraphComment(value) {
	if (value.length <= 500 || value.includes('\n\n')) return value;

	const sentences = splitSentences(value);
	const paragraphs = [];
	let current = '';

	for (const sentence of sentences) {
		const candidate = current ? `${current} ${sentence}` : sentence;
		if (current && candidate.length > 520) {
			paragraphs.push(current);
			current = sentence;
		} else {
			current = candidate;
		}
	}

	if (current) paragraphs.push(current);
	return paragraphs.join('\n\n');
}

function walk(node, visitor, pathParts = []) {
	if (Array.isArray(node)) {
		node.forEach((item, index) => walk(item, visitor, [...pathParts, String(index)]));
		return;
	}

	if (node && typeof node === 'object') {
		for (const [key, value] of Object.entries(node)) {
			if (typeof value === 'string' && !copyKeys.has(key)) {
				node[key] = visitor(value, [...pathParts, key]);
			} else {
				walk(value, visitor, [...pathParts, key]);
			}
		}
	}
}

async function readJson(filePath) {
	return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

const files = (await fs.readdir(extDir)).filter((file) => file.endsWith('.json')).sort();

for (const file of files) {
	const shortHexagram = await readJson(path.join(shortDir, file));
	const data = await readJson(path.join(extDir, file));
	const shortName = shortHexagram.locales.en.name;

	data.english = shortName;

	for (const trigram of [data.wilhelm_above, data.wilhelm_below]) {
		if (trigramNames.has(trigram.symbolic)) trigram.symbolic = trigramNames.get(trigram.symbolic);
		if (elementNames.has(trigram.alchemical)) trigram.alchemical = elementNames.get(trigram.alchemical);
	}

	walk(data, (value, pathParts) => {
		const normalized = normalizeString(value);
		return pathParts.at(-1) === 'comments' ? paragraphComment(normalized) : normalized;
	});

	await fs.writeFile(path.join(extDir, file), `${JSON.stringify(data, null, '\t')}\n`);
	console.log(`${file}: cleaned`);
}
