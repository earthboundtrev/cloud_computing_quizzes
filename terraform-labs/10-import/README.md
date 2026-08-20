# 10 — Import and maintain (objective 7a)

`terraform import ADDRESS ID` binds an **existing** object into state. You still need a matching **resource block**. Import does not write HCL for you (unless you use `terraform plan -generate-config-out` / import blocks).

Modern alternative: `import { to = ... id = ... }` in config, then apply.

```powershell
Set-Content -Path .\import-me.txt -Value "imported by terraform`n" -NoNewline
terraform init
terraform import local_file.existing (Resolve-Path .\import-me.txt).Path
terraform plan
terraform state list
```

If plan wants to change content, your HCL `content` does not match the file. Align them until plan is empty.

Also know: `moved { from = ... to = ... }` for refactors (safer than `state mv` in shared repos).
