# Pipeline retro — GitHub #127 (reserved keys in migration + game dedup)

**Purpose:** Skip `__proto__`, `constructor`, and `prototype` when merging RHCSA topic maps and when normalizing `answerDedup` / pending game answers; build maps on null-prototype objects. **Fix-only** (`Refs #127`; human close when AC sign-off complete).

| Field | Value |
|-------|--------|
| Issue | [#127](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/127) — **OPEN** |
| PR | _(pending)_ |
| Branch | `cursor/reserved-keys-migration-127-89fd` |
| Base | `74c0aff` (`cloudcram-v59`) |
| Cache | **cloudcram-v60** |
| Paths | `reserved-key-names.js`, `data-import.js`, `rhcsa-migration.js`, `rhcsa10-question-id-utils.js`, `gamification.js`, `sw.js`, `build-meta.js`, HTML `?v=`, `scripts/test-rhcsa-migration.js`, `scripts/test-rhcsa10-id-migration.js`, this retro |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Shared reserved-key helper; fresh-map merges; tests |
| BUGBOT | _(pending)_ | |
| TESTS | _(pending)_ | |
| ARCHITECT | _(pending)_ | |
| SECURITY | _(pending)_ | |
| DEPLOY | Pending | PR open |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|

## Behavior summary

- `reserved-key-names.js` is the single definition; `data-import.js` and browser scripts consume `CloudCramReservedKeyNames` (with Node `require` fallback).
- `rhcsa-migration.js` rebuilds `topicStats` / `topicMissesFromImports` via `Object.create(null)` helpers; reserved topic names never merge onto existing maps.
- `normalizeAnswerDedup` / `normalizePendingGameAnswer` skip reserved names; `gamification.js` builds `answerDedup` from allowed keys only (no `Object.assign` from untrusted maps).