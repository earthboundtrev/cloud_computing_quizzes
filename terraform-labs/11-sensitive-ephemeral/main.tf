terraform {
  required_version = ">= 1.12.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }
}

# Managed resource: the password IS stored in state (even with sensitive outputs).
resource "random_password" "persisted" {
  length  = 16
  special = false
}

# Ephemeral resource: opened for this operation, NOT written to state or plan.
ephemeral "random_password" "session" {
  length  = 16
  special = false
}

output "persisted_password" {
  value     = random_password.persisted.result
  sensitive = true
}

# Root ephemeral outputs are not a general "print this secret" feature.
# Child modules use ephemeral outputs to pass values to write-only arguments.
# After apply, run: terraform state pull
# You should see random_password.persisted and NOT ephemeral.random_password.session.
