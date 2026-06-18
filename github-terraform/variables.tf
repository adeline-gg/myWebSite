variable "github_token" {
  description = "GitHub personal access token (injected via direnv from pass, never on disk)"
  type        = string
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub repository owner (user or organization)"
  type        = string
  default     = "adeline-gg"
}

variable "repository_name" {
  description = "GitHub repository name"
  type        = string
  default     = "myWebSite"
}

variable "repository_description" {
  description = "GitHub repository description"
  type        = string
  default     = "Site vitrine professionnel d'Adeline Guillot-Gueret, psychologue spécialisée TND (Guadeloupe)"
}

variable "repository_visibility" {
  description = "Repository visibility (public or private)"
  type        = string
  default     = "private"

  validation {
    condition     = contains(["public", "private"], var.repository_visibility)
    error_message = "Visibility must be 'public' or 'private'."
  }
}
