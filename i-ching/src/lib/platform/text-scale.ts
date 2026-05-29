import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { TextZoom } from '@capacitor/text-zoom';
import type { PluginListenerHandle } from '@capacitor/core';

/** Matches default iOS body / our previous 16px base in TextZoom.swift */
const ROOT_BASE_PX = 16;

let appStateListener: PluginListenerHandle | null = null;
let visibilityHandler: (() => void) | null = null;

function applyRootFontScale(scale: number): void {
	const root = document.documentElement;
	const percent = Math.round(scale * 100);

	root.style.fontSize = `${ROOT_BASE_PX * scale}px`;
	root.style.setProperty('-webkit-text-size-adjust', `${percent}%`);
	root.style.setProperty('text-size-adjust', `${percent}%`);
}

/**
 * iOS: native getPreferred() + scale root `font-size` (rem follows html).
 * Android: TextZoom.set() adjusts WebView text zoom.
 */
export async function applySystemTextZoom(): Promise<void> {
	if (!Capacitor.isNativePlatform()) return;

	try {
		const { value } = await TextZoom.getPreferred();
		if (!Number.isFinite(value) || value <= 0) return;

		if (Capacitor.getPlatform() === 'ios') {
			applyRootFontScale(value);
			return;
		}

		await TextZoom.set({ value });
	} catch {
		// Plugin unavailable
	}
}

function scheduleReapply(): void {
	requestAnimationFrame(() => {
		void applySystemTextZoom();
	});
}

export async function initSystemTextZoom(): Promise<void> {
	await applySystemTextZoom();
	// WKWebView may not be ready on first tick
	setTimeout(() => void applySystemTextZoom(), 150);

	appStateListener?.remove();
	appStateListener = await App.addListener('appStateChange', ({ isActive }) => {
		if (isActive) scheduleReapply();
	});

	visibilityHandler = () => {
		if (document.visibilityState === 'visible') scheduleReapply();
	};
	document.addEventListener('visibilitychange', visibilityHandler);
}

export function teardownSystemTextZoom(): void {
	appStateListener?.remove();
	appStateListener = null;

	if (visibilityHandler) {
		document.removeEventListener('visibilitychange', visibilityHandler);
		visibilityHandler = null;
	}
}
