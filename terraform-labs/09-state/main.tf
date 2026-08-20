terraform {
  required_version = ">= 1.12.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }

  # Exam 6a/6c: backends store state. Local is the default; production uses remote.
  backend "local" {
    path = "state/terraform.tfstate"
  }
}

resource "random_pet" "shared" {
  length = 2
}

output "name" {
  value = random_pet.shared.id
}
