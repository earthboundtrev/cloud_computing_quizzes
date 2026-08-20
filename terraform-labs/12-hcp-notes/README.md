# 12 — HCP Terraform (objectives 8a–8d)

You cannot fully lab this without an HCP org. Read this, then hammer the quiz (topic weights already boost HCP).

## Vocabulary (do not mix these up)

| Term | What it is |
|------|------------|
| **Organization** | Top-level HCP Terraform account container |
| **Project** | Groups **workspaces** for access control, reporting, variable sets (004 **8c**) |
| **Workspace** (HCP) | A remote working directory: one state, run queue, variables, VCS connection |
| **Workspace** (CLI) | `terraform workspace` — local/backend state named default/foo. **Different product feature** |
| **Run** | Plan/apply (or policy/cost) execution in HCP |
| **Variable set** | Reusable variables attached to many workspaces/projects |
| **Run trigger** | Workspace A apply can start workspace B |

## How HCP creates infrastructure (8a)

1. Connect VCS **or** CLI/API-driven runs
2. Workspace gets Terraform version, working directory, vars
3. Plan → (optional) **Sentinel / OPA policy** + cost estimation → apply
4. State stored remotely with locking (no local `terraform.tfstate` for that workspace)

`terraform login` stores a token; `cloud` / `remote` backend (or `cloud` block) points OSS CLI at HCP.

## Collaboration and governance (8b)

- Teams + permissions (read/plan/write/admin) at org/project/workspace
- Sentinel / OPA **policy as code** (prevent apply if policy fails)
- Drift detection on HCP workspaces
- Private module/provider registry
- No-code provisioning (know it exists)

## Integration (8d)

- VCS webhooks → speculative plans on PRs
- Run tasks (third-party scans)
- Dynamic provider credentials (OIDC) instead of static cloud keys
- Notifications (Slack, email) on run status

## Exam gut checks

- Need remote state + locking + team apply → **HCP workspace**, not `terraform.tfstate` on a laptop
- Need the same vars on 20 workspaces → **variable set**
- Need network stack to apply before app stack → **run trigger** (or `terraform_remote_state` / `tfe_outputs`)
- Isolate billing/permissions for a product line → **project**
- `terraform workspace new` on a laptop is **not** an HCP project
