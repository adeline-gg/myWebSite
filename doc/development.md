# Development

## Prerequisites

- Node.js >= 18, npm >= 9
- (optional) Docker, for production-image builds
- (optional) Terraform + direnv, for hosting infrastructure

## Local development

```bash
npm install
npm run dev          # static server on http://localhost:8080 (http-server, no cache)
```

For the contact-form backend (optional):

```bash
cd backend
cp ../.env.example .env   # fill in SMTP credentials
npm install
node server.js            # Express API on http://localhost:3000
```

## Build

```bash
npm run prices       # regenerate pricing from pricing.config.mjs
npm run build        # prices + (planned) CSS/JS minification
```

## Docker

```bash
npm run docker:build
npm run docker:run   # serves on http://localhost:8080
```

## Tests

```bash
npm test             # node --test scripts/*.test.mjs
```

## Code quality

```bash
pre-commit install   # one-time: enable git hooks
pre-commit run --all-files
```

Pre-commit runs base hygiene hooks plus Prettier on HTML/CSS/JS/Markdown.

## Conventions

- **Files**: kebab-case (`contact-form.js`)
- **JS**: camelCase variables / functions, vanilla ES6+ (no framework)
- **CSS**: Custom Properties for theming
- **Commits**: Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`)
- **Branches**: GitHub Flow — feature branch → PR to `main`
- **Language**: English in code; site content is French

## Hosting infrastructure

The GitHub repository is managed by Terraform, **outside** this repo:

```bash
cd ~/Workspace/02-infrastructure/adeline-gueret   # direnv loads the token from pass
cd github-terraform && terraform plan             # should report "No changes"
```

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Contact form does nothing | Which mode is active in `js/contact-form.js`; backend reachable? |
| Backend "Erreur de configuration email" | SMTP_* vars in `backend/.env` |
| `terraform plan` wants to destroy resources | You're running outside direnv, or `.tf` drifted from state |
