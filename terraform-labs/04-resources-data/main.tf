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

resource "random_pet" "app" {
  length = 2
}

resource "local_file" "config" {
  filename = "${path.module}/out/app.conf"
  content  = "app_id=${random_pet.app.id}\n"
}

# Data source: read an object Terraform did not create in this block.
# After apply, this reads the file we just wrote (same apply uses the resource).
data "local_file" "config_readback" {
  filename = local_file.config.filename
}

output "from_resource" {
  value = random_pet.app.id
}

output "from_data_source" {
  value = data.local_file.config_readback.content
}
