terraform {
  required_version = ">= 1.12.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
  }
}

module "web" {
  source      = "./modules/label"
  role        = "web"
  environment = "dev"
}

module "api" {
  source      = "./modules/label"
  role        = "api"
  environment = "dev"
}

output "web_name" {
  value = module.web.name
}

output "api_name" {
  value = module.api.name
}
