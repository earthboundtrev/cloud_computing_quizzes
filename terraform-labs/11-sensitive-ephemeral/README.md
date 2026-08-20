# 11 — Sensitive, ephemeral, write-only (objective 4h — **new in 004**)

Memorize the three layers:

| Mechanism | Hidden in CLI? | Stored in state/plan? | Typical use |
|-----------|----------------|------------------------|-------------|
| `sensitive = true` | Yes | **Yes** | Mark outputs/vars so they are redacted in UI |
| `ephemeral` resource / `ephemeral = true` var/output | Yes | **No** | Short-lived secrets for this operation only |
| Write-only arguments (`*_wo` + `*_wo_version`) | Yes | **No** | Pass a secret *into* a managed resource (provider must support it) |

This lab compares `resource "random_password"` (in state) vs `ephemeral "random_password"` (not in state).

```powershell
terraform init
terraform apply -auto-approve
terraform state pull
# Look for the managed password. You should NOT see the ephemeral password in state.
```

Write-only example (AWS, not run here):

```hcl
password_wo         = ephemeral.random_password.db.result
password_wo_version = 1
```

Vault on the exam: prefer Vault (or a secrets manager) over committing secrets; Terraform consumes them at runtime. `sensitive` is **not** encryption.
