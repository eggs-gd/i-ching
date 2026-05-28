# I Ching Text Review — Second Pass — 2026-05-28

Scope: all 64 hexagram files in `src/lib/data/hexagrams`, both `uk` and `en`.

This is a second editorial pass after applying the first review backlog. The purpose is not to find every possible improvement, but to decide whether the corpus is stable enough for MVP and where further edits would still have value.

## Verdict

The corpus is now stable enough for MVP / first production body.

Do not do another broad prose polish pass now. The largest remaining risk is over-polishing: making the readings too clean, too smooth, and too sterile. The unevenness that remains is mostly acceptable and sometimes fits I Ching well.

Recommended next work:

1. Small keyword cleanup pass.
2. Optional tiny prose edits only where a line still visibly breaks voice.
3. Then move on to transition texts.

## Notes From External Review

The external review was mostly accurate:

- `02` is acceptable as-is. UK is stronger than EN, but EN no longer breaks the style.
- `06` should be kept. It is a strong hard-hexagram style reference.
- `18` should be kept. The reading is one of the strongest in the corpus, but its keywords are weak.
- `37` improved significantly and should be kept. The object list in the first dynamics paragraph is dense, but gives the reading body and should not be removed.
- The current danger is not under-polish, but over-polish.

## Global Status

### Reading Layer

Stable.

Most readings now have:

- concrete scene
- visible tension
- a stated distortion or risk
- restrained vector
- no therapeutic cushioning
- no forced positive lesson

The strongest references for future style:

- `06` Conflict
- `18` Work on What Has Been Spoiled
- `20` Contemplation
- `37` Family
- `49` Revolution
- `61` Inner Truth

### Judgment / Image Layer

Stable.

These are now close to the short classical formulas and should not be rewritten for style unless there is a known translation issue. Some words that would be weak in `reading` are acceptable here because this layer is intentionally formulaic.

### Keywords Layer

Still the weakest layer.

Keywords are visible UI signals, so generic or inaccurate ones matter more than they would inside a paragraph.

## Recommended Keyword Cleanup

### P1

#### `18` — Work on What Has Been Spoiled

Current:

- UK: `втрата`, `відновлення`, `таємниця`
- EN: `loss`, `renewal`, `mystery`

Issue:

These miss the actual text. The reading is about neglect, repair, and damaged roots, not mystery or loss.

Recommended:

- UK: `занедбання`, `ремонт`, `корінь`
- EN: `neglect`, `repair`, `root`

### P2

These are optional but worth doing in one small cleanup pass.

#### `09` — Small Accumulation

Current:

- UK: `м'яка сила`
- EN: `soft power`

Issue:

Too generic and slightly modern-political.

Possible:

- UK: `тонкий вплив`, `стримування`, `хмари`
- EN: `subtle influence`, `restraint`, `clouds`

#### `14` — Great Possession

Current:

- UK: `влада`, `підтримка`, `світло`
- EN: `power`, `support`, `light`

Issue:

Generic. `світло/light` is acceptable but not very specific.

Possible:

- UK: `володіння`, `видимість`, `міра`
- EN: `possession`, `visibility`, `measure`

#### `15` — Modesty

Current:

- UK: `покора`, `глибина`, `сила`
- EN: `modesty`, `depth`, `strength`

Issue:

`глибина/depth` and `сила/strength` are generic.

Possible:

- UK: `міра`, `низьке місце`, `вага`
- EN: `measure`, `low place`, `weight`

#### `17` — Following

Current:

- UK: `потік`, `гнучкість`, `прийняття`
- EN: `flow`, `flexibility`, `acceptance`

Issue:

Too soft and self-help adjacent.

Possible:

- UK: `відгук`, `ритм`, `слідування`
- EN: `response`, `rhythm`, `following`

#### `19` — Approach

Current:

- UK: `підхід`, `сила`, `межа часу`
- EN: `arrival`, `force`, `time limit`

Issue:

`сила/force` is generic.

Possible:

- UK: `наближення`, `приплив`, `строк`
- EN: `approach`, `tide`, `term`

#### `33` — Retreat

Current:

- UK: `обережність`, `прихованість`, `внутрішня сила`
- EN: `caution`, `disguise`, `inner strength`

Issue:

`внутрішня сила/inner strength` is generic and self-help adjacent.

Possible:

- UK: `відступ`, `відстань`, `збереження`
- EN: `retreat`, `distance`, `preservation`

#### `39` — Obstruction

Current:

- UK: `перешкода`, `глибина`, `сила`
- EN: `obstacle`, `depth`, `strength`

Issue:

Two generic terms.

Possible:

- UK: `перешкода`, `обхід`, `стіна`
- EN: `obstruction`, `detour`, `wall`

#### `50` — The Cauldron

Current:

- UK: `посудина`, `вогонь`, `перетворення`
- EN: `vessel`, `fire`, `transformation`

Issue:

`перетворення/transformation` is obvious and generic.

Possible:

- UK: `посудина`, `вогонь`, `варіння`
- EN: `vessel`, `fire`, `cooking`

#### `55` — Abundance

Current:

- UK: `потужність`, `перемога`, `вибух`
- EN: `power`, `victory`, `eruption`

Issue:

Too dramatic; `victory` is not the center of this hexagram.

Possible:

- UK: `повнота`, `полудень`, `надлишок`
- EN: `fullness`, `noon`, `excess`

## Texts To Keep

### `02` — Receptive

Keep as-is. UK is stronger, but EN is acceptable. The word `force` appears in EN dynamics, but in this case it does not dominate the reading.

### `06` — Conflict

Keep as-is. This should be treated as a reference for hard hexagrams.

Strong lines:

- “Слова вже не просто називають речі. Вони стають важелями...”
- “Чим сильніше натиск, тим твердішою стає межа.”
- “не веде до повної перемоги”

### `18` — Work on What Has Been Spoiled

Keep prose as-is. Only keywords need work.

Strong lines:

- “Старе легко видає себе за природний порядок.”
- “без неї нове стане на гнилу підлогу.”

### `37` — Family

Keep as-is. The object list is dense, but it makes the text embodied.

Strong lines:

- “як у домі ходить слово”
- “Домашній лад не створюється загальними почуттями.”
- “Тоді тепло стає димом.”

## Do Not Polish Further For Now

Avoid another full rewrite pass on:

- `06`
- `18`
- `20`
- `37`
- `49`
- `61`

These have personality now. Further smoothing may make them less alive.

## Proposed Next Patch

If we continue editing, do one small patch only:

1. Apply keyword cleanup for `18`.
2. Optionally apply P2 keyword cleanup for `09`, `14`, `15`, `17`, `19`, `33`, `39`, `50`, `55`.
3. Do not rewrite the readings in this pass.

