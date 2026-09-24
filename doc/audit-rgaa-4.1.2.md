# ♿ Audit RGAA 4.1.2 — adelineguillotgueret.fr

> **Objectif** : évaluer le site vitrine au regard du RGAA 4.1.2 et prioriser les corrections.
> **Périmètre** : `index.html` (page unique), modale « services », modale « mentions légales / confidentialité », widget d'accessibilité.
> **Méthode** : revue de code (HTML, CSS, JS) + tests automatisés (axe-core 4.10 dans Chromium) + tests ciblés (clavier, reflow 320 px, espacement du texte).
> **Date** : 2026-09-24 — branche `docs/audit-rgaa-4.1.2`

## Table des matières

1. [Mental Model](#-mental-model)
2. [Synthèse](#-synthèse)
3. [Priorité 1 — Bloquant](#-priorité-1--bloquant)
4. [Priorité 2 — Majeur](#-priorité-2--majeur)
5. [Priorité 3 — Mineur / bonnes pratiques](#-priorité-3--mineur--bonnes-pratiques)
6. [Points conformes](#-points-conformes)
7. [Limites de l'audit et tests manuels restants](#-limites-de-laudit-et-tests-manuels-restants)
8. [Plan d'action](#-plan-daction)

------

## 🧠 Mental Model

```
                 Impact utilisateur
                        ▲
   P1 BLOQUANT          │  focus invisible, panneau fantôme au clavier,
   (bloque une tâche)   │  pas de lien d'évitement, contrastes < 3:1,
                        │  contenu tronqué à 320 px, formulaire
                        │
   P2 MAJEUR            │  ARIA faux, tableau en <div>, titres,
   (gêne forte)         │  animations JS hors prefers-reduced-motion
                        │
   P3 MINEUR            │  nouvelles fenêtres, emoji, déclaration
   (confort / légal)    │  d'accessibilité
                        └──────────────────────────────────► Effort
                           CSS seul      HTML        JS
```

> **Analogie** : le site a déjà les *équipements* (widget, alt, labels, modales avec piège de focus) mais il manque des *fondations* (points de repère, focus visible, contrastes). Les P1 sont presque toutes des corrections CSS/HTML de quelques lignes.

> 💡 **Contexte** : le public visé inclut des enfants et des familles concernés par la **déficience visuelle** et les TND. Le focus, les contrastes et le zoom (P1) sont donc au cœur du sujet, pas des détails.

------

## 📊 Synthèse

| Thématique RGAA | État | Critères non conformes relevés |
|---|---|---|
| 1. Images | ✅ Conforme | — (SVG décoratifs en `aria-hidden`, `alt` renseignés) |
| 3. Couleurs | ❌ | 3.2 (contrastes du texte), 3.3 (bordure des champs) |
| 5. Tableaux | ❌ | 5.x — grille tarifaire codée en `<div>` |
| 6. Liens | ⚠️ | 6.1 — globalement conforme, voir P3 |
| 7. Scripts | ❌ | 7.1 (`aria-expanded` incorrect), 7.3 (carte cliquable) |
| 8. Éléments obligatoires | ✅ Conforme | `lang="fr"`, `<title>` pertinent, doctype |
| 9. Structuration | ❌ | 9.1 (hiérarchie des titres), 9.3 (listes) |
| 10. Présentation | ❌ | 10.6, 10.7, 10.8, 10.11 |
| 11. Formulaires | ❌ | 11.10, 11.13 |
| 12. Navigation | ❌ | 12.6, 12.7, 12.8 |
| 13. Consultation | ⚠️ | 13.8 (animations JS non désactivables par l'OS) |

**Sortie axe-core (état stabilisé)** : 12 contrastes insuffisants, 1 lien indistinguable, 1 saut de titre, 66 contenus hors point de repère.

> ⚠️ **Warning** : un taux de conformité RGAA officiel exige un audit complet des 106 critères sur un échantillon, avec des tests aux lecteurs d'écran. Ce document est un **pré-audit technique** : il identifie les non-conformités certaines, mais ne constitue pas une déclaration de conformité.

------

## 🔴 Priorité 1 — Bloquant

### 1.1 🎛️ Le panneau d'accessibilité fermé reste atteignable au clavier — RGAA 10.8 / 12.8 / 10.7

- **Constat** : fermé, le panneau est seulement décalé hors écran (`transform: translateX(100%)`) et jamais masqué. **Ses 14 boutons restent dans l'ordre de tabulation** : après le footer, l'utilisateur au clavier tabule 14 fois sur des boutons **invisibles**, que les lecteurs d'écran annoncent aussi.
- **Où** : `css/accessibility.css:89` (`.a11y-panel`), `js/accessibility.js` (`openPanel` / `closePanel`).
- **Correction** : ajouter `visibility: hidden` sur `.a11y-panel` et `visibility: visible` sur `.a11y-panel.active` (à inclure dans la transition, comme `.a11y-overlay`), ou basculer l'attribut `inert` / `hidden` dans le JS.
- **Ironie à noter** : c'est le widget d'accessibilité lui-même qui dégrade la navigation au clavier.

### 1.2 🎯 Focus clavier peu ou pas visible — RGAA 10.7

- **Constat** : le style de focus par défaut est `outline: none` + `box-shadow: 0 0 0 3px rgba(53,124,122,.3)`. Un anneau teal à 30 % d'opacité donne un contraste d'environ **1,4:1** sur fond blanc, et il est **quasi invisible sur le footer teal foncé** (`#2a6562`). Mesuré en navigateur :
  - liens de navigation, `summary` du glossaire (16 éléments), liens du footer → anneau à 30 % seulement ;
  - boutons (`.btn-primary`, `.service-toggle`) → contour plein de 3 px ajouté par le JS `.keyboard-nav` → OK.
- **Aggravant** : en mode contraste élevé de Windows (`forced-colors`), `box-shadow` disparaît complètement et `outline: none` laisse **aucun** indicateur.
- **Où** : `css/styles.css:30` (`--focus-ring`) et une vingtaine de règles `:focus-visible { outline: none; … }` ; bricolage JS `index.html:2061-2080`.
- **Correction** : une seule règle globale, sans JS :

```css
/* Visible focus indicator, >= 3:1 on light and dark backgrounds */
:focus-visible {
  outline: 3px solid var(--primary-dark);
  outline-offset: 2px;
}
footer :focus-visible {
  outline-color: #ffffff;
}
```

  Puis supprimer les `outline: none` des règles `:focus-visible` et le bloc `keyboard-nav` de `index.html`.

### 1.3 🧭 Ni points de repère ni lien d'évitement — RGAA 12.6 / 12.7

- **Constat** : pas de `<header>` ni de `<main>` (axe : 66 contenus hors point de repère). Pas de lien « Aller au contenu » : il faut traverser 11 éléments d'en-tête (logo, 9 liens, bouton « Me contacter ») avant d'atteindre le contenu.
- **Où** : `index.html:120-153` (body et nav), sections `index.html:156-1760`.
- **Correction** :

```html
<body>
  <a href="#contenu" class="skip-link">Aller au contenu</a>
  <header>
    <nav aria-label="Navigation principale">…</nav>
  </header>
  <main id="contenu" tabindex="-1">
    <!-- sections #accueil … #contact -->
  </main>
  <footer>…</footer>
```

  Le `.skip-link` est visuellement masqué, et visible au focus. Garder la modale service **hors** du `<main>` (ou juste avant `</main>`, les deux sont valides).

### 1.4 🎨 Contrastes insuffisants — RGAA 3.2 / 10.6

| Élément | Couleurs | Ratio | Requis | Où |
|---|---|---|---|---|
| Ruban « Offre Signature » | `#fff` sur `#ffc107` | **1,63:1** | 4,5:1 | `css/styles.css:1189` |
| Lien « xgueret » (footer) | `#64b5f6` sur `#2a6562` | **3,02:1** | 4,5:1 | `css/styles.css:1834` |
| Même lien vs texte voisin | sans soulignement | 1,63:1 | 3:1 ou soulignement | RGAA 10.6 |
| Badge « Accompagnement régulier… » | `#357c7a` sur `#e7e8d9` | 3,92:1 | 4,5:1 | `css/styles.css:1031` |
| Badge « Gratuit » (déplacements) | `#2a6562` sur `#9fd3c0` | 4,0:1 | 4,5:1 | `css/styles.css:910` |
| Badges qualifications (×8) et parcours (×3) | `#357c7a` sur `#ebf2f2` | 4,29:1 | 4,5:1 | `css/styles.css:1396`, `:1031` |
| Lien « Voir les 4 parcours » | `#357c7a` sur `#f0f1ec` | 4,28:1 | 4,5:1 | `index.html:1102` (style inline) |

- **Correction** : utiliser `--primary-dark` (`#2a6562`) pour le texte teal sur fond clair (≈ 6:1) ; ruban → texte `--text-dark` sur `#ffc107`, ou fond ambre foncé ; lien du footer → blanc souligné.

### 1.5 📱 Contenu tronqué à 320 px — RGAA 10.11

- **Constat** : à 320 px de large, les cartes services font 300 px dans un conteneur de ~273 px utiles et débordent de **27 px**. `body { overflow-x: hidden }` **masque** ce débordement au lieu de le résoudre : le texte est coupé à droite. Même problème pour `.tools-grid` et `.testimonials-grid`.
- **Où** : `css/styles.css:388`, `:1557`, `:1889`.
- **Correction** : `minmax(min(300px, 100%), 1fr)` (et l'équivalent pour 350 px et 400 px).

### 1.6 📝 Formulaire de contact — RGAA 11.10 / 11.13 / 3.3

| Problème | Critère | Correction |
|---|---|---|
| L'astérisque `*` n'est expliqué nulle part | 11.10 | Ajouter en tête du formulaire : « Les champs marqués d'un * sont obligatoires. » |
| Pas d'`autocomplete` sur les champs d'identité | 11.13 | `autocomplete="name"`, `"email"`, `"tel"` sur `#name`, `#email`, `#phone` |
| Bordure des champs transparente : champ blanc sur `#faf7f2` ≈ 1,04:1 | 3.3 | `border: 2px solid` avec une couleur à ≥ 3:1 (ex. `#8a9aa9`) |
| Format attendu de l'email et du téléphone non indiqué | 11.10 | Aide courte liée par `aria-describedby` (ex. « ex. : 0690 12 34 56 ») |

- **Où** : `index.html:1663-1758`, `css/styles.css:1668-1683`.

------

## 🟠 Priorité 2 — Majeur

### 2.1 🔘 Boutons « Voir plus » des services — RGAA 7.1 / 6.1

- **Constat** :
  - `aria-expanded="false"` n'est jamais mis à jour, et le bouton **n'étend rien** : il ouvre une modale. L'état annoncé est donc faux ;
  - 4 boutons ont le même intitulé « Voir plus » (peu clair quand on les liste hors contexte) ;
  - toute la carte est cliquable (`cursor: pointer`), et deux gestionnaires de clic coexistent : `js/app.js:10-32` bascule une classe `.active` inutile (avec un `console.log`), et `js/service-modal.js` ouvre la modale.
- **Correction** : remplacer par `aria-haspopup="dialog"`, compléter l'intitulé (`Voir plus<span class="visually-hidden"> : Guidance parentale</span>`), et supprimer `initServiceAccordions` dans `app.js`.

### 2.2 📋 Grille tarifaire codée en `<div>` — RGAA 5.x (tableaux de données)

- **Constat** : `index.html:1051-1138` présente un tableau (en-têtes Service / Tarif / Détails) avec des `<div>`. Les lecteurs d'écran ne peuvent ni annoncer les en-têtes ni naviguer par cellule.
- **Correction** : `<table>` avec `<caption>` (« Grille tarifaire », masquable visuellement), `<th scope="col">` et `<th scope="row">` pour le nom du service. La présentation mobile peut être gérée en CSS sans casser la sémantique.

### 2.3 🏷️ Hiérarchie des titres — RGAA 9.1

| Problème | Où |
|---|---|
| `h4` « Frais de déplacement » directement après un `h2` (Tarifs) | `index.html:1140` → passer en `h3` |
| Titres du footer (`h3` « À propos », « Services »…) rattachés au `h2` « Prenons Contact » | `index.html:1766-1805` → `h2` visuellement réduits, ou `<p>` stylés |
| Modale service : `h2` puis `h4` (saut de niveau) | `index.html:578` et suivants → `h3` dans les détails |
| Modale légale : `h2` (titre de la modale) puis le `h1` issu du Markdown | `js/legal-modal.js:13-15` → décaler les niveaux du Markdown (`#`→`h3`) ou retirer le `#` des fichiers `.md` |
| `h3` « Parcours Équilibre » contenant `<br>` + « Année scolaire » | `index.html:992` → sortir le sous-titre dans un `<p>` |

### 2.4 📃 Listes codées en paragraphes — RGAA 9.3

- **Constat** : les listes « Ce que je propose : » sont des `<p>✓ …</p>` successifs (`index.html:580-592`, `628-647`, `680-708`, `746-765`). Les badges de qualification (`index.html:499-510`) forment aussi une liste.
- **Correction** : `<ul class="check-list">` avec le ✓ en `::before`. Bonus : les lecteurs d'écran ne liront plus « coche » à chaque ligne.

### 2.5 🎞️ Animations JS qui ignorent `prefers-reduced-motion` — RGAA 13.8

- **Constat** : la règle CSS `prefers-reduced-motion` (`css/styles.css:81`) ne neutralise pas ce que le JS pilote directement :
  - **parallaxe** sur le hero à chaque scroll (`index.html:2031-2036`) ;
  - **apparition en fondu** de toutes les sections (`opacity: 0` + `translateY`, `index.html:2015-2022`) ;
  - `scrollIntoView({ behavior: "smooth" })` forcé (`index.html:1896`).
- **Risque en plus** : tant que l'IntersectionObserver n'a pas déclenché, les sections sont à `opacity: 0`. Pendant la transition, axe mesurait **109 contrastes en échec**, et une section peut rester invisible si l'observateur ne se déclenche pas (impression, saut d'ancre rapide).
- **Correction** : entourer ces trois comportements de `if (!matchMedia("(prefers-reduced-motion: reduce)").matches)`, et respecter aussi l'option « Pause animations » du widget. Envisager de retirer la parallaxe, qui n'apporte rien au contenu.

### 2.6 🪟 Modale légale — RGAA 7.1 / 13.x

- Le message « Chargement… » puis le contenu injecté ne sont pas annoncés : ajouter `aria-busy="true"` pendant le `fetch`.
- Tous les liens du Markdown reçoivent `target="_blank"` sans indication (`js/legal-modal.js:24-27`) → ajouter « (nouvelle fenêtre) » ou garder la même fenêtre pour les liens internes.
- Le message d'erreur est en rouge seul, sans `role="alert"`.

------

## 🟡 Priorité 3 — Mineur / bonnes pratiques

| # | Constat | Critère | Correction |
|---|---|---|---|
| 3.1 | Liens Facebook, LinkedIn et « xgueret » ouverts dans une nouvelle fenêtre sans avertissement (les autres liens externes l'ont) | Cohérence (bonne pratique, 13.2 ne s'applique pas ici) | Ajouter « (nouvelle fenêtre) » en texte masqué, comme pour Epsilon |
| 3.2 | Emoji 💙 lu « cœur bleu » dans le footer | Confort lecteur d'écran | `<span aria-hidden="true">💙</span>` |
| 3.3 | `dl.hero-stats` inversé : la valeur est en `dt`, le libellé en `dd` | 9.x (sémantique) | Inverser, ou passer en `<p>` |
| 3.4 | Libellé du menu mobile animé par styles inline JS | Maintenabilité | Classe CSS `.is-open` |
| 3.5 | Nombreux styles inline de couleur (`style="color: var(--text-light)"`) | 10.1 (présentation dans le HTML) | Classes CSS |
| 3.6 | Aucune **déclaration d'accessibilité** ni mention « Accessibilité : non conforme / partiellement conforme » dans le footer | Obligation légale probablement **non applicable** (micro-entreprise), mais recommandée | Page ou modale « Accessibilité » + lien dans le footer après les corrections P1 |
| 3.7 | Widget d'accessibilité placé en fin de DOM : il faut tout tabuler pour l'atteindre | 12.8 (confort) | Lien vers le widget dans le lien d'évitement ou dans le header |
| 3.8 | `console.log` de production (`app.js`, `index.html:2101`) | Hygiène | Supprimer |

------

## ✅ Points conformes

- `lang="fr"`, `<title>` descriptif, doctype HTML5 (thématique 8).
- Toutes les images porteuses d'information ont un `alt` pertinent ; les SVG décoratifs sont en `aria-hidden="true"` (thématique 1).
- Chaque champ de formulaire a un `<label for>` explicite, et les champs obligatoires ont l'attribut `required` (11.1, 11.2).
- Modales : `role="dialog"`, `aria-modal`, `aria-labelledby`, piège de focus, fermeture par Échap, **retour du focus** sur l'élément déclencheur (vérifié en navigateur).
- Glossaire en `<details>/<summary>` natifs : accessible au clavier sans JS.
- Menu mobile : `aria-expanded`, `aria-controls` et libellé dynamique corrects.
- Liens externes Epsilon, A+ et TempoKids : intitulé ARIA qui **reprend** le texte visible et ajoute « (nouvelle fenêtre) » (6.1, 2.5.3 WCAG).
- Boutons du widget avec `aria-pressed` ; règle CSS `prefers-reduced-motion` présente.
- `--text-light` déjà assombri (`#5e6b7e`, commit `ed05dae`) : le texte courant passe en AA.

------

## 🔧 Limites de l'audit et tests manuels restants

| Test | Pourquoi il reste à faire |
|---|---|
| NVDA + Firefox, VoiceOver + Safari iOS | Restitution réelle des modales, du glossaire et du formulaire |
| Zoom navigateur à 200 % (10.4) | Seul le reflow à 320 px a été mesuré |
| Mode contraste élevé Windows (`forced-colors`) | Confirmer la perte du focus (box-shadow) |
| Espacement du texte (10.12) | Débordement mesuré sur `.hero` et `.parcours-card` (overflow `hidden`) → **à confirmer visuellement** |
| Pertinence des `alt` des deux photos | Vérifier que `hero-image.png` représente bien Adeline (sinon : `alt` à revoir ou vide) |
| Page de succès Netlify Forms après envoi | Hors site, non auditée (langue, retour vers le site) |

------

## 🎓 Plan d'action

| Ordre | Action | Critères | Fichiers | Effort |
|---|---|---|---|---|
| 1 | Masquer le panneau a11y fermé (`visibility` / `inert`) | 10.8, 12.8 | `accessibility.css`, `accessibility.js` | XS |
| 2 | Focus visible global en `outline`, supprimer le hack `keyboard-nav` | 10.7 | `styles.css`, `index.html` | S |
| 3 | `<header>`, `<main>`, lien d'évitement | 12.6, 12.7 | `index.html`, `styles.css` | S |
| 4 | Corriger les 7 couples de contrastes | 3.2, 10.6 | `styles.css`, `index.html` | S |
| 5 | Grilles en `minmax(min(…, 100%), 1fr)` | 10.11 | `styles.css` | XS |
| 6 | Formulaire : mention `*`, `autocomplete`, bordures | 11.10, 11.13, 3.3 | `index.html`, `styles.css` | S |
| 7 | Boutons « Voir plus » : ARIA + intitulé, retirer le double gestionnaire | 7.1, 6.1 | `index.html`, `app.js` | S |
| 8 | Animations JS conditionnées à `prefers-reduced-motion` | 13.8 | `index.html` | S |
| 9 | Tableau tarifaire en `<table>` | 5.x | `index.html`, `styles.css` | M |
| 10 | Titres et listes | 9.1, 9.3 | `index.html`, `legal-modal.js` | M |
| 11 | Modale légale : `aria-busy`, liens, erreur | 7.1 | `legal-modal.js` | S |
| 12 | P3 + déclaration d'accessibilité | — | divers | S |
| 13 | Campagne de tests manuels (lecteurs d'écran, zoom) | toutes | — | M |

> 💡 **Note** : les actions 1 à 6 (toute la P1) tiennent dans une seule PR d'environ 100 lignes, surtout du CSS. À valider visuellement étape par étape, avec captures d'écran, avant chaque commit.

## 📚 Ressources

- Référentiel RGAA 4.1.2 : <https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/>
- Modèle de déclaration d'accessibilité : <https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/>
- axe-core : <https://github.com/dequelabs/axe-core>

------

> **Document créé le** : 2026-09-24
> **Auteur** : pré-audit technique assisté par Claude Code
> **Version** : 1.0
