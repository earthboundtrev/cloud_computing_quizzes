terraform {
  required_version = ">= 1.12.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

# After you create import-me.txt, import it to this address.
resource "local_file" "existing" {
  filename = "${path.module}/import-me.txt"
  content  = "imported by terraform\n"
}

# Example of a refactor record (no-op unless you previously had local_file.old).
# moved {
#   from = local_file.old
#   to   = local_file.existing
# }
