# 07 — Custom conditions (objective 4g — **new in 004**)

Three layers the exam distinguishes:

1. **`variable` `validation`** — checks **input** before resources are planned (bad tfvars fail fast).
2. **`precondition` / `postcondition`** inside `lifecycle` — checks at plan/apply against resource/data context.
3. **`check` blocks** — assertions about infrastructure that do **not** by default roll back the apply; they report in plan (HCP can surface them).

```powershell
terraform plan -var="environment=nope"     # should fail validation
terraform plan -var="environment=prod" -var="allow_prod=false"  # precondition
terraform apply -auto-approve -var="environment=dev"
```
