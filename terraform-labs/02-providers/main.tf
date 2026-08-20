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

# Default (un-aliased) provider configuration.
provider "random" {}

# Aliased configuration — same provider type, different instance.
# Exam: resources without `provider = ...` use the default, not an alias.
provider "random" {
  alias = "bytes"
}

resource "random_pet" "default_name" {
  length = 1
}

resource "random_id" "aliased_id" {
  provider    = random.bytes
  byte_length = 4
}

resource "local_file" "combo" {
  filename = "${path.module}/out/combo.txt"
  content  = "pet=${random_pet.default_name.id} id=${random_id.aliased_id.hex}\n"
}

output "used_two_providers" {
  value = {
    pet = random_pet.default_name.id
    id  = random_id.aliased_id.hex
  }
}
