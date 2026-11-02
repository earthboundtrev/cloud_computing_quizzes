# Pipeline retro — GitHub #15 (CISSP ramp)

| Field | Value |
|-------|--------|
| Issue | [#15](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/15) |
| PR | [#48](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/48) (`9261169`) |
| Diff base | `fcdb9f1` |
| Diff head | `9261169` |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done (out of order) | #48 merged |
| BUGBOT | **FINDINGS** | Suffix distractors; dup stems; CI ignores main bank; wrong obj |
| TESTS | Pass | cissp lint scripts green (223-only validators) |
| ARCHITECT | **Blockers** | Throwaway cues + key index skew; **#15 OPEN** |
| DEPLOY | Merged early | Do not close #15 on #48 |

## Bugbot summary

- Giveaway suffixes on wrong options (main/ramp/scenario); duplicate due-diligence stem across main+ramp; validators/smoke still 223-only; heuristic `obj` errors.

## Architect summary

**Blockers** for exam-ready increment (already merged): strip suffix cues, rotate keys, extend CI before more volume.

## Follow-up PRs

_(TBD — distractor rewrite + lint scope)_
