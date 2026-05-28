# I Ching Text Review — 2026-05-28

Scope: all 64 hexagram files in `src/lib/data/hexagrams`, both `uk` and `en`.

This review was used as the editorial backlog for the follow-up polishing pass. The listed `P1`, `P2`, keyword cleanup, and optional micro-polish items were accepted and applied after review.

## Review Rules

Use the warning list as a review trigger, not an absolute ban.

Warn words in `reading`: `сила`, `шлях`, `потік`, `глибина`, `світло`, `трансформація`, `гармонія`, `структура`, `система`, `енергія`, `внутрішній`, `усвідомлення`, `ресурс`, `центр`; EN equivalents: `force`, `path`, `flow`, `depth`, `light`, `transformation`, `harmony`, `structure`, `system`, `energy`, `inner`, `awareness`, `resource`, `center`.

These are usually acceptable in `judgment/image` when close to canonical wording. They are risky in `reading`, especially when they replace a concrete image.

Good signals:
- concrete image
- tension
- limit
- asymmetry
- contradiction
- observable motion
- dry diagnosis

Bad signals:
- therapeutic framing
- generic wisdom
- systems-coach phrasing
- oracle fog
- motivational lesson

Priority:
- `P1`: should polish before considering the text stable.
- `P2`: optional but likely improves voice consistency.
- `OK`: no action needed beyond future taste edits.

## Global Findings

1. `judgment/image` are now much closer to the Book of Changes. Most should stay as-is, even if they contain formulaic words like “шлях” or “favorable”, because that is the point of this layer.
2. The `reading` layer is mostly coherent, but some files still contain abstraction-heavy phrasing from the generation layer.
3. English and Ukrainian are generally aligned. The weaker places tend to mirror each other, so fixes should be applied bilingually.
4. Several keywords still use generic terms. This is lower-risk than weak prose, but worth cleaning because keywords become visible UI signals.

## Highest-Value Fixes

### P1 — Fix First

- `01`: replace weak keywords `сила` and EN `structure`. Suggested: UK `імпульс`, EN `impulse`.
- `20`: replace “форма сама показує свій закон” / “the form shows its own law”. Suggested: “форма сама починає показувати свої межі” / “the form begins to show its own edges”.
- `37`: rewrite the first and fourth `dynamics` paragraphs. Current text has systems-coach residue: “внутрішня будова”, “межа близькості”, “центр чистий”.
- `07`: reduce abstraction: “енергія”, “центр”, “сила існує тільки там, де має форму” is a little slogan-like.
- `27`: remove `система` / `system`; it sounds technical in a text about nourishment.
- `31`: EN has too much abstraction: “structure”, “form”, “mutual movement”. UK is better but can be made more tactile.
- `49`: EN name/keywords and reading still overuse `transformation`. Consider `Revolution` / `change of skin` vocabulary instead.
- `61`: good image, but `center/inner/form` density is high. Needs one concrete pass.

### P2 — Good Candidates For Polish

- `02`: “здатність не ламати процес власною напругою” is good, but EN “one's own tension” is slightly therapeutic.
- `03`: “структури народжуються як шум” is stylish but slightly systems-language.
- `08`: `center` appears in keywords and prose. The reading is good, but could use a more concrete replacement in one paragraph.
- `12`: “structure itself” / “dead middle” is strong in EN, but UK “форма/рух” density is high.
- `14`: `resource` feels modern-producty. Replace with “stored amount”, “what is held”, or a concrete possession image.
- `16`: “енергія” / `energy` appears; otherwise good.
- `18`: strong overall, but “нова форма стоятиме...” is a little generated.
- `26`: many warn words (`енергія`, `ресурс`, `сила`). Strong meaning, but can be made more concrete.
- `29`: canonical topic permits depth/danger language, but `Depths` as name plus repeated “depth” may be too generic.
- `30`: `світло` is unavoidable, but “усвідомлена” in UK is a yellow flag.
- `34`: good canonical match, but reading uses `сила/енергія` heavily.
- `35`: `шлях/світло` acceptable, but could be less luminous-general and more “daybreak/visibility”.
- `52`: strong concept, but “культ каменю” may be too witty compared with the rest.
- `57`: `сила` and `flow` warning; otherwise stable.
- `59`: good, but `center` is repeated in both keyword and reading.
- `60`: good, but “frame” in EN is slightly design/system language.
- `62`: strong reading, but keywords are generic.

## Per-Hexagram Notes

### 01 — The Creative
Priority: `P1`

Reading is strong and close to canonical voice. The line “Те, що здатне створювати, здатне й спалювати...” should stay.

Issue: keywords. UK `сила` is generic; EN `structure` is especially off for Qian. Suggested keywords: UK `творення`, `імпульс`, `небо`; EN `initiative`, `impulse`, `heaven`.

`judgment/image`: good.

### 02 — The Receptive
Priority: `P2`

Good voice. UK works better than EN. EN “one's own tension” leans slightly self-help.

Possible EN polish: “not to break the process by tightening around it.”

`judgment/image`: good.

### 03 — Difficulty at the Beginning
Priority: `P2`

Strong and readable. “Деякі структури спочатку народжуються як шум” is memorable but slightly systems-coded.

Possible alternative: “Деякий лад спочатку чути тільки як шум.”

`judgment/image`: good.

### 04 — Youthful Folly
Priority: `OK`

Consistent. Minimal risk.

`judgment/image`: good; close to original.

### 05 — Waiting
Priority: `OK`

Consistent and clean. “не розсипати себе раніше часу” is slightly human-facing but not therapeutic.

`judgment/image`: good.

### 06 — Conflict
Priority: `OK`

Strong. Good dry conflict language. No major issue.

`judgment/image`: good.

### 07 — The Army
Priority: `P1`

Issue: too many abstract anchors: `енергія`, `центр`, `сила`, “де має форму”. It reads a little like an organizational model.

Direction: make it more concrete: ranks, banner, command, mass, water under earth.

`judgment/image`: good.

### 08 — Holding Together
Priority: `P2`

Good overall. The “late joining” idea is excellent and close to the original.

Issue: `центр` / `center` appears in keywords and prose. Consider replacing one occurrence with “вісь”, “місце збору”, “point of gathering”.

`judgment/image`: good.

### 09 — Small Accumulation
Priority: `OK`

Good and concrete. “One crude movement breaks what was held by light pressure” works.

Keywords still include `м'яка сила`; acceptable but could be less generic later.

`judgment/image`: good.

### 10 — Treading
Priority: `OK`

Good. Risk and step are concrete. This is in the desired register.

`judgment/image`: good.

### 11 — Peace
Priority: `OK`

Coherent. “Too much ease turns this state into sleep” is strong.

`judgment/image`: good.

### 12 — Stagnation
Priority: `P2`

Good diagnosis. Some abstraction remains: `форма`, `рух`, EN `structure`.

Possible direction: replace one technical sentence with a concrete image of blocked passage.

`judgment/image`: good.

### 13 — Fellowship
Priority: `OK`

Good. The reading avoids emotional fellowship and keeps it public/open.

`judgment/image`: good.

### 14 — Great Possession
Priority: `P2`

Issue: `resource` / `ресурс` feels contemporary and product-like.

Possible replacement: “те, що зібране”, “what is held”, “the gathered amount”.

`judgment/image`: good.

### 15 — Modesty
Priority: `OK`

Strong. “False humility is also performance” is good and not mushy.

`judgment/image`: good.

### 16 — Enthusiasm
Priority: `P2`

Mostly good. Issue: `енергія/energy` and `mood` can sound modern, but the text still lands.

Consider changing “енергія може бути зібрана” to a more concrete “гурт може стати строєм” style.

`judgment/image`: good.

### 17 — Following
Priority: `OK`

Good. “follows noise, not process” is slightly abstract but effective.

`judgment/image`: good.

### 18 — Work On What Has Been Spoiled
Priority: `P2`

Strong and close to the desired voice. Minor issue: “нова форма стоятиме...” is a little generated.

Possible replacement: “інакше нове стане на гнилу підлогу.”

`judgment/image`: good.

### 19 — Approach
Priority: `OK`

Good. “people forget the ebb” works well.

`judgment/image`: good.

### 20 — Contemplation
Priority: `P1`

One of the strongest readings.

Issue: “форма сама показує свій закон” / “the form shows its own law” is the one sentence that sounds like artificial wisdom.

Suggested replacement:
- UK: “іноді форма сама починає показувати свої межі.”
- EN: “sometimes the form begins to show its own edges.”

`judgment/image`: good.

### 21 — Biting Through
Priority: `OK`

Strong. Concrete obstruction, cutting, judgment. Good fit.

`judgment/image`: good.

### 22 — Grace
Priority: `OK`

Good. “surface begins to govern what it should only reveal” is strong, though slightly abstract. Acceptable.

`judgment/image`: good.

### 23 — Splitting Apart
Priority: `OK`

Strong. “not glue back with words” is very good.

`judgment/image`: good.

### 24 — Return
Priority: `OK`

Good. “first movement” language works.

`judgment/image`: good.

### 25 — Without Falsehood
Priority: `OK`

Good. Clear and dry.

`judgment/image`: good.

### 26 — Great Accumulation
Priority: `P2`

Issue: dense in warn words: `енергія`, `ресурс`, `сила`, EN `energy/resource/force`.

Direction: use storehouse, mountain, held breath, grain, reins.

`judgment/image`: good.

### 27 — Nourishment
Priority: `P1`

Issue: `система` / `system` is the wrong register for this text.

Suggested direction: “де тіло/справа залежить від підживлення” rather than “where the system depends on supply.”

`judgment/image`: good.

### 28 — Great Exceeding
Priority: `OK`

Strong. Ridgepole/overload image is concrete and canonical.

`judgment/image`: good.

### 29 — Repeated Water
Priority: `P2`

Good content. Risk: repeated `depth` language and name `Глибини / Depths` are generic.

Possible title alignment later: `Повторна вода / Repeated Water` or `Безодня / The Abyss`.

`judgment/image`: good.

### 30 — The Clinging
Priority: `P2`

Good overall. `світло/light` is unavoidable here. UK “усвідомлена” is the only mild flag.

`judgment/image`: good.

### 31 — Influence
Priority: `P1`

Issue: EN has too much abstraction: `structure`, `form`, `mutual movement`. UK is better but still could be more tactile.

Direction: keep mountain/lake/touch/echo; reduce “connection” and “movement” terms.

`judgment/image`: good.

### 32 — Duration
Priority: `OK`

Good. Keywords still include `гармонія/harmony`, but reading is clean.

Possible keyword cleanup later.

`judgment/image`: good.

### 33 — Retreat
Priority: `OK`

Strong. “space between sides becomes protection” works.

`judgment/image`: good.

### 34 — Great Power
Priority: `P2`

Good meaning, but heavy on `сила/енергія/force/energy`.

Direction: thunder, height, line not crossed.

`judgment/image`: good.

### 35 — Progress
Priority: `P2`

Good, but luminous vocabulary is a little broad.

Direction: daybreak, court visibility, being received, not “shine”.

`judgment/image`: good.

### 36 — Darkening Of The Light
Priority: `OK`

Good. Light vocabulary is canonical and justified.

`judgment/image`: good.

### 37 — The Family
Priority: `P1`

Mixed. Good lines:
- “Домашній лад не створюється загальними почуттями.”
- “Тоді тепло стає димом.”

Weak lines:
- “внутрішня будова”
- “межа близькості”
- “Коли центр чистий, зовнішній рух теж несе форму.”

Direction: rewrite paragraph 1 and 4 around table, hearth, speech, doors, roles, repeated acts.

`judgment/image`: good.

### 38 — Opposition
Priority: `OK`

Good. Clear difference without forcing reconciliation.

Keywords still include `гармонія/harmony`; consider replacing.

`judgment/image`: good.

### 39 — Obstruction
Priority: `OK`

Good. “where there is no road” works.

`judgment/image`: good.

### 40 — Release
Priority: `OK`

Good. Concrete knot language.

`judgment/image`: good.

### 41 — Decrease
Priority: `OK`

Good. Very consistent.

`judgment/image`: good.

### 42 — Increase
Priority: `OK`

Good. “number vs movement” distinction works.

EN keyword `transformation` can be replaced later, but not urgent.

`judgment/image`: good.

### 43 — Breakthrough
Priority: `OK`

Strong. “Soft silence no longer maintains order” is good.

`judgment/image`: good.

### 44 — Coming To Meet
Priority: `OK`

Good. “accidental guest / host” is strong.

`judgment/image`: good.

### 45 — Gathering
Priority: `OK`

Mostly good. Some `center` repetition, but it is conceptually appropriate.

`judgment/image`: good.

### 46 — Pushing Upward
Priority: `OK`

Good. Step-by-step image works.

`judgment/image`: good.

### 47 — Oppression
Priority: `OK`

Strong. “Words are not trusted” in judgment pairs well with the reading.

`judgment/image`: good.

### 48 — The Well
Priority: `OK`

Good. Resource warning is justified by the well, though “shared resource” is slightly modern.

Possible later replacement: “common water”.

`judgment/image`: good.

### 49 — Revolution
Priority: `P1`

Issue: too much `transformation` in EN name/keywords/prose. UK is better but still “Перетворення” is broad.

Direction: use `Зміна шкіри / Revolution` or `Зміна / Skinning`. More hide/shedding, less transformation.

`judgment/image`: good.

### 50 — The Cauldron
Priority: `OK`

Good. `transformation` is justified here, but can be reduced because cauldron imagery already carries it.

`judgment/image`: good.

### 51 — Shock
Priority: `OK`

Strong. Good handling of shock without turning it into growth.

`judgment/image`: good.

### 52 — Keeping Still
Priority: `P2`

Good. “культ каменю / cult of stone” is memorable but tonally a bit more witty than the surrounding set.

Consider a drier close.

`judgment/image`: good.

### 53 — Gradual Progress
Priority: `OK`

Good. Natural sequence image works.

`judgment/image`: good.

### 54 — The Marrying Maiden
Priority: `OK`

Good and correctly hard. No softening.

`judgment/image`: good.

### 55 — Abundance
Priority: `OK`

Good. “do not freeze noon” is strong.

`judgment/image`: good.

### 56 — The Wanderer
Priority: `OK`

Good. Temporary fire and foreign ground are concrete.

`judgment/image`: good.

### 57 — The Gentle
Priority: `P2`

Good, but `сила/force` and `flow` show up. Since this is wind, some of that is natural.

Potential polish: use “нахил”, “прохід”, “щілина” more, less “force”.

`judgment/image`: good.

### 58 — The Joyous
Priority: `OK`

Good. Avoids sentimental joy; “shine over shallow water” is strong.

`judgment/image`: good.

### 59 — Dispersion
Priority: `P2`

Good. Repeated `center` in both keyword and prose. Not fatal, but easy to polish.

`judgment/image`: good.

### 60 — Limitation
Priority: `P2`

Good. EN “frame” is slightly design/system language.

Possible replacement: “bank”, “rim”, “measure”.

`judgment/image`: good.

### 61 — Inner Truth
Priority: `P1`

Good idea, but abstraction density is high: `inner`, `center`, `form`, `correspondence`.

Direction: keep hollow/sound/reed/bell/empty middle. Reduce conceptual terms.

`judgment/image`: good.

### 62 — Small Exceeding
Priority: `P2`

Reading is strong. Keywords are generic (`Сила обережності`, `The Power of Caution`, `inner strength`).

Consider aligning name to `Мале перевищення / Small Exceeding`.

`judgment/image`: good.

### 63 — After Completion
Priority: `OK`

Good. “small seams” is concrete and useful.

`judgment/image`: good.

### 64 — Before Completion
Priority: `OK`

Good. Canonical fox image is well integrated.

`judgment/image`: good.

## Suggested Next Patch Order

1. Small surgical patch: `01`, `20`, `37`.
2. Second patch: `07`, `27`, `31`, `49`, `61`.
3. Keyword cleanup pass: `29`, `32`, `38`, `42`, `57`, `62`.
4. Optional micro-polish: `02`, `03`, `14`, `16`, `18`, `26`, `30`, `34`, `35`, `52`, `59`, `60`.
