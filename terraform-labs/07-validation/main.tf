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
  type = string
  validation {
    condition     = contains(["dev", "stage", "prod"], var.environment)
    error_message = "environment must be dev, stage, or prod."
  }
}

variable "allow_prod" {
  type    = bool
  default = false
}

resource "random_id" "suffix" {
  byte_length = 4

  lifecycle {
    precondition {
      condition     = var.environment != "prod" || var.allow_prod
      error_message = "prod requires allow_prod = true."
    }
    postcondition {
      condition     = length(self.hex) == 8
      error_message = "expected 8 hex characters from 4 bytes."
    }
  }
}

check "environment_is_known" {
  assert {
    condition     = contains(["dev", "stage", "prod"], var.environment)
    error_message = "check block: unexpected environment."
  }
}

output "id" {
  value = random_id.suffix.hex
}
