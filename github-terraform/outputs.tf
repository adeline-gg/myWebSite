output "repository_url" {
  description = "GitHub repository URL"
  value       = github_repository.this.html_url
}

output "repository_clone_url_https" {
  description = "HTTPS clone URL"
  value       = github_repository.this.http_clone_url
}

output "repository_clone_url_ssh" {
  description = "SSH clone URL"
  value       = github_repository.this.ssh_clone_url
}

output "repository_full_name" {
  description = "Full repository name (owner/name)"
  value       = github_repository.this.full_name
}
