/**
 * Screenshot helper for sync-button-states.html
 * Usage (from i-ching app root):
 *   npx playwright install chromium
 *   node docs/capture-sync-button-states.mjs
 */
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'sync-button-states.html');
const fileUrl = `file://${htmlPath}`;

async function shot(viewport, outName) {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport });
	await page.goto(fileUrl, { waitUntil: 'networkidle' });
	await page.screenshot({
		path: path.join(__dirname, outName),
		fullPage: true
	});
	await browser.close();
	console.log('wrote', path.join(__dirname, outName));
}

await shot({ width: 1280, height: 720 }, 'sync-button-desktop.png');
await shot({ width: 390, height: 844 }, 'sync-button-mobile.png');
