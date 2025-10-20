/**
 * Legal Modal - Handles the display of legal information in a modal
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create modal HTML structure
    const modalHTML = `
        <div id="legal-modal" class="legal-modal">
            <div class="legal-modal-content">
                <div class="legal-modal-header">
                    <h2 id="legal-modal-title">Mentions Légales</h2>
                    <button class="legal-modal-close" aria-label="Fermer">&times;</button>
                </div>
                <div class="legal-modal-body" id="legal-modal-body">
                    <p style="text-align: center; color: var(--text-light);">Chargement...</p>
                </div>
            </div>
        </div>
    `;

    // Insert modal at the end of body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('legal-modal');
    const modalBody = document.getElementById('legal-modal-body');
    const closeBtn = document.querySelector('.legal-modal-close');

    /**
     * Open modal and load content from a markdown file
     */
    const openModal = async (mdFilePath, title = 'Mentions Légales') => {
        // Set title
        document.getElementById('legal-modal-title').textContent = title;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Load markdown content
        try {
            modalBody.innerHTML = '<p style="text-align: center; color: var(--text-light);">Chargement...</p>';
            const response = await fetch(mdFilePath);
            if (!response.ok) throw new Error(`Failed to load ${mdFilePath}`);
            const markdown = await response.text();

            // Check if marked library is available
            if (typeof marked === 'undefined') {
                modalBody.innerHTML = `<div style="white-space: pre-wrap;">${markdown}</div>`;
            } else {
                modalBody.innerHTML = marked.parse(markdown);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du contenu:', error);
            modalBody.innerHTML = '<p style="color: red; text-align: center;">Erreur lors du chargement du contenu.</p>';
        }
    };

    /**
     * Close modal
     */
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close button click
    closeBtn.addEventListener('click', closeModal);

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle clicks on legal links (with event delegation)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href="#mentions-legales"]');
        if (link) {
            e.preventDefault();
            openModal('content/mentions-legales.md', 'Mentions Légales');
        }

        const privacyLink = e.target.closest('a[href="#politique-confidentialite"]');
        if (privacyLink) {
            e.preventDefault();
            openModal('content/politique-confidentialite.md', 'Politique de Confidentialité');
        }
    });
});
