import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';
import type { Locale } from '$lib/i-ching/types';
import {
	detectLocale,
	LOCALE_STORAGE_KEY,
	translate,
	type TranslationParams
} from './translations.ts';

const I18N_KEY = Symbol('i18n');

export class I18nStore {
	locale = $state<Locale>(detectLocale());

	setLocale(next: Locale) {
		this.locale = next;
		if (browser) {
			localStorage.setItem(LOCALE_STORAGE_KEY, next);
			document.documentElement.lang = next;
		}
	}

	t(key: string, params?: TranslationParams): string {
		return translate(this.locale, key, params);
	}
}

export function initI18n(): I18nStore {
	const store = new I18nStore();
	setContext(I18N_KEY, store);
	if (browser) {
		document.documentElement.lang = store.locale;
	}
	return store;
}

export function useI18n(): I18nStore {
	return getContext<I18nStore>(I18N_KEY);
}
