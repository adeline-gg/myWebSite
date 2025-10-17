/**
 * Gestion du formulaire de contact
 *
 * Peut être configuré pour utiliser :
 * - Un backend personnalisé (Node.js)
 * - Formspree
 * - Netlify Forms
 * - Ou simulation locale (développement)
 */

const ContactForm = {
  // Configuration
  config: {
    // Options: 'backend' | 'formspree' | 'netlify' | 'simulation'
    mode: 'simulation',

    // URL du backend (si mode = 'backend')
    backendUrl: 'http://localhost:3000/api/contact',

    // ID Formspree (si mode = 'formspree')
    formspreeId: 'YOUR_FORMSPREE_ID'
  },

  /**
   * Initialise le formulaire de contact
   */
  init() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // Remplacer l'attribut onsubmit inline
    form.removeAttribute('onsubmit');
    form.addEventListener('submit', (e) => this.handleSubmit(e));

    console.log(`Formulaire de contact initialisé (mode: ${this.config.mode})`);
  },

  /**
   * Gère la soumission du formulaire
   */
  async handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const button = form.querySelector('.form-submit');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Animation de début
    this.setButtonState(button, 'loading');

    try {
      let result;

      switch (this.config.mode) {
        case 'backend':
          result = await this.sendViaBackend(data);
          break;
        case 'formspree':
          result = await this.sendViaFormspree(data);
          break;
        case 'netlify':
          result = await this.sendViaNetlify(form);
          break;
        case 'simulation':
        default:
          result = await this.simulateSend(data);
          break;
      }

      if (result.success) {
        this.setButtonState(button, 'success');
        form.reset();
        this.showNotification('Message envoyé avec succès !', 'success');
      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

    } catch (error) {
      console.error('Erreur:', error);
      this.setButtonState(button, 'error');
      this.showNotification(error.message || 'Erreur lors de l\'envoi', 'error');
    } finally {
      // Réinitialiser le bouton après 3 secondes
      setTimeout(() => {
        this.setButtonState(button, 'initial');
      }, 3000);
    }
  },

  /**
   * Envoie via backend personnalisé
   */
  async sendViaBackend(data) {
    const response = await fetch(this.config.backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur serveur');
    }

    return await response.json();
  },

  /**
   * Envoie via Formspree
   */
  async sendViaFormspree(data) {
    const response = await fetch(`https://formspree.io/f/${this.config.formspreeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi via Formspree');
    }

    return { success: true };
  },

  /**
   * Envoie via Netlify Forms
   */
  async sendViaNetlify(form) {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi via Netlify');
    }

    return { success: true };
  },

  /**
   * Simulation d'envoi (pour développement)
   */
  async simulateSend(data) {
    console.log('📧 Simulation d\'envoi:', data);

    // Validation basique
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error('Tous les champs obligatoires doivent être remplis');
    }

    // Validation email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error('Format d\'email invalide');
    }

    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500));

    return { success: true };
  },

  /**
   * Change l'état visuel du bouton
   */
  setButtonState(button, state) {
    const states = {
      initial: {
        text: 'Envoyer le message',
        style: '',
        disabled: false
      },
      loading: {
        text: 'Envoi en cours...',
        style: 'opacity: 0.7',
        disabled: true
      },
      success: {
        text: '✓ Message envoyé !',
        style: 'background: linear-gradient(135deg, #48BB78, #38A169)',
        disabled: true
      },
      error: {
        text: '✗ Erreur d\'envoi',
        style: 'background: linear-gradient(135deg, #F56565, #E53E3E)',
        disabled: true
      }
    };

    const config = states[state];
    button.textContent = config.text;
    button.style.cssText = config.style;
    button.disabled = config.disabled;
  },

  /**
   * Affiche une notification toast
   */
  showNotification(message, type = 'info') {
    // Créer l'élément notification s'il n'existe pas
    let notification = document.getElementById('contact-notification');

    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'contact-notification';
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: inherit;
        font-weight: 500;
        transition: all 0.3s ease;
        transform: translateY(100px);
        opacity: 0;
      `;
      document.body.appendChild(notification);
    }

    // Couleurs selon le type
    const colors = {
      success: 'background: linear-gradient(135deg, #48BB78, #38A169); color: white;',
      error: 'background: linear-gradient(135deg, #F56565, #E53E3E); color: white;',
      info: 'background: linear-gradient(135deg, #4299E1, #3182CE); color: white;'
    };

    notification.textContent = message;
    notification.style.cssText += colors[type];

    // Animation d'apparition
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 10);

    // Masquer après 5 secondes
    setTimeout(() => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
    }, 5000);
  }
};

// Initialisation au chargement de la page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ContactForm.init());
} else {
  ContactForm.init();
}

// Exporter pour utilisation globale
window.ContactForm = ContactForm;
