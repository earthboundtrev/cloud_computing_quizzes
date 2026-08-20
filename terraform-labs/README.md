# Terraform Associate (004) — local labs

Hands-on practice that **does not need a cloud account**. Providers: `hashicorp/random`, `hashicorp/local`, `hashicorp/null`.

**Exam:** HashiCorp Certified Terraform Associate **004** • Terraform **1.12** content (you have **1.15.8** installed; that is a superset) • **60 minutes** • 8/31/2026

## How to run a lab

```powershell
cd terraform-labs\01-core-workflow
terraform fmt
terraform init
terraform validate
terraform plan
terraform apply -auto-approve
terraform output
terraform destroy -auto-approve
```

If `terraform` is not found, open a **new** terminal (PATH was updated by winget).

## Lab map (exam objectives)

| Lab | Objective | What you should be able to explain after |
|-----|-----------|------------------------------------------|
| [01-core-workflow](01-core-workflow) | 3a–3g | init → validate → plan → apply → destroy → fmt |
| [02-providers](02-providers) | 2a–2c | required_providers, lock file, multiple providers |
| [03-variables-outputs](03-variables-outputs) | 4c–4d | vars, tfvars, TF_VAR_, sensitive outputs |
| [04-resources-data](04-resources-data) | 4a–4b | resource vs data, cross-resource references |
| [05-expressions](05-expressions) | 4d–4e | count, for_each, for, functions, dynamic |
| [06-lifecycle-deps](06-lifecycle-deps) | **4f (new in 004)** | depends_on, create_before_destroy, prevent_destroy, ignore_changes |
| [07-validation](07-validation) | **4g (new in 004)** | variable validation, pre/postconditions, check blocks |
| [08-modules](08-modules) | 5a–5d | local module, inputs/outputs, version sourcing concepts |
| [09-state](09-state) | 2d, 6a–6d, 7b | local backend, workspaces, state list/show/mv |
| [10-import](10-import) | 7a | import existing objects; config must still exist |
| [11-sensitive-ephemeral](11-sensitive-ephemeral) | **4h (new in 004)** | sensitive vs ephemeral vs write-only |
| [12-hcp-notes](12-hcp-notes) | 8a–8d | HCP workspaces/projects — read, then quiz |

## 12-day plan to 8/31

| When | Do this |
|------|---------|
| 8/20–8/21 | Labs 01–04 + quiz Mixed 40Q. Memorize CLI flags. |
| 8/22–8/23 | Labs 05–07. **004 new:** lifecycle + validation. Quiz those topics. |
| 8/24–8/25 | Labs 08–10. State commands until they are muscle memory. |
| 8/26 | Lab 11 + [pattern guide](../terraform_associate_pattern_guide.md) HCP section. Official docs, not only quizzes. |
| 8/27–8/28 | Exam-mode quiz (timed 60 min). Import results; drill misses. |
| 8/29 | Weak-topic labs + HCP: projects vs workspaces vs CLI workspaces. |
| 8/30 | One timed exam-mode run. Stop cramming new material. |
| 8/31 | Exam. Sleep, water, read questions twice. |

Official review: https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004
