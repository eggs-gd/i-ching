# Journal sync

Opt-in cross-device sync for the archive. Local-first stays the default — the app is fully
usable with no account. Signing in with Google mirrors the journal through Firebase
Realtime Database so the user's signed-in devices share one archive.

## Data model (RTDB)

```
/journals/{uid}/entries/{entryId}     → the Casting object
/journals/{uid}/tombstones/{entryId}  → { deletedAt: ISO string }
```

Security rules scope each subtree to its owner:

```json
{ "rules": { "journals": { "$uid": {
  ".read":  "auth != null && auth.uid === $uid",
  ".write": "auth != null && auth.uid === $uid"
}}}}
```

Stored as plaintext (not end-to-end encrypted). The privacy policy discloses this. See
[Not done](#not-done).

## Merge

Entries are **write-once** — there is no edit UI, `id` is a `crypto.randomUUID()`. So the
merge is pure set algebra, no timestamps or vector clocks needed
([`App/src/lib/sync/snapshot.ts`](../App/src/lib/sync/snapshot.ts)):

- **tombstones** = union by `id`, earliest `deletedAt` wins
- **entries** = union by `id`, minus anything tombstoned (delete beats a stray duplicate)
- result sorted by `createdAt` desc

`diffForRemote(remote, merged)` yields the push payload — whatever `merged` has that the
remote node does not yet.

Two devices editing offline converge because every cast produces a fresh UUID; they cannot
collide. A worst case ("both signed in on a fresh device, made separate entries") just
unions cleanly on the next sync.

## When it syncs — one-shot, no listeners

**This is deliberate. There are no live subscriptions / `onValue` listeners.**

Sync runs `syncNow()` — `pull → merge → apply locally → push the diff` — on:

- sign-in
- `visibilitychange` → visible (tab refocused, app foregrounded — Capacitor fires this too)
- the manual **Sync now** button in the sync popup
- ~4 s debounce after a local cast or delete (`journalStore` mutation listener)

`resumeSync()` is throttled to once per 30 s.

### Why no listeners

- Firebase Spark caps **simultaneous connections at 100** (RTDB). A persistent `onValue`
  per open app burns one each; at any real scale that becomes the ceiling. Op-count is not
  the constraint on RTDB — persistent sockets are.
- This is a contemplative journal, not a collaborative realtime app. "Eventually
  consistent within a focus change" is the right latency target. Nobody casts hexagrams on
  two devices in the same minute expecting sub-second propagation.

### Consequence (accepted)

A device left **open and focused** does not receive another device's changes until it is
re-focused, the user casts/deletes, or they hit **Sync now**. In practice `visibilitychange`
covers almost everything: switch away and back and it syncs.

## Local storage changes

Deletes used to be silent hard deletes. They now also write a tombstone so the deletion
propagates:

- web: `localStorage['i-ching-tombstones']` = `[{ id, deletedAt }]`
- native: table `tombstones (id, deleted_at)`, DB bumped to v2 via `addUpgradeStatement`
  (localStorage tombstones are carried over by the existing one-time migration)

`JournalRepository` gained `loadTombstones()` and `replace(entries, tombstones)` (wholesale
write used after a merge). `journalStore` gained `snapshot()`, `applyMerged()`, and a
mutation listener that fires on user actions only — never on a sync-applied write, so there
is no push loop.

## Quota

A `Casting` is ~400 bytes; a full pull of a few hundred entries is ~100 KB. RTDB Spark free
tier is 1 GB stored + 10 GB/month transfer. The binding limit is storage — roughly
**~1000 active users** before moving to Blaze (a few dollars a month at that point). No
incremental cursor: full-pull-and-merge is simpler and cheap enough at this scale.

## Files

| File | Role |
| --- | --- |
| `App/src/lib/firebase.ts` | web Firebase init; `databaseURL`, `SYNC_ENABLED` flag |
| `App/src/lib/state/auth.svelte.ts` | Google sign-in (`authStore`); web popup + redirect fallback |
| `App/src/lib/sync/snapshot.ts` | `mergeSnapshots`, `diffForRemote` — pure |
| `App/src/lib/sync/remote.ts` | RTDB `pullJournal` / `pushChanges` (lazy `firebase/database`) |
| `App/src/lib/sync/controller.svelte.ts` | `syncController` — status, triggers, debounce/throttle |
| `App/src/lib/components/SyncButton.svelte` | header cloud button; muted when unsynced, active when synced (no status badge) |
| `App/src/lib/components/SyncPopup.svelte` | account, sync status, Sync now, sign out, privacy link |
| `App/src/lib/storage/*` | tombstones + `replace` across local / sqlite |

## Not done

- **Native auth** — `@capacitor-firebase/authentication`. Sync (`SYNC_ENABLED`,
  `authStore.available`) is web-only until then; on native the sync button is hidden.
- **E2E encryption** — v1 trusts Firebase security rules. An optional passphrase layer
  could come later.
- **Incremental sync** — not needed at current scale; revisit if journals or the user base
  grow enough that full pulls hurt.
