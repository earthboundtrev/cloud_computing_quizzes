# 08 — Modules (objectives 5a–5d)

A **module** is a directory of `.tf` files. The **root module** is whatever you run `terraform` in.

Sources (exam):
- Local path: `source = "./modules/label"`
- Terraform Registry: `source = "hashicorp/consul/aws"` + `version = "1.0.0"`
- Git: `source = "git::https://example.com/vpc.git?ref=v1.2.0"`

Version constraints apply to **registry** (and similar) modules, not to local paths.

Variable **scope**: child module variables are not visible in the root unless passed in / outputted out. Root cannot see a child's `var.x` without `module.child.output`.

```powershell
terraform init
terraform apply -auto-approve
terraform output
```
