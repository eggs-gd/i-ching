# I Ching

**I Ching: Shape of Momentum** — a symbolic reading of the I Ching with no predictions and
no advice: an image of the present situation, its inner dynamics, and its direction of
change.

## Status

- **PWA — live and priority 0.** [iching.eggs.gd](https://iching.eggs.gd) is the primary
  product. Every feature must work there.
- **iOS / Android** — Capacitor shells are built. iOS 1.0.1 was submitted and rejected;
  a retry may follow. Android is not published yet.

All three targets are treated as active. Design decisions are made PWA-first. See
[docs/platform.md](docs/platform.md).

## Philosophy

- **Not divination** — the texts describe the structure of a moment, not "what will happen".
- **A symbolic mirror** — the user sets the context ("what draws your attention"); the cast
  fixes the shape of the situation.
- **Layers of reading** — `scene` (image), `dynamics`, `vector`; plus `composition`
  (trigram make-up) and the classical `judgment` / `image`.
- **Transitions** — moving lines show tension; **entry hexagram** → **exit hexagram**; with
  no change, the **state hexagram**.

## Read next

- [docs/overview.md](docs/overview.md) — cast, reading, archive, corpus.
- [docs/platform.md](docs/platform.md) — what is native and what the PWA already does.
- [docs/roadmap.md](docs/roadmap.md) — done and next.
- [docs/editorial-style.md](docs/editorial-style.md) — how hexagram texts are allowed to sound.
- [docs/sync.md](docs/sync.md) — optional journal sync.
- [docs/pwa-deeplink.md](docs/pwa-deeplink.md) — `?q=` contract.

## Modules

- [App/](App/) — the SvelteKit app. Engineering guide: [App/README.md](App/README.md).
- [Site/](Site/) — the landing page. [Site/README.md](Site/README.md).
- [scripts/](scripts/) — hexagram text pipeline, App Store screenshots, PWA copy.
- [AppStore/](AppStore/) — store images. Brief: [AppStore/AppStoreImages.md](AppStore/AppStoreImages.md).

Agent instructions: [AGENTS.md](AGENTS.md).

## Development

Both blocks start from the repository root.

```sh
cd App
yarn install
yarn dev            # http://localhost:5173
```

```sh
cd Site
yarn install
yarn dev
```

## Publishing

A push to `main` that changes `App/`, `Site/`, or `scripts/` runs
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). The workflow builds the app
with `BASE_PATH=/pwa`, copies that bundle into `Site/static/pwa`, then builds the landing
page and publishes both at [iching.eggs.gd](https://iching.eggs.gd). The landing page is the
domain root; the app is at `/pwa`.

`App` depends on the public package `@eggs/kit` (`link:../../eggs.gd-kit`). The workflow
checks that repo out next to the app; no secret is needed.
Locally, `yarn build:pwa` from `App/` only builds; `make pwa` copies `App/build` into
`Site/static/pwa`.

## Corpus pipeline

Commands run from the repository root (`make`). They read `App/.env` and write
`App/src/lib/data/`. Pass script flags in `ARGS`.

| Command                                      | Purpose                                        |
| -------------------------------------------- | ---------------------------------------------- |
| `make hexagram ARGS="--number 17"`           | LLM generation of the reading for one hexagram |
| `make hexagram-all`                          | Bulk generation (careful with curated 1–5)     |
| `make translate ARGS="--lang uk"`            | Translate extended corpus from curated EN      |
| `make apply`                                 | Apply reference JSON to the corpus             |
| `make appstore`                              | Render App Store screenshots                   |
| `make appstore-ipad`                         | Render iPad App Store screenshots              |

Prompt and validation: `scripts/lib/hexagram-generation-prompt.mjs`. Voice and the
"don't over-polish" rule: [docs/editorial-style.md](docs/editorial-style.md).

Requires `OPENAI_API_KEY` (see `App/.env.example`).
