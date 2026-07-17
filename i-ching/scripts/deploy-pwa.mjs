#!/usr/bin/env node
// Copies the freshly built PWA (build/) into the sibling i-ching-site repo
// under static/pwa, so it is served at https://iching.eggs.gd/pwa after the
// site repo is committed & pushed. Run via `yarn build:pwa`.

import { cp, rm, mkdir, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(appRoot, 'build');
// app lives at <repos>/i-ching/i-ching, site at <repos>/i-ching-site
const target = resolve(appRoot, '../../i-ching-site/static/pwa');

async function exists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

if (!(await exists(source))) {
	console.error(`✗ Build output not found at ${source}. Run the build first.`);
	process.exit(1);
}

const siteStatic = resolve(target, '..');
if (!(await exists(siteStatic))) {
	console.error(`✗ Site static dir not found at ${siteStatic}. Is i-ching-site checked out next to i-ching?`);
	process.exit(1);
}

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });

console.log(`✓ PWA copied to ${target}`);
console.log('  Next: commit & push the i-ching-site repo to publish /pwa.');
