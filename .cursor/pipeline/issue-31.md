# Pipeline — GitHub #31 (RHCSA10 content quality)

| Field | Value |
|-------|--------|
| Issue | [#31](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/31) — **OPEN** |
| Branch | `cursor/issue-31-rhcsa10-id-fix-1d4a` |
| Base verify | `c590359` (issue) vs `3ee9b64` (work start) |

## Count re-verification on `3ee9b64` (before this PR)

| Finding | Issue @ c590359 | main @ 3ee9b64 | This PR |
|---------|-----------------|----------------|---------|
| Padded `(alternative method\|limited scope)` | 347 | **0** | 0 |
| Mixed id types (num / str) | 172 / 77 strings | **172 / 121** | **0 / 0** (all `rhcsa10-NNNN`) |
| `lint-rhcsa10.js --ci` | n/a | pass 293 q | pass 293 q |
| OBJECTIVES global | collision | `OBJECTIVES_RHCSA10` | unchanged |
| Items 129/136/137 | wrong | stems mostly fixed; **136 correct option still wrong** | fixed |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | In progress | uniform ids, 136/gap fixes, migration, lint id rule, v53 cache |
| BUGBOT | Pending | |
| TESTS | Pending | |
| ARCHITECT | Pending | |
| DEPLOY | Pending | PR `Refs #31`, no merge |

## Acceptance criteria checklist

- [x] Lint padded distractors regex
- [x] minPerObjective >= 2
- [x] RHEL9-only content regex; 129/136/137 corrected
- [x] Restored rhcsa9 + ACL items
- [x] OBJECTIVES_RHCSA10
- [x] Uniform string ids `rhcsa10-NNNN` + gamification id migration