# Platform strategy

The PWA is the reference implementation. Native builds add platform integration, and every
native capability has a web fallback so the PWA is never behind.

| Capability      | Native                                  | Web / PWA fallback               |
| --------------- | --------------------------------------- | -------------------------------- |
| Journal storage | SQLite (`@capacitor-community/sqlite`)  | `localStorage`                   |
| Analytics       | `@capacitor-firebase/analytics`         | `firebase/analytics` (lazy)      |
| Archive export  | System share sheet                      | In-app preview → download / copy |
| Haptics         | `@capacitor/haptics`                    | no-op                            |
| Text size       | Dynamic Type via `@capacitor/text-zoom` | browser zoom                     |
| Status bar      | `@capacitor/status-bar`                 | n/a                              |

When adding a feature: make it work on the PWA first, then layer the native path on top.
