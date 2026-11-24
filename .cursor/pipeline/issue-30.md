# Pipeline — GitHub #30 (RHCSA10 SW / gap / offline)

| Field | Value |
|-------|--------|
| Issue | [#30](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/30) — **OPEN** |
| PR | [#130](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/130) — **merged** |
| Merge commit | `2e7bfd9` |
| Branch head (PR) | `12512de` |
| Retro | [issue-30-retro.md](./issue-30-retro.md) |

## Acceptance criteria (post-merge @ `2e7bfd9`)

| Criterion | Met? | Evidence |
|-----------|------|----------|
| `check-page-banks.js` — no orphan banks | **Yes** | On main @ `b8b6116` before PR |
| Dedupe + launcher count | **Yes** | 293 Q; concat main+extra+gap on main before PR |
| `check-sw-precache.js` | **Yes** | 118 paths; id map/utils/migration on main before PR |
| Offline first visit (all quiz pages) | **Yes** | `playwright-offline-first-visit.mjs` in `lint.yml` — **16/16** |
| CACHE_NAME bump when PRECACHE changes | **Yes** | `check-sw-cache-name-bump.js` — fails closed on CI |

### Notes (stale issue text)

- Original issue @ `c590359` assumed delete gap file; after #31 the gap bank is a **third shard** with uniform ids.
- PR #130 did not change `CACHE_NAME` (precache already correct at **cloudcram-v53**).
- No `rhcsa9` precache entries (#35).

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | `check-sw-cache-name-bump.js`, `playwright-offline-first-visit.mjs`, `lint.yml` |
| BUGBOT | **Clean** | 2nd pass — P0 CI base ref + P1 offline oracles |
| TESTS | **Pass** | Lead pre-merge smoke **445/0**; offline **16/16** |
| ARCHITECT | **Merge-ready** | Fail-closed CACHE_NAME CI; offline in `lint.yml` |
| SECURITY | **Pass** | No medium+ |
| DEPLOY | **Merged** | PR #130 @ `2e7bfd9` |
| TESTER | **PASS** | Retest @ `2e7bfd9` — all five criteria |

## Lead verification

| Check | Result |
|-------|--------|
| Pre-merge smoke | **445/0** |
| Playwright offline first-visit | **16/16** |
| CACHE_NAME bump guard (mutation) | **Fails closed** |

## Implemented in PR #130

1. `scripts/check-sw-cache-name-bump.js` — fails when `PRECACHE_PATHS` diff vs base without `CACHE_NAME` bump.
2. `scripts/playwright-offline-first-visit.mjs` — index online → each quiz offline; rhcsa10 asserts 293 unique ids.
3. `.github/workflows/lint.yml` — both steps after Playwright install.