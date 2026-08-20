# Terraform Associate (004) Quick-Reference Pattern Guide

**Exam:** HashiCorp Certified: Terraform Associate **004**  
**When:** 8/31/2026 • **Duration:** 60 minutes • **Format:** multiple choice / multi-select / true-false (no fill-in-the-blank)  
**Product version tested:** Terraform **1.12** (your CLI is newer; do not study 1.15-only trivia)  
**Pass target in this app:** 70%

Hands-on: `terraform-labs/` (local providers, no cloud bill).  
Quiz: `terraform_associate_quiz.html` (exam mode + 60 min timer).

Official review: https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004

---

## Domain signals (gut check)

| Signal in the question | Reach for |
|------------------------|-----------|
| Desired state, repeatable, git, audit | **IaC** (declarative provisioning) |
| Plugin, AWS vs Azure in one config, `required_providers` | **Providers** |
| `init` / `plan` / `apply` / `destroy` / `fmt` / `validate` | **Core workflow** |
| `variable`, `output`, `type = object`, `for_each` | **Configuration** |
| `depends_on`, `create_before_destroy`, `ignore_changes` | **4f lifecycle** |
| `validation`, `precondition`, `postcondition`, `check` | **4g custom conditions** |
| Secret in state vs not in state, `password_wo` | **4h ephemeral / write-only** |
| `source =`, module inputs/outputs, registry `version` | **Modules** |
| `terraform.tfstate`, lock, S3/azurerm/`cloud` block | **State / backends** |
| `import`, `state rm`, `-replace`, `moved` | **Maintain infra** |
| Org → project → workspace, variable sets, Sentinel | **HCP Terraform** |

---

## 004 vs 003 — study these first

003 is retired. **004 added four topics.** If you only have time for one pass, do these labs:

| Obj | Topic | Lab |
|-----|--------|-----|
| 4f | `depends_on` + lifecycle (`create_before_destroy`, `prevent_destroy`, `ignore_changes`) | `06-lifecycle-deps` |
| 4g | variable `validation`, pre/postconditions, `check` blocks | `07-validation` |
| 4h | ephemeral values + write-only arguments; Vault as the secrets pattern | `11-sensitive-ephemeral` |
| 8c | HCP **projects** + workspaces (not CLI `terraform workspace`) | `12-hcp-notes` |

---

## CLI cheat sheet (muscle memory)

```text
terraform fmt [-check] [-recursive]
terraform init [-upgrade] [-reconfigure] [-migrate-state] [-backend=false]
terraform validate
terraform plan [-out=tfplan] [-var] [-var-file] [-destroy] [-refresh-only]
terraform apply [tfplan] [-auto-approve] [-replace=ADDR] [-target=ADDR]
terraform destroy                 # same as apply -destroy
terraform output [-raw NAME] [-json]
terraform show [tfplan|state]
terraform console                 # evaluate expressions against state
terraform providers
terraform version
terraform login / logout          # HCP token
terraform force-unlock LOCK_ID    # break a stale remote lock

terraform state list
terraform state show ADDR
terraform state mv SRC DST
terraform state rm ADDR           # unmanage; does NOT destroy the real object
terraform state pull / push       # push is dangerous; know it exists

terraform import ADDR ID
terraform apply -replace=ADDR     # replaced `terraform taint`
terraform workspace list|new|select|delete   # CLI workspaces ≠ HCP workspaces
```

**Logging:** `TF_LOG=TRACE|DEBUG|INFO` and optional `TF_LOG_PATH=terraform.log` (objective 7c).

**Variables:** `TF_VAR_name`, `-var 'name=value'`, `-var-file=prod.tfvars`.  
Precedence (low → high): default → `terraform.tfvars` → `*.auto.tfvars` → `-var-file` → `-var` / `TF_VAR_`.

**Do not** make `-target` a habit. It applies a subset of the graph and can leave hidden dependencies unapplied.

---

## Providers and lock file

```hcl
terraform {
  required_version = ">= 1.12.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  alias  = "west"
  region = "us-west-2"
}

resource "aws_s3_bucket" "dr" {
  provider = aws.west
  bucket   = "example"
}
```

- **Core** = HCL + graph + state. **Provider** = CRUD against an API.
- Multi-cloud / hybrid = one config, many providers (objective 1c / 2c).
- `.terraform.lock.hcl` is committed; `init -upgrade` changes it.
- Resource without `provider =` uses the **default** (non-aliased) config.

---

## State, backends, drift

- Default backend: **local** file `terraform.tfstate` (plus `.backup`).
- Remote backend reasons: **locking**, **collaboration**, keep secrets off laptops.
- Locking backends: HCP, S3+DynamoDB, azurerm, gcs, etc. Local locking is weak.
- **Drift** = real world ≠ state. `plan` refreshes by default; `apply -refresh-only` updates **state only**.
- `state rm` = stop managing. `destroy` = delete the object. `import` = start managing an existing object.
- Never commit state. Never `state push` unless you know why.

Remote state example (know the shape; do not memorize every backend argument):

```hcl
terraform {
  backend "s3" {
    bucket         = "tfstate"
    key            = "prod/app.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-locks"
    encrypt        = true
  }
}
```

HCP / Terraform Cloud uses a `cloud` block (or remote backend) instead of a local file.

---

## Configuration traps

| Trap | Truth |
|------|--------|
| `count` and `for_each` together | Illegal on the same resource |
| `for_each` on a list | Convert with `toset()`; prefer maps so keys are stable |
| Data source creates infra | No — it **reads** |
| `output` `sensitive` encrypts state | No — redacts UI; value still in state |
| Provisioners | Last resort; prefer cloud-init / user_data / config management |
| `terraform.tfvars` vs `*.auto.tfvars` | auto files load automatically; named files need `-var-file` unless named `terraform.tfvars` |

**Functions to recognize:** `length`, `join`, `split`, `lookup`, `element`, `coalesce`, `try`, `merge`, `toset`, `tomap`, `cidrsubnet`, `format`, `jsonencode`.

---

## Modules

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"
  name    = "exam"
}
```

- Local `source = "./modules/vpc"` has **no** `version` argument.
- Child `variable` values are passed in; parent reads **outputs** (`module.vpc.vpc_id`).
- Calling a module does not automatically expose child outputs to `terraform output` unless the root re-outputs them.

---

## HCP Terraform (high miss rate)

```
Organization
  └── Project          ← 004 8c: grouping + IAM + variable sets
        └── Workspace  ← remote state, vars, VCS, run queue
```

| Need | Feature |
|------|---------|
| Same vars on many workspaces | Variable set |
| App waits for network workspace | Run trigger |
| Block bad plans | Sentinel / OPA policy |
| PR comments with a plan | VCS speculative plan |
| Team can plan but not apply | Workspace permissions |

**CLI `terraform workspace new prod` is not an HCP project.** If the question mentions teams, VCS, Sentinel, or run queue → HCP workspace.

---

## 12-day plan (today → 8/31)

See `terraform-labs/README.md`. Daily loop: **one lab apply/destroy** + **one 40Q mixed quiz**. Last three days: **timed 60-min exam mode** only.

When you miss a question in the app, download results and import them so weak topics get boosted (HCP / maintain / fundamentals already have a bootstrap boost).
