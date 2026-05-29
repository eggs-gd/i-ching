# Етап 2: SvelteKit → Capacitor (mobile)

Упаковка існуючого PWA в iOS/Android. **Монетизація — наступний етап.**

## Передумови

- [ ] Apple Developer + Xcode
- [ ] Google Play Console + Android Studio
- Bundle ID: `gd.eggs.aiching` (`capacitor.config.ts`)

## Доступність

- **Розмір шрифта (Dynamic Type):** `@capacitor/text-zoom` `getPreferred()` → масштаб `html` `font-size` (iOS; `rem` слідує за коренем). Android: `TextZoom.set()`. Оновлення при поверненні в додаток / з Налаштувань.

## Що вже в коді

- Static build (`adapter-static`, `build/`)
- Capacitor 8 (`ios/`, `android/`)
- Журнал: `localStorage` (web) · SQLite (native, `@capacitor-community/sqlite`)
- One-time міграція журналу з `localStorage` на native

## Команди

```sh
yarn build
yarn build:mobile   # build + cap sync
yarn ios
yarn android
```

## Схема SQLite `readings`

| Колонка | Casting |
|---------|---------|
| `id` | `id` |
| `created_at` | `createdAt` |
| `locale` | `locale` |
| `question` | `question` |
| `primary_hexagram` | `primaryNumber` |
| `changed_hexagram` | `relatingNumber` |
| `moving_lines` | JSON `changingLines` |
| `method` | `method` |
| `lines_json` | JSON `lines` |
| `coin_rows_json` | JSON `coinRows` |
| `note` | `note` |

## Наступний етап (не в scope зараз)

- RevenueCat (підписки, credits)
- Rewarded AdMob
- AI backend для «Пояснення»
