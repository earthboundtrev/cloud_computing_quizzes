# Pipeline retro — remove `actions: write` from Android optional workflow

**Purpose:** Record least-privilege hardening for `.github/workflows/android-assemble-debug-optional.yml` (no linked GitHub issue).

| Field | Value |
|-------|--------|
| PR | _(fill after create)_ |
| Branch | `cursor/actions-write-removal-af53` |
| Diff scope | `.github/workflows/android-assemble-debug-optional.yml`, this retro |

## Rationale

| Capability | Needed? | Why |
|------------|---------|-----|
| `contents: read` | Yes | `actions/checkout` |
| `actions: write` | No | No `actions/cache/save`, workflow dispatch, or artifact deletion via Actions API; `actions/upload-artifact@v4` uses its own upload path and does not require `actions: write` at workflow scope |

## Pointer log

| Stage | Status | Notes |
|-------|--------|--------|
| IMPLEMENT | Done | Remove lone `actions: write` line |
| BUGBOT | **Clean** | `cursor-grok-4.6-high-fast` |
| TESTS | **Pass** | Full `lint.yml` equivalent locally |
| ARCHITECT | **Merge-ready** | `cursor-grok-4.6-high-fast` |
| SECURITY | **PASS** | Workflow token scope only; `cursor-grok-4.6-high-fast` |
| DEPLOY | **Open PR** | No `Closes` keyword |

## Bugbot runs

| When (UTC) | Model | Clean | Summary |
|------------|-------|-------|---------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Yes** | upload-artifact v4 needs no `actions: write`; checkout needs `contents: read` only |

## Architect

| When (UTC) | Model | Merge-ready | Blockers |
|------------|-------|-------------|----------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **Yes** | None — workflow-only diff |

## Security

| When (UTC) | Model | Verdict | Notes |
|------------|-------|---------|-------|
| 2026-11-24 | cursor-grok-4.6-high-fast | **PASS** | Token blast radius reduced; no MEDIUM+ findings |