# Backend - Formulaire de Contact

Backend Node.js pour gérer l'envoi d'emails depuis le formulaire de contact.

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copier le fichier d'exemple :
```bash
cp .env.example .env
```

2. Éditer `.env` avec vos informations SMTP

### Option 1 : Gmail

1. Activer l'authentification à 2 facteurs sur votre compte Google
2. Générer un mot de passe d'application : https://myaccount.google.com/apppasswords
3. Utiliser ce mot de passe dans `SMTP_PASS`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application
```

### Option 2 : SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=votre-api-key-sendgrid
```

### Option 3 : Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@votre-domaine.mailgun.org
SMTP_PASS=votre-mot-de-passe-mailgun
```

## Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm start
```

## Tests

Tester l'endpoint avec curl :

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0612345678",
    "subject": "Test",
    "message": "Ceci est un message de test"
  }'
```

## Intégration avec le Frontend

Modifier `index.html` pour appeler le backend :

```javascript
async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const button = event.target.querySelector('.form-submit');
  button.textContent = 'Envoi en cours...';
  button.disabled = true;

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      button.textContent = '✓ Message envoyé !';
      button.style.background = 'linear-gradient(135deg, #48BB78, #38A169)';
      event.target.reset();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    button.textContent = '✗ Erreur';
    button.style.background = 'linear-gradient(135deg, #F56565, #E53E3E)';
    alert('Erreur lors de l\'envoi: ' + error.message);
  } finally {
    setTimeout(() => {
      button.textContent = 'Envoyer le message';
      button.style.background = '';
      button.disabled = false;
    }, 3000);
  }
}
```

## Déploiement

### Avec Docker

Créer `backend/Dockerfile` :

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build et run :
```bash
docker build -t adeline-backend .
docker run -p 3000:3000 --env-file .env adeline-backend
```

### Sur Kubernetes

Ajouter un deployment pour le backend dans les charts Helm.

## Sécurité

- ✅ Rate limiting (5 requêtes / 15 min)
- ✅ Validation des données
- ✅ CORS configuré
- ✅ Variables d'environnement
- ⚠️ À ajouter : CAPTCHA (reCAPTCHA, hCaptcha)

## Alternative : Services Tiers (Plus simple)

Si vous ne voulez pas gérer un backend :

### Formspree (Recommandé)
- Gratuit jusqu'à 50 soumissions/mois
- https://formspree.io/

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- vos champs -->
</form>
```

### Netlify Forms
- Gratuit si hébergé sur Netlify
- https://www.netlify.com/products/forms/

### Web3Forms
- Gratuit et open-source
- https://web3forms.com/
