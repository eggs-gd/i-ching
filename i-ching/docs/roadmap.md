# Roadmap

## Guiding principle: PWA-first

The PWA is priority 0. Every feature must work at [iching.eggs.gd](https://iching.eggs.gd).
Native builds add platform integration on top; each native capability has a web fallback
(see the README's Platform strategy table). Make product and architecture decisions with
the PWA in mind first.

---

## Done

### Stage 1 — Reading + journal (PWA)

- Cast flow (coin by coin / line by line / all at once / real coins / manual hexagram).
- Symbolic reading (scene / dynamics / vector) + classical judgment & image.
- Extended Wilhelm commentary, uk + en.
- Local journal with recurring-motif "echoes".
- Ukrainian (default) + English.

### Stage 2 — Capacitor shells (iOS / Android)

- Static build (`adapter-static`, `build/`), Capacitor 8 (`ios/`, `android/`).
- Bundle ID `gd.eggs.aiching`.
- Journal: `localStorage` (web) · SQLite (native, `@capacitor-community/sqlite`), with a
  one-time migration from `localStorage` on first native launch.
- Dynamic Type: `@capacitor/text-zoom` `getPreferred()` → scales the root `html`
  `font-size` (all `rem` follow); re-applied on resume and on viewport change.
- Firebase Analytics wired for native and web.

iOS 1.0.1 submitted → rejected; retry TBD. Android built, not published.

---

## Next

### Monetization (not started)

- RevenueCat — subscriptions / credits.
- Rewarded ads (AdMob).
- AI backend for the "Explanation" feature.
- UI stubs already exist behind `SHOW_PAID_FEATURE_STUBS` in `src/lib/config/features.ts`.

### Cross-device journal sync (design stage)

Opt-in; local-first stays the default (no account required to use the app). Decisions so
far from the design discussion:

- **Identity:** Firebase Auth — Sign in with Apple + Google (both free under 50K MAU).
  Apple is mandatory on iOS if Google is offered.
- **Store:** Realtime Database, not Firestore — no per-document 1 MiB ceiling (a daily user
  passes ~1800 entries/year), and no per-day read/write op quota to worry about at this
  scale. Flat tree: `/journals/{uid}/entries/{uuid}` + `/journals/{uid}/tombstones/{uuid}`.
- **Sync shape:** one-shot pull on resume, debounced push on save. No live listeners (keeps
  clear of the Spark 100-connection limit). Incremental via a server-timestamp cursor.
- **Merge:** union by `id` (UUIDs never collide across devices) + a tombstone log.
  Prerequisite work: deletes are currently silent hard deletes — they need to write
  tombstones, both web and native.
- **E2E encryption:** deferred. v1 stores plaintext scoped by `uid` via security rules;
  the privacy policy needs updating to say so once sync ships.

Free tier (Spark) is expected to hold to ~1K active users; graduating to Blaze at that
point costs a few dollars a month.

### Smaller items

- Wilhelm line commentary (384 lines).
- Note editing on archive entries (the `note` field already exists on `Casting`).
