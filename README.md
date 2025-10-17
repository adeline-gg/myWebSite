# Site Adeline Guillot Gueret

Site vitrine professionnel pour **Adeline Guillot Gueret**, enseignante spécialisée de formation, formatrice & superviseure en Guadeloupe, spécialisée dans l'accompagnement des enfants et adolescents présentant des troubles du neurodéveloppement (TND, TSA, déficience visuelle, difficultés d'apprentissage).

## 🌟 Caractéristiques

- **Architecture moderne** : Site statique one-page avec JavaScript vanilla
- **Gestion de contenu** : Contenu éditable via fichiers Markdown et JSON
- **Design responsive** : Interface adaptative mobile-first
- **Accessibilité** : Conforme aux standards WCAG
- **Containerisé** : Déploiement Docker + Kubernetes/Helm
- **Performance optimisée** : Animations fluides, lazy loading
- **SEO optimisé** : Meta tags complets, Schema.org, sitemap, robots.txt

## 📋 Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (pour containerisation)
- kubectl et Helm (pour déploiement Kubernetes)

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/xgueret/adeline-gueret.git
cd adeline-gueret
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer en mode développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:8080`

## 📁 Structure du Projet

```
.
├── content/               # Contenu Markdown
│   ├── services/         # Descriptions des services
│   └── *.md              # Autres contenus
├── js/
│   ├── app.js            # Application JavaScript principale
│   └── contact-form.js   # Gestion du formulaire
├── k8s/
│   └── helm/             # Charts Helm pour déploiement
├── backend/              # Backend Node.js (optionnel)
├── content.json          # Configuration du contenu
├── index.html            # Page principale
├── Dockerfile            # Configuration Docker
└── package.json          # Dépendances Node.js
```

## ✏️ Édition du Contenu

### Modifier les textes

1. **Contenu court** : Éditer directement dans `content.json`
2. **Contenu long** : Modifier les fichiers `.md` dans le dossier `content/`

Exemple pour ajouter un nouveau service :

```json
{
  "services": {
    "items": [
      {
        "icon": "🎯",
        "title": "Nouveau Service",
        "text": "content/services/nouveau-service.md",
        "price": "Sur devis"
      }
    ]
  }
}
```

Puis créer le fichier `content/services/nouveau-service.md` :

```markdown
Description détaillée du nouveau service...
```

### Modifier les images

Remplacer les URLs dans `content.json` :

```json
{
  "hero": {
    "image": {
      "src": "/assets/images/hero.jpg",
      "alt": "Description"
    }
  }
}
```

## 🐳 Déploiement Docker

### Build l'image

```bash
npm run docker:build
# ou
docker build -t xgueret/adeline-gueret-site:latest .
```

### Lancer le conteneur

```bash
npm run docker:run
# ou
docker run -p 8080:80 xgueret/adeline-gueret-site:latest
```

## ☸️ Déploiement Kubernetes

### Déploiement avec Helm

```bash
# Déploiement
helm upgrade --install adeline-guillot-gueret ./k8s/helm/adeline-gueret-site

# Vérification
kubectl get pods
kubectl get ingress

# Logs
kubectl logs -l app=adeline-gueret-site
```

### Configuration

Éditer `k8s/helm/adeline-gueret-site/values.yaml` :

```yaml
image:
  repository: xgueret/adeline-gueret-site
  tag: latest

ingress:
  enabled: true
  hosts:
    - host: adelineguillotgueret.fr
      paths:
        - path: /
          pathType: Prefix
```

## 🔧 Scripts NPM Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance serveur de développement |
| `npm run build` | Build pour production (minification) |
| `npm run docker:build` | Build l'image Docker |
| `npm run docker:run` | Lance le conteneur Docker |
| `npm run k8s:deploy` | Déploie sur Kubernetes |
| `npm test` | Lance les tests |
| `npm run lint` | Vérifie le code |

## 📝 Formulaire de Contact

Le formulaire utilise actuellement une simulation. Pour le rendre fonctionnel :

### Option 1 : Service tiers (recommandé)

Intégrer [Formspree](https://formspree.io/) ou [Netlify Forms](https://www.netlify.com/products/forms/)

```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <!-- champs du formulaire -->
</form>
```

### Option 2 : Backend personnalisé

Utiliser le backend Node.js fourni dans le dossier `backend/` :

1. Configurer les variables d'environnement dans `.env`
2. Déployer le backend sur un serveur ou serverless
3. Mettre à jour `js/contact-form.js` avec l'URL du backend

## 🔍 SEO & Métadonnées

Les métadonnées SEO sont configurées dans `index.html` :

```html
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:image" content="...">
```

Fichiers générés :
- `robots.txt` - Instructions pour les robots d'indexation
- `sitemap.xml` - Plan du site pour les moteurs de recherche

## 🎯 Services Proposés

- **Soutien scolaire spécifique & bilans scolaires** (50€/heure)
- **Guidance parentale** (60€/heure)
- **Formation & supervision d'équipes** (sur devis)
- **Analyse de pratiques professionnelles** (sur devis)

## 🧪 Tests

```bash
# Tests end-to-end (à implémenter)
npm test

# Tests d'accessibilité
npm run test:a11y
```

## 📊 Performance

Le site est optimisé pour obtenir un score Lighthouse > 90 :

- ✅ Performance
- ✅ Accessibilité
- ✅ Best Practices
- ✅ SEO

## 🛠️ Technologies Utilisées

- **Frontend** : HTML5, CSS3 (Custom Properties), JavaScript ES6+
- **Markdown** : [marked.js](https://marked.js.org/)
- **Containerisation** : Docker, Nginx Alpine
- **Orchestration** : Kubernetes, Helm
- **Version Control** : Git

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changes (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence privée. Tous droits réservés © 2025 Adeline Guillot Gueret.

## 📞 Contact

**Adeline Guillot Gueret**
- Email : contact@adelineguillotgueret.fr
- Site : https://adelineguillotgueret.fr
- Localisation : Guadeloupe

**Développeur**
- Xavier Gueret
- Email : xgueret@example.com

## 🗺️ Roadmap

- [x] Architecture de base
- [x] Containerisation Docker/K8s
- [x] Gestion de contenu Markdown
- [ ] Backend formulaire de contact
- [ ] Tests automatisés
- [ ] CI/CD pipeline
- [ ] PWA (Progressive Web App)

---

🌱 Soutenir, former, accompagner - Pour l'inclusion et la réussite de chaque enfant
