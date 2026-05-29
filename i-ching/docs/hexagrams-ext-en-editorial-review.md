# Hexagrams Ext EN Editorial Review

Date: 2026-05-29

Scope: `src/lib/data/hexagrams_ext/en/*.json`

This is the post-cleanup review of the English extended corpus. The goal is to make EN a stable canonical source for future locales while keeping the extended text close to Wilhelm/classical commentary.

## Current Status

The first mechanical cleanup pass is complete.

Resolved:

- `english` titles now match `src/lib/data/hexagrams/*.json -> locales.en.name`.
- Non-Chinese ALL-CAPS markers are gone.
- Long `comments` fields without paragraph breaks are gone.
- Known raw import artifacts were fixed: `IT is`, stray periods, `form heaven`, `from the fist`, `sone`, `t his`, `not more`, `goof fortune`, etc.
- Classical role terms were normalized mechanically:
  - `superior man` -> `noble person`
  - `inferior man/people` -> `lesser person/people`
  - `holy man` -> `sage`
- `great man` was preserved as a classical formula term after review.
- Awkward image headers like `The image of The Family` were normalized.

Current metrics:

| Check | Result |
|---|---:|
| Title mismatches vs short EN corpus | 0 |
| Non-Chinese ALL-CAPS occurrences | 0 |
| Long comments without paragraph breaks | 0 |
| `noble person` occurrences | 130 |
| `lesser person/people` occurrences | 47 |
| `great man` occurrences | 31 |
| `God` / `Deity` occurrences | 26 |

## Remaining Issues

### 1. Classical Role Language

The mechanical role-term pass is consistent, but not fully literary.

Decision after review:

- Keep `noble person`.
- Keep `lesser person/people`.
- Preserve `great man` in classical formula contexts.

Examples that may still need minor syntax smoothing later:

- `noble person ... his words`
- `noble person makes himself strong`
- `lesser people` as a moral class

Recommendation: keep `noble person` for now, then do a pronoun/syntax pass only where the sentence sounds visibly broken.

### 2. Theological Wilhelm Language

`God`, `Deity`, `divine`, `Supreme Deity`, and related phrases remain in the commentary.

This is part of Wilhelm's interpretive layer, not always the Chinese base text. It may be worth preserving in EN source but should be a conscious decision before regenerating other locales.

Recommendation: preserve for now. Do not neutralize automatically.

### 3. Old Wilhelm Syntax

Some phrasing is now clean but still archaic or stiff:

- `Thus the noble person makes himself strong and untiring.`
- `Thus does the prince act...`
- `It furthers one to...`
- `Nothing that would further.`
- `Perseverance furthers.`

Recommendation: keep these formulas for now. They are classical layer, not product voice. Only revise when they block comprehension or damage translation quality.

### 4. Remaining Import/Source Oddities

Not urgent, but worth a manual pass:

- Pronoun consistency around `noble person`: several lines still read as `noble person ... his`.
- Gendered classical commentary remains throughout. This is mostly Wilhelm style, not an import error.
- Theological Wilhelm language remains intentionally untouched.

## Recommended Next Steps

1. Do not run another broad EN rewrite.
2. Update `translate-hexagrams-ext.mjs` so the short corpus provides glossary/terminology only:
   - hexagram names;
   - trigram vocabulary;
   - fixed formula terms;
   - not replacement text for extended `wilhelm_judgment.text` or `wilhelm_image.text`.
3. Regenerate `uk` from curated EN.
4. Run a separate `uk` review focused on machine translation artifacts and terminology alignment.
5. Later, if needed, do a tiny pronoun/syntax pass in EN.

## Stop Condition

EN is now good enough for the next controlled pass. It is not yet final literary copy, but the main structural problems are gone.

The next EN changes should be small and manual. Avoid another broad automatic rewrite unless it targets a clearly measurable issue.
