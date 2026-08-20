terraform {
  required_version = ">= 1.12.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }
}

variable "environment" {
  description = "Target environment name"
  type        = string
  default     = "dev"
}

variable "owner" {
  type    = string
  default = "student"
}

variable "tags" {
  description = "Complex type: map of strings"
  type        = map(string)
  default = {
    managed_by = "terraform"
  }
}

variable "allowed_cidrs" {
  type    = list(string)
  default = ["10.0.0.0/8"]
}

resource "random_pet" "app" {
  length = 2
}

output "pet_name" {
  value = random_pet.app.id
}

output "summary" {
  value = {
    env   = var.environment
    owner = var.owner
    tags  = merge(var.tags, { env = var.environment })
    cidrs = var.allowed_cidrs
  }
}

output "owner_sensitive_demo" {
  description = "Hidden in CLI; still present in terraform.tfstate"
  value       = var.owner
  sensitive   = true
}
