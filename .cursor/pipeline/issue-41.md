# Issue #41 — RHCSA 9→10 merge (v10_3)

**Issue:** https://github.com/earthboundtrev/cloud_computing_quizzes/issues/41 (OPEN)  
**Branch:** `cursor/rhcsa-migration-merge-41-a7ba`  
**PR:** (see DEPLOY)

## Pointer log

| Stage | When | Result |
|-------|------|--------|
| IMPLEMENT | 2026-11-24 | Fix reopen bugs: rhcsa9-only carry with v10_2; normalize rhcsa10 on bad rhcsa9 JSON; CACHE_NAME v52 |
| BUGBOT | 2026-11-24 | **Clean** — `cursor-grok-4.6-high-fast` |
| TESTS | 2026-11-24 | Full lint.yml set + `test-rhcsa-migration.js` 18/18 |
| ARCHITECT | 2026-11-24 | **Merge-ready** — `cursor-grok-4.6-high-fast` |
| SECURITY | 2026-11-24 | **Low / PASS** — `cursor-grok-4.6-high-fast` |
| DEPLOY | pending | PR opened with `Refs #41` (no merge) |

## Bugbot

- Model: `cursor-grok-4.6-high-fast`
- Verdict: **CLEAN**
- Notes: Sum merge, P/no double-count, rhcsa9-only with v10_2, mergedFrom idempotency, invalid JSON paths, F write guard, precache OK

## Architect

- Model: `cursor-grok-4.6-high-fast`
- Verdict: **MERGE-READY**
- Blockers: none (v17 AC superseded by main v51→v52)

## Security

- Model: `cursor-grok-4.6-high-fast`
- Risk: **Low** — PASS for merge

## Tests (local)

```
node scripts/test-rhcsa-migration.js  → 18/18
node scripts/lint-banks.js --ci       → pass (warnings only)
node scripts/check-sw-precache.js     → pass
node scripts/check-page-banks.js      → pass
node scripts/validate-cissp-questions.js → pass
node scripts/smoke-test-cissp.js      → pass
node scripts/lint-cissp-questions.js  → pass
node scripts/test-sw-update-flow.js   → 13/13
```

## Diff scope

- `rhcsa-migration.js` — merge + normalize
- `sw.js` / `build-meta.js` — `cloudcram-v52`
- `index.html`, `rhcsa10_quiz.html` — `rhcsa-migration.js?v=4`
- `scripts/test-rhcsa-migration.js` — C2/P/M/R/T + invalid JSON normalize