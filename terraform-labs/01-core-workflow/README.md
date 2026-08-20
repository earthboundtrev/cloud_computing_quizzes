# 01 — Core workflow (objectives 3a–3g)

Commands the exam expects you to name in order:

1. `terraform fmt` — rewrite `.tf` to canonical style (`-check` for CI)
2. `terraform init` — providers, modules, backend
3. `terraform validate` — syntax + internal consistency (needs init)
4. `terraform plan` — execution plan, no changes
5. `terraform apply` — execute (or `apply saved.tfplan`)
6. `terraform destroy` — or `apply -destroy`

Also know: `terraform output`, `terraform show`, `TF_LOG=TRACE`.

```powershell
terraform fmt
terraform init
terraform validate
terraform plan -out=tfplan
terraform apply tfplan
terraform output
terraform destroy -auto-approve
```
