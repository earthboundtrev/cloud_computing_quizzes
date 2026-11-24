# Pipeline — GitHub #30 (RHCSA10 SW / gap / offline)

| Field | Value |
|-------|--------|
| Issue | [#30](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/30) — **OPEN** |
| Base | `main` @ `b8b6116` (post #31 merge) |
| Branch | `cursor/issue-30-rhcsa10-sw-pipeline-37d5` |

## Acceptance criteria vs main @ b8b6116 (pre-branch)

| Criterion | Met on main? | Evidence |
|-----------|----------------|----------|
| `check-page-banks.js` — no orphan banks | **Yes** | `rhcsa10-gap-questions.js` loaded in `rhcsa10_quiz.html` L38; script exit 0, 293 unique `rhcsa10-NNNN` ids |
| Dedupe + launcher count | **Yes** | `quiz-config.js` L24: `293 Q`; `check-page-banks.js` concat main+extra+gap |
| `check-sw-precache.js` | **Yes** | 118 precache paths; `ignoreSearch: true` in `sw.js` L168; id map, utils, migration in precache |
| Offline first visit (all quiz pages) | **No** | No Playwright offline step in `lint.yml` before this PR |
| CACHE_NAME bump when PRECACHE changes | **No** | Reopen comment 2026-11-02; no CI step |

### Notes (stale issue text)

- Original issue @ `c590359` assumed delete gap file; after #31 the gap bank is a **third shard** with uniform ids (not duplicate of extra).
- `CACHE_NAME` is `cloudcram-v53` on main (`sw.js`, `build-meta.js`).
- No `rhcsa9` precache entries (#35).
- 293 questions, not 249.

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | `check-sw-cache-name-bump.js`, `playwright-offline-first-visit.mjs`, `lint.yml` |
| BUGBOT | Clean (2nd pass) | P0 CI base ref + P1 offline oracles fixed |
| TESTS | Pass | local CI mirror + Playwright offline 16/16 |
| ARCHITECT | Pending | re-run after fixes |
| SECURITY | Pass | no medium+ |
| DEPLOY | Pending | `Refs #30` PR |

## Implemented in this PR

1. `scripts/check-sw-cache-name-bump.js` — fails when `PRECACHE_PATHS` diff vs base without `CACHE_NAME` bump.
2. `scripts/playwright-offline-first-visit.mjs` — fresh context, index online → each quiz offline; rhcsa10 asserts 293 unique ids.
3. `.github/workflows/lint.yml` — both steps after Playwright install.

No `sw.js` / `CACHE_NAME` change (precache already correct on main).