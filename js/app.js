/**
 * Application JavaScript - Version statique SEO optimisée
 * Le contenu est désormais directement dans le HTML pour un meilleur référencement
 */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Met à jour l'année dans le footer
   */
  const updateCurrentYear = () => {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  /**
   * Pause les animations en boucle quand leur section est hors écran
   */
  const initAnimationPausing = () => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "animation-paused",
            !entry.isIntersecting,
          );
        });
      },
      { threshold: 0 },
    );

    document.querySelectorAll(".hero, .parcours").forEach((section) => {
      observer.observe(section);
    });
  };

  /**
   * Toggle navbar "scrolled" state when hero leaves viewport top
   */
  const initNavbarScrollState = () => {
    if (!("IntersectionObserver" in window)) return;

    const navbar = document.querySelector("nav");
    const hero = document.querySelector(".hero");
    if (!navbar || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        navbar.classList.toggle("scrolled", !entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );

    observer.observe(hero);
  };

  /**
   * Initialisation de l'application
   */
  const init = () => {
    updateCurrentYear();
    initAnimationPausing();
    initNavbarScrollState();
  };

  // Lancer l'initialisation
  init();
});
