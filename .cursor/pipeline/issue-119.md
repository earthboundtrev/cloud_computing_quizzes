# Pipeline — GitHub #119 (gitleaks fail + tight allowlist)

| Field | Value |
|-------|--------|
| Issue | [#119](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/119) — **OPEN** (`Refs` only) |
| Branch | `cursor/gitleaks-fail-tight-allowlist-119-1851` |
| Base | `68e0c3d` (`cloudcram-v55`) |

## Scope (widened AC from Security Reviewer on #124)

- Remove whole-file `[allowlist].paths` entries; regex literals only with comments.
- Gitleaks job fails on findings; runs on `pull_request` and `push` to `main`.
- Config regression test + local proof (clean tree, fake secret caught).
- No app code / no `CACHE_NAME` bump.

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | `.gitleaks.toml`, `gitleaks.yml`, `scripts/test-gitleaks-config.js`, `lint.yml` |
| BUGBOT | **Clean** | 2nd pass after CI install + probe built at runtime |
| TESTS | **Pass** | Full `lint.yml` set locally |
| ARCHITECT | **Merge-ready** | No blockers |
| SECURITY | **Pass** | Fail-closed workflow + regex-only allowlist |
| DEPLOY | PR open | `Refs #119`; no merge |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | No | CI skip, workflow not asserted, literal sk_live in source |
| 2026-11-24 | cursor-grok-4.6-high-fast | **Yes** | After install step, workflow guard, runtime probe string |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Merge-ready** |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Pass** |