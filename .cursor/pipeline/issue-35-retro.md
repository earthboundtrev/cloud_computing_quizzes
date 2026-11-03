# Pipeline retro — GitHub #35 (RHCSA9 removal / redirects)

**Purpose:** PR [#57](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/57) merged **before** Bugbot/Architect evidence was recorded.

| Field | Value |
|-------|--------|
| Issue | [#35](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/35) — **OPEN** (awaiting close after pipeline log) |
| PR | [#57](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/57) (`4361f2e`, impl `4b4b5cb`) |
| Diff base | `eb9c3db` |
| Diff head | `4b4b5cb` |
| Paths | Deleted `rhcsa9_*`, `process-questions.js`, `RHCSA10-PROCESSING-SUMMARY.md`, `scripts/transform-rhcsa.js`; dev script touch-ups; `README.MD`, `sw.js` |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done (out of order) | #57 merged 2026-11-02 |
| BUGBOT | **Clean** | 2026-11-03 — Grok 4.6 High |
| TESTS | **Pass** | `check-sw-precache.js`, `check-page-banks.js`, `lint-banks.js --ci` on `main` |
| ARCHITECT | **Merge-ready** | 2026-11-03 — Grok 4.6 High |
| DEPLOY | Merged | Retro docs only in follow-up PR |

## Acceptance criteria (verified on `main`)

- Five rhcsa9 assets deleted; `git ls-files \| grep -E 'rhcsa9\|process-questions\|RHCSA10-PROCESSING'` empty.
- No quiz HTML with `rhcsa9_quiz` or `>RHCSA 9<` nav.
- `_redirects` 301 rules; targets exist; live deploy returns 301 (Tester note on issue).
- Remaining `rhcsa9` strings: `_redirects`, `rhcsa-migration.js` / tests only (#34).
- SW precache: rhcsa10 + migration; **no** rhcsa9 paths (#30 handled broader SW AC).

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-03 | cursor-grok-4.6-high-fast | **Yes** | Deletions consistent; no dangling app references. **Low:** stale README “RHCSA 9” bullets (non-blocking). |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-03 | cursor-grok-4.6-high-fast | **Merge-ready** for #35 scope; stale installed SW is #30, not #35 |

## Follow-up PRs

- **This retro PR** — pipeline evidence only (`Refs #35`).
- Optional: README copy cleanup for “RHCSA 9” / RHEL 9 comparison modes (docs only).
