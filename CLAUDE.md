# CLAUDE.md - Contexte Projet Adeline Gueret

## Description

Site web professionnel pour **Adeline Guillot-Gueret**, psychologue spécialisée dans l'accompagnement des personnes avec troubles neurodéveloppementaux (TND) en Guadeloupe. Site vitrine one-page avec chatbot glossaire intégré.

## Stack Technique

- **Frontend** : HTML5 sémantique, CSS3 (Custom Properties), JavaScript ES6+ vanilla
- **Backend** (optionnel) : Node.js 18+, Express, Nodemailer
- **Infra** : Docker (nginx:1.27-alpine), Netlify (production)
- **Pas de framework** : Vanilla JS uniquement pour la légèreté et le SEO

## Structure Clé

```
index.html          # Page unique (1000+ lignes, SEO-optimisé)
css/styles.css      # Design system (1700+ lignes)
css/chatbot.css     # Styles chatbot widget
js/app.js           # Initialisation
js/chatbot.js       # Chatbot glossaire (20+ termes TND)
js/contact-form.js  # Formulaire multi-mode
js/service-modal.js # Modals services
js/legal-modal.js   # Modals mentions légales
backend/server.js   # Express + Nodemailer (optionnel)
nginx.conf          # Config serveur production
Dockerfile          # Image nginx alpine non-root
```

## Commandes

```bash
npm run dev          # Serveur local port 8080
npm run docker:build # Build image Docker
npm run docker:run   # Run container local
```

## Principes de Développement

1. **Static-first** : HTML statique pour SEO, JS pour interactivité uniquement
2. **Performance** : < 50 KB transféré après gzip, cache 1 an pour assets
3. **Sécurité** : Container non-root, rate limiting, validation client+serveur
4. **Simplicité** : Pas d'over-engineering, résoudre le problème actuel
5. **Accessibilité** : HTML sémantique, ARIA, Lighthouse > 90

## Palette de Couleurs

```css
--primary: #357C7A      /* Teal */
--secondary: #9FD3C0    /* Vert doux */
--accent: #E8B59A       /* Pêche */
--bg-light: #FAF7F2     /* Fond */
```

## Fonctionnalités Principales

- Navigation sticky avec backdrop blur
- Hero section avec cartes flottantes animées
- Service modals avec détails au clic
- Chatbot glossaire (TND, TSA, TDA/H, inclusion scolaire)
- Formulaire contact (backend/Formspree/Netlify/simulation)
- Modals légales avec parsing Markdown

## Conventions

- **Fichiers** : kebab-case (`contact-form.js`)
- **JS** : camelCase variables/fonctions
- **Git** : Conventional Commits (`feat:`, `fix:`, `refactor:`)
- **CSS** : Custom Properties pour theming

## Points d'Attention

- Le formulaire de contact supporte plusieurs modes (voir `js/contact-form.js`)
- Le chatbot a une base de connaissances extensive sur les TND
- Les modals services extraient les données du DOM dynamiquement
- Le Dockerfile utilise un utilisateur non-root pour la sécurité

## Fichiers de Configuration

- `.specify/memory/constitution.md` : Constitution complète du projet
- `.dockerignore` : Exclusions build Docker
- `nginx.conf` : Config serveur avec gzip, cache, UTF-8
- `.htaccess` : Config Apache alternative

## Domaine & Hébergement

- **URL** : adelineguillotgueret.fr
- **Hébergement** : Netlify
- **SIREN** : 978 658 607
- **Localisation** : Guadeloupe (FR-971)
