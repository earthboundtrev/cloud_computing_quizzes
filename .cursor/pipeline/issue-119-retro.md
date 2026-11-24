# Pipeline retro — GitHub #119 (gitleaks fail-closed + regex allowlist)

**Purpose:** Record merge of the replacement PR for gitleaks #119 after PR #135 was closed without merge (committed `AKIA…` probe literal failed gitleaks-action 8.24.3). Fill merge commit and PR number after human merge.

| Field | Value |
|-------|--------|
| Issue | [#119](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/119) — **OPEN** until human close |
| PR | _TBD — replacement for #135_ |
| Branch | `cursor/gitleaks-tight-allowlist-v2-119-1851` |
| Base | `68e0c3d` (`cloudcram-v55`) |
| Diff scope | `.gitleaks.toml`, `.github/workflows/gitleaks.yml`, `.github/workflows/lint.yml`, `scripts/test-gitleaks-config.js`, pipeline logs |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Clean branch from main; no secret literals in git history |
| BUGBOT | **Clean** | Post–PR #135: runtime probes + version pin |
| TESTS | **Pass** | Full `lint.yml` + gitleaks 8.24.3 |
| ARCHITECT | **Merge-ready** | CI-only; no PWA layers |
| SECURITY | **Pass** | Fail-closed scan; regex-only allowlist |
| DEPLOY | **Merged** | _TBD merge commit_ |

## Deliverables (post-merge)

| Check | Expected |
|-------|----------|
| Workflow check name | `gitleaks` |
| Gitleaks version | **8.24.3** (lint install + `GITLEAKS_VERSION`) |
| Allowlist | Regex literals only; no `[allowlist].paths` |
| Trevor action | Mark **gitleaks** required in branch protection |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Yes** | v2 branch: no committed probe literals; version pin |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Merge-ready** |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Pass** |

## Historical note

PR #135 introduced a literal AWS-shaped key in `scripts/test-gitleaks-config.js`; local gitleaks 8.21.2 did not flag the JS string, but CI 8.24.3 did. Fix: fresh branch, runtime `String.fromCharCode` probes, sha256-verified install in `lint.yml`.