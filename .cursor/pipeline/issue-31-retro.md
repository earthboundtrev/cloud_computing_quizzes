# Pipeline retro — GitHub #31 (RHCSA10 content quality, PR #124)

**Purpose:** Record merge of [#124](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/124) after an earlier partial delivery (#47 / #53), and fix-forward [#131](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/131) (TuneD / GRUB content). Earlier retro for #47 remains historical; this doc is the merge record for uniform `rhcsa10-NNNN` ids, gamification dedup, and Curriculum-confirmed content corrections.

| Field | Value |
|-------|--------|
| Issue | [#31](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/31) — **OPEN** |
| PR | [#124](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/124) |
| Branch head | `dabbbff` |
| Merge commit on `main` | `b8b6116` |
| Diff base (PR) | `3ee9b64` (main at PR open) |
| Prior related PRs | [#47](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/47), [#53](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/53) (content/lint; mixed ids remained) |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | 293× `rhcsa10-NNNN`; id map + utils; RHEL 10 sweep; `cloudcram-v53` |
| BUGBOT | **Clean** (post Lead blockers) | Hub wiring; all quiz pages load utils; merge tests |
| TESTS | **Pass** | CI green pre-merge (Lead); `test-rhcsa10-id-migration.js` |
| ARCHITECT | **Merge-ready** | |
| SECURITY | **PASS** (pre-merge); post-merge reviewer no blockers | P3 hardening filed separately |
| DEPLOY | **Merged** | `b8b6116` via PR #124 |
| TESTER (#124) | **Superseded** | Content retest opened after #131 fix-forward |

## Lead Developer pre-merge blockers (round 1 → fixed before merge)

| Finding | Fix (in #124) |
|---------|----------------|
| `index.html` did not load rhcsa10 id map/migration — hub export/visit left legacy `answerDedup` keys | Map + `rhcsa10-question-id-utils.js` + persist migration on hub and all `*_quiz.html` before `gamification.js` |
| Sticky `rhcsa10_question_ids_v1` flag allowed double XP after tab merge or import | Removed flag; idempotent `normalizeAnswerDedup` on read, merge, record, broadcast, import |
| gitleaks false positives | Narrow `.gitleaks.toml` allowlist; `bankVar` rename in normalize/restore scripts |

## Other notes

- **gitleaks:** Pre-merge CI green (Lead); false positives on migration registry keys and `QUESTION_BANK_*` script fields.
- **Content:** Remaining AC from reopen (uniform ids, items 129/136/137, lint gates) shipped in #124.
- **Historical:** [#47](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/47) retro run documented mixed id types and gap errors; superseded by #124 for id-type AC.

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | Yes → **Yes** (after wiring) | First pass: P1 missing utils on non-rhcsa quiz tabs; resolved before merge |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Merge-ready** after Lead blocker fixes |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **PASS** (no medium+) pre-merge |
| Post-merge (Security Reviewer) | — | **No blockers**; P3 items filed separately |

## PR #131 — content fix-forward (TuneD / GRUB)

| Field | Value |
|-------|--------|
| PR | [#131](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/131) — merged |
| Branch head | `eb1580c` |
| Merge commit on `main` | `cafd4f4` |
| Diff base | `2e7bfd9` (main after #130) |
| Cache | `cloudcram-v53` → **cloudcram-v54** |
| Question ids | `rhcsa10-0070`, `0144`, `0172`, `0183`, `0187` |

### Pointer log (#131)

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Curriculum-confirmed answers from [#31 comments](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/31#issuecomment-7123814162); no id-map changes |
| CURRICULUM | **Approved** | Grok 4.6 High — five items |
| BUGBOT | **Clean** | |
| TESTS | **Pass** | Lead pre-merge smoke **445/0**; post-merge smoke **445/0** |
| ARCHITECT | **Merge-ready** | |
| SECURITY | **PASS** | |
| DEPLOY | **Merged** | `cafd4f4` via PR #131 |
| TESTER | **PASS** | Content retest on five ids after #131 — **PASS** (post `cafd4f4`) |

## Follow-up PRs

- Live pipeline log: [issue-31.md](./issue-31.md)
- **This retro PR** — docs only (`Refs #31`)