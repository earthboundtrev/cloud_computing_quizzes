terraform {
  required_version = ">= 1.12.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

variable "pets" {
  type    = set(string)
  default = ["web", "api", "worker"]
}

variable "extra_tags" {
  type = map(string)
  default = {
    class = "associate"
    exam  = "004"
  }
}

resource "random_integer" "by_index" {
  count = 3
  min   = 10
  max   = 99
}

resource "random_pet" "named" {
  for_each  = var.pets
  length    = 1
  separator = "-"
  keepers = {
    role = each.key
  }
}

resource "local_file" "manifest" {
  filename = "${path.module}/out/manifest.txt"
  content = join("\n", concat(
    [for i, n in random_integer.by_index : "count[${i}]=${n.result}"],
    [for k, p in random_pet.named : "for_each[${k}]=${p.id}"],
    ["tags=${jsonencode(var.extra_tags)}"],
  ))
}

output "count_results" {
  value = random_integer.by_index[*].result
}

output "for_each_ids" {
  value = { for k, p in random_pet.named : k => p.id }
}
