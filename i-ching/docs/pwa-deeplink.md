# PWA deeplink forwarding (v1)

PWA-to-PWA contract for forwarding an I Ching question into the I Ching app via a
URL query parameter. A source PWA builds a link; the I Ching PWA opens, prefills
the question, and automatically starts a virtual all-coins toss.

This document is the technical spec produced for CORE-144 / implemented by
CORE-147.

## Use case

```text
Source PWA
  → creates I Ching URL with ?q=...
  → opens I Ching PWA
  → question is prefilled
  → app automatically starts a virtual coin toss (all coins)
  → normal I Ching result / journal flow continues
```

Example production URL:

```text
https://iching.eggs.gd/pwa/?q=What+about+my+career
```

Local / preview (no `/pwa` base path):

```text
http://localhost:5173/?q=What+about+my+career
```

## Supported parameters

| Param | Required | Meaning                                      |
| ----- | -------- | -------------------------------------------- |
| `q`   | yes*     | Question / context text (plain user string)  |

\*If `q` is missing, empty, or only whitespace after decode/trim, the deeplink
is a no-op and the app keeps its normal startup (question step, empty field).

No other parameters are part of v1. There is **no `mode` parameter**. Virtual
toss mode for deeplink is always **all coins** (`TossMode` `'all'`), matching
the existing “All at once” cast button.

Unknown query parameters (for example `utm_*`, `mode`, `foo`) are **ignored**.

## Encoding and safety

- Encode the question with standard URL encoding (`encodeURIComponent` / form
  `application/x-www-form-urlencoded` spaces-as-`+`).
- The app reads `q` via `URLSearchParams.get('q')`, which percent-decodes once.
- Treat the value as **plain user-provided text**. Do not evaluate it, inject it
  into HTML as markup, or persist it beyond the normal casting / journal path.
- Trim leading/trailing whitespace after decode. Blank results are ignored.

## Semantics

Deeplink state is a **one-shot request to start a virtual reading**, not durable
app state by itself. After `q` is consumed:

1. Question text is written into `CastingFlow.question`.
2. `CastingFlow.startCast('all')` runs (same path as a manual “All at once”
   virtual cast).
3. The immersive toss animation and `finishCasting` / journal save / reading
   step are unchanged.

Consuming the param clears `q` from the address bar via SvelteKit's
`replaceState` (from `$app/navigation`, so `page.url` stays in sync with the
router) so a refresh does not restart another automatic cast. Other (unknown)
params are left as-is.

## Non-goals (out of scope)

- Native iOS / Android deep links
- Custom URL schemes
- Universal Links / App Links
- Apple App Site Association (AASA) files
- Capacitor-specific URL handling
- A `mode` (or other) query parameter in v1

Those can be separate tasks later if needed.

## SvelteKit implementation notes

App structure (verified):

| Piece              | Location                                      |
| ------------------ | --------------------------------------------- |
| Flow orchestration | `src/routes/+page.svelte`                     |
| Cast state machine | `src/lib/i-ching/casting-flow.svelte.ts`      |
| Deeplink parse     | `src/lib/i-ching/deeplink.ts`                 |
| Question UI        | `src/lib/components/QuestionForm.svelte`      |
| Toss UI            | `src/lib/components/CastingStage.svelte`      |

`+layout.ts` sets `ssr = false` and `prerender = true` (static SPA). After
`journalStore.load()` completes on mount, read the query from `$app/state`
`page.url.searchParams` (or an equivalent `URLSearchParams` source).

Minimal flow (see `src/routes/+page.svelte`):

```ts
import { replaceState } from '$app/navigation';
import { parseDeeplinkQuestion } from '$lib/i-ching/deeplink';

const question = parseDeeplinkQuestion(page.url.searchParams);
if (question) {
	// strip q so a refresh does not re-trigger the auto cast
	const next = new URL(page.url);
	next.searchParams.delete('q');
	replaceState(`${next.pathname}${next.search}${next.hash}`, page.state);

	flow.setQuestion(question);
	track('cast_started', { method: 'all' }); // parity with the manual virtual-cast buttons
	void flow.startCast('all');
}
```

Reuse `startCast('all')` — do not duplicate coin or reading logic. Await journal
load before starting so a concurrent `load()` cannot wipe the new entry and
trigger the “casting missing from journal → reset” effect. The manual virtual
cast buttons emit `track('cast_started', …)` from `QuestionForm`, so the
deeplink path fires the same event for analytics parity (`startCast` itself does
not emit it).

## Example URLs

| URL | Expected behavior |
| --- | --- |
| `/pwa/?q=What+about+my+career` | Prefill “What about my career”, auto virtual all-toss |
| `/pwa/?q=Hello%20world` | Prefill “Hello world”, auto virtual all-toss |
| `/pwa/` | Normal startup, no auto cast |
| `/pwa/?q=` or `/pwa/?q=+++` | Normal startup (blank `q`) |
| `/pwa/?q=Hi&utm_source=x&mode=line` | Prefill “Hi”, auto all-toss; `mode` / `utm_*` ignored |

## Manual verification

1. `yarn dev` → open `/?q=What+about+my+career` → question prefilled, all-coins
   animation runs, reading appears.
2. Open `/` with no query → question step unchanged.
3. Open `/?q=` → question step unchanged.
4. Open `/?q=Hi&foo=1&mode=line` → “Hi” prefilled, all-toss (not line mode).

Automated coverage: `yarn test:deeplink` (`src/lib/i-ching/deeplink.test.ts`).
