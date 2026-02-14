/**
 * Application JavaScript - Version statique SEO optimisée
 * Le contenu est désormais directement dans le HTML pour un meilleur référencement
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Gestion de l'accordéon pour les cartes de service
     */
    const initServiceAccordions = () => {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Prevent event bubbling
                e.stopPropagation();

                // Toggle active class on this specific card only
                const isActive = this.classList.contains('active');

                if (isActive) {
                    this.classList.remove('active');
                } else {
                    this.classList.add('active');
                }

                console.log(`Service card ${this.dataset.serviceIndex} toggled:`, !isActive);
            });
        });
    };

    /**
     * Met à jour l'année dans le footer
     */
    const updateCurrentYear = () => {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    /**
     * Pause les animations en boucle quand leur section est hors écran
     */
    const initAnimationPausing = () => {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('animation-paused', !entry.isIntersecting);
            });
        }, { threshold: 0 });

        document.querySelectorAll('.hero, .parcours').forEach(section => {
            observer.observe(section);
        });
    };

    /**
     * Initialisation de l'application
     */
    const init = () => {
        initServiceAccordions();
        updateCurrentYear();
        initAnimationPausing();
        console.log('✅ Application initialisée (mode SEO statique)');
    };

    // Lancer l'initialisation
    init();
});
