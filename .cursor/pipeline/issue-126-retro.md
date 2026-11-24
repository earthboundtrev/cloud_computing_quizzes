# Issue #126 retro — private lock-screen reminder text

| Field | Value |
|-------|-------|
| Issue | [#126](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/126) |
| Scope | Fix-only: private lock-screen visibility + generic copy; **no** `showLockScreenDetails` toggle |
| Owner comment | Opt-in lock-screen details **not approved** |

## Diff scope

- `reminder-copy.js`, `reminder-schedule.js`, `reminder-native.js`
- `scripts/test-reminder-schedule.js`
- `sw.js`, `build-meta.js`, `index.html`, `*_quiz.html` (`reminder-*.js` `?v=` + hub `build-meta.js?v=9`)

## Pointer log

| Stage | Status |
|-------|--------|
| IMPLEMENT | Done |
| BUGBOT | Clean (`cursor-grok-4.6-high-fast`, 2026-11-24) |
| TESTS | Local CI scripts green incl. `test-reminder-schedule.js` 9/9 |
| ARCHITECT | Merge-ready (`cursor-grok-4.6-high-fast`, 2026-11-24) |
| Security | No medium+ findings (`cursor-grok-4.6-high-fast`, 2026-11-24) |
| DEPLOY | PR opened |

## Cache

- `CACHE_NAME` **cloudcram-v64** (`v63` → `v64`); `index.html` `build-meta.js?v=9`

## Acceptance mapping

- Today daily slot `visibility` → `secret` (not `public`)
- `pluginNotificationFromPlanItem` passes `visibility` + `lockScreenBody` to plugin payload; test notification uses same mapper
- Generic copy **Cloud Cram: study reminder** (no "Cloud Quizzes")
- Channel `visibility: 0` unchanged in `ensureChannels`