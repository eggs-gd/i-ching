import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const workspaceRoot = path.resolve(projectRoot, '..');
const outputRoot = process.env.APPSTORE_OUTPUT_DIR
	? path.resolve(process.env.APPSTORE_OUTPUT_DIR)
	: path.join(workspaceRoot, 'AppStore', 'iPad');
const require = createRequire(path.join(projectRoot, 'package.json'));
const sharp = require('sharp');
const tmpRoot = process.env.APPSTORE_TMP_DIR ?? '/private/tmp/i-ching-appstore-ipad';
const appUrl = process.env.APPSTORE_APP_URL ?? 'http://127.0.0.1:5173/';
const chromePath =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const remotePort = Number(process.env.APPSTORE_REMOTE_PORT ?? 9340);
const canvas = { width: 2752, height: 2064 };
const viewport = { width: 1366, height: 1024, dpr: 2 };

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
		file: 'appstore-ipad-01-reading.png',
		title: 'NOT ANOTHER APP',
		subtitle: 'A quiet place for a single question.',
		shot: 'reading'
	},
	{
		file: 'appstore-ipad-02-one-page.png',
		title: 'ONE PAGE',
		subtitle: 'Everything stays in a single flow.',
		shot: 'onepage',
		special: 'strips'
	},
	{
		file: 'appstore-ipad-03-cast.png',
		title: 'NO RUSH',
		subtitle: 'Coin by coin. Line by line.',
		shot: 'cast'
	},
	{
		file: 'appstore-ipad-04-extended.png',
		title: 'WHEN SHORT IS NOT ENOUGH',
		subtitle: 'Read the classic commentary.',
		shot: 'extended'
	},
	{
		file: 'appstore-ipad-05-archive.png',
		title: 'QUESTIONS HAVE MEMORY',
		subtitle: 'Return months later.\nSee what keeps returning.',
		shot: 'archive'
	}
];

const palette = {
	bg: '#0e0d0b',
	bg2: '#161411',
	text: '#e8e2d6',
	soft: '#b9b1a3',
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
			const msg = JSON.parse(event.data);
			if (!msg.id) return;
			const p = this.pending.get(msg.id);
			if (!p) return;
			this.pending.delete(msg.id);
			msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result);
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
				'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
		},
		sessionId
	);
	return sessionId;
}

async function evaluate(cdp, sessionId, expression) {
	const result = await cdp.send(
		'Runtime.evaluate',
		{ expression, awaitPromise: true, returnByValue: true },
		sessionId
	);
	if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Runtime exception');
	return result.result.value;
}

async function waitFor(cdp, sessionId, predicate, timeout = 12000) {
	const deadline = Date.now() + timeout;
	while (Date.now() < deadline) {
		if (await evaluate(cdp, sessionId, `Boolean(${predicate})`)) return;
		await sleep(120);
	}
	throw new Error(`Timed out waiting for ${predicate}`);
}

function seededJournalJson() {
	const line = (value, changing = false) => ({ value, kind: 'young', changing });
	const numbers = [1, 20, 37, 1, 18, 1, 20, 37, 18, 20, 1, 37, 18, 20, 37];
	return JSON.stringify(
		archiveQuestions.map((question, index) => ({
			id: `ipad-${index + 1}`,
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

async function resetApp(cdp, sessionId, seedJournal = false) {
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
	await cdp.send('Page.navigate', { url: appUrl }, sessionId);
	await waitFor(cdp, sessionId, `document.querySelector('textarea')`);
	await sleep(500);
}

async function setQuestion(cdp, sessionId, question) {
	await waitFor(cdp, sessionId, `document.querySelector('textarea')`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
    const textarea = document.querySelector('textarea');
    textarea.value = ${JSON.stringify(question)};
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`
	);
	await sleep(250);
}

async function clickText(cdp, sessionId, text) {
	const ok = await evaluate(
		cdp,
		sessionId,
		`(() => {
    const button = [...document.querySelectorAll('button')].find(b => b.textContent.trim().includes(${JSON.stringify(text)}));
    button?.click();
    return Boolean(button);
  })()`
	);
	if (!ok) throw new Error(`Button not found: ${text}`);
	await sleep(350);
}

async function createManualReading(cdp, sessionId, question, seedJournal = false) {
	await resetApp(cdp, sessionId, seedJournal);
	await setQuestion(cdp, sessionId, question);
	await clickText(cdp, sessionId, 'Hexagram already cast');
	await waitFor(cdp, sessionId, `document.body.textContent.includes('I Ching answer')`);
	await evaluate(cdp, sessionId, `document.querySelector('.trigger')?.click()`);
	await waitFor(
		cdp,
		sessionId,
		`document.querySelector('#hex-picker-primary')?.closest('dialog')?.open`
	);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
    const heaven = [...document.querySelectorAll('.trigram-btn')].filter(b => b.textContent.includes('Heaven'));
    heaven[0]?.click();
    setTimeout(() => heaven[1]?.click(), 80);
    return true;
  })()`
	);
	await waitFor(
		cdp,
		sessionId,
		`!document.querySelector('#hex-picker-primary')?.closest('dialog')?.open && document.body.textContent.includes('The Creative')`
	);
	await evaluate(cdp, sessionId, `document.querySelector('#prefilled-cast-form')?.requestSubmit()`);
	await waitFor(cdp, sessionId, `document.querySelector('.reading')`);
	await sleep(700);
}

async function capture(cdp, sessionId, name, fullPage = false) {
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
		`document.scrollingElement.scrollTop = Math.max(0, document.querySelector('.question-echo').getBoundingClientRect().top + window.scrollY - 30)`
	);
	await sleep(400);
	shots.reading = await capture(cdp, sessionId, 'reading');

	await createManualReading(cdp, sessionId, 'What is the shape of this moment?', true);
	await waitFor(cdp, sessionId, `document.querySelector('.journal')`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
    document.scrollingElement.scrollTop = Math.max(0, document.querySelector('.reading').getBoundingClientRect().top + window.scrollY - 40);
    const style = document.createElement('style');
    style.textContent = '.profile-bar,.scroll-top-bar{display:none!important}';
    document.head.appendChild(style);
    return true;
  })()`
	);
	await sleep(500);
	shots.onepage = await capture(cdp, sessionId, 'onepage', true);

	await resetApp(cdp, sessionId);
	await setQuestion(cdp, sessionId, 'What is moving here?');
	await clickText(cdp, sessionId, 'Coin by coin');
	await waitFor(cdp, sessionId, `document.body.textContent.includes('Toss coin')`);
	for (let i = 0; i < 9; i++) {
		await clickText(cdp, sessionId, 'Toss coin');
		await sleep(650);
	}
	await clickText(cdp, sessionId, 'Toss coin');
	await sleep(250);
	shots.cast = await capture(cdp, sessionId, 'cast');

	await createManualReading(cdp, sessionId, 'Should I start now?');
	await evaluate(
		cdp,
		sessionId,
		`(() => { const b = document.querySelector('[aria-label="Extended"]'); b?.scrollIntoView({ block: 'center' }); b?.click(); return Boolean(b); })()`
	);
	await waitFor(cdp, sessionId, `document.querySelector('.extended')`);
	await evaluate(
		cdp,
		sessionId,
		`(() => { document.querySelector('.shell-close')?.remove(); const body = document.querySelector('.shell-body'); if (body) body.style.paddingBottom = 'var(--space-4)'; return true; })()`
	);
	await sleep(300);
	shots.extended = await capture(cdp, sessionId, 'extended');

	await resetApp(cdp, sessionId, true);
	await waitFor(cdp, sessionId, `document.querySelector('.journal')`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
    document.querySelector('.panel summary')?.click();
    const journal = document.querySelector('.journal');
    document.scrollingElement.scrollTop = Math.max(0, journal.getBoundingClientRect().top + window.scrollY - 32);
    return true;
  })()`
	);
	await sleep(500);
	shots.archive = await capture(cdp, sessionId, 'archive');

	return shots;
}

function esc(s) {
	return s
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}
function wrap(text, max) {
	return text.split('\n').flatMap((part) => {
		const lines = [];
		let line = '';
		for (const word of part.split(/\s+/)) {
			const next = line ? `${line} ${word}` : word;
			if (next.length > max && line) {
				lines.push(line);
				line = word;
			} else line = next;
		}
		if (line) lines.push(line);
		return lines;
	});
}
function textLines(lines, x, y, size, color, family, lineHeight = 1.12) {
	return lines
		.map(
			(line, i) =>
				`<text x="${x}" y="${y + i * size * lineHeight}" fill="${color}" font-size="${size}" font-family="${family}" font-weight="400">${esc(line)}</text>`
		)
		.join('');
}

async function rounded(input, width, height, radius, fit = 'cover') {
	const resized = await sharp(input)
		.resize(width, height, { fit, position: 'top' })
		.png()
		.toBuffer();
	const mask = Buffer.from(
		`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`
	);
	return sharp(resized)
		.composite([{ input: mask, blend: 'dest-in' }])
		.png()
		.toBuffer();
}
async function strip(input, top, width, height) {
	const meta = await sharp(input).metadata();
	const sourceWidth = meta.width;
	const sourceHeight = meta.height;
	const extractHeight = Math.min(Math.round((height * sourceWidth) / width), sourceHeight - top);
	return sharp(input)
		.extract({
			left: 0,
			top: Math.max(0, Math.min(top, sourceHeight - extractHeight)),
			width: sourceWidth,
			height: extractHeight
		})
		.resize(width, height, { fit: 'cover', position: 'top' })
		.png()
		.toBuffer();
}

async function compose(frame, shotPath) {
	const titleLines = wrap(frame.title, frame.title.length > 22 ? 22 : 26);
	const subtitleLines = wrap(frame.subtitle, 42);
	const titleSvg = `<svg width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="top" cx="48%" cy="0%" r="86%"><stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.2"/><stop offset="70%" stop-color="${palette.accent}" stop-opacity="0"/></radialGradient><linearGradient id="veil" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${palette.bg2}"/><stop offset="100%" stop-color="${palette.bg}"/></linearGradient><filter id="shadow" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="36" stdDeviation="34" flood-color="#000" flood-opacity="0.62"/></filter></defs>
    <rect width="100%" height="100%" fill="url(#veil)"/><rect width="100%" height="100%" fill="url(#top)"/>
    <path d="M160 430 C760 260 1550 260 2570 430" fill="none" stroke="${palette.accent}" stroke-opacity="0.14" stroke-width="3"/>
    ${textLines(titleLines, 150, 218, 104, palette.text, 'Cormorant Garamond, Georgia, serif')}
    ${textLines(subtitleLines, 154, 218 + titleLines.length * 116 + 74, 42, palette.soft, 'IBM Plex Sans, Arial, sans-serif', 1.32)}
  </svg>`;

	if (frame.special === 'strips') {
		const left = await sharp(await strip(shotPath, 520, 760, 1360))
			.rotate(-4, { background: '#00000000' })
			.png()
			.toBuffer();
		const right = await sharp(await strip(shotPath, 1780, 760, 1360))
			.rotate(4, { background: '#00000000' })
			.png()
			.toBuffer();
		await sharp(Buffer.from(titleSvg))
			.composite([
				{ input: left, left: 640, top: 520 },
				{ input: right, left: 1120, top: 640 }
			])
			.png({ compressionLevel: 9 })
			.toFile(path.join(outputRoot, frame.file));
		return;
	}

	const area = { x: 820, y: 470, w: 1760, h: 1320, r: 74, fit: 'cover' };
	const screen = await rounded(shotPath, area.w, area.h, area.r, area.fit);
	const frameSvg = `<svg width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" xmlns="http://www.w3.org/2000/svg"><g filter="url(#shadow)"><rect x="${area.x - 24}" y="${area.y - 24}" width="${area.w + 48}" height="${area.h + 48}" rx="${area.r + 26}" fill="#080706"/></g><rect x="${area.x - 1}" y="${area.y - 1}" width="${area.w + 2}" height="${area.h + 2}" rx="${area.r}" fill="none" stroke="${palette.accent}" stroke-opacity="0.36" stroke-width="2"/></svg>`;
	await sharp(Buffer.from(titleSvg))
		.composite([
			{ input: Buffer.from(frameSvg), left: 0, top: 0 },
			{ input: screen, left: area.x, top: area.y }
		])
		.png({ compressionLevel: 9 })
		.toFile(path.join(outputRoot, frame.file));
}

async function main() {
	await mkdir(tmpRoot, { recursive: true });
	await mkdir(outputRoot, { recursive: true });
	const chrome = spawn(chromePath, [
		'--headless=new',
		`--remote-debugging-port=${remotePort}`,
		`--user-data-dir=${path.join(tmpRoot, 'chrome-profile')}`,
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
		for (const frame of frames) {
			await compose(frame, shots[frame.shot]);
			console.log(path.join(outputRoot, frame.file));
		}
	} finally {
		cdp?.close();
		chrome.kill('SIGTERM');
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
