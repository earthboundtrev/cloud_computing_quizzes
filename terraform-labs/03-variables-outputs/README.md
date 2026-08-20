# 03 — Variables and outputs (objectives 4c–4d)

Precedence (lowest → highest) — memorize this:

1. variable `default`
2. `terraform.tfvars`
3. `*.auto.tfvars` (alphabetical)
4. `-var-file=`
5. `-var=` / `TF_VAR_name` (env)

Types: `string`, `number`, `bool`, `list`, `set`, `map`, `object`, `tuple`.

```powershell
terraform apply -auto-approve -var="environment=stage"
$env:TF_VAR_owner = "trev"
terraform apply -auto-approve
terraform output
terraform output -raw pet_name
```

`sensitive = true` hides CLI output but **still stores the value in state**. That is not the same as ephemeral/write-only (lab 11).
