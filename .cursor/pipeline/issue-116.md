# Pipeline — GitHub #116 (native import dismiss storage key)

| Field | Value |
|-------|--------|
| Issue | [#116](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/116) — **OPEN** (`Refs` only) |
| Branch | `cursor/issue-116-storage-keys-bd84` |
| Base | `cafd4f4` (`cloudcram-v54`) |

## Re-verify on main (2026-11-24)

Post PRs #123, #124, #130, #131 — finding **still open**:

- `native-app.js` writes `cloudcram_native_import_card_dismissed`.
- Key absent from `storage-keys.js` `ENTRIES`.
- `scripts/lint-storage-keys.js` `SCAN_FILES` omitted `native-app.js`.

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Registry entry; lint scan; `cloudcram-v55`; `?v=` bumps; regression tests |
| BUGBOT | Pending | |
| TESTS | Pending | Full `lint.yml` set locally |
| ARCHITECT | Pending | |
| SECURITY | Pending | Storage-keys scope per `security-review.mdc` |
| DEPLOY | Pending | PR `Refs #116`; no merge |

## Changes

- `storage-keys.js`: `cloudcram_native_import_card_dismissed` (`deleteOnDelete: true`, `keepOnUpdate: true`).
- `scripts/lint-storage-keys.js`: add `native-app.js` to `SCAN_FILES`.
- `sw.js` / `build-meta.js`: `CACHE_NAME` → **cloudcram-v55**.
- HTML: bump `storage-keys.js` and `build-meta.js` cache-bust query params.
- `scripts/test-app-data-lifecycle.js`, `scripts/test-capacitor-native.js`: regression asserts.

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| | | | |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| | | |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| | | |