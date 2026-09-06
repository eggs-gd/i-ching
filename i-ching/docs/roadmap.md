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

### Stage 3 — Auth + journal sync (web / PWA)

- Optional Google sign-in (`authStore`); local-first stays the default.
- Journal syncs through Firebase Realtime Database, opt-in, plaintext scoped by `uid`.
- One-shot sync (pull on sign-in / refocus / manual; debounced push) — **no live
  listeners**, by design. Full write-up: [`docs/sync.md`](sync.md).
- Deletes now leave tombstones (local storage + SQLite v2).
- Privacy policy updated to disclose optional sync.

Native auth and E2E encryption are still open — see `docs/sync.md` → Not done.

---

## Next

### Monetization (not started)

- RevenueCat — subscriptions / credits.
- Rewarded ads (AdMob).
- AI backend for the "Explanation" feature.
- UI stubs already exist behind `SHOW_PAID_FEATURE_STUBS` in `src/lib/config/features.ts`.

### Sync — remaining

- Native sign-in (`@capacitor-firebase/authentication`); sync is web-only until then.
- Optional E2E encryption layer.
- Apple sign-in on web (Services ID + key) — Google-only for now; Apple was dropped from
  the first cut.

### Smaller items

- Wilhelm line commentary (384 lines).
- Note editing on archive entries (the `note` field already exists on `Casting`).
