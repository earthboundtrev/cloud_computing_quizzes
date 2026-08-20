# 09 — State (objectives 2d, 6a–6d, 7b)

Default local backend: `terraform.tfstate` in the working directory. This lab uses an **explicit local backend** path so you see the `backend` block (exam 6c is usually S3/Azurerm/gcs/HCP — same idea).

CLI workspaces (`terraform workspace`) are **not** the same as **HCP Terraform workspaces**.
- CLI: same config, different state files (`terraform.tfstate.d/<name>/`)
- HCP: remote run environment (VCS, variables, permissions, runs)

```powershell
terraform init
terraform apply -auto-approve
terraform state list
terraform state show random_pet.shared
terraform workspace new stage
terraform apply -auto-approve
terraform workspace select default
terraform state mv random_pet.shared random_pet.renamed
```

**Locking:** local backend has limited locking; remote backends (S3+DynamoDB, azurerm, HCP) lock to stop concurrent writes. `terraform force-unlock LOCK_ID` is the break-glass command.

**Drift:** someone changed the real object. `terraform plan` (refresh) shows it; `apply -refresh-only` updates state without changing infra.
