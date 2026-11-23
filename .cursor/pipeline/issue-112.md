# Pipeline — GitHub #112 (Android local reminders)

| Field | Value |
|-------|--------|
| Issue | [#112](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/112) — **OPEN** (`Refs` only) |
| Branch | `cursor/on-device-reminders-112-fcc5` |
| CACHE_NAME | `cloudcram-v51` |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | push-local-settings, schedule/copy, reminder-native UI, cap local-notifications, manifest perms, tests |
| BUGBOT | Pending | Post-commit diff vs main |
| TESTS | Pass (local) | lint.yml subset + playwright 17/17 + test-reminder-schedule 4/4 |
| ARCHITECT | Pending | |
| SECURITY | Pending | SW/storage review |
| DEPLOY | Pending | PR `Refs #112` |

## Tests (local)

- `test-reminder-schedule.js`: 4/4
- `playwright-console-clean.mjs`: 17 pages, 0 console errors
- `lint-html-entry.js`: 17 pages
- Full: gamification 43, data-import 20, smoke 16 quizzes

## Trevor device

Lock screen tap, OEM battery 2–3 days, PWA-only goal met vs app reminder gap (import path).