terraform {
  required_version = ">= 1.12.0"
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

resource "random_pet" "first" {
  length = 2
}

# Implicit dependency: filename interpolates random_pet.first.id
resource "local_file" "implicit" {
  filename = "${path.module}/out/${random_pet.first.id}.txt"
  content  = "created after pet via implicit graph edge"
}

# Explicit dependency: no attribute of `first` is referenced in this resource,
# but we still want it to wait. Exam: prefer implicit refs when possible.
resource "null_resource" "after_pet" {
  triggers = {
    always = timestamp()
  }
  depends_on = [random_pet.first]
}

resource "local_file" "replaceable" {
  filename = "${path.module}/out/replaceable.txt"
  content  = "v1"

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [content]
    # Uncomment to see prevent_destroy block a destroy:
    # prevent_destroy = true
  }
}

output "ordering_hint" {
  value = "plan/apply: random_pet.first before local_file.implicit and null_resource.after_pet"
}
