/**
 * Legal Modal - Handles the display of legal information in a modal
 */

/**
 * Convertit le markdown en HTML de manière basique
 */
function convertMarkdownToHtml(markdown) {
  let html = markdown;

  // Headers: the modal's own h2 already carries the document title, so the
  // Markdown h1 is dropped and the other levels are shifted down by one
  html = html.replace(/^### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^## (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^# .*$/gim, "");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // Links: only external ones open a new window, and they say so
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, (match, text, href) =>
    /^https?:\/\//.test(href)
      ? `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${text} (nouvelle fenêtre)">${text} ↗</a>`
      : `<a href="${href}">${text}</a>`,
  );

  // Horizontal rules
  html = html.replace(/^---$/gim, "<hr>");

  // Lists (simple handling)
  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Paragraphs (split by double newlines)
  const lines = html.split("\n");
  let inList = false;
  let result = [];
  let paragraph = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip if it's already a tag
    if (line.startsWith("<h") || line.startsWith("<hr") || line === "") {
      if (paragraph.length > 0) {
        result.push("<p>" + paragraph.join(" ") + "</p>");
        paragraph = [];
      }
      if (line !== "") {
        result.push(line);
      }
    } else if (line.startsWith("<li>")) {
      if (paragraph.length > 0) {
        result.push("<p>" + paragraph.join(" ") + "</p>");
        paragraph = [];
      }
      if (!inList) {
        result.push("<ul>");
        inList = true;
      }
      result.push(line);
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      paragraph.push(line);
    }
  }

  if (paragraph.length > 0) {
    result.push("<p>" + paragraph.join(" ") + "</p>");
  }
  if (inList) {
    result.push("</ul>");
  }

  return result.join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  // Create modal HTML structure
  const modalHTML = `
        <div id="legal-modal" class="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
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
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("legal-modal");
  const modalBody = document.getElementById("legal-modal-body");
  const modalContent = modal.querySelector(".legal-modal-content");
  const closeBtn = document.querySelector(".legal-modal-close");
  let triggerElement = null;

  /**
   * Open modal and load content from a markdown file
   */
  const openModal = async (mdFilePath, title = "Mentions Légales") => {
    // Sauvegarder l'élément déclencheur pour restaurer le focus
    triggerElement = document.activeElement;

    // Set title
    document.getElementById("legal-modal-title").textContent = title;

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus sur le bouton de fermeture
    setTimeout(() => closeBtn?.focus(), 100);

    // Load markdown content (aria-busy tells assistive tech to wait for it)
    modalBody.setAttribute("aria-busy", "true");
    try {
      modalBody.innerHTML =
        '<p role="status" style="text-align: center; color: var(--text-light);">Chargement…</p>';
      const response = await fetch(mdFilePath);
      if (!response.ok) throw new Error(`Failed to load ${mdFilePath}`);
      const markdown = await response.text();

      // Convert markdown to HTML (basic conversion)
      modalBody.innerHTML = convertMarkdownToHtml(markdown);
    } catch (error) {
      console.error("Erreur lors du chargement du contenu:", error);
      modalBody.innerHTML =
        '<p role="alert" style="color: #b42318; text-align: center;">Erreur : le contenu n\'a pas pu être chargé. Réessayez plus tard.</p>';
    } finally {
      modalBody.removeAttribute("aria-busy");
    }
  };

  /**
   * Close modal
   */
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";

    // Restaurer le focus sur l'élément déclencheur
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  };

  // Close button click
  closeBtn.addEventListener("click", closeModal);

  // Click outside modal to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key to close + focus trap
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    // Focus trap
    if (e.key === "Tab") {
      const focusable = modalContent.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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

  // Handle clicks on legal links (with event delegation)
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#mentions-legales"]');
    if (link) {
      e.preventDefault();
      openModal("content/mentions-legales.md", "Mentions Légales");
    }

    const privacyLink = e.target.closest(
      'a[href="#politique-confidentialite"]',
    );
    if (privacyLink) {
      e.preventDefault();
      openModal(
        "content/politique-confidentialite.md",
        "Politique de Confidentialité",
      );
    }
  });
});
