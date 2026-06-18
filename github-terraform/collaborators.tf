# Collaborators of adeline-gg/myWebSite.
# Non-authoritative resource: it only manages the collaborators declared here and
# does not interfere with the repository owner or other existing collaborators.
#
# adeline-gg is a personal account, so the permission must be "push" (write access).
# On apply, an invitation is sent to the user, who must accept it before the access
# becomes effective (the resource stays in "invited" state until then).

resource "github_repository_collaborator" "xgueret" {
  repository = github_repository.this.name
  username   = "xgueret"
  permission = "push"
}
