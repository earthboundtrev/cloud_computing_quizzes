# Pipeline retro — GitHub #31 (RHCSA10 content)

| Field | Value |
|-------|--------|
| Issue | [#31](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/31) — **CLOSED** |
| PR | [#47](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/47) (`d990a98`) |
| Diff base | `1b9b020` |
| Diff head | `d990a98` |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done (out of order) | #47 merged; issue closed |
| BUGBOT | **FINDINGS** | Wrong keys after prefix rewrite; `(incorrect for this task)` leak; gap lint gaps |
| TESTS | Pass | `lint-rhcsa10.js --ci` |
| ARCHITECT | **Blockers** | HTML still 249 vs 293; gap content errors; mixed id types |
| DEPLOY | Merged | Retro recommends follow-up despite closed issue |

## Bugbot summary

- **P1:** `fix-rhcsa10-padded-distractors.js` broke correct indices (ids listed in retro run).
- Padding leak `(incorrect for this task)`; gap bank not in `lint-banks.js`; dpkg-query on RHEL stem; weak teamd regex.

## Architect summary

Would not certify merge-ready: **249 vs 293** copy mismatch; gap-043 wrong obj; AC id-type not met.

## Follow-up PRs

- **fix-retro-priority** — restore RHCSA options from baseline; gap/HTML/lint fixes
