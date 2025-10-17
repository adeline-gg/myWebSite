document.addEventListener('DOMContentLoaded', () => {

    const initializeApp = (content) => {
        // Check if the marked library is available
        if (typeof marked === 'undefined') {
            console.error('Erreur : La bibliothèque Markdown (marked.js) est introuvable.');
            return;
        }

        /**
         * A small helper function to get a value from the content object using a string path.
         */
        const getValueFromPath = (obj, path) => {
            return path.split('.').reduce((acc, part) => acc && acc[part], obj);
        };

        /**
         * Renders simple text content from markdown files or inline text.
         */
        const renderSimpleContent = async () => {
            for (const element of document.querySelectorAll('[data-content]')) {
                const path = element.dataset.content;
                const value = getValueFromPath(content, path);

                if (value !== undefined) {
                    if (typeof value === 'string' && value.endsWith('.md')) {
                        try {
                            const response = await fetch(value);
                            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
                            const markdown = await response.text();
                            element.innerHTML = marked.parse(markdown);
                        } catch (error) {
                            console.error(`Erreur de chargement du fichier Markdown '${value}':`, error);
                            element.innerHTML = `<p style="color: red;">Erreur de chargement.</p>`;
                        }
                    } else {
                        element.innerHTML = marked.parseInline(String(value));
                    }
                } else {
                    console.warn(`Contenu non trouvé pour : ${path}`);
                }
            }
        };

        /**
         * Renders the dynamic navigation links.
         */
        const renderNavLinks = () => {
            const container = document.getElementById('nav-links-container');
            if (!container || !content.navigation || !content.navigation.links) return;
            container.innerHTML = content.navigation.links.map(link => `<li><a href="${link.href}">${link.text}</a></li>`).join('');
        };

        /**
         * Renders the floating cards in the hero section.
         */
        const renderHeroCards = () => {
            const container = document.getElementById('hero-floating-cards-container');
            if (!container || !content.hero || !content.hero.floatingCards) return;
            container.innerHTML = content.hero.floatingCards.map((card, index) => `
                <div class="floating-card floating-card-${index + 1}">
                    <strong>${card.strong}</strong><br>
                    <span style="color: var(--text-light);">${card.text}</span>
                </div>
            `).join('');
        };

        /**
         * Renders the service cards with accordion functionality, loading text content from markdown files.
         */
        const renderServices = async () => {
            const container = document.getElementById('services-grid');
            if (!container || !content.services || !content.services.items) return;
            const markdownPromises = content.services.items.map(item =>
                (item.text && item.text.endsWith('.md'))
                    ? fetch(item.text).then(res => res.ok ? res.text() : Promise.reject(`Failed to fetch ${item.text}`))
                    : Promise.resolve(item.text)
            );
            try {
                const markdownContents = await Promise.all(markdownPromises);
                container.innerHTML = content.services.items.map((item, index) => `
                    <div class="service-card" data-service-index="${index}">
                        <div class="service-card-header">
                            <div class="service-card-title-area">
                                <div class="service-icon">${item.icon}</div>
                                <h3>${item.title}</h3>
                            </div>
                            <div class="service-toggle">▼</div>
                        </div>
                        <p class="service-teaser">${item.teaser}</p>
                        <div class="service-content">
                            <div class="service-details">
                                ${marked.parse(markdownContents[index] || '')}
                                ${item.price ? `<div class="service-price">${item.price}</div>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('');

                // Add click event listeners to toggle accordion
                const serviceCards = container.querySelectorAll('.service-card');
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
            } catch (error) {
                console.error("Erreur lors du chargement du contenu des services:", error);
                container.innerHTML = `<p style="color: red;">Erreur de chargement des services.</p>`;
            }
        };

        /**
         * Renders the pricing table.
         */
        const renderPricing = () => {
            const container = document.getElementById('pricing-table');
            if (!container || !content.pricing || !content.pricing.items) return;

            // Header row
            const headerHTML = `
                <div class="pricing-row pricing-header">
                    <div class="pricing-service">Service</div>
                    <div class="pricing-amount">Tarif</div>
                    <div class="pricing-details">Détails</div>
                </div>
            `;

            // Data rows
            const rowsHTML = content.pricing.items.map(item => `
                <div class="pricing-row ${item.highlight ? 'highlight' : ''}">
                    <div class="pricing-service">${item.service}</div>
                    <div class="pricing-amount">
                        <span class="pricing-price">${item.price}</span>
                        <span class="pricing-unit">${item.unit}</span>
                    </div>
                    <div class="pricing-details">${item.details}</div>
                </div>
            `).join('');

            container.innerHTML = headerHTML + rowsHTML;
        };

        /**
         * Renders the expertise cards.
         */
        const renderExpertise = () => {
            const container = document.getElementById('expertise-grid');
            if (!container || !content.expertise || !content.expertise.items) return;
            container.innerHTML = content.expertise.items.map(item => `
                <div class="expertise-card">
                    <div class="expertise-icon">${item.icon}</div>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                </div>
            `).join('');
        };

        /**
         * Renders the content of the "About" section from a markdown file.
         */
        const renderAbout = async () => {
            const paragraphsContainer = document.getElementById('about-paragraphs');
            if (paragraphsContainer && content.about && content.about.markdownFile) {
                try {
                    const response = await fetch(content.about.markdownFile);
                    if (!response.ok) throw new Error(`Network response was not ok`);
                    const markdown = await response.text();
                    paragraphsContainer.innerHTML = marked.parse(markdown);
                } catch (error) {
                    console.error('Erreur de chargement Markdown pour "À propos":', error);
                    paragraphsContainer.innerHTML = `<p style="color: red;">Erreur de chargement.</p>`;
                }
            }
            const qualificationsContainer = document.getElementById('qualifications-container');
            if (qualificationsContainer && content.about && content.about.qualifications) {
                qualificationsContainer.innerHTML = content.about.qualifications.map(q => `<span class="qualification-badge">${q}</span>`).join('');
            }
        };


        /**
         * Renders the contact information items.
         */
        const renderContactInfo = () => {
            const container = document.getElementById('contact-info-container');
            if (!container || !content.contact || !content.contact.info) return;
            container.innerHTML = content.contact.info.map(item => `
                <div class="contact-item">
                    <div class="contact-icon">${item.icon}</div>
                    <div>
                        <strong>${item.title}</strong><br>
                        <span style="color: var(--text-light);">${item.lines.join('<br>')}</span>
                    </div>
                </div>
            `).join('');
        };

        /**
         * Renders all the link lists in the footer.
         */
        const renderFooterLinks = () => {
            const createLinks = (links) => links.map(link => `<a href="${link.href}">${link.text}</a>`).join('');
            const servicesContainer = document.getElementById('footer-services-links');
            if (servicesContainer && content.footer && content.footer.services) servicesContainer.innerHTML = createLinks(content.footer.services.links);
            const usefulLinksContainer = document.getElementById('footer-useful-links');
            if (usefulLinksContainer && content.footer && content.footer.usefulLinks) usefulLinksContainer.innerHTML = createLinks(content.footer.usefulLinks.links);
            const socialContainer = document.getElementById('footer-social-links');
            if (socialContainer && content.footer && content.footer.social) socialContainer.innerHTML = createLinks(content.footer.social.links);
        };

        /**
         * Sets the src and alt attributes for key images.
         */
        const renderImages = () => {
            const heroImage = document.getElementById('hero-image');
            if (heroImage && content.hero && content.hero.image) {
                heroImage.src = content.hero.image.src;
                heroImage.alt = content.hero.image.alt;
            }
            const aboutImage = document.getElementById('about-image');
            if (aboutImage && content.about && content.about.image) {
                aboutImage.src = content.about.image.src;
                aboutImage.alt = content.about.image.alt;
            }
        };

        /**
         * Sets the page title and copyright information.
         */
        const renderMetadata = () => {
            if (content.site && content.site.title) document.title = content.site.title;
            const copyrightEl = document.getElementById('copyright-text');
            if (copyrightEl && content.site && content.site.copyright) {
                const currentYear = new Date().getFullYear();
                copyrightEl.innerHTML = `&copy; ${currentYear} ${content.site.copyright}`;
            }
        };

        /**
         * Main function to render all page content.
         */
        const renderAll = async () => {
            await renderSimpleContent();
            renderNavLinks();
            renderHeroCards();
            await renderServices();
            renderPricing();
            renderExpertise();
            await renderAbout();
            renderContactInfo();
            renderFooterLinks();
            renderImages();
            renderMetadata();
        };

        renderAll().catch(error => console.error("Une erreur est survenue lors du rendu de la page:", error));
    };

    // --- Application Entry Point ---
    fetch('content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(content => {
            initializeApp(content);
        })
        .catch(error => {
            console.error("Erreur critique: Impossible de charger le fichier de contenu 'content.json'.", error);
            document.body.innerHTML = `<div style="text-align: center; padding: 50px; font-family: sans-serif;">
                <h1>Erreur de chargement</h1>
                <p>Le contenu du site n'a pas pu être chargé. Veuillez réessayer plus tard.</p>
                <p><i>Détail de l'erreur : ${error.message}</i></p>
            </div>`;
        });
});
