import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const TRIGRAM_NAMES = {
	uk: {
		qian: 'Небо',
		kun: 'Земля',
		zhen: 'Грім',
		kan: 'Вода',
		gen: 'Гора',
		xun: 'Вітер',
		li: 'Вогонь',
		dui: 'Озеро'
	},
	en: {
		qian: 'Heaven',
		kun: 'Earth',
		zhen: 'Thunder',
		kan: 'Water',
		gen: 'Mountain',
		xun: 'Wind',
		li: 'Fire',
		dui: 'Lake'
	}
};

/** Curated Ukrainian readings — do not overwrite via --all unless --include-curated */
export const CURATED_HEXAGRAM_NUMBERS = [1, 2, 3, 4, 5];

/** JSON reading keys — UI labels are separate (Образ / Динаміка / Вектор). */
export const READING_KEYS = ['scene', 'dynamics', 'vector'];

export const FORBIDDEN_UK = [
	'відкрите серце',
	'пошук зрозуміння',
	'конструктивний діалог',
	'обидві сторони',
	'готові слухати',
	'глибше розуміння',
	'гармонія',
	'зцілення',
	'порозуміння',
	'емпатія',
	'конструктивної паузи',
	'осмислення',
	'розуміння',
	'терпіння',
	'внутрішня боротьба',
	'емоції переповнюють',
	'глибокі відмінності'
];

export const FORBIDDEN_EN = [
	'open heart',
	'search for understanding',
	'constructive dialogue',
	'both sides',
	'ready to listen',
	'willing to listen',
	'deeper understanding',
	'harmony',
	'healing',
	'empathy',
	'constructive pause',
	'reflection',
	'understanding',
	'patience',
	'internal struggle',
	'emotions overflow',
	'deep differences'
];

export const DYNAMICS_PARAGRAPH_COUNT = 4;
/** Prompt target: 120–220. Validation allows slack for cheap models. */
export const DYNAMICS_PARAGRAPH_TARGET_MIN = 120;
export const DYNAMICS_PARAGRAPH_TARGET_MAX = 220;
export const DYNAMICS_PARAGRAPH_MIN = 95;
export const DYNAMICS_PARAGRAPH_MAX = 250;

const REFERENCE_UK = JSON.parse(
	readFileSync(join(__dirname, '../data/reference-readings-uk.json'), 'utf8')
);

export const RESPONSE_SCHEMA = {
	type: 'object',
	properties: {
		uk: localeSchema(),
		en: localeSchema()
	},
	required: ['uk', 'en'],
	additionalProperties: false
};

function localeSchema() {
	return {
		type: 'object',
		properties: {
			name: { type: 'string', minLength: 2 },
			composition: { type: 'string', minLength: 6 },
			reading: {
				type: 'object',
				properties: {
					scene: { type: 'string', minLength: 80 },
					dynamics: { type: 'string', minLength: 380 },
					vector: { type: 'string', minLength: 120 }
				},
				required: ['scene', 'dynamics', 'vector'],
				additionalProperties: false
			}
		},
		required: ['name', 'composition', 'reading'],
		additionalProperties: false
	};
}

function formatReferenceExamples() {
	return Object.entries(REFERENCE_UK)
		.sort(([a], [b]) => Number(a) - Number(b))
		.map(([num, ref]) => {
			const { composition, reading } = ref;
			const { scene, dynamics, vector } = reading;
			return `### Hexagram ${num} — ${ref.name}
composition:
${composition}

scene:
${scene}

dynamics:
${dynamics}

vector:
${vector}`;
		})
		.join('\n\n');
}

export function buildSystemPrompt() {
	return `You write symbolic I Ching readings for a contemplative app.

This is symbolic reflection, not fortune-telling, prediction, advice, therapy, or self-help.

Style:
- lucid, precise, restrained
- symbolic but concrete
- calm, unsentimental
- precise, not oracle-like
- literary but not vague
- structural truth over emotional comfort

Every sentence must show a recognizable shape:
- tension, boundary, movement, absence, restraint, distortion
- or a form that holds, fails, opens, hardens, dissolves, or waits

Do not explain emotions directly.
Do not write "emotions overflow", "internal struggle", "needs patience", "requires understanding",
"емоції переповнюють", "внутрішня боротьба", "потребує терпіння", "осмислення та розуміння".
Show the shape instead:
- "The words add weight instead of movement."
- "Each answer creates another edge."
- "The matter cannot pass while both sides keep their form."

Avoid:
- mystical prophecy
- motivational lessons
- therapeutic reconciliation
- technical ontology
- psychology glossary
- wiki explanations
- vague oracle sludge

Avoid generic oracle words unless tied to a concrete image:
"сила", "шлях", "глибина", "потік", "очищення", "обіцянка", "горизонт", "серце", "душа",
"power", "path", "depth", "flow", "cleansing", "promise", "horizon", "soul".

Avoid therapeutic-softening and generic psychology phrases:
"пошук зрозуміння", "відкрите серце", "обидві сторони", "готові слухати", "порозуміння", "емпатія", "зцілення", "гармонія",
"осмислення", "розуміння", "терпіння", "внутрішня боротьба", "емоції переповнюють", "глибокі відмінності",
"understanding", "open heart", "both sides", "listening", "healing", "harmony", "empathy", "deeper understanding",
"reflection", "patience", "internal struggle", "emotions overflow", "deep differences".

Hard hexagrams may remain hard.
Blocked hexagrams may remain blocked.
Unresolved hexagrams may remain unresolved.
Do not force every reading into growth, harmony, or wisdom.

Bad:
- "A deep force opens the path to a new horizon."
- "Both sides are ready to listen and find deeper understanding."
- "Conflict becomes healing when faced with an open heart."
- "The system enters a new regime of transformation."
- "Deep differences remain, and emotions overflow in an internal struggle that requires patience."

Good:
- "The bond is real, but the form is unstable."
- "The movement is real, but the container is too small for a large gesture."
- "This is not refusal. It is contact under constraint."
- "The old shape has lost authority, but nothing stable has replaced it yet."
- "Words no longer clarify the matter; they harden positions."
- "The process is alive, but it cannot be forced without becoming distorted."
- "The words add weight instead of movement."
- "Each answer creates another edge."
- "The matter cannot pass while both sides keep their form."

Reading fields:
composition — one localized trigram composition line at the locale root, such as "Water beneath heaven." / "Вода під небом." No commentary.
1. scene — 1–3 concrete symbolic sentences, 80–220 characters. Do not repeat the composition formula.
2. dynamics — exactly 4 short paragraphs, 120–220 characters each (separate with \\n\\n):
   1) active pattern
   2) restraint or missing element
   3) distortion or shadow
   4) what still holds the process alive
   Do not merge into one paragraph. Do not write fewer than 4.
3. vector — 1–3 sparse closing lines, 120–260 characters; direction without prophecy.

Do not be so minimal that the text becomes a dictionary entry.
Use \\n\\n between paragraphs when needed.

Gold standard — curated Ukrainian readings.
Match the rhythm, restraint, and clarity. English must match the same register, not literal translation.

${formatReferenceExamples()}

Output valid JSON only. Both uk and en required.`;
}

export function buildUserPrompt(record) {
	const ukUpper = TRIGRAM_NAMES.uk[record.upper] ?? record.upper;
	const ukLower = TRIGRAM_NAMES.uk[record.lower] ?? record.lower;
	const enUpper = TRIGRAM_NAMES.en[record.upper] ?? record.upper;
	const enLower = TRIGRAM_NAMES.en[record.lower] ?? record.lower;

	return `Write locale content for hexagram ${record.number}.

Use the trigram atmosphere as imagery, not as a mechanical formula:
- Lower: ${record.lower} — ${ukLower} / ${enLower}
- Upper: ${record.upper} — ${ukUpper} / ${enUpper}
- Chinese: ${record.chinese} (${record.pinyin})

Return JSON:
{
  "uk": {
    "name": "short symbolic title",
    "composition": "...",
    "reading": {
      "scene": "...",
      "dynamics": "...",
      "vector": "..."
    }
  },
  "en": { same shape, equivalent voice }
}

Rules:
- Prefer lucid precision over atmosphere.
- Do not write prophecy, advice, therapy, or self-help.
- Do not soften hard hexagrams into positive lessons.
- Do not explain emotions directly — show the structural shape.
- composition must be only the localized upper/lower trigram formula.
- scene must be a real image, not a formula, and must not repeat composition.
- dynamics must be exactly 4 paragraphs separated by \\n\\n:
  1. active pattern
  2. restraint / missing element
  3. distortion / shadow
  4. what still holds the process alive
  Each paragraph 120–220 characters. Never merge into one block.
- No second person: no "you", "ти", "ви".
- Do not mention JSON field names or hexagram number in prose.`;
}

export function countParagraphs(text) {
	return text
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean).length;
}

function getParagraphs(text) {
	return text
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean);
}

export function assertNoForbiddenPhrases(text, label, phrases) {
	const lower = text.toLowerCase();
	for (const phrase of phrases) {
		if (lower.includes(phrase.toLowerCase())) {
			throw new Error(`${label} contains forbidden phrase: "${phrase}"`);
		}
	}
}

function collectLocaleText(locale) {
	return [
		locale.name,
		locale.composition,
		...READING_KEYS.map((key) => locale.reading?.[key])
	]
		.filter(Boolean)
		.join('\n');
}

export function validateForbiddenPhrases(payload) {
	assertNoForbiddenPhrases(collectLocaleText(payload.uk), 'uk', FORBIDDEN_UK);
	assertNoForbiddenPhrases(collectLocaleText(payload.en), 'en', FORBIDDEN_EN);
}

export function validateLocaleContent(locale, label) {
	const required = ['name', 'composition', 'reading'];
	for (const key of required) {
		if (locale[key] === undefined || locale[key] === null) {
			throw new Error(`Missing ${label}.${key}`);
		}
	}

	if (typeof locale.composition !== 'string' || !locale.composition.trim()) {
		throw new Error(`Missing or empty ${label}.composition`);
	}

	for (const layer of READING_KEYS) {
		const value = locale.reading?.[layer];
		if (typeof value !== 'string' || !value.trim()) {
			throw new Error(`Missing or empty ${label}.reading.${layer}`);
		}
	}

	if (locale.reading.scene.length < 80) {
		throw new Error(`${label}.reading.scene is too short`);
	}

	if (locale.reading.dynamics.length < DYNAMICS_PARAGRAPH_MIN * DYNAMICS_PARAGRAPH_COUNT) {
		throw new Error(`${label}.reading.dynamics is too short`);
	}

	const dynamicsParagraphs = getParagraphs(locale.reading.dynamics);
	if (dynamicsParagraphs.length !== DYNAMICS_PARAGRAPH_COUNT) {
		throw new Error(
			`${label}.reading.dynamics must have exactly ${DYNAMICS_PARAGRAPH_COUNT} paragraphs (got ${dynamicsParagraphs.length})`
		);
	}

	for (let i = 0; i < dynamicsParagraphs.length; i++) {
		const length = dynamicsParagraphs[i].length;
		if (length < DYNAMICS_PARAGRAPH_MIN || length > DYNAMICS_PARAGRAPH_MAX) {
			throw new Error(
				`${label}.reading.dynamics paragraph ${i + 1} must be ${DYNAMICS_PARAGRAPH_MIN}–${DYNAMICS_PARAGRAPH_MAX} characters (got ${length})`
			);
		}
	}

	if (locale.reading.vector.length < 120) {
		throw new Error(`${label}.reading.vector is too short`);
	}
}

export function validateGenerationPayload(payload) {
	if (!payload || typeof payload !== 'object') {
		throw new Error('Response is not an object');
	}

	validateLocaleContent(payload.uk, 'uk');
	validateLocaleContent(payload.en, 'en');
	validateForbiddenPhrases(payload);
	return payload;
}
