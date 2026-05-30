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
	: path.join(workspaceRoot, 'AppStore');
const output = path.join(outputRoot, 'appstore-02-one-page.png');
const require = createRequire(path.join(projectRoot, 'package.json'));
const sharp = require('sharp');
const tmpRoot = process.env.APPSTORE_TMP_DIR ?? '/private/tmp/i-ching-appstore-02';
const appUrl = process.env.APPSTORE_APP_URL ?? 'http://127.0.0.1:5173/';
const chromePath =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const remotePort = Number(process.env.APPSTORE_REMOTE_PORT ?? 9338);
const viewport = { width: 430, height: 1900, dpr: 2 };
const canvas = { width: 1242, height: 2688 };

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
			const message = JSON.parse(event.data);
			if (!message.id) return;
			const pending = this.pending.get(message.id);
			if (!pending) return;
			this.pending.delete(message.id);
			message.error
				? pending.reject(new Error(JSON.stringify(message.error)))
				: pending.resolve(message.result);
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
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
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

async function setupApp(cdp, sessionId) {
	await cdp.send('Page.navigate', { url: appUrl }, sessionId);
	await waitFor(cdp, sessionId, `document.readyState === 'complete'`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
    localStorage.setItem('i-ching-locale', 'en');
    localStorage.setItem('i-ching-journal', ${JSON.stringify(seededJournalJson())});
    return true;
  })()`
	);
	await cdp.send('Page.navigate', { url: appUrl }, sessionId);
	await waitFor(cdp, sessionId, `document.querySelector('textarea')`);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
    const textarea = document.querySelector('textarea');
    textarea.value = 'What is the shape of this moment?';
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  })()`
	);
	const clickText = async (text) => {
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
		await sleep(300);
	};
	await clickText('Hexagram already cast');
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
	await waitFor(
		cdp,
		sessionId,
		`document.querySelector('.reading') && document.querySelector('.journal')`
	);
	await evaluate(
		cdp,
		sessionId,
		`document.scrollingElement.scrollTop = Math.max(0, document.querySelector('.reading').getBoundingClientRect().top + window.scrollY - 40)`
	);
	await evaluate(
		cdp,
		sessionId,
		`(() => {
    const style = document.createElement('style');
    style.textContent = '.profile-bar,.scroll-top-bar{display:none!important}';
    document.head.appendChild(style);
    return true;
  })()`
	);
	await sleep(600);
}

async function captureFull(cdp, sessionId) {
	const metrics = await cdp.send('Page.getLayoutMetrics', {}, sessionId);
	const { width, height } = metrics.cssContentSize;
	const { data } = await cdp.send(
		'Page.captureScreenshot',
		{
			format: 'png',
			fromSurface: true,
			captureBeyondViewport: true,
			clip: { x: 0, y: 0, width, height, scale: 1 }
		},
		sessionId
	);
	const file = path.join(tmpRoot, 'onepage-full.png');
	await writeFile(file, Buffer.from(data, 'base64'));
	return file;
}

function esc(text) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}
function text(
	x,
	y,
	size,
	value,
	color = palette.text,
	family = 'Cormorant Garamond, Georgia, serif'
) {
	return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-family="${family}" font-weight="400">${esc(value)}</text>`;
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

async function compose(fullShot) {
	const leftStrip = await strip(fullShot, 420, 570, 1770);
	const rightStrip = await strip(fullShot, 1780, 570, 1770);
	const leftRotated = await sharp(leftStrip)
		.rotate(-4, { background: '#00000000' })
		.png()
		.toBuffer();
	const rightRotated = await sharp(rightStrip)
		.rotate(5, { background: '#00000000' })
		.png()
		.toBuffer();
	const svg = `<svg width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="top" cx="50%" cy="0%" r="74%"><stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.22"/><stop offset="64%" stop-color="${palette.accent}" stop-opacity="0"/></radialGradient>
      <linearGradient id="veil" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${palette.bg2}"/><stop offset="100%" stop-color="${palette.bg}"/></linearGradient>
      <filter id="shadow" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="40" stdDeviation="34" flood-color="#000" flood-opacity="0.62"/></filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#veil)"/><rect width="100%" height="100%" fill="url(#top)"/>
    <path d="M126 358 C420 270 770 270 1110 354" fill="none" stroke="${palette.accent}" stroke-opacity="0.14" stroke-width="2"/>
    ${text(118, 196, 72, 'ONE PAGE')}
    ${text(122, 334, 28, 'Everything stays in a single flow.', palette.soft, 'IBM Plex Sans, Arial, sans-serif')}
  </svg>`;
	await sharp(Buffer.from(svg))
		.composite([
			{ input: leftRotated, left: 160, top: 610 },
			{ input: rightRotated, left: 500, top: 760 }
		])
		.png({ compressionLevel: 9 })
		.toFile(output);
}

async function main() {
	await mkdir(tmpRoot, { recursive: true });
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
		await setupApp(cdp, sessionId);
		const fullShot = await captureFull(cdp, sessionId);
		await compose(fullShot);
		console.log(output);
	} finally {
		cdp?.close();
		chrome.kill('SIGTERM');
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
