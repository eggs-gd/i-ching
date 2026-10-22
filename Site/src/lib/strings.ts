import { DEFAULT_LOCALE, type Locale } from './i18n';
import en from './locales/en.json';
import uk from './locales/uk.json';

export type StringKey = keyof typeof en;

const dictionaries: Record<Locale, Record<StringKey, string>> = { en, uk };

/** A string of the interface in a locale; a missing one falls back to the default locale. */
export function t(
	locale: Locale,
	key: StringKey,
	params: Record<string, string | number> = {}
): string {
	const template = dictionaries[locale][key] ?? dictionaries[DEFAULT_LOCALE][key];
	return template.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`));
}
