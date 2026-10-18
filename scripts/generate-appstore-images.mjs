import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '../App');
const workspaceRoot = path.resolve(scriptDir, '..');
const outputRoot = process.env.APPSTORE_OUTPUT_DIR
	? path.resolve(process.env.APPSTORE_OUTPUT_DIR)
	: path.join(workspaceRoot, 'AppStore');
const require = createRequire(path.join(projectRoot, 'package.json'));
const sharp = require('sharp');

const tmpRoot = process.env.APPSTORE_TMP_DIR ?? '/private/tmp/i-ching-appstore';
const appUrl = process.env.APPSTORE_APP_URL ?? 'http://127.0.0.1:5173/';
const chromePath =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const remotePort = Number(process.env.APPSTORE_REMOTE_PORT ?? 9337);
const canvas = { width: 1242, height: 2688 };
const mobileViewport = { width: 390, height: 844, dpr: 3 };
const tallViewport = { width: 430, height: 1900, dpr: 2 };

const archiveQuestions = [
	'Should I buy this car?',
	'Why did my plant die?',
	'How can I move into a higher position at work?',
	"What's wrong with this team?",
	'Is it time to start my own business?',
	"Why can't I finish the renovation?",
	"What's happening in my relationship right now?",
	'Should I accept this offer?',
	"Why won't this habit stick?",
	"What's holding this project back?",
	'Is now the right time to buy a house?',
	'How should I approach these negotiations?',
	'Why do I keep putting this off?',
	"What's preventing me from getting proper rest?",
	'Should I return to this idea?'
];

const frames = [
	{
		file: 'appstore-01-reading.png',
		title: 'NOT ANOTHER APP',
		subtitle: 'A quiet place for a single question.',
		shot: 'reading',
		layout: 'phone'
	},
	{
		file: 'appstore-02-one-page.png',
		title: 'ONE PAGE',
		subtitle: 'Everything stays in a single flow.',
		shot: 'onepage',
		layout: 'manuscript'
	},
	{
		file: 'appstore-03-cast.png',
		title: 'NO RUSH',
		subtitle: 'Coin by coin. Line by line.',
		shot: 'cast',
		layout: 'phone'
	},
	{
		file: 'appstore-04-extended.png',
		title: 'WHEN SHORT IS NOT ENOUGH',
		subtitle: 'Read the classic commentary.',
		shot: 'extended',
		layout: 'phone'
	},
	{
		file: 'appstore-05-archive.png',
		title: 'QUESTIONS HAVE MEMORY',
		subtitle: 'Return months later.\nSee what keeps returning.',
		shot: 'archive',
		layout: 'phone'
	}
];

const palette = {
	bg: '#0e0d0b',
	bg2: '#161411',
	paper: '#1a1814',
	text: '#e8e2d6',
	soft: '#b9b1a3',
	muted: '#8a8275',
	faint: '#5c564c',
	accent: '#c4a574'
};

class Cdp {
	constructor(wsUrl) {
		this.wsUrl = wsUrl;
		this.nextId = 1;
		this.pending = new Map();
	}

	async connect() {
		this.ws = new WebSocket(this.wsUrl);
		this.ws.addEventListener('message', (event) => {
			const message = JSON.parse(event.data);
			if (!message.id) return;
			const pending = this.pending.get(message.id);
			if (!pending) return;
			this.pending.delete(message.id);
			if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
			else pending.resolve(message.result);
		});
		await new Promise((resolve, reject) => {
			this.ws.addEventListener('open', resolve, { once: true });
			this.ws.addEventListener('error', reject, { once: true });
		});
	}

	send(method, params = {}, sessionId) {
		const id = this.nextId++;
		this.ws.send(JSON.stringify({ id, method, params, sessionId }));
		return new Promise((resolve, reject) => {
			this.pending.set(id, { resolve, reject });
			setTimeout(() => {
				if (this.pending.has(id)) {
					this.pending.delete(id);
					reject(new Error(`CDP timeout: ${method}`));
				}
			}, 30000);
		});
	}

	close() {
		this.ws?.close();
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForChrome() {
	const endpoint = `http://127.0.0.1:${remotePort}/json/version`;
	for (let i = 0; i < 100; i++) {
		try {
			const res = await fetch(endpoint);
			if (res.ok) return res.json();
		} catch {}
		await sleep(100);
	}
	throw new Error('Chrome did not expose DevTools endpoint');
}

async function createPage(cdp) {
	const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
	const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
	await cdp.send('Page.enable', {}, sessionId);
	await cdp.send('Runtime.enable', {}, sessionId);
	await setViewport(cdp, sessionId, mobileViewport);
	return sessionId;
}

async function setViewport(cdp, sessionId, viewport) {
	await cdp.send(
		'Emulation.setDeviceMetricsOverride',
		{
			width: viewport.width,
			height: viewport.height,
			deviceScaleFactor: viewport.dpr,
			mobile: true,
			screenWidth: viewport.width,
			screenHeight: viewport.height
		},
		sessionId
	);
	await cdp.send(
		'Emulation.setUserAgentOverride',
		{
			userAgent:
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
		},
		sessionId
	);
}

async function evaluate(cdp, sessionId, expression) {
	const result = await cdp.send(
		'Runtime.evaluate',
		{ expression, awaitPromise: true, returnByValue: true },
		sessionId
	);
	if (result.exceptionDetails) {
		throw new Error(result.exceptionDetails.text || 'Runtime exception');
	}
	return result.result.value;
}

async function waitFor(cdp, sessionId, predicate, timeout = 12000) {
	const deadline = Date.now() + timeout;
	while (Date.now() < deadline) {
		const ok = await evaluate(cdp, sessionId, `Boolean(${predicate})`);
		if (ok) return;
		await sleep(120);
	}
	throw new Error(`Timed out waiting for ${predicate}`);
}

async function navigate(cdp, sessionId) {
	await cdp.send('Page.navigate', { url: appUrl }, sessionId);
	await waitFor(cdp, sessionId, `document.readyState === 'complete'`);
	await sleep(600);
}

function seededJournalJson() {
	const line = (value, changing = false) => ({ value, kind: 'young', changing });
	const numbers = [1, 20, 37, 1, 18, 1, 20, 37, 18, 20, 1, 37, 18, 20, 37];
	return JSON.stringify(
		archiveQuestions.map((question, index) => ({
			id: `appstore-${index + 1}`,
			createdAt: new Date(Date.now() - index * 86400000).toISOString(),
			question,
			primaryNumber: numbers[index],
			relatingNumber: index % 4 === 0 ? 14 : undefined,
			changingLines: index % 4 === 0 ? [3, 6] : [],
			lines:
				numbers[index] === 1
					? [
							line('yang'),
							line('yang'),
							line('yang', index % 4 === 0),
							line('yang'),
							line('yang'),
							line('yang', index % 4 === 0)
						]
					: numbers[index] === 20
						? [line('yin'), line('yin'), line('yang'), line('yin'), line('yang'), line('yang')]
						: numbers[index] === 37
							? [line('yang'), line('yin'), line('yang'), line('yin'), line('yang'), line('yang')]
							: [line('yin'), line('yang'), line('yang'), line('yin'), line('yin'), line('yang')],
			locale: 'en',
			method: 'manual'
		}))
	);
}

async function resetApp(cdp, sessionId, { seedJournal = false, viewport = mobileViewport } = {}) {
	await setViewport(cdp, sessionId, viewport);
	await cdp.send('Page.navigate', { url: 'about:blank' }, sessionId);
	await waitFor(cdp, sessionId, `document.readyState === 'complete'`);
	await cdp.send('Page.navigate', { url: appUrl }, sessionId);
	await waitFor(cdp, sessionId, `document.readyState === 'complete'`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			localStorage.setItem('i-ching-locale', 'en');
			if (${seedJournal}) localStorage.setItem('i-ching-journal', ${JSON.stringify(seededJournalJson())});
			else localStorage.removeItem('i-ching-journal');
			return true;
		})()`
	);
	await navigate(cdp, sessionId);
}

async function setQuestion(cdp, sessionId, text) {
	await waitFor(cdp, sessionId, `document.querySelector('textarea')`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			const textarea = document.querySelector('textarea');
			if (!textarea) return false;
			textarea.value = ${JSON.stringify(text)};
			textarea.dispatchEvent(new Event('input', { bubbles: true }));
			return true;
		})()`
	);
	await sleep(250);
}

async function clickByText(cdp, sessionId, text) {
	const ok = await evaluate(
		cdp,
		sessionId,
		`(() => {
			const target = [...document.querySelectorAll('button')].find((button) => button.textContent.trim().includes(${JSON.stringify(text)}));
			if (!target) return false;
			target.click();
			return true;
		})()`
	);
	if (!ok) throw new Error(`Button not found: ${text}`);
	await sleep(350);
}

async function createManualReading(
	cdp,
	sessionId,
	question,
	{ seedJournal = false, viewport = mobileViewport } = {}
) {
	await resetApp(cdp, sessionId, { seedJournal, viewport });
	await setQuestion(cdp, sessionId, question);
	await clickByText(cdp, sessionId, 'Hexagram already cast');
	await waitFor(cdp, sessionId, `document.body.textContent.includes('I Ching answer')`);
	await evaluate(cdp, sessionId, `document.querySelector('.trigger')?.click()`);
	await waitFor(
		cdp,
		sessionId,
		`document.querySelector('#hex-picker-primary')?.closest('dialog')?.open`
	);
	const picked = await evaluate(
		cdp,
		sessionId,
		`(() => {
			const heaven = [...document.querySelectorAll('.trigram-btn')].filter((button) => button.textContent.includes('Heaven'));
			heaven[0]?.click();
			return heaven.length;
		})()`
	);
	if (picked < 2) throw new Error(`Could not pick two Heaven trigrams, found ${picked}`);
	await sleep(250);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			const heaven = [...document.querySelectorAll('.trigram-btn')].filter((button) => button.textContent.includes('Heaven'));
			heaven[1]?.click();
			return true;
		})()`
	);
	await waitFor(
		cdp,
		sessionId,
		`!document.querySelector('#hex-picker-primary')?.closest('dialog')?.open && document.body.textContent.includes('The Creative')`
	);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			const form = document.querySelector('#prefilled-cast-form');
			if (form?.requestSubmit) form.requestSubmit();
			else form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
			return true;
		})()`
	);
	await waitFor(cdp, sessionId, `document.querySelector('.reading')`, 12000);
	await sleep(900);
}

async function capture(cdp, sessionId, name, { fullPage = false } = {}) {
	await sleep(500);
	let params = { format: 'png', fromSurface: true };
	if (fullPage) {
		const metrics = await cdp.send('Page.getLayoutMetrics', {}, sessionId);
		const { width, height } = metrics.cssContentSize;
		params = {
			...params,
			captureBeyondViewport: true,
			clip: { x: 0, y: 0, width, height, scale: 1 }
		};
	}
	const { data } = await cdp.send('Page.captureScreenshot', params, sessionId);
	const file = path.join(tmpRoot, `${name}.png`);
	await writeFile(file, Buffer.from(data, 'base64'));
	return file;
}

async function captureScreens(cdp, sessionId) {
	const shots = {};

	await createManualReading(cdp, sessionId, 'Should I start now?');
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			const question = document.querySelector('.question-echo');
			const top = question ? question.getBoundingClientRect().top + window.scrollY - 22 : 0;
			document.scrollingElement.scrollTop = Math.max(0, top);
			return true;
		})()`
	);
	await sleep(400);
	shots.reading = await capture(cdp, sessionId, 'reading');

	await createManualReading(cdp, sessionId, 'What is the shape of this moment?', {
		seedJournal: true,
		viewport: tallViewport
	});
	await evaluate(cdp, sessionId, `window.scrollTo(0, 0)`);
	shots.onepage = await capture(cdp, sessionId, 'onepage');

	await resetApp(cdp, sessionId);
	await setQuestion(cdp, sessionId, 'What is moving here?');
	await clickByText(cdp, sessionId, 'Coin by coin');
	await waitFor(cdp, sessionId, `document.body.textContent.includes('Toss coin')`);
	for (let i = 0; i < 9; i++) {
		await clickByText(cdp, sessionId, 'Toss coin');
		await sleep(900);
	}
	await clickByText(cdp, sessionId, 'Toss coin');
	await sleep(280);
	shots.cast = await capture(cdp, sessionId, 'cast');

	await createManualReading(cdp, sessionId, 'Should I start now?');
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			const button = document.querySelector('[aria-label="Extended"]');
			button?.scrollIntoView({ block: 'center' });
			button?.click();
			return Boolean(button);
		})()`
	);
	await waitFor(cdp, sessionId, `document.querySelector('.extended')`, 12000);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			const close = document.querySelector('.shell-close');
			if (close) close.style.display = 'none';
			const body = document.querySelector('.shell-body');
			if (body) body.style.paddingBottom = 'var(--space-4)';
			return true;
		})()`
	);
	shots.extended = await capture(cdp, sessionId, 'extended');

	await resetApp(cdp, sessionId, { seedJournal: true });
	await waitFor(cdp, sessionId, `document.body.textContent.includes('Archive')`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
			document.querySelector('.panel summary')?.click();
			const journal = document.querySelector('.journal');
			if (journal) document.scrollingElement.scrollTop = Math.max(0, journal.getBoundingClientRect().top + window.scrollY - 36);
			return true;
		})()`
	);
	await sleep(600);
	shots.archive = await capture(cdp, sessionId, 'archive');

	return shots;
}

function esc(text) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function wrap(text, max) {
	return text.split('\n').flatMap((part) => {
		const words = part.split(/\s+/);
		const lines = [];
		let line = '';
		for (const word of words) {
			const next = line ? `${line} ${word}` : word;
			if (next.length > max && line) {
				lines.push(line);
				line = word;
			} else {
				line = next;
			}
		}
		if (line) lines.push(line);
		return lines;
	});
}

function textLines(lines, x, y, size, color, family, weight = 400, lineHeight = 1.12) {
	return lines
		.map(
			(line, index) =>
				`<text x="${x}" y="${y + index * size * lineHeight}" fill="${color}" font-size="${size}" font-family="${family}" font-weight="${weight}">${esc(line)}</text>`
		)
		.join('');
}

async function roundedImage(input, width, height, radius, fit = 'cover') {
	const resized = await sharp(input)
		.resize(width, height, { fit, position: 'top' })
		.png()
		.toBuffer();
	const mask = Buffer.from(
		`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
	);
	return sharp(resized)
		.composite([{ input: mask, blend: 'dest-in' }])
		.png()
		.toBuffer();
}

async function composeFrame(frame, shotPath) {
	const titleLines = wrap(frame.title, frame.title.length > 22 ? 18 : 22);
	const subtitleLines = wrap(frame.subtitle, 34);
	const titleY = 196;
	const subtitleY = titleY + titleLines.length * 72 + 56;

	const topSvg = `
	<svg width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<radialGradient id="top" cx="50%" cy="0%" r="74%">
				<stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.22"/>
				<stop offset="64%" stop-color="${palette.accent}" stop-opacity="0"/>
			</radialGradient>
			<linearGradient id="veil" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0%" stop-color="${palette.bg2}"/>
				<stop offset="100%" stop-color="${palette.bg}"/>
			</linearGradient>
			<filter id="shadow" x="-25%" y="-25%" width="150%" height="150%">
				<feDropShadow dx="0" dy="42" stdDeviation="34" flood-color="#000" flood-opacity="0.6"/>
			</filter>
		</defs>
		<rect width="100%" height="100%" fill="url(#veil)"/>
		<rect width="100%" height="100%" fill="url(#top)"/>
		<path d="M126 358 C420 270 770 270 1110 354" fill="none" stroke="${palette.accent}" stroke-opacity="0.14" stroke-width="2"/>
		${textLines(titleLines, 118, titleY, 72, palette.text, 'Cormorant Garamond, Georgia, serif', 400, 1.02)}
		${textLines(subtitleLines, 122, subtitleY, 28, palette.soft, 'IBM Plex Sans, Arial, sans-serif', 300, 1.34)}
	</svg>`;

	const shotArea =
		frame.layout === 'manuscript'
			? { x: 330, y: 552, w: 582, h: 2052, r: 10, fit: 'contain', framed: false }
			: frame.shot === 'cast' || frame.shot === 'extended'
				? { x: 178, y: 628, w: 886, h: 1908, r: 58, fit: 'contain', framed: true }
				: { x: 178, y: 650, w: 886, h: 1810, r: 58, fit: 'cover', framed: true };

	const screen = await roundedImage(shotPath, shotArea.w, shotArea.h, shotArea.r, shotArea.fit);
	const backSvg = `
	<svg width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" xmlns="http://www.w3.org/2000/svg">
		${shotArea.framed ? `<g filter="url(#shadow)"><rect x="${shotArea.x - 16}" y="${shotArea.y - 16}" width="${shotArea.w + 32}" height="${shotArea.h + 32}" rx="${shotArea.r + 18}" fill="#080706"/></g>` : ''}
	</svg>`;
	const borderSvg = `
	<svg width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" xmlns="http://www.w3.org/2000/svg">
		${shotArea.framed ? `<rect x="${shotArea.x - 1}" y="${shotArea.y - 1}" width="${shotArea.w + 2}" height="${shotArea.h + 2}" rx="${shotArea.r}" fill="none" stroke="${palette.accent}" stroke-opacity="0.36" stroke-width="2"/>` : ''}
	</svg>`;

	const output = path.join(outputRoot, frame.file);
	await sharp(Buffer.from(topSvg))
		.composite([
			{ input: Buffer.from(backSvg), left: 0, top: 0 },
			{ input: screen, left: shotArea.x, top: shotArea.y },
			{ input: Buffer.from(borderSvg), left: 0, top: 0 }
		])
		.png({ compressionLevel: 9 })
		.toFile(output);
	return output;
}

async function main() {
	await rm(tmpRoot, { recursive: true, force: true });
	await mkdir(tmpRoot, { recursive: true });

	const userDataDir = path.join(tmpRoot, 'chrome-profile');
	const chrome = spawn(chromePath, [
		'--headless=new',
		`--remote-debugging-port=${remotePort}`,
		`--user-data-dir=${userDataDir}`,
		'--no-first-run',
		'--no-default-browser-check',
		'--disable-gpu',
		'--disable-dev-shm-usage',
		'--hide-scrollbars',
		'about:blank'
	]);
	chrome.stderr.on('data', () => {});

	let cdp;
	try {
		const version = await waitForChrome();
		cdp = new Cdp(version.webSocketDebuggerUrl);
		await cdp.connect();
		const sessionId = await createPage(cdp);
		const shots = await captureScreens(cdp, sessionId);
		const outputs = [];
		for (const frame of frames) {
			outputs.push(await composeFrame(frame, shots[frame.shot]));
		}
		console.log(outputs.join('\n'));
	} finally {
		cdp?.close();
		chrome.kill('SIGTERM');
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
