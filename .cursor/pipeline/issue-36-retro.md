# Pipeline retro — GitHub #36 (lint-banks window isolation)

**Purpose:** Fix landed in PR [#51](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/51) and verification note in [#58](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/58) **before** full Bugbot/Architect retro.

| Field | Value |
|-------|--------|
| Issue | [#36](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/36) — **OPEN** (awaiting close after pipeline log) |
| PRs | [#51](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/51) (`919bc99`), [#58](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/58) (`a576af7` doc) |
| Diff base | `919bc99^` (lint-banks isolation) |
| Diff head | `919bc99` (+ later path tweaks on `main`, e.g. `f57518b`) |
| Paths | `scripts/lint-banks.js`, `scripts/test-lint-banks-window-isolation.js`, `.github/workflows/lint.yml`, `.cursor/pipeline/verify-close-30-36.md` |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done (out of order) | #51 + #58 on `main` |
| BUGBOT | **Clean** | 2026-11-03 — Grok 4.6 High (nits logged, not blockers) |
| TESTS | **Pass** | `lint-banks.js --ci`, `test-lint-banks-window-isolation.js` |
| ARCHITECT | **Merge-ready** | 2026-11-03 — Grok 4.6 High |
| DEPLOY | Merged | Retro + doc count fix in follow-up PR |

## Acceptance criteria (verified on `main` @ `6da78c6`)

| AC | Result |
|----|--------|
| Per-track lint count = launcher | **Met** for exact counts: **aws_genai 300**, **rhcsa10 293**, **terraform 500**; CISSP **279** (no `NNN Q` in config; start screen 275+). Historical examples (249 / 235) were pre-ramp snapshots. |
| Distinct longest-option % per track | **Met** (e.g. OCI 77.5%, rhcsa10 70.0%, genai 0%). |
| Duplicate stems within track only | **Met** (real extras dupes; not OCI clones). |
| 0 false “not found” for existing files | **Met** |
| Two temp banks, different counts | **Not met literally** — regression uses production OCI (200) vs GenAI main (129); see nits below. |

## Reconciled aws_genai count

**Track total on `main`: 300** (`lint-banks.js --ci`: 129 main + 12 scenario + 159 ramp; case-studies file contributes 0 questions).

`.cursor/pipeline/verify-close-30-36.md` incorrectly said **206** (post-dedupe pool before ramp growth). **Correct figure: 300** (matches `quiz-config.js`, `aws_genai_quiz.html`, and `lint-aws-genai-ramp.js` target).

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-03 | cursor-grok-4.6-high-fast | **Yes** | Isolation fix holds; per-track counts valid. **Nits (non-blocking):** isolation test uses correct global names (would not catch original fallback leak alone); verify doc 206 stale; AC fixture wording vs production test. |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-03 | cursor-grok-4.6-high-fast | **Merge-ready** for #36 lint bug; update verify doc to **300**; optional stronger fixture test later |

## Follow-up PRs

- **This retro PR** — pipeline evidence + verify doc count (`Refs #36`).
- Future (optional): temp-bank fixture or assert wrong global name path in isolation test.
