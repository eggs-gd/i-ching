# Editorial style — hexagram texts

The standing guide for how the corpus reads and why. It replaces the 2026-05-28 review
series (that backlog — P1/P2 prose fixes, plus a keyword-field cleanup for a field that has
since been removed — was applied; the detail is in git history).

## The three layers

### `reading` — `scene` / `dynamics` / `vector`

The app's own voice. This is symbolic reflection, **not** fortune-telling, prediction,
advice, therapy, or self-help.

- Lucid, precise, restrained. Symbolic but concrete. Calm, unsentimental.
- Every sentence shows a recognizable shape: tension, boundary, movement, absence,
  restraint, distortion — or a form that holds, fails, opens, hardens, dissolves, waits.
- Don't explain emotions. Show the shape instead ("the words add weight instead of
  movement", not "emotions overflow").
- Hard hexagrams stay hard. Blocked stays blocked. Unresolved stays unresolved. Don't force
  a reading into growth, harmony, or wisdom.
- `scene` 1–3 image sentences; `dynamics` exactly 4 short paragraphs (active pattern →
  restraint/missing element → distortion/shadow → what keeps the process alive);
  `vector` 1–3 sparse closing lines, direction without prophecy.

Warn words in `reading` (risky when they replace a concrete image; fine when tied to one):
`сила / force`, `шлях / path`, `потік / flow`, `глибина / depth`, `світло / light`,
`трансформація / transformation`, `гармонія / harmony`, `структура / structure`,
`система / system`, `енергія / energy`, `внутрішній / inner`, `усвідомлення / awareness`,
`ресурс / resource`, `центр / center`.

Bad signals: therapeutic framing, generic wisdom, systems-coach phrasing, oracle fog,
motivational lesson. Good signals: concrete image, tension, limit, asymmetry,
contradiction, observable motion, dry diagnosis.

These rules are enforced at generation time by
[`scripts/lib/hexagram-generation-prompt.mjs`](../scripts/lib/hexagram-generation-prompt.mjs)
(`FORBIDDEN_UK` / `FORBIDDEN_EN`, paragraph counts, the reference readings). Keep that file
and this section in agreement.

### `judgment` / `image`

Classical formulas, kept close to the Book of Changes. Words that would be weak in
`reading` are acceptable here because this layer is intentionally formulaic. Do not rewrite
for style — only for a known translation error.

### Extended corpus — `hexagrams_ext/{en,uk}`

The Wilhelm interpretive layer. **English is the canonical source**; other locales are
regenerated from curated EN via
[`scripts/translate-hexagrams-ext.mjs`](../scripts/translate-hexagrams-ext.mjs) (the short
corpus supplies glossary/terminology only, not replacement prose).

Role-term normalization (already applied, keep consistent):

| Source (raw Wilhelm)      | Use               |
| ------------------------- | ----------------- |
| superior man              | noble person      |
| inferior man / people     | lesser person / people |
| holy man                  | sage              |
| great man                 | **kept** (classical formula term) |
| God / Deity / divine      | **kept** (Wilhelm's interpretive layer, deliberately not neutralized) |

Some archaic Wilhelm syntax (`It furthers one to…`, `Perseverance furthers.`) is classical
layer, not product voice — keep it unless it blocks comprehension.

## Stop condition

**Do not run broad prose-polish passes over the existing corpus.** It is meant to stay
uneven — sometimes dry, cryptic, procedural, brutally concrete. Over-smoothing pushes it
toward polished spiritual UX copy, which is the wrong direction for this product. Edit an
existing reading only when there is a concrete bug (mistranslation, broken voice in one
visible line, factual error about the hexagram).

New generation goes through the prompt/validation pipeline; that is where standards are
raised, not by re-polishing shipped text.

## Reference hexagrams

Leave untouched; use as the style bar: **06** (hardness), **18** (rot and repair),
**20** (the gaze), **37** (house speech), **49** (shedding), **61** (hollow sound).
