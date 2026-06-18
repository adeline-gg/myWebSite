# Architecture

Static-first one-page vitrine site for Adeline Guillot-Gueret, psychologue (TND, Guadeloupe),
with an optional Node/Express backend for the contact form.

## Mental Model

```
                 ┌─────────────────────────────────────────────┐
                 │  Browser (visitor)                           │
                 │                                              │
                 │   index.html  ──loads──►  css/*.css          │
                 │      │                    js/*.js (vanilla)  │
                 │      │                                       │
                 │      ▼ contact form submit                   │
                 └──────┼───────────────────────────────────────┘
                        │ (one of several modes)
        ┌───────────────┼────────────────┬─────────────────┐
        ▼               ▼                ▼                 ▼
   Node backend     Formspree        Netlify Forms     simulation
   (Express +                                          (no network)
    Nodemailer)
        │
        ▼
   SMTP server ──► email to CONTACT_EMAIL
```

Production is served as **static files** behind nginx (Docker) / Netlify. The backend is
**optional** — the front-end contact form supports multiple submission modes (see
`js/contact-form.js`); SMTP is only involved when the Node backend mode is active.

## Module Structure

| Path | Responsibility |
|------|----------------|
| `index.html` | Single SEO-optimized page (semantic HTML, ARIA) |
| `css/styles.css` | Design system — CSS Custom Properties (theming, layout) |
| `css/chatbot.css` | Chatbot widget styles |
| `js/app.js` | Bootstrap / initialization |
| `js/chatbot.js` | Glossary chatbot (TND / TSA / TDA-H knowledge base) |
| `js/contact-form.js` | Multi-mode contact form (backend / Formspree / Netlify / sim) |
| `js/service-modal.js` | Service detail modals (data extracted from the DOM) |
| `js/legal-modal.js` | Legal / mentions-légales modals (Markdown parsing via `marked`) |
| `scripts/generate-prices.mjs` | Build-time pricing generation from `pricing.config.mjs` |
| `backend/server.js` | Express + Nodemailer contact endpoint (optional) |
| `content/` | Markdown content (legal notices, etc.) |
| `nginx.conf` / `Dockerfile` | Production serving (nginx:alpine, non-root) |

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Vanilla JS, no framework | Lightweight payload (< 50 KB gzipped), best-in-class SEO |
| Static-first | HTML pre-rendered for crawlers; JS only for interactivity |
| Optional backend | Form works without a server; backend is one mode among several |
| CSS Custom Properties | Theming without a build step |
| Hosting IaC in Terraform | GitHub repo (`adeline-gg/myWebSite`) managed in `~/Workspace/02-infrastructure/adeline-gueret/` |

## Security Considerations

- Backend: rate limiting (5 req / 15 min / IP), client + server-side validation.
- Docker image runs as a **non-root** user.
- Secrets (SMTP credentials) live in a gitignored `backend/.env` — see `.env.example`.
- Terraform state lives **outside** the repo and is gitignored to prevent secret leakage.
