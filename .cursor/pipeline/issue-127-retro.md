# Pipeline retro — GitHub #127 (reserved keys in migration + game dedup)

**Purpose:** Skip `__proto__`, `constructor`, and `prototype` when merging RHCSA topic maps and when normalizing `answerDedup` / pending game answers; build maps on null-prototype objects. **Fix-only** (`Refs #127`; human close when AC sign-off complete).

| Field | Value |
|-------|--------|
| Issue | [#127](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/127) — **OPEN** until human close |
| PR | [#142](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/142) |
| Branch | `cursor/reserved-keys-migration-127-89fd` |
| Base | `74c0aff` (`cloudcram-v59`) |
| Cache | **cloudcram-v61** (v60 after first commit; v61 after Bugbot utils follow-up) |
| Diff scope | `reserved-key-names.js`, `data-import.js`, `rhcsa-migration.js`, `rhcsa10-question-id-utils.js`, `gamification.js`, `sw.js`, `build-meta.js`, HTML `?v=`, `scripts/test-rhcsa-migration.js`, `scripts/test-rhcsa10-id-migration.js`, this retro; `git mv` [#125](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/125) retro to `.cursor/pipeline/` (`Refs #125 (retro location)`) |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Shared reserved-key helper; fresh-map merges; tests |
| BUGBOT | **Clean** | `cursor-grok-4.6-high-fast` (retired-topic copy fix + stronger tests) |
| TESTS | **Pass** | Migration 20/20; import-export 37/37; app-data-lifecycle 18/18; CI subset green |
| ARCHITECT | **Merge-ready** | `cursor-grok-4.6-high-fast` |
| SECURITY | **PASS** | `cursor-grok-4.6-high-fast`; no medium+ on diff |
| DEPLOY | **Open PR #142** | `6318a11`; body `Refs #127` only |

## Deliverables

| Check | Expected |
|-------|----------|
| Topic map merge | Skip reserved names; `Object.create(null)` rebuild; no `Object.assign` from untrusted keys |
| Malformed profile | Existing rhcsa10 unchanged; migration flag only after verified write |
| `answerDedup` | Fresh allowed-key map; cap 200000 unchanged (#121) |
| `normalizePendingGameAnswer` | Reserved keys dropped; fresh object when remapping id |
| Regression | #41 migration cases + reserved-key tests; `Object.prototype` not polluted |
| Cache | `CACHE_NAME` **cloudcram-v61**; `index.html` `build-meta.js?v=6` aligned with meta content; precache check pass |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Yes** | Fresh-map merges; retired topics only on rhcsa9 ingest; utils always strip reserved |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Merge-ready** — AC covered; no blockers |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **PASS** — topic maps, dedup, import, SW |

## Follow-up PRs

- Pre-merge: `build-meta.js?v=6` on `index.html` (was `v=5` while `CLOUDCRAM_WEB_CACHE_NAME` is v61; no extra `CACHE_NAME` bump)