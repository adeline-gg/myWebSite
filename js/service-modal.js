// Service Modal Manager
(function() {
    'use strict';

    // Éléments du modal
    const modal = document.getElementById('serviceModal');
    const modalOverlay = modal?.querySelector('.service-modal-overlay');
    const modalContent = modal?.querySelector('.service-modal-content');
    const modalClose = modal?.querySelector('.service-modal-close');
    const modalIcon = modal?.querySelector('.service-modal-icon');
    const modalTitle = modal?.querySelector('.service-modal-title');
    const modalBody = modal?.querySelector('.service-modal-body');

    // Données des services
    const servicesData = [];
    let triggerElement = null;

    // Fonction d'initialisation
    function init() {
        if (!modal) return;

        // Collecter les données des services depuis le DOM
        collectServicesData();

        // Attacher les événements aux cartes de service
        attachServiceCardEvents();

        // Événements de fermeture du modal
        modalClose?.addEventListener('click', closeModal);
        modalOverlay?.addEventListener('click', closeModal);

        // Fermeture avec Échap + piège de focus
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeModal();
                return;
            }

            // Focus trap
            if (e.key === 'Tab') {
                const focusable = modalContent.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        });

        // Empêcher la fermeture quand on clique sur le contenu
        modalContent?.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Fermer le modal quand on clique sur le bouton CTA
        const modalCTA = modal?.querySelector('.service-modal-cta');
        modalCTA?.addEventListener('click', closeModal);
    }

    // Collecter les données des services depuis le DOM
    function collectServicesData() {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach((card, index) => {
            const icon = card.querySelector('.service-icon')?.textContent || '';
            const title = card.querySelector('h3')?.textContent || '';
            const content = card.querySelector('.service-details')?.innerHTML || '';

            servicesData.push({
                index,
                icon,
                title,
                content
            });
        });
    }

    // Attacher les événements de clic aux cartes
    function attachServiceCardEvents() {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach((card, index) => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                openModal(index);
            });
        });
    }

    // Ouvrir le modal avec les données d'un service
    function openModal(serviceIndex) {
        const service = servicesData[serviceIndex];
        if (!service) return;

        // Sauvegarder l'élément déclencheur pour restaurer le focus
        triggerElement = document.activeElement;

        // Remplir le modal avec les données
        if (modalIcon) modalIcon.textContent = service.icon;
        if (modalTitle) modalTitle.textContent = service.title;
        if (modalBody) modalBody.innerHTML = service.content;

        // Afficher le modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');

        // Focus sur le bouton de fermeture pour l'accessibilité
        setTimeout(() => modalClose?.focus(), 100);
    }

    // Fermer le modal
    function closeModal() {
        // Ajouter la classe de fermeture pour l'animation
        modal.classList.add('closing');

        // Attendre la fin de l'animation avant de masquer
        setTimeout(() => {
            modal.classList.remove('active');
            modal.classList.remove('closing');
            document.body.classList.remove('modal-open');

            // Restaurer le focus sur l'élément déclencheur
            if (triggerElement) {
                triggerElement.focus();
                triggerElement = null;
            }
        }, 250);
    }

    // Initialiser au chargement du DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
