# Pipeline retro — GitHub #128 (activate deletes only stale `cloudcram-` caches)

**Purpose:** On service worker activate, delete only cache names that start with `cloudcram-` and are not the current `CACHE_NAME`; leave other same-origin caches untouched. **Fix-only** (`Refs #128`; human close when AC sign-off complete).

| Field | Value |
|-------|--------|
| Issue | [#128](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/128) — **OPEN** until human close |
| PR | [#143](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/143) |
| Branch | `cursor/sw-activate-cloudcram-prefix-128-af3c` |
| Base | `79e3446` (`cloudcram-v61`) |
| Cache | **cloudcram-v62** |
| Diff scope | `sw.js`, `build-meta.js`, `index.html` (`build-meta.js?v=`), `scripts/test-sw-update-flow.js`, this retro |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Activate prefix filter; CACHE_NAME bump; tests |
| BUGBOT | **Clean** | `cursor-grok-4.6-high-fast` (test extracted predicate + `&&` guard) |
| TESTS | **Pass** | SW flow 15/15; precache; cache-name bump; CI subset |
| ARCHITECT | **Merge-ready** | `cursor-grok-4.6-high-fast` |
| SECURITY | **PASS** | `cursor-grok-4.6-high-fast`; scoped to activate change; global `caches.match` deferred per AC |
| DEPLOY | **Open PR #143** | `5d00c3b`; body `Refs #128` only |

## Deliverables

| Check | Expected |
|-------|----------|
| Activate delete | `name !== CACHE_NAME && name.indexOf('cloudcram-') === 0` |
| Foreign caches | `workbox-*`, `third-party-*`, etc. survive activate |
| Stale cloudcram- | `cloudcram-v51`, `cloudcram-v60` deleted on activate |
| SKIP_WAITING / precache | Unchanged; `check-sw-precache.js` pass |
| clients.claim | Unchanged after cleanup |
| Regression | Mocked `caches` + predicate parsed from `sw.js` |
| Cache | `CACHE_NAME` **cloudcram-v62**; `index.html` `build-meta.js?v=7` |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | No | Mock reimplemented filter; no `&&` assertion |
| 2026-11-24 | cursor-grok-4.6-high-fast | **Yes** | Predicate from `sw.js`; `&&` required; substring case |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Merge-ready** — AC covered; fetch `cacheName` follow-up optional |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **PASS** (scoped) — activate tightens deletes; fetch/offline unchanged per AC #2 |

## Follow-up PRs

- Optional: scope `caches.match` to `CACHE_NAME` when product accepts fetch-handler change (not #128 AC)