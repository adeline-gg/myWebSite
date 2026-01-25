# Adeline Gueret Website Constitution

## Core Principles

### I. Static-First Architecture
Le site est une application statique HTML/CSS/JS vanilla optimisée pour le SEO. Pas de framework frontend lourd. Le contenu principal est inliné dans le HTML pour un indexage optimal par les moteurs de recherche. JavaScript est utilisé uniquement pour l'interactivité (modals, chatbot, formulaires).

### II. Performance & Légèreté
- Images optimisées (PNG/JPG, lazy loading recommandé)
- Compression Gzip activée (niveau 6)
- Cache agressif : 1 an pour assets statiques (CSS, JS, images)
- Pas de dépendances externes lourdes (vanilla JS uniquement)
- Cible : < 50 KB transféré après compression

### III. Sécurité Non-Négociable
- Containers Docker avec utilisateur non-root (`nginx`)
- Validation des données côté client ET serveur
- Rate limiting backend (5 requêtes / 15 min par IP)
- CORS configuré avec origines autorisées
- Variables sensibles dans `.env` (jamais commitées)
- Headers de sécurité via Nginx (CSP, X-Frame-Options)

### IV. Accessibilité & SEO
- HTML sémantique (header, main, section, article, footer)
- Attributs ARIA pour l'accessibilité
- Meta tags complets (OG, Twitter, geo)
- Schema.org JSON-LD (ProfessionalService, Person, LocalBusiness)
- robots.txt et sitemap.xml maintenus à jour
- Cible Lighthouse : > 90 sur tous les scores

### V. Maintenabilité & Simplicité
- Code modulaire : 1 fichier JS = 1 fonctionnalité
- CSS avec Custom Properties pour le theming
- Pas d'over-engineering : résoudre le problème actuel, pas les hypothétiques
- Commentaires uniquement si la logique n'est pas évidente
- Conventions de nommage cohérentes (kebab-case fichiers, camelCase JS)

## Stack Technique

### Frontend
| Technologie | Version | Usage |
|-------------|---------|-------|
| HTML5 | - | Structure sémantique |
| CSS3 | - | Styling (Custom Properties, Grid, Flexbox) |
| JavaScript ES6+ | Vanilla | Interactivité |
| marked.js | ^11.1.1 | Parsing Markdown (contenu légal) |

### Backend (Optionnel)
| Technologie | Version | Usage |
|-------------|---------|-------|
| Node.js | >= 18.0.0 | Runtime |
| Express | ^4.18.2 | Framework HTTP |
| Nodemailer | ^6.9.7 | Envoi emails |
| express-rate-limit | ^7.1.5 | Anti-spam |

### Infrastructure
| Outil | Configuration |
|-------|---------------|
| Docker | nginx:1.27-alpine |
| Nginx | Serveur statique, gzip, cache |
| Netlify | Hébergement production |

## Structure du Projet

```
adeline-gueret/
├── assets/images/          # Images optimisées
├── backend/                # Backend Node.js (optionnel)
│   ├── server.js          # Express + Nodemailer
│   └── package.json
├── content/               # Contenu Markdown
│   ├── mentions-legales.md
│   └── politique-confidentialite.md
├── css/
│   ├── styles.css         # Design system principal
│   └── chatbot.css        # Styles widget chatbot
├── js/
│   ├── app.js             # Initialisation
│   ├── chatbot.js         # Chatbot glossaire
│   ├── contact-form.js    # Gestion formulaire
│   ├── legal-modal.js     # Modals légales
│   └── service-modal.js   # Modals services
├── index.html             # Page unique (one-page)
├── Dockerfile             # Image production
├── nginx.conf             # Config serveur
├── package.json           # Dépendances frontend
├── robots.txt             # SEO
└── sitemap.xml            # Plan du site
```

## Design System

### Palette de Couleurs
```css
--primary: #357C7A           /* Teal principal */
--primary-light: #5AA8A6     /* Teal clair */
--primary-dark: #2A6562      /* Teal foncé */
--secondary: #9FD3C0         /* Vert doux */
--accent: #E8B59A            /* Pêche/beige */
--text-dark: #2D3748         /* Texte principal */
--text-light: #718096        /* Texte secondaire */
--bg-light: #FAF7F2          /* Fond clair */
```

### Typographie
- Police principale : Inter, -apple-system, system-ui
- Tailles : rem pour la scalabilité
- Line-height : 1.5 pour lisibilité

## Fonctionnalités Clés

1. **Navigation sticky** avec backdrop blur
2. **Hero section** avec cartes flottantes animées
3. **Service modals** avec détails au clic
4. **Chatbot glossaire** (20+ termes TND, TSA, inclusion)
5. **Formulaire de contact** multi-mode (backend/Formspree/Netlify)
6. **Modals légales** avec conversion Markdown

## Compliance & RGPD

- Mentions légales complètes (SIREN : 978 658 607)
- Politique de confidentialité détaillée
- Pas de cookies tiers sans consentement
- Données collectées documentées
- Contact responsable identifié

## Workflow de Développement

### Scripts NPM
```bash
npm run dev          # Serveur local (port 8080)
npm run docker:build # Build image Docker
npm run docker:run   # Run container local
```

### Conventions Git
- Branch principale : `main`
- Features : `feat/nom-feature` ou `Feature/nom`
- Fixes : `fix/description`
- Messages : Conventional Commits (feat:, fix:, refactor:, docs:)

### Déploiement
1. Push sur `main`
2. Build Docker automatique (CI/CD à configurer)
3. Deploy sur Netlify (production)

## Governance

- Cette constitution définit les standards du projet
- Toute modification architecturale majeure doit être documentée
- Les principes de sécurité et performance sont non-négociables
- Simplicité > Fonctionnalités hypothétiques

## Roadmap

- [x] Architecture statique SEO-first
- [x] Système de modals services
- [x] Chatbot assistant glossaire
- [x] Containerisation Docker
- [ ] Tests automatisés (Playwright)
- [ ] CI/CD GitHub Actions
- [ ] PWA (Progressive Web App)
- [ ] CAPTCHA formulaire

**Version**: 1.0.0 | **Ratified**: 2026-01-24 | **Last Amended**: 2026-01-24
