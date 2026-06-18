# github-terraform — gestion du dépôt GitHub

Ce dossier gère le dépôt GitHub [`adeline-gg/myWebSite`](https://github.com/adeline-gg/myWebSite)
via Terraform (provider `integrations/github ~> 6.0`).

> ⚠️ **Le dépôt existe déjà.** Terraform ne doit pas le recréer : il faut d'abord
> l'**importer** dans le state, puis réconcilier les réglages déclarés ici avec la
> réalité du dépôt.

## Prérequis

- [Terraform](https://developer.hashicorp.com/terraform) >= 1.0
- [`pass`](https://www.passwordstore.org/) avec une entrée
  `github/terraform-token-addeline-gg` contenant un PAT GitHub (scopes `repo` + `admin:repo`)
  ayant les droits d'administration sur `adeline-gg`.
- [`direnv`](https://direnv.net/) pour injecter le token depuis `pass`.

## Mise en route

```bash
cd github-terraform

# 1. Charger le token depuis pass (jamais écrit sur disque)
direnv allow

# 2. Initialiser le provider
terraform init

# 3. Importer le dépôt existant dans le state
terraform import github_repository.this myWebSite

# 4. Aligner la config sur la réalité du dépôt
terraform plan
```

À l'étape 4, si `plan` propose des changements non voulus (issues, wiki, merge
settings…), ajuste `main.tf` pour refléter les réglages réels du dépôt **avant**
de faire `terraform apply`.

## Secrets

Le token n'est **jamais** écrit dans les fichiers `.tf`, `.tfvars` ni dans `.envrc` :
il est résolu au moment du shell depuis `pass` via `direnv` (`TF_VAR_github_token`).

L'état Terraform (`*.tfstate`), le dossier `.terraform/`, les `*.tfvars` et `.direnv/`
sont ignorés par git (voir le `.gitignore` du projet).
