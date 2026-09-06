# AGENTS.md

Canonical agent instructions for this repo. **Edit this file — don't fork it.**
Cursor, Codex, Gemini, and Claude all resolve here:

- Codex and any other `AGENTS.md`-native tool read this file directly.
- `CLAUDE.md` and `GEMINI.md` are pointers to this file.
- `.cursor/rules/project.mdc` points Cursor here (`alwaysApply`).

**I Ching · Shape of Momentum** — a symbolic reading of the I Ching (image of the moment,
its dynamics and direction of change; not a forecast). Full detail:
[README.md](./README.md), [docs/roadmap.md](./docs/roadmap.md).

## Golden rule: PWA-first

The PWA ([iching.eggs.gd](https://iching.eggs.gd)) is priority 0. Every feature must work
there. Native (Capacitor iOS / Android) adds platform integration on top, and every native
capability needs a web fallback. Make design and architecture decisions with the PWA in
mind first. See the Platform strategy table in the README.

## Stack & workflow

- SvelteKit 2 · Svelte 5 (runes, enforced) · TypeScript (strict) · yarn.
- `yarn dev` · `yarn check` (svelte-check) · `yarn lint` (prettier --check) · `yarn build`.
- Deploy PWA: `yarn build:pwa` rebuilds with `BASE_PATH=/pwa` and copies `build/` into
  `../../i-ching-site/static/pwa`; that repo's CI publishes `/pwa`.
- Prettier: tabs, single quotes, no trailing comma, width 100. Run `yarn format` before
  finishing.
- Don't commit or push unless asked — propose the change, let the maintainer push.

## MCP servers

Four configs must stay in sync — change one, change all: `.mcp.json` (Claude Code),
`.cursor/mcp.json` (Cursor), `.vscode/mcp.json` (VS Code), `.gemini/settings.json`
(Gemini).

### svelte — `@sveltejs/mcp`

Svelte 5 / SvelteKit documentation plus a Svelte-aware linter. **Use it for every change to
`.svelte` / `.svelte.ts` code.**

- `list-sections` — call FIRST for any Svelte / SvelteKit question. Returns the doc index
  (titles, `use_cases`, paths).
- `get-documentation` — fetch the full text of every section `list-sections` flagged as
  relevant (accepts a list). Do this before writing code.
- `svelte-autofixer` — run on Svelte code you wrote or changed, **before presenting or
  finalising it**. Loop: fix → re-run → repeat until it returns no issues and no
  suggestions. This is not optional.
- `playground-link` — only on explicit user request, and NEVER for code already written to
  files in this repo.

### design-patterns — `design_patterns_mcp`

A catalog of 705+ design patterns with hybrid RAG search. Consult it before non-trivial
structural decisions (a new subsystem, reworking the cast flow or storage layer, sync
design). Skip it for small local changes.

- `find_patterns` — `{ query, categories?, programmingLanguage?, maxResults=5 }` — semantic
  search from a problem statement, e.g. "decouple journal storage from sync transport".
- `search_patterns` — `{ query, searchType: keyword | semantic | hybrid, limit=10 }` — when
  you already know roughly what you're after.
- `get_pattern_details` — `{ patternId }` — full write-up and code examples for one pattern.
- `count_patterns` / `get_health_status` — catalog stats / server health.
- Resources: `patterns`, `categories`, `server_info`.
- Binaries live under `$AGENTS_TOOLS_DIR` (default `~/.agents/design_patterns_mcp`); the
  SQLite path is passed as `DATABASE_PATH` in the launch command.

### ts-language — `ts-language-mcp .`

TypeScript compiler intelligence. Use it instead of grep / whole-file reads when you need
to know how TS code connects. Position-based tools accept `symbol: "CastingFlow.tossNext"`
in place of line/column; an ambiguous name returns candidates.

- Navigation: `get_definition`, `get_type_definition`, `get_references` (read/write
  classified, paged), `get_implementations`, `get_call_hierarchy`, `get_type_hierarchy`.
- Types: `get_hover`, `get_signature`.
- Structure: `get_symbols`, `get_outline`, `get_imports`, `find` (AST search by
  name/kind/scope), `get_workspace_symbols` (fuzzy).
- Diagnostics: `get_diagnostics` (one file, TS + ESLint), `get_all_diagnostics`
  (project-wide + tsconfig), `get_completions`.
- Refactor — **writes to disk**: `rename_symbol`, `apply_code_fix`, `format_document`,
  `organize_imports` (with `apply: true`); preview-only: `rename_preview`, `get_code_fixes`,
  `organize_imports` without `apply`.
- Quality: `calculate_metrics`, `detect_duplication`, `find_indirection_hotspots`,
  `get_module_dependencies`, `quality_report`.
- Efficiency: `analyze_position`, `batch_analyze` (many positions in one call).
- Prefer `rename_symbol` over hand-editing any identifier rename; run `yarn check`
  afterwards regardless.
- Resources: `typescript://project/files`, `typescript://project/config`,
  `typescript://file/{path}`.

## Where things live

- App code: `src/` — structure map in the README.
- Journal storage abstraction: `src/lib/storage/` — `journal-local` (web),
  `journal-sqlite` (native), behind one `JournalRepository` interface.
- Auth + journal sync: `src/lib/state/auth.svelte.ts`, `src/lib/sync/`. One-shot sync,
  **no live listeners by design** — [`docs/sync.md`](./docs/sync.md).
- Analytics: `src/lib/analytics.ts` + `src/lib/firebase.ts` (web-only init).
- Content corpus and generation scripts: `src/lib/data/`, `scripts/`. Hexagram text voice
  and the "don't over-polish" rule: [`docs/editorial-style.md`](./docs/editorial-style.md).
- Roadmap and design decisions: [`docs/roadmap.md`](./docs/roadmap.md).
