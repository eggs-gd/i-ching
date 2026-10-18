# What the product does

## Cast

1. Context — a required text field.
2. Three modes, offered as buttons up front:
   - **Coin by coin** — 18 separate tosses;
   - **Line by line** — 6 tosses of 3 coins;
   - **All at once** — instant cast with a build-up animation.
   - **Real coins** — enter physical coin throws, or a hexagram already cast on paper.
3. Grid of coins and lines: line numbers light up (waiting / forming / ready).

## Read

- Hexagram card: number, name, character, pinyin, composition, trigrams.
- Classical block (judgment + image).
- Three paragraphs of symbolic reading (scene → dynamics → vector).
- **Moving lines** spoiler (6→1) with universal positional texts.
- **ⓘ** buttons explaining moving lines and entry / state / exit.
- **Extended** classical commentary (Wilhelm layer), per hexagram, uk + en.

## Archive

- **Web:** `localStorage` (`i-ching-journal`, unbounded).
- **Native:** SQLite (`readings` table), one-time migration from `localStorage`.
- Each entry: question, lines, coins, primary and exit hexagram (if there was a transition).
- Tap an entry — reopen the reading with the coins restored.
- **Echoes** spoiler — recurring motifs by primary hexagram.
- Locale switcher lives in the page header (top-right); archive export / clear are icon
  buttons in the archive heading.

## Localization

Ukrainian (default) and English. Switcher in the header.

## Data corpus

- 64 hexagrams in `App/src/lib/data/hexagrams/*.json` (uk + en, structural readings, classical
  texts, trigrams).
- Extended classical texts in `App/src/lib/data/hexagrams_ext/{en,uk}/*.json`.
- The pipeline that writes those files lives in `scripts/`. Voice rules are in
  [editorial-style.md](editorial-style.md).
