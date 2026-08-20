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

resource "random_pet" "server" {
  length    = 2
  separator = "-"
}

resource "local_file" "inventory" {
  filename = "${path.module}/out/inventory.txt"
  content  = "pet=${random_pet.server.id}\n"
}

output "pet_name" {
  description = "Generated name written to the local file"
  value       = random_pet.server.id
}
