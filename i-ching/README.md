# I Ching · Shape of Momentum

A symbolic reading of the I Ching in the browser. Not a forecast and not advice — an image
of the current situation, its inner dynamics, and its direction of change.

## Status

- **PWA — live and priority 0.** [iching.eggs.gd](https://iching.eggs.gd) is the primary
  product. Every feature must work there.
- **iOS / Android** — Capacitor shells are built. iOS 1.0.1 was submitted and rejected;
  a retry may follow. Android is not published yet.

All three targets are treated as active, but design decisions are made **PWA-first**
(see [Platform strategy](#platform-strategy)).

---

## Product philosophy

- **Not divination** — the texts describe the structure of a moment, not "what will happen".
- **A symbolic mirror** — the user sets the context ("what draws your attention"); the cast
  fixes the shape of the situation.
- **Layers of reading** — `scene` (image), `dynamics`, `vector`; plus `composition`
  (trigram make-up) and the classical `judgment` / `image`.
- **Transitions** — moving lines show tension; **entry hexagram** → **exit hexagram**; with
  no change, the **state hexagram**.

---

## Platform strategy

The PWA is the reference implementation. Native builds add platform integration, and every
native capability has a web fallback so the PWA is never behind.

| Capability      | Native                                  | Web / PWA fallback               |
| --------------- | --------------------------------------- | -------------------------------- |
| Journal storage | SQLite (`@capacitor-community/sqlite`)  | `localStorage`                   |
| Analytics       | `@capacitor-firebase/analytics`         | `firebase/analytics` (lazy)      |
| Archive export  | System share sheet                      | In-app preview → download / copy |
| Haptics         | `@capacitor/haptics`                    | no-op                            |
| Text size       | Dynamic Type via `@capacitor/text-zoom` | browser zoom                     |
| Status bar      | `@capacitor/status-bar`                 | n/a                              |

When adding a feature: make it work on the PWA first, then layer the native path on top.

---

## What the app does

### Cast

1. Context — a required text field.
2. Three modes, offered as buttons up front:
   - **Coin by coin** — 18 separate tosses;
   - **Line by line** — 6 tosses of 3 coins;
   - **All at once** — instant cast with a build-up animation.
   - **Real coins** — enter physical coin throws, or a hexagram already cast on paper.
3. Grid of coins and lines: line numbers light up (waiting / forming / ready).

### Read

- Hexagram card: number, name, character, pinyin, composition, trigrams.
- Classical block (judgment + image).
- Three paragraphs of symbolic reading (scene → dynamics → vector).
- **Moving lines** spoiler (6→1) with universal positional texts.
- **ⓘ** buttons explaining moving lines and entry / state / exit.
- **Extended** classical commentary (Wilhelm layer), per hexagram, uk + en.

### Archive

- **Web:** `localStorage` (`i-ching-journal`, unbounded).
- **Native:** SQLite (`readings` table), one-time migration from `localStorage`.
- Each entry: question, lines, coins, primary and exit hexagram (if there was a transition).
- Tap an entry — reopen the reading with the coins restored.
- **Echoes** spoiler — recurring motifs by primary hexagram.
- Locale switcher lives in the page header (top-right); archive export / clear are icon
  buttons in the archive heading.

### Localization

- Ukrainian (default) and English. Switcher in the header.

### Data corpus

- 64 hexagrams in `src/lib/data/hexagrams/*.json` (uk + en, structural readings, classical
  texts, trigrams).
- Extended classical texts in `src/lib/data/hexagrams_ext/{en,uk}/*.json`.
- Generation / patch scripts in `scripts/` (see [Content pipeline](#content-pipeline)).

---

## Stack

|                 |                                                                   |
| --------------- | ----------------------------------------------------------------- |
| Framework       | SvelteKit 2, Svelte 5 (runes)                                     |
| Language        | TypeScript                                                        |
| Package manager | yarn                                                              |
| Deploy (web)    | `@sveltejs/adapter-static`; PWA bundle copied into `i-ching-site` |
| Mobile          | Capacitor 8 (iOS / Android)                                       |
| Storage         | `localStorage` (web) · SQLite (native)                            |
| Analytics       | Firebase (`aiching-9bbf6`)                                        |

---

## Project structure

```
src/
├── routes/
│   ├── +layout.svelte        # app shell, native init, scroll-to-top
│   ├── +layout.ts            # prerender = true
│   └── +page.svelte          # flow orchestration; header with locale switcher
├── lib/
│   ├── i-ching/
│   │   ├── catalog/                 # glyphs, binary, trigrams, resolveHexagram
│   │   ├── casting-flow.svelte.ts   # CastingFlow — cast state machine
│   │   ├── cast-timing.ts           # animation timing
│   │   ├── coins.ts                 # three coins, sums 6–9
│   │   ├── hexagram.ts              # lines, changing, relating
│   │   ├── journal.ts               # grouping, recurring motifs, id
│   │   ├── export.ts                # archive → Markdown
│   │   └── types.ts
│   ├── storage/                     # JournalRepository: local (web) + sqlite (native)
│   ├── state/journal.svelte.ts      # journalStore (runes)
│   ├── platform/                    # native init, haptics, text zoom
│   ├── config/features.ts           # paid-feature stub toggle
│   ├── i18n/                        # uk (default) + en, runes store
│   ├── components/
│   │   ├── ui/                      # AppButton, AppPopup, IconButton, …
│   │   ├── primitives/              # CoinFace, CoinGrid, LineGlyph, …
│   │   ├── journal/                 # archive list, motifs
│   │   └── *.svelte                 # QuestionForm, CastingStage, ReadingResult, JournalPanel, …
│   ├── analytics.ts                 # track(): firebase/analytics (web) · plugin (native)
│   └── firebase.ts                  # web-only Firebase init
├── scripts/                         # content generation, App Store images, PWA deploy
└── static/
```

---

## Development

```sh
yarn install
yarn dev            # http://localhost:5173
yarn check          # svelte-check + TypeScript
yarn lint           # prettier --check
yarn format         # prettier --write
yarn build          # static build → build/
yarn preview

yarn build:pwa      # BASE_PATH=/pwa build → copy into ../../i-ching-site/static/pwa
yarn build:mobile   # static build + cap sync
yarn ios            # open Xcode
yarn android        # open Android Studio
```

Agent instructions and MCP setup: [`AGENTS.md`](AGENTS.md) (canonical; `CLAUDE.md` /
`GEMINI.md` / Cursor rules point to it). Svelte code goes through the Svelte MCP server —
`list-sections` → `get-documentation` → `svelte-autofixer`.

### Deploying the PWA

`yarn build:pwa` rebuilds with `BASE_PATH=/pwa` and copies `build/` into
`i-ching-site/static/pwa`. Commit and push `i-ching-site`; its GitHub Actions workflow
publishes `/pwa` at [iching.eggs.gd/pwa](https://iching.eggs.gd/pwa).

---

## Journal (technical)

```ts
interface Casting {
	id: string; // crypto.randomUUID()
	createdAt: string; // ISO
	question: string;
	primaryNumber: number;
	relatingNumber?: number; // present when there are moving lines
	changingLines: number[];
	lines: Line[];
	coinRows?: CoinValue[][];
	locale?: 'uk' | 'en';
	method?: 'single' | 'line' | 'all' | 'real' | 'manual' | 'motif';
	note?: string; // reserved; no editing UI yet
}
```

Entries are effectively write-once today (`note` has no editor). The only mutation is
delete, which is a hard delete with no record kept.

**Web:** DevTools → Local Storage → `i-ching-journal`.
**Native:** SQLite database `i-ching`, table `readings`:

| Column             | Casting field        |
| ------------------ | -------------------- |
| `id`               | `id`                 |
| `created_at`       | `createdAt`          |
| `locale`           | `locale`             |
| `question`         | `question`           |
| `primary_hexagram` | `primaryNumber`      |
| `changed_hexagram` | `relatingNumber`     |
| `moving_lines`     | JSON `changingLines` |
| `method`           | `method`             |
| `lines_json`       | JSON `lines`         |
| `coin_rows_json`   | JSON `coinRows`      |
| `note`             | `note`               |

Optional cross-device sync (Google sign-in → Firebase Realtime Database, one-shot, no live
listeners) — see [`docs/sync.md`](docs/sync.md). Deletes leave a tombstone so removals
propagate.

---

## Analytics

`track(name, params?)` in `src/lib/analytics.ts`:

- **Native** → `@capacitor-firebase/analytics`, initialised from the bundled
  `GoogleService-Info.plist` / `google-services.json`.
- **Web** → `firebase/analytics`, initialised from `src/lib/firebase.ts` (web client
  config inline; not secret). Loaded lazily and gated on `isSupported()`, so it is a silent
  no-op during prerender, on native, and in browsers without IndexedDB / with blockers.

Web events land in the same GA4 property (`G-LVWYH1Y06R`). Check GA4 → Realtime /
DebugView, not the Firebase console's mobile-oriented Analytics tab.

---

## Content pipeline

| Command                              | Purpose                                        |
| ------------------------------------ | ---------------------------------------------- |
| `yarn generate:hexagram -- <N>`      | LLM generation of the reading for one hexagram |
| `yarn generate:hexagram:all`         | Bulk generation (careful with curated 1–5)     |
| `yarn translate:hexagrams-ext`       | Translate extended corpus from curated EN      |
| `yarn apply:reference-readings`      | Apply reference JSON to the corpus             |
| `yarn generate:appstore-images`      | Render App Store screenshots                   |
| `yarn generate:appstore-ipad-images` | Render iPad App Store screenshots              |

Prompt and validation: `scripts/lib/hexagram-generation-prompt.mjs` — structural tone,
banned phrases, four dynamics paragraphs. Voice and the "don't over-polish" rule:
[`docs/editorial-style.md`](docs/editorial-style.md).

Requires `OPENAI_API_KEY` (see `.env.example`).

---

## Under consideration

- Monetization — RevenueCat (subscriptions, credits), rewarded ads, an AI backend for the
  "Explanation" feature. UI stubs exist behind `SHOW_PAID_FEATURE_STUBS`.
- Native sign-in for sync (`@capacitor-firebase/authentication`); optional E2E encryption.
- Wilhelm line commentary (384 lines).
- Note editing on archive entries.

---

## License

Private project (`"private": true`).
