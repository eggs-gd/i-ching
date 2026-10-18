# App

SvelteKit application. PWA first, with Capacitor shells for iOS and Android.

## Stack

|                 |                                                                   |
| --------------- | ----------------------------------------------------------------- |
| Framework       | SvelteKit 2, Svelte 5 (runes)                                     |
| Language        | TypeScript                                                        |
| Package manager | yarn                                                              |
| Deploy (web)    | `@sveltejs/adapter-static`; `yarn build:pwa` sets `BASE_PATH=/pwa`    |
| Mobile          | Capacitor 8 (iOS / Android)                                       |
| Storage         | `localStorage` (web) · SQLite (native)                            |
| Analytics       | Firebase (`aiching-9bbf6`)                                        |

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
│   │   ├── deeplink.ts              # PWA ?q= parse (docs/pwa-deeplink.md)
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
└── static/
```

Hexagram JSON consumed by the app lives in `src/lib/data/`. The pipeline that writes it is
`scripts/` at the repository root.

## Development

```sh
yarn install
yarn dev            # http://localhost:5173
yarn check          # svelte-check + TypeScript
yarn lint           # prettier --check
yarn format         # prettier --write
yarn test:deeplink  # node:test for ?q= parse
yarn build          # static build → build/
yarn preview

yarn build:pwa      # BASE_PATH=/pwa
yarn build:mobile   # static build + cap sync
yarn ios            # open Xcode
yarn android        # open Android Studio
```

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

Optional cross-device sync is specified in `docs/sync.md`. Deletes leave a tombstone so
removals propagate. The `?q=` deeplink is specified in `docs/pwa-deeplink.md`.

## Analytics

`track(name, params?)` in `src/lib/analytics.ts`:

- **Native** → `@capacitor-firebase/analytics`, initialised from the bundled
  `GoogleService-Info.plist` / `google-services.json`.
- **Web** → `firebase/analytics`, initialised from `src/lib/firebase.ts` (web client
  config inline; not secret). Loaded lazily and gated on `isSupported()`, so it is a silent
  no-op during prerender, on native, and in browsers without IndexedDB / with blockers.

Web events land in the same GA4 property (`G-LVWYH1Y06R`). Check GA4 → Realtime /
DebugView, not the Firebase console's mobile-oriented Analytics tab.

## License

Private project (`"private": true`).
