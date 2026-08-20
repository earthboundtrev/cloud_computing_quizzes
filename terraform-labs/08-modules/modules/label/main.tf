terraform {
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }
}

variable "role" {
  type = string
}

variable "environment" {
  type = string
}

resource "random_pet" "this" {
  length = 2
  keepers = {
    role = var.role
    env  = var.environment
  }
}

output "name" {
  value = "${var.environment}-${var.role}-${random_pet.this.id}"
}

output "pet" {
  value = random_pet.this.id
}
