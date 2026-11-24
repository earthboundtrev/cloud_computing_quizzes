# Pipeline retro — GitHub #121 (cap game maps on import)

**Purpose:** Record import validation caps for `dayRecords` and sibling plain-object maps on `cloudcram_game_v1`, aligned with existing `answerDedup` reject rule (#109 / #115). **Tester retest pending** after merge.

| Field | Value |
|-------|--------|
| Issue | [#121](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/121) — **OPEN** (`Refs` only; human close when AC sign-off complete) |
| PR | _TBD_ |
| Branch | `cursor/cap-game-map-import-121-86ca` |
| Base | `eaea619` (`cloudcram-v57`) |
| Cache | **cloudcram-v58** |
| Paths | `data-import.js`, `sw.js`, `build-meta.js`, `index.html`, `scripts/test-data-import-export.js`, pipeline log |

## Capped game maps (import validation inventory)

| Field | Cap constant | Limit | Rule | User message |
|-------|----------------|-------|------|----------------|
| `answerDedup` | `MAX_DEDUP_KEYS` | **200000** (unchanged) | Reject whole file | Too many answer records. |
| `dayRecords` | `MAX_DAY_RECORD_KEYS` | **15000** (~41 years of one key/day; above streak cap 10000) | Reject | Too many day records. |
| `notices` | `MAX_NOTICE_KEYS` | **500** | Reject | Too many notice flags. |
| `settingsRevision` | `MAX_SETTINGS_REVISION_KEYS` | **10** (runtime reads `soundOn` + `goal` only) | Reject | Too many settings revision fields. |

**Not capped (this ticket):** `repair`, `vacation`, `pendingGoal` are structured objects/arrays, not open key maps; `readiness.byDay` / `quotaLog` deferred per issue body.

**Shape checks (cheap):** `dayRecords` values must be plain objects (or null/undefined); `notices` values boolean/number/string; `settingsRevision` values non-negative finite numbers.

**Counting:** `countPlainObjectKeysBounded` stops at `limit + 1` via `for…in` + `hasOwnProperty` before `normalizeState` in `gamification.js`.

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Caps + tests + CACHE_NAME v58 |
| BUGBOT | _TBD_ | |
| TESTS | _TBD_ | Full `lint.yml` |
| ARCHITECT | _TBD_ | |
| SECURITY | _TBD_ | Import map caps; reserved keys unchanged |
| DEPLOY | Pending | PR open; **Tester retest pending** |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| _TBD_ | | | |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| _TBD_ | | |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| _TBD_ | | |