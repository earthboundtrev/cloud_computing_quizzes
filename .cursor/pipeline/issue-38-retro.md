# Pipeline retro — GitHub #38 (CI workflow hardening)

**Purpose:** Record pipeline for least-privilege CI workflows and pinned third-party actions. **Tester retest pending** at time of writing.

| Field | Value |
|-------|--------|
| Issue | [#38](https://github.com/earthboundtrev/cloud_computing_quizzes/issues/38) — **OPEN** until human close |
| PR | [#140](https://github.com/earthboundtrev/cloud_computing_quizzes/pull/140) |
| Branch | `cursor/ci-workflow-hardening-38-259d` |
| Base | `d056bf2` |
| Diff scope | `.github/workflows/lint.yml`, `.github/workflows/gitleaks.yml`, `.github/workflows/android-assemble-debug-optional.yml`, this retro |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | `contents: read`, `persist-credentials: false`, Node 22, SHA-pinned actions |
| BUGBOT | **Clean** | `cursor-grok-4.6-high-fast` |
| TESTS | **Pass** | Full `lint.yml` equivalent locally (Node + Playwright) |
| ARCHITECT | **Merge-ready** | `cursor-grok-4.6-high-fast` |
| SECURITY | **Pass / LOW** | `pull-requests: read` skips inline comments only |
| DEPLOY | **Open PR #140** | CI green on head; body `Refs #38` only; Tester retest pending |

## Deliverables

| Check | Expected |
|-------|----------|
| `lint.yml` permissions | Top-level `{contents: read}` only; no job-level write scopes |
| Checkout | `persist-credentials: false` + `fetch-depth: 0` on all checkouts |
| Node | `node-version: '22'` on lint and Android workflows |
| `on:` triggers | Unchanged (push `main`/`cursor/**`, PR `main`) |
| Gitleaks workflow | Name `gitleaks`; same triggers; fail-closed on PR + push `main` |
| Action pins | Full commit SHAs with `# vN` comment |
| App assets | None — CACHE_NAME bump guard must pass without change |

## Permissions summary

| Workflow | `permissions:` |
|----------|----------------|
| `lint.yml` | `contents: read` |
| `gitleaks.yml` | `contents: read`, `pull-requests: read` |
| `android-assemble-debug-optional.yml` | `contents: read`, `actions: write` |

## Pinned actions (this PR)

| Action | Version | SHA |
|--------|---------|-----|
| `actions/checkout` | v4 | `11d5960a326750d5838078e36cf38b85af677262` |
| `actions/setup-node` | v4 | `49933ea5288caeca8642d1e84afbd3f7d6820020` |
| `actions/setup-java` | v4 | `cf277c60eb25467037889841efdb72551f06f6c3` |
| `actions/upload-artifact` | v4 | `ea165f8d65b6e75b540449e92b4886f43607fa02` |
| `gitleaks/gitleaks-action` | v2 | `ff98106e4c7b2bc287b24eaf42907196329070c7` |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Yes** | SHAs match tags; permissions OK for history/CACHE bump/gitleaks gate |

## Architect

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Merge-ready** — workflow-only; no blockers |

## Security

| When (UTC) | Model | Verdict |
|------------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Pass / LOW** — comment API needs write; scan fail-closed intact |

## Follow-up PRs

- None planned; optional org follow-up: `gitleaks-action@v3` + Node 24 runner (out of #38 scope)