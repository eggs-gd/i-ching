# І-Цзин · symbolic reading

Символічне читання І-Цзин у браузері. Не прогноз і не порада — образ поточної ситуації, її внутрішня динаміка і напрям зміни.

**Етап 1 завершено** (PWA у браузері). **Етап 2** — mobile shell через Capacitor (див. [docs/mobile-roadmap.md](docs/mobile-roadmap.md)).

---

## Філософія продукту

- **Не ворожіння** — тексти описують структуру моменту, а не «що станеться».
- **Символічне дзеркало** — користувач задає контекст («що привертає увагу»), кидок фіксує форму ситуації.
- **Шари читання** — `scene` (образ), `dynamics` (динаміка), `vector` (вектор); окремо `composition` (склад триграм) і класичні `judgment` / `image`.
- **Переходи** — рухомі лінії показують напругу; **гексаграма входу** → **гексаграма виходу**; без змін — **гексаграма стану**.

---

## Що вміє додаток (етап 1)

### Кидок

1. Контекст — текстове поле (обов'язкове).
2. Три режими одразу кнопками:
   - **По одній монеті** — 18 окремих кидків;
   - **Лінія за лінією** — 6 кидків по 3 монети;
   - **Всі разом** — миттєвий кидок з анімацією побудови.
3. Сітка монет і ліній: номери ліній підсвічуються (очікує / збирається / готова).

### Читання

- Картка гексаграми: номер, назва, ієрогліф, pinyin, composition, триграми.
- Класичний блок (judgment + image).
- Три абзаци символічного читання (scene → dynamics → vector).
- Спойлер **рухомих ліній** (6→1) з універсальними позиційними текстами.
- Кнопки **ⓘ** з поясненнями: рухомі лінії, вхід / стан / вихід.
- Плашка **«Пояснення»** (акордеон) — заглушка платної функції (наступний етап).

### Журнал

- **Web:** `localStorage` (`i-ching-journal`, без обмеження кількості).
- **Native:** SQLite (`readings`), one-time міграція з `localStorage`.
- Кожен запис: питання, лінії, монети, основна і вихідна гексаграми (якщо був перехід).
- Клік по запису — повторне відкриття читання з відновленням монет.
- Спойлер **«Відлуння»** — повторювані мотиви за основною гексаграмою.

### Локалізація

- Українська (за замовчуванням) і English.
- Перемикач мови внизу екрана.

### Корпус даних

- 64 гексаграми в `src/lib/data/hexagrams/*.json`.
- Для кожної: uk + en, structural readings, класичні тексти, триграми.
- Скрипти генерації/патчу в `scripts/` (див. нижче).

---

## Стек

|                 |                                        |
| --------------- | -------------------------------------- |
| Framework       | SvelteKit 2, Svelte 5 (runes)          |
| Language        | TypeScript                             |
| Package manager | yarn                                   |
| Deploy (web)    | `@sveltejs/adapter-static`             |
| Mobile          | Capacitor 8 (iOS / Android)            |
| Storage         | `localStorage` (web) · SQLite (native) |

---

## Структура проєкту

```
src/
├── routes/
│   ├── +layout.svelte      # shell, locale switcher
│   └── +page.svelte        # оркестрація flow
├── lib/
│   ├── i-ching/
│   │   ├── casting-flow.svelte.ts   # стан кидка (CastingFlow)
│   │   ├── coins.ts                 # три монети, суми 6–9
│   │   ├── hexagram.ts              # lookup, зміни, relating
│   │   ├── journal.ts               # facade → storage
│   │   └── types.ts
│   ├── storage/                     # local + SQLite repositories
│   ├── platform/                    # native init, haptics
│   ├── components/
│   │   ├── QuestionForm.svelte
│   │   ├── CastingStage.svelte      # монети + кнопка кидка
│   │   ├── ReadingResult.svelte     # результат читання
│   │   ├── ReadingCard.svelte
│   │   ├── ChangingLinesPanel.svelte
│   │   ├── CastExplanationPanel.svelte
│   │   ├── JournalPanel.svelte
│   │   └── …
│   ├── data/
│   │   ├── hexagram-db.ts
│   │   └── hexagrams/01.json … 64.json
│   └── i18n/
│       ├── locales/uk.json, en.json
│       └── line-positions.{uk,en}.json
scripts/                             # генерація та патчі текстів
```

---

## Розробка

```sh
yarn install
yarn dev          # http://localhost:5173
yarn check        # svelte-check + TypeScript
yarn build
yarn build:mobile   # static build + cap sync
yarn ios            # open Xcode
yarn android        # open Android Studio
yarn preview
yarn lint
yarn format
```

---

## Журнал (технічно)

```ts
interface Casting {
	id: string;
	createdAt: string;
	question: string;
	primaryNumber: number;
	relatingNumber?: number; // якщо є рухомі лінії
	changingLines: number[];
	lines: Line[];
	coinRows?: CoinValue[][];
	locale?: 'uk' | 'en';
	method?: 'single' | 'line' | 'all';
	note?: string;
}
```

**Web:** DevTools → Local Storage → `i-ching-journal`. **Native:** SQLite, міграція при першому запуску.

---

## Скрипти контенту

| Команда                         | Призначення                                 |
| ------------------------------- | ------------------------------------------- |
| `yarn generate:hexagram -- <N>` | LLM-генерація reading для однієї гексаграми |
| `yarn generate:hexagram:all`    | Масова генерація (обережно з curated 1–5)   |
| `yarn apply:reference-readings` | Застосувати reference JSON до corpus        |

Промпт і валідація: `scripts/lib/hexagram-generation-prompt.mjs` — structural tone, заборонені фрази, 4 абзаци dynamics.

---

## Поза scope (наразі)

- Монетизація (RevenueCat, реклама) та AI «Пояснення».
- Синхронізація журналу / акаунти / бекенд.
- Wilhelm line commentary (384 лінії).

---

## Ліцензія

Приватний проєкт (`"private": true`).
