import { browser } from '$app/environment';
import type { Locale } from '$lib/i-ching/types';
import { DEFAULT_LOCALE, LOCALES } from '$lib/i-ching/types';
import en from './locales/en.json';
import uk from './locales/uk.json';

const STORAGE_KEY = 'i-ching-locale';

type Dictionary = typeof uk;

const dictionaries: Record<Locale, Dictionary> = { uk, en };

export type TranslationParams = Record<string, string | number>;

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
	return path.split('.').reduce<unknown>((current, key) => {
		if (current && typeof current === 'object' && key in current) {
			return (current as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj);
}

function interpolate(template: string, params?: TranslationParams): string {
	if (!params) return template;
	return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
}

export function detectLocale(): Locale {
	if (browser) {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored && LOCALES.includes(stored as Locale)) {
			return stored as Locale;
		}

		const language = navigator.language.toLowerCase();
		if (language.startsWith('uk')) return 'uk';
	}

	return DEFAULT_LOCALE;
}

export function translate(locale: Locale, key: string, params?: TranslationParams): string {
	const value = getNestedValue(dictionaries[locale] as Record<string, unknown>, key);
	if (typeof value !== 'string') return key;
	return interpolate(value, params);
}

export function getLocaleDateFormat(locale: Locale): string {
	return locale === 'uk' ? 'uk-UA' : 'en-GB';
}

export const LOCALE_STORAGE_KEY = STORAGE_KEY;
