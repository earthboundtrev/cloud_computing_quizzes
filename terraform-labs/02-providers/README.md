# 02 — Providers (objectives 2a–2c)

Terraform **core** is language + state + graph. **Providers** are plugins that implement resources/data sources for an API.

Exam traps:
- `required_providers` declares **source + version**; `provider` **configures** the plugin (region, alias, credentials).
- `.terraform.lock.hcl` pins exact provider versions + hashes (`terraform init -upgrade` to bump).
- Multiple clouds = multiple providers in one config (service-agnostic workflow).
- `provider "aws" { alias = "west" }` then `provider = aws.west` on a resource.

This lab uses **random + local** so you still see two HashiCorp providers without AWS, plus a `random` **alias**.
