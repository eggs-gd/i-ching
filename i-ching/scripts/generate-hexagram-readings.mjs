#!/usr/bin/env node
/**
 * Generate structural hexagram readings via OpenAI and save to src/lib/data/hexagrams/*.json
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... yarn generate:hexagram              # next pending hexagram
 *   yarn generate:hexagram --number 17                          # specific hexagram
 *   yarn generate:hexagram --all                                # 1..64, skip existing
 *   yarn generate:hexagram --all --force                        # regenerate all (skips curated 1–5)
 *   yarn generate:hexagram --all --force --include-curated      # regenerate including 1–5
 *   yarn generate:hexagram --dry-run --number 1                 # print prompt only
 *   yarn generate:hexagram --number 6 --force --max-retries 5   # retry on forbidden phrases
 *
 * Env (.env or shell):
 *   OPENAI_API_KEY   required
 *   OPENAI_MODEL     default gpt-4o-mini
 *   OPENAI_BASE_URL  default https://api.openai.com/v1
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from './lib/load-env.mjs';
import {
	CURATED_HEXAGRAM_NUMBERS,
	DYNAMICS_PARAGRAPH_MIN,
	FORBIDDEN_EN,
	FORBIDDEN_UK,
	RESPONSE_SCHEMA,
	buildSystemPrompt,
	buildUserPrompt,
	validateGenerationPayload
} from './lib/hexagram-generation-prompt.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, 'data');
const hexDir = join(__dirname, '../src/lib/data/hexagrams');
const statePath = join(dataDir, '.hexagram-generation-state.json');

loadEnv();

const args = process.argv.slice(2);

function flag(name) {
	return args.includes(name);
}

function option(name, fallback) {
	const idx = args.indexOf(name);
	if (idx === -1 || idx + 1 >= args.length) return fallback;
	return args[idx + 1];
}

const opts = {
	number: option('--number', null),
	all: flag('--all'),
	force: flag('--force'),
	includeCurated: flag('--include-curated'),
	dryRun: flag('--dry-run'),
	delayMs: Number(option('--delay', '1500')) || 1500,
	maxRetries: Number(option('--max-retries', '5')) || 5,
	model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
	baseUrl: process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1'
};

function loadState() {
	if (!existsSync(statePath)) {
		return { nextNumber: 1, completed: [], errors: {} };
	}
	return JSON.parse(readFileSync(statePath, 'utf8'));
}

function saveState(state) {
	writeFileSync(statePath, JSON.stringify(state, null, '\t') + '\n');
}

function loadHexRecord(number) {
	const file = join(hexDir, `${String(number).padStart(2, '0')}.json`);
	if (!existsSync(file)) {
		throw new Error(`Hexagram file not found: ${file}`);
	}
	return { file, record: JSON.parse(readFileSync(file, 'utf8')) };
}

function hasLocaleContent(record) {
	const uk = record.locales?.uk;
	const en = record.locales?.en;
	return Boolean(
		uk?.composition?.trim() &&
		uk?.reading?.scene?.trim() &&
		en?.composition?.trim() &&
		en?.reading?.scene?.trim()
	);
}

function listHexNumbers() {
	return readdirSync(hexDir)
		.filter((f) => /^\d{2}\.json$/.test(f))
		.map((f) => Number(f.replace('.json', '')))
		.sort((a, b) => a - b);
}

function resolveTargets(state) {
	if (opts.number) {
		const n = Number(opts.number);
		if (!Number.isInteger(n) || n < 1 || n > 64) {
			throw new Error('--number must be 1..64');
		}
		return [n];
	}

	if (opts.all) {
		return listHexNumbers().filter((n) => {
			if (!opts.includeCurated && CURATED_HEXAGRAM_NUMBERS.includes(n)) {
				return false;
			}
			if (opts.force) return true;
			const { record } = loadHexRecord(n);
			return !hasLocaleContent(record);
		});
	}

	// Next single hexagram: explicit state pointer, else first missing content
	if (!opts.force) {
		const fromState = state.nextNumber;
		if (fromState >= 1 && fromState <= 64) {
			const { record } = loadHexRecord(fromState);
			if (!hasLocaleContent(record)) return [fromState];
		}

		for (const n of listHexNumbers()) {
			const { record } = loadHexRecord(n);
			if (!hasLocaleContent(record)) return [n];
		}

		console.log('All hexagrams already have locale content. Use --force to regenerate.');
		return [];
	}

	return [state.nextNumber >= 1 && state.nextNumber <= 64 ? state.nextNumber : 1];
}

function formatApiError(status, body) {
	const trimmed = body.trim();
	if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) {
		return `HTTP ${status} (HTML error page — transient gateway failure)`;
	}
	const oneLine = trimmed.replace(/\s+/g, ' ').slice(0, 200);
	return `HTTP ${status}: ${oneLine}${trimmed.length > 200 ? '…' : ''}`;
}

function isTransientApiError(error) {
	if (!(error instanceof Error)) return false;
	return /\b(408|429|502|503|504)\b/.test(error.message);
}

async function callOpenAIOnce(record, retryNote = null) {
	const system = buildSystemPrompt();
	const user = buildUserPrompt(record);

	if (opts.dryRun) {
		console.log('--- system ---\n', system);
		console.log('--- user ---\n', user);
		if (retryNote) {
			console.log('--- retry note ---\n', retryNote);
		}
		return null;
	}

	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) {
		throw new Error('OPENAI_API_KEY is not set (.env or environment)');
	}

	const messages = [
		{ role: 'system', content: system },
		{ role: 'user', content: user }
	];

	if (retryNote) {
		messages.push({
			role: 'user',
			content: retryNote
		});
	}

	const response = await fetch(`${opts.baseUrl}/chat/completions`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: opts.model,
			temperature: retryNote ? 0.45 : 0.65,
			response_format: {
				type: 'json_schema',
				json_schema: {
					name: 'hexagram_locales',
					strict: true,
					schema: RESPONSE_SCHEMA
				}
			},
			messages
		})
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`OpenAI API ${formatApiError(response.status, body)}`);
	}

	const data = await response.json();
	const content = data.choices?.[0]?.message?.content;

	if (!content) {
		throw new Error('Empty response from OpenAI');
	}

	return JSON.parse(content);
}

async function callOpenAI(record, retryNote = null) {
	const apiRetries = 3;

	for (let apiAttempt = 1; apiAttempt <= apiRetries; apiAttempt++) {
		try {
			return await callOpenAIOnce(record, retryNote);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			if (apiAttempt < apiRetries && isTransientApiError(error)) {
				const waitMs = apiAttempt * 2000;
				console.log(`  api retry ${apiAttempt}/${apiRetries - 1}: ${message}`);
				await sleep(waitMs);
				continue;
			}
			throw error instanceof Error ? error : new Error(message);
		}
	}

	throw new Error('OpenAI API failed after transient retries');
}

function buildRetryNote(errorMessage) {
	const forbiddenHint = errorMessage.includes('forbidden phrase')
		? `\nBanned words include: ${[...FORBIDDEN_UK.slice(0, 8), ...FORBIDDEN_EN.slice(0, 8)].join(', ')}.`
		: '';

	return `Your previous JSON was rejected by validation: ${errorMessage}${forbiddenHint}

Rewrite the full JSON from scratch for the same hexagram.
Do not reuse forbidden therapeutic, reconciliation, or self-help phrasing.
Keep the reading dry, structural, and precise. Hard hexagrams may stay hard, blocked, or unresolved.

dynamics must be exactly 4 paragraphs separated by \\n\\n.
Aim for 120–220 characters per paragraph (minimum ${DYNAMICS_PARAGRAPH_MIN} accepted):
1) active pattern
2) restraint or missing element
3) distortion or shadow
4) what still holds the process alive
Do not merge dynamics into one paragraph.`;
}

async function generateValidatedPayload(record) {
	let lastError = null;

	for (let attempt = 1; attempt <= opts.maxRetries; attempt++) {
		try {
			const retryNote = lastError ? buildRetryNote(lastError.message) : null;
			console.log(`  generating (${attempt}/${opts.maxRetries})...`);
			const payload = await callOpenAI(record, retryNote);
			return validateGenerationPayload(payload);
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error));
			if (attempt < opts.maxRetries) {
				console.log(`  validation retry ${attempt}/${opts.maxRetries - 1}: ${lastError.message}`);
				await sleep(500);
			}
		}
	}

	throw lastError ?? new Error('Generation failed after retries');
}

function applyLocales(record, payload) {
	record.locales ??= {};

	const keepUkReading = CURATED_HEXAGRAM_NUMBERS.includes(record.number) && !opts.includeCurated;

	record.locales.en = payload.en;

	if (keepUkReading && record.locales.uk) {
		record.locales.uk = {
			name: record.locales.uk.name,
			composition: record.locales.uk.composition,
			reading: record.locales.uk.reading,
			judgment: payload.uk.judgment,
			image: payload.uk.image
		};
	} else {
		record.locales.uk = payload.uk;
	}

	return record;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processHexagram(number, state) {
	const { file, record } = loadHexRecord(number);

	console.log(
		`\n→ Hexagram ${number} ${record.chinese} (${record.pinyin}) — ${record.upper}/${record.lower}`
	);

	if (!opts.force && !opts.dryRun && hasLocaleContent(record)) {
		console.log('  skip: locale content already present (use --force)');
		return 'skipped';
	}

	if (opts.dryRun) {
		await callOpenAI(record);
		console.log('  dry-run: no file write');
		return 'dry-run';
	}

	const validated = await generateValidatedPayload(record);
	const updated = applyLocales({ ...record }, validated);

	writeFileSync(file, JSON.stringify(updated, null, '\t') + '\n');
	console.log(`  saved ${file}`);
	console.log(`  uk: ${validated.uk.name}`);
	console.log(`  en: ${validated.en.name}`);

	if (!state.completed.includes(number)) {
		state.completed.push(number);
		state.completed.sort((a, b) => a - b);
	}
	delete state.errors[String(number)];
	state.nextNumber = number < 64 ? number + 1 : 1;
	saveState(state);

	return 'ok';
}

async function main() {
	const state = loadState();
	const targets = resolveTargets(state);

	if (targets.length === 0) {
		return;
	}

	console.log(`Model: ${opts.model}`);
	console.log(`Targets: ${targets.join(', ')}`);

	for (let i = 0; i < targets.length; i++) {
		const number = targets[i];

		try {
			const result = await processHexagram(number, state);
			if (result === 'ok' && i < targets.length - 1 && !opts.dryRun) {
				await sleep(opts.delayMs);
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			console.error(`  error: ${message}`);
			state.errors[String(number)] = { at: new Date().toISOString(), message };
			saveState(state);
			process.exitCode = 1;

			if (!opts.all) break;
		}
	}

	console.log('\nDone.');
}

main();
