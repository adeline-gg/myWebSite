# GitHub repository management for adeline-gg/myWebSite.
# The repository already exists on GitHub — import it before the first apply:
#   terraform import github_repository.this myWebSite
# Then run `terraform plan` and reconcile the settings below with reality.

provider "github" {
  token = var.github_token
  owner = var.github_owner
}

resource "github_repository" "this" {
  name        = var.repository_name
  description = var.repository_description
  visibility  = var.repository_visibility

  has_issues   = true
  has_wiki     = false
  has_projects = false

  auto_init              = false
  delete_branch_on_merge = true
}
