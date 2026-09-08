/**
 * PWA deeplink contract (v1): only `?q=<question>`.
 * See docs/pwa-deeplink.md.
 *
 * `URLSearchParams.get` already percent-decodes; treat the result as plain
 * user-provided text (no further transform beyond trim).
 */
export function parseDeeplinkQuestion(searchParams: URLSearchParams): string | null {
	const raw = searchParams.get('q');
	if (raw === null) return null;
	const trimmed = raw.trim();
	if (!trimmed) return null;
	return trimmed;
}
