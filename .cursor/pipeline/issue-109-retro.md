# Pipeline retro — GitHub #109 (Settings / progress export-import)

**Purpose:** PR [#113](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/113) landed PWA export/import; **lint on merge commit `5da787e` was green**. Pre-merge CI on `4851680` had failed on `test-sw-update-flow` (hard-coded SW v47); `3a91690` fixed that before merge. The **Tester** found F1/F2 on `5da787e`. Fix-forward [#115](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/115) merged as `ea2ec30` (single commit `2fe0bb9`); Tester retest passed. This retro records the full pointer history and process notes.

| Field | Value |
|-------|--------|
| Issue | [#109](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/109) — **OPEN** (human close when AC sign-off complete; Android tracked on [#111](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/111)) |
| PR #113 | Merged `5da787e` — settings progress export/import (PWA) |
| PR #115 | Merged `ea2ec30` (impl head `2fe0bb9`) — Tester F1/F2 retest fixes |
| Diff base (#113) | `edabaaa` |
| Diff head (#113) | `5da787e` |
| Diff (#115) | `5da787e..2fe0bb9` |
| Paths (#109) | `data-export.js`, `data-import.js`, `gamification.js`, `index.html`, `sw.js`, `scripts/test-data-import-export.js`, `scripts/test-gamification.js`, `scripts/test-sw-update-flow.js` |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT (#113) | Done | PWA export/import merged 2026-11-23 |
| BUGBOT (#113) | **Clean** (after fixes) | Blockers: IDB, noop handler, profile keys, proto pollution — resolved before merge |
| TESTS (#113) | **Pass** | Pre-merge red on `4851680`: `test-sw-update-flow.js` hard-coded SW **v47**; `3a91690` parses `CACHE_NAME` from `sw.js`. Gamification suite dates stabilized. **Lint on `5da787e` succeeded.** |
| ARCHITECT (#113) | **Merge-ready** | PWA scope |
| DEPLOY (#113) | Merged | `5da787e` |
| IMPLEMENT (#115) | Done | F1 `implicitDefaultGoal`; F2 strict streak/best validation |
| BUGBOT (#115) | **Clean** | Diff `5da787e..2fe0bb9` @ `2fe0bb9` (2026-11-23 re-run for retro docs) |
| TESTS (#115) | **Pass** | Full `lint.yml` locally; import + gamification regressions |
| ARCHITECT (#115) | **Merge-ready** | F1/F2 AC for retest |
| SECURITY (#115) | **Pass** | No medium/high on `5da787e..2fe0bb9` |
| DEPLOY (#115) | Merged | `ea2ec30`; pipeline **complete** pending issue closure |

## Tester history

| When | Commit | Result |
|------|--------|--------|
| Retest @ `5da787e` | [#113](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/113) | **F1**, **F2** failed (see below) |
| Retest @ `ea2ec30` | [#115](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/115) | **F1 5/5**, **F2 14/14** pass |

### Findings on `5da787e`

| ID | Symptom | Root cause (summary) |
|----|---------|----------------------|
| **F1** | Imported `dailyGoal` lost after Skip/Start on fresh profile | Implicit default goal path bumped `settingsRevision` as if user had set a goal |
| **F2** | String or `null` streak/best accepted | Coercion instead of rejecting invalid gamification fields in import JSON |

### Fixes on `2fe0bb9` (#115)

| ID | Fix |
|----|-----|
| F1 | `implicitDefaultGoal` on picker default paths; explicit goal click still bumps revision |
| F2 | Reject whole file in `validateGameImportString` / finite game-count validation before confirm |

## CI note (#113)

**`lint` on merge commit `5da787e` was green.** The `test-sw-update-flow` failure was **pre-merge** on branch commit `4851680` (asserted cache name **v47** while `sw.js` had moved on). Commit `3a91690` updated the test to **parse `CACHE_NAME`** from `sw.js` instead of hard-coding. Related gamification test **date** assumptions were corrected so CI stays stable across calendar days.

## Process note — parallel SW cache versions

While [#115](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/115) and [#114](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/114) were open in parallel, both branches bumped the service worker to **`cloudcram-v49`**. [#114](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/114) **rebased** and took **v50** to avoid a cache-name collision on merge. Coordinate `CACHE_NAME` bumps when multiple PRs touch `sw.js` precache.

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-23 | cursor-grok-4.6-high-fast | No → Yes | PR #113 — IDB, noop, profile, proto blockers cleared pre-merge |
| 2026-11-23 | cursor-grok-4.6-high-fast | — | `e269aea` — local pre-push SHA, not on GitHub; superseded |
| 2026-11-23 | cursor-grok-4.6-high-fast | **Yes** | PR #115 diff `5da787e..2fe0bb9` @ `2fe0bb9` — F1 implicitDefaultGoal; F2 fail-closed streak/best; SW v49 + tests |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-23 | cursor-grok-4.6-high-fast | **Merge-ready** PR #113 PWA export/import |
| 2026-11-23 | cursor-grok-4.6-high-fast | `e269aea` — local pre-push SHA, not on GitHub; superseded |
| 2026-11-23 | cursor-grok-4.6-high-fast | **Merge-ready** PR #115 @ `2fe0bb9` — F1/F2 AC; SW + hub cache bump |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-23 | cursor-grok-4.6-high-fast | Pass PR #113 import/export surface |
| 2026-11-23 | cursor-grok-4.6-high-fast | `e269aea` — local pre-push SHA, not on GitHub; superseded |
| 2026-11-23 | cursor-grok-4.6-high-fast | **Pass** PR #115 diff `5da787e..2fe0bb9` @ `2fe0bb9` — fail-closed import typing; no medium+ |

## Follow-up PRs

- **This retro PR** — pipeline evidence only (`Refs #109`).
- Live pipeline log: [issue-109.md](./issue-109.md).