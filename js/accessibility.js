/**
 * Accessibility Widget
 * Vanilla JS — no dependencies
 *
 * Features: 12 accessibility toggles (text, visual, orientation)
 * Persistence: localStorage
 * UI: floating button + slide-in panel
 */

(function () {
    'use strict';

    /* -------------------------------------------------------
       Feature Definitions
       ------------------------------------------------------- */

    const FEATURES = {
        // --- Text ---
        fontScale: {
            key: 'a11y-font-scale',
            type: 'step',
            steps: [null, '125', '150', '175'],
            classPrefix: 'a11y-font-scale-',
            label: 'Taille de texte',
            icon: 'fontSize',
            category: 'text',
        },
        lineHeight: {
            key: 'a11y-line-height',
            type: 'step',
            steps: [null, '130', '160'],
            classPrefix: 'a11y-line-height-',
            label: 'Hauteur de ligne',
            icon: 'lineHeight',
            category: 'text',
        },
        alignLeft: {
            key: 'a11y-align-left',
            type: 'toggle',
            cssClass: 'a11y-align-left',
            label: 'Alignement du texte',
            icon: 'alignLeft',
            category: 'text',
        },
        readableFont: {
            key: 'a11y-readable-font',
            type: 'toggle',
            cssClass: 'a11y-readable-font',
            label: 'Police lisible',
            icon: 'readableFont',
            category: 'text',
        },

        // --- Visual ---
        highContrast: {
            key: 'a11y-high-contrast',
            type: 'toggle',
            cssClass: 'a11y-high-contrast',
            label: 'Contraste',
            icon: 'contrast',
            category: 'visual',
            excludes: 'grayscale',
        },
        grayscale: {
            key: 'a11y-grayscale',
            type: 'toggle',
            cssClass: 'a11y-grayscale',
            label: 'Niveaux de gris',
            icon: 'grayscale',
            category: 'visual',
            excludes: 'highContrast',
        },
        hideImages: {
            key: 'a11y-hide-images',
            type: 'toggle',
            cssClass: 'a11y-hide-images',
            label: 'Masquer les images',
            icon: 'hideImages',
            category: 'visual',
        },
        pauseAnimations: {
            key: 'a11y-pause-animations',
            type: 'toggle',
            cssClass: 'a11y-pause-animations',
            label: 'Pause animations',
            icon: 'pauseAnimations',
            category: 'visual',
        },

        // --- Orientation ---
        highlightLinks: {
            key: 'a11y-highlight-links',
            type: 'toggle',
            cssClass: 'a11y-highlight-links',
            label: 'Mettre en \u00e9vidence les liens',
            icon: 'highlightLinks',
            category: 'orientation',
        },
        readingMask: {
            key: 'a11y-reading-mask',
            type: 'toggle',
            cssClass: 'a11y-reading-mask',
            label: 'Masque de lecture',
            icon: 'readingMask',
            category: 'orientation',
        },
        focusOutline: {
            key: 'a11y-focus-outline',
            type: 'toggle',
            cssClass: 'a11y-focus-outline',
            label: 'Contour du focus',
            icon: 'focusOutline',
            category: 'orientation',
        },
        showStructure: {
            key: 'a11y-show-structure',
            type: 'toggle',
            cssClass: 'a11y-show-structure',
            label: 'Structure de page',
            icon: 'showStructure',
            category: 'orientation',
        },
    };

    /* -------------------------------------------------------
       SVG Icons
       ------------------------------------------------------- */

    const ICONS = {
        accessibility: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm3.5 5h-7C7.67 7 7 7.67 7 8.5S7.67 10 8.5 10H10v4.5l-2.5 5a1 1 0 0 0 1.79.89L12 15l2.71 5.39a1 1 0 0 0 1.79-.89l-2.5-5V10h1.5c.83 0 1.5-.67 1.5-1.5S16.33 7 15.5 7Z"/></svg>',
        fontSize: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 4v3h5v12h3V7h5V4H2Zm19 5h-9v3h3v7h3v-7h3V9Z"/></svg>',
        lineHeight: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 7h11v2H9V7Zm0 4h11v2H9v-2Zm0 4h11v2H9v-2ZM4 7l3-3v2h2v2H7v2L4 7Zm3 10v2H5v2H7v2l3-3-3-3Z"/></svg>',
        alignLeft: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v2H3V3Zm0 4h12v2H3V7Zm0 4h18v2H3v-2Zm0 4h12v2H3v-2Zm0 4h18v2H3v-2Z"/></svg>',
        readableFont: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.93 13.5h4.14L12 7.98l-2.07 5.52ZM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Zm-4.05 16.5-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09Z"/></svg>',
        contrast: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8Z"/></svg>',
        grayscale: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3Z"/></svg>',
        hideImages: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2Zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-4.01Z"/></svg>',
        pauseAnimations: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 14H9V8h2v8Zm4 0h-2V8h2v8Z"/></svg>',
        highlightLinks: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1ZM8 13h8v-2H8v2Zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5Z"/></svg>',
        readingMask: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v2H3V3Zm0 16h18v2H3v-2Zm0-4h18v2H3v-2Zm0-4h18v2H3v-2Zm0-4h18v2H3V7Z"/></svg>',
        focusOutline: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h6v2H5v4H3V3Zm0 12h2v4h4v2H3v-6Zm18 0v6h-6v-2h4v-4h2Zm0-12v6h-2V5h-4V3h6Z"/></svg>',
        showStructure: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z"/></svg>',
        reset: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"/></svg>',
        close: '<svg class="a11y-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/></svg>',
    };

    /* -------------------------------------------------------
       State
       ------------------------------------------------------- */

    const state = {};
    let panelOpen = false;
    let maskTopEl = null;
    let maskBottomEl = null;

    /* -------------------------------------------------------
       DOM helpers
       ------------------------------------------------------- */

    const html = document.documentElement;

    function createEl(tag, attrs, children) {
        const el = document.createElement(tag);
        if (attrs) {
            Object.entries(attrs).forEach(([k, v]) => {
                if (k === 'className') el.className = v;
                else if (k === 'innerHTML') el.innerHTML = v;
                else if (k.startsWith('data')) el.setAttribute(k.replace(/([A-Z])/g, '-$1').toLowerCase(), v);
                else el.setAttribute(k, v);
            });
        }
        if (children) {
            children.forEach(c => {
                if (typeof c === 'string') el.appendChild(document.createTextNode(c));
                else if (c) el.appendChild(c);
            });
        }
        return el;
    }

    /* -------------------------------------------------------
       localStorage helpers
       ------------------------------------------------------- */

    function loadState() {
        Object.entries(FEATURES).forEach(([id, f]) => {
            const val = localStorage.getItem(f.key);
            if (f.type === 'step') {
                state[id] = val ? parseInt(val, 10) : 0; // index into steps array
            } else {
                state[id] = val === '1';
            }
        });
    }

    function saveFeature(id) {
        const f = FEATURES[id];
        if (f.type === 'step') {
            if (state[id] === 0) localStorage.removeItem(f.key);
            else localStorage.setItem(f.key, f.steps[state[id]]);
        } else {
            if (state[id]) localStorage.setItem(f.key, '1');
            else localStorage.removeItem(f.key);
        }
    }

    /* -------------------------------------------------------
       Apply classes to <html>
       ------------------------------------------------------- */

    function applyFeature(id) {
        const f = FEATURES[id];
        if (f.type === 'step') {
            // Remove all step classes
            f.steps.forEach(s => {
                if (s) html.classList.remove(f.classPrefix + s);
            });
            // Add current step class
            const current = f.steps[state[id]];
            if (current) html.classList.add(f.classPrefix + current);
        } else {
            if (state[id]) html.classList.add(f.cssClass);
            else html.classList.remove(f.cssClass);
        }

        // Handle reading mask DOM
        if (id === 'readingMask') {
            if (state[id]) createReadingMask();
            else removeReadingMask();
        }
    }

    function applyAll() {
        Object.keys(FEATURES).forEach(applyFeature);
    }

    /* -------------------------------------------------------
       Reading Mask
       ------------------------------------------------------- */

    const MASK_STRIP_HEIGHT = 120;

    function createReadingMask() {
        if (maskTopEl) return;
        maskTopEl = createEl('div', { className: 'a11y-reading-mask-overlay a11y-reading-mask-top' });
        maskBottomEl = createEl('div', { className: 'a11y-reading-mask-overlay a11y-reading-mask-bottom' });
        document.body.appendChild(maskTopEl);
        document.body.appendChild(maskBottomEl);
        updateMaskPosition(window.innerHeight / 2);
        document.addEventListener('mousemove', onMaskMouseMove);
        document.addEventListener('touchmove', onMaskTouchMove, { passive: true });
    }

    function removeReadingMask() {
        if (maskTopEl) { maskTopEl.remove(); maskTopEl = null; }
        if (maskBottomEl) { maskBottomEl.remove(); maskBottomEl = null; }
        document.removeEventListener('mousemove', onMaskMouseMove);
        document.removeEventListener('touchmove', onMaskTouchMove);
    }

    function updateMaskPosition(y) {
        const halfStrip = MASK_STRIP_HEIGHT / 2;
        const topH = Math.max(0, y - halfStrip);
        const bottomTop = Math.min(window.innerHeight, y + halfStrip);
        if (maskTopEl) maskTopEl.style.height = topH + 'px';
        if (maskBottomEl) {
            maskBottomEl.style.top = bottomTop + 'px';
            maskBottomEl.style.height = (window.innerHeight - bottomTop) + 'px';
        }
    }

    function onMaskMouseMove(e) { updateMaskPosition(e.clientY); }
    function onMaskTouchMove(e) {
        if (e.touches.length > 0) updateMaskPosition(e.touches[0].clientY);
    }

    /* -------------------------------------------------------
       Toggle logic
       ------------------------------------------------------- */

    function toggleFeature(id) {
        const f = FEATURES[id];

        if (f.type === 'step') {
            state[id] = (state[id] + 1) % f.steps.length;
        } else {
            state[id] = !state[id];
            // Handle mutual exclusion
            if (state[id] && f.excludes) {
                state[f.excludes] = false;
                applyFeature(f.excludes);
                saveFeature(f.excludes);
                updateButtonUI(f.excludes);
            }
        }

        applyFeature(id);
        saveFeature(id);
        updateButtonUI(id);
    }

    function resetAll() {
        Object.keys(FEATURES).forEach(id => {
            const f = FEATURES[id];
            if (f.type === 'step') state[id] = 0;
            else state[id] = false;
            applyFeature(id);
            saveFeature(id);
            updateButtonUI(id);
        });
    }

    /* -------------------------------------------------------
       UI rendering
       ------------------------------------------------------- */

    let widgetEl = null;
    let panelEl = null;
    let overlayEl = null;
    let toggleBtnEl = null;
    const btnRefs = {};

    function buildWidget() {
        widgetEl = createEl('div', { className: 'a11y-widget' });

        // Floating button
        toggleBtnEl = createEl('button', {
            className: 'a11y-toggle-btn',
            'aria-label': 'Ouvrir les param\u00e8tres d\'accessibilit\u00e9',
            'aria-expanded': 'false',
            innerHTML: ICONS.accessibility,
        });
        toggleBtnEl.addEventListener('click', openPanel);

        // Overlay
        overlayEl = createEl('div', { className: 'a11y-overlay' });
        overlayEl.addEventListener('click', closePanel);

        // Panel
        panelEl = createEl('div', {
            className: 'a11y-panel',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': 'Param\u00e8tres d\'accessibilit\u00e9',
        });

        // Panel header
        const resetBtn = createEl('button', {
            className: 'a11y-header-btn',
            'aria-label': 'R\u00e9initialiser',
            innerHTML: ICONS.reset,
        });
        resetBtn.addEventListener('click', resetAll);

        const closeBtn = createEl('button', {
            className: 'a11y-header-btn',
            'aria-label': 'Fermer',
            innerHTML: ICONS.close,
        });
        closeBtn.addEventListener('click', closePanel);

        const headerActions = createEl('div', { className: 'a11y-header-actions' }, [resetBtn, closeBtn]);
        const headerTitle = createEl('h2', { innerHTML: ICONS.accessibility + ' Accessibilit\u00e9' });
        const header = createEl('div', { className: 'a11y-panel-header' }, [headerTitle, headerActions]);

        // Panel body
        const body = createEl('div', { className: 'a11y-panel-body' });

        const categories = [
            { id: 'text', label: 'Texte' },
            { id: 'visual', label: 'Visuel' },
            { id: 'orientation', label: 'Orientation' },
        ];

        categories.forEach(cat => {
            const section = createEl('div', { className: 'a11y-section' });
            section.appendChild(createEl('div', { className: 'a11y-section-title' }, [cat.label]));
            const grid = createEl('div', { className: 'a11y-features' });

            Object.entries(FEATURES).forEach(([id, f]) => {
                if (f.category !== cat.id) return;
                const btn = buildFeatureButton(id, f);
                grid.appendChild(btn);
            });

            section.appendChild(grid);
            body.appendChild(section);
        });

        panelEl.appendChild(header);
        panelEl.appendChild(body);

        widgetEl.appendChild(toggleBtnEl);
        widgetEl.appendChild(overlayEl);
        widgetEl.appendChild(panelEl);

        document.body.appendChild(widgetEl);
    }

    function buildFeatureButton(id, f) {
        const isActive = f.type === 'step' ? state[id] > 0 : state[id];

        const btn = createEl('button', {
            className: 'a11y-feature-btn' + (isActive ? ' active' : ''),
            'aria-pressed': String(isActive),
            innerHTML: ICONS[f.icon],
        });

        const label = createEl('span', { className: 'a11y-feature-label' }, [f.label]);
        btn.appendChild(label);

        // Step dots for multi-step features
        if (f.type === 'step') {
            const dotsContainer = createEl('div', { className: 'a11y-step-dots' });
            f.steps.forEach((_, i) => {
                const dot = createEl('span', {
                    className: 'a11y-step-dot' + (i <= state[id] && i > 0 ? ' active' : (i === 0 && state[id] === 0 ? '' : '')),
                });
                dotsContainer.appendChild(dot);
            });
            updateStepDots(dotsContainer, f, state[id]);
            btn.appendChild(dotsContainer);
        }

        btn.addEventListener('click', () => toggleFeature(id));
        btnRefs[id] = btn;
        return btn;
    }

    function updateStepDots(container, f, stepIndex) {
        const dots = container.querySelectorAll('.a11y-step-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i > 0 && i <= stepIndex);
        });
    }

    function updateButtonUI(id) {
        const btn = btnRefs[id];
        if (!btn) return;
        const f = FEATURES[id];
        const isActive = f.type === 'step' ? state[id] > 0 : state[id];

        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));

        if (f.type === 'step') {
            const dotsContainer = btn.querySelector('.a11y-step-dots');
            if (dotsContainer) updateStepDots(dotsContainer, f, state[id]);
        }
    }

    /* -------------------------------------------------------
       Panel open / close
       ------------------------------------------------------- */

    let previousFocus = null;

    function openPanel() {
        if (panelOpen) return;
        panelOpen = true;
        previousFocus = document.activeElement;

        overlayEl.classList.add('active');
        panelEl.classList.add('active');
        toggleBtnEl.setAttribute('aria-expanded', 'true');

        // Focus first interactive element
        const first = panelEl.querySelector('button');
        if (first) first.focus();

        document.addEventListener('keydown', onPanelKeydown);
    }

    function closePanel() {
        if (!panelOpen) return;
        panelOpen = false;

        overlayEl.classList.remove('active');
        panelEl.classList.remove('active');
        toggleBtnEl.setAttribute('aria-expanded', 'false');

        document.removeEventListener('keydown', onPanelKeydown);

        if (previousFocus) previousFocus.focus();
    }

    function onPanelKeydown(e) {
        if (e.key === 'Escape') {
            closePanel();
            return;
        }

        // Focus trap
        if (e.key === 'Tab') {
            const focusable = panelEl.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    /* -------------------------------------------------------
       Init
       ------------------------------------------------------- */

    function init() {
        loadState();
        applyAll();
        buildWidget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
