# ♿ Audit RGAA 4.1.2 — adelineguillotgueret.fr

> **Objectif** : évaluer le site vitrine au regard du RGAA 4.1.2 et prioriser les corrections.
> **Périmètre** : `index.html` (page unique), modale « services », modale « mentions légales / confidentialité », widget d'accessibilité.
> **Méthode** : revue de code (HTML, CSS, JS) + tests automatisés (axe-core 4.10 dans Chromium) + tests ciblés (clavier, reflow 320 px, espacement du texte).
> **Date** : 2026-09-24 — branche `docs/audit-rgaa-4.1.2`
> **Mise à jour** : 2026-09-24 — toutes les actions P1, P2 et P3 sont corrigées, voir [Suivi des corrections](#-suivi-des-corrections).
> **Second audit** : 2026-09-24 sur `main` (`1e33090`) — 3 défauts majeurs et 9 mineurs, voir [Second audit](#-second-audit-après-corrections).

## Table des matières

1. [Mental Model](#-mental-model)
2. [Synthèse](#-synthèse)
3. [Suivi des corrections](#-suivi-des-corrections)
4. [Second audit (après corrections)](#-second-audit-après-corrections)
5. [Priorité 1 — Bloquant](#-priorité-1--bloquant)
6. [Priorité 2 — Majeur](#-priorité-2--majeur)
7. [Priorité 3 — Mineur / bonnes pratiques](#-priorité-3--mineur--bonnes-pratiques)
8. [Points conformes](#-points-conformes)
9. [Limites de l'audit et tests manuels restants](#-limites-de-laudit-et-tests-manuels-restants)
10. [Plan d'action](#-plan-daction)

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

| Thématique RGAA | État à l'audit | Critères non conformes relevés | Après corrections |
|---|---|---|---|
| 1. Images | ⚠️ | 1.3 — `alt` du hero erroné (SVG décoratifs en `aria-hidden` : OK) | ✅ Corrigé |
| 3. Couleurs | ❌ | 3.2 (contrastes du texte), 3.3 (bordure des champs) | ✅ Corrigé |
| 5. Tableaux | ❌ | 5.x — grille tarifaire codée en `<div>` | ✅ Corrigé |
| 6. Liens | ⚠️ | 6.1 — globalement conforme, voir P3 | ✅ Corrigé |
| 7. Scripts | ❌ | 7.1 (`aria-expanded` incorrect), 7.3 (carte cliquable) | ✅ Corrigé |
| 8. Éléments obligatoires | ✅ Conforme | `lang="fr"`, `<title>` pertinent, doctype | ✅ |
| 9. Structuration | ❌ | 9.1 (hiérarchie des titres), 9.3 (listes) | ✅ Corrigé |
| 10. Présentation | ❌ | 10.6, 10.7, 10.8, 10.11 | ✅ Corrigé |
| 11. Formulaires | ❌ | 11.10, 11.13 | ✅ Corrigé |
| 12. Navigation | ❌ | 12.6, 12.7, 12.8 | ✅ Corrigé |
| 13. Consultation | ⚠️ | 13.8 (animations JS non désactivables par l'OS) | ✅ Corrigé |

**Sortie axe-core (état stabilisé)** : 12 contrastes insuffisants, 1 lien indistinguable, 1 saut de titre, 66 contenus hors point de repère.
**Après corrections** : **0 violation** sur la page entière (1280 et 320 px) et dans les 3 modales légales.

> ⚠️ **Warning** : un taux de conformité RGAA officiel exige un audit complet des 106 critères sur un échantillon, avec des tests aux lecteurs d'écran. Ce document est un **pré-audit technique** : il identifie les non-conformités certaines, mais ne constitue pas une déclaration de conformité.

------

## 📈 Suivi des corrections

> 💡 **Note** : les sections P1, P2 et P3 ci-dessous décrivent l'état **au moment de l'audit** et restent inchangées. Cette section trace les corrections. Chaque étape a été vérifiée en navigateur (axe-core, clavier, captures avant/après) avant son commit.

| # | Action | Critères | Commit |
|---|---|---|---|
| 1.1 | Panneau d'accessibilité fermé masqué (`visibility: hidden`) | 10.8, 12.8 | `4cc68ea` |
| 1.2 | Focus visible global en `outline`, hack `keyboard-nav` supprimé | 10.7 | `97995ca` |
| 1.3 | `<header>`, `<main>` et lien d'évitement | 12.6, 12.7 | `7da4917` |
| 1.4 | Contrastes corrigés (ruban, badges, liens, footer) | 3.2, 10.6 | `bb54ee7`, `b396163` |
| 1.5 | Grilles en `minmax(min(…, 100%), 1fr)`, hero en `minmax(0, 1fr)` | 10.11 | `bcdf048` |
| 1.6 | Formulaire : mention `*`, `autocomplete`, aides liées, bordures | 11.10, 11.13, 3.3 | `9375402` |
| 2.1 | « Voir plus » : `aria-haspopup="dialog"`, intitulé complété, double gestionnaire retiré | 7.1, 6.1 | `278c911` |
| 2.2 | Grille tarifaire en `<table>` (`caption`, `th scope`), rendu identique | 5.4, 5.6, 5.7 | `e8ea599` |
| 2.3 | Hiérarchie des titres (page, footer, modales, `hgroup`) | 9.1 | `87c95a1` |
| 2.4 | Listes en `<ul>` (✓ en `::before`, qualifications) | 9.3 | `db689da` |
| 2.5 | Parallaxe, fondu et défilement doux conditionnés à la réduction des animations | 13.8 | `8760a59` |
| 2.6 | Modale légale : `aria-busy`, `role="status"` / `role="alert"`, liens externes signalés | 7.1, 7.5, 13.2 | `98f3ea0` |
| 2.7 | `alt` du hero décrivant réellement l'image | 1.3 | `b11a954` |
| 3.1, 3.2, 3.8 | Nouvelles fenêtres signalées, emoji masqué, `console.log` retirés | 6.1 | `ec9ec8c` |
| 3.3 | Chiffres clés du hero en `<ul>` | 9.3 | `fc39fa0` |
| 3.4 | Menu mobile et barre de navigation pilotés en CSS | — | `9950936` |
| 3.5 | Plus aucun style inline dans `index.html` | 10.1 | `245df74` |
| 3.6 | Déclaration d'accessibilité (`content/accessibilite.md`), lien dans le footer | — | `9b37e11` |
| 3.7 | Second lien d'évitement vers les options d'accessibilité | 12.8 | `31c199f` |

### Défauts découverts pendant les corrections

| Constat | Critère | Correction | Commit |
|---|---|---|---|
| Défilement horizontal de 74 px à 320 px : le mot « d'accompagnement » du titre des parcours dépassait l'écran | 10.11 | Titres de section réduits sur mobile, `overflow-wrap` sur les titres | `d7d3479` |
| Adresses e-mail insécables qui élargissaient leur colonne quand le texte est agrandi | 10.11 | `overflow-wrap: anywhere` sur les liens `mailto:` et l'aide du champ e-mail | `d7d3479` |
| Trois grilles oubliées en P1.5 (`.expertise-grid`, `.partners-grid`, `.footer-container`) | 10.11 | Même motif `min(…, 100%)` | `d7d3479` |
| Modales légales : une expression régulière gourmande plaçait tout le texte entre la première et la dernière puce dans une seule `<ul>` (73 éléments non-`li` dans la politique de confidentialité) | 9.3 | Suppression de la regex, fermeture des listes dans la boucle de conversion | `fff553e` |
| Liens des modales légales distingués par la seule couleur | 10.6 | Liens soulignés | `fff553e` |

Hors audit : style des cartes de parcours (contour fin au repos, contour coloré de 3 px au survol), commit `1a33f55`.

------

## 🔁 Second audit (après corrections)

> **Périmètre** : `main` au commit `1e33090` (PR #34 fusionnée) : page, modale service, panneau d'accessibilité, 3 modales légales.
> **Méthode** : axe-core 4.10.2 (règles WCAG 2.0 à 2.2 AA + bonnes pratiques), mesure au pixel des contrastes qu'axe ne sait pas calculer, parcours clavier complet, espacement du texte (10.12), largeur 640 px (équivalent zoom 200 %), émulation `forced-colors`, revue du code thème par thème.

### Résultats des tests automatisés et ciblés

| Test | Résultat |
|---|---|
| axe-core, page à 1280 et 320 px | ✅ 0 violation |
| axe-core, modale service, panneau d'accessibilité, modales légales | ✅ 0 violation |
| 37 contrastes « à vérifier » d'axe (dégradés, pseudo-éléments) | ✅ Tous conformes au pixel : texte courant ≥ 4,9:1, boutons 4,87:1, grands textes ≥ 4,4:1 |
| Défilement horizontal à 320, 640 et 1280 px | ✅ Aucun |
| Parcours clavier (69 arrêts) | ✅ Ordre logique, focus visible partout, aucun élément invisible atteint |
| Liens d'évitement | ✅ Visibles au focus, « Aller au contenu » place le focus sur `<main>` — ⚠️ voir R1 pour le second |
| Panneau d'accessibilité | ✅ Piège de focus, Échap, retour du focus sur le bouton |
| `forced-colors` (émulé) | ✅ Contour de focus conservé, tableau et liens lisibles |
| Espacement du texte (10.12) | ⚠️ Ruban « Offre Signature » rogné, voir R4 |

### 🟠 Défauts majeurs

| # | Constat | Critère | Où | Correction |
|---|---|---|---|---|
| R1 | **Régression de P3.7** : le gestionnaire de défilement des ancres pose `tabindex="-1"` sur toute cible sans `tabindex`, y compris le bouton du widget. Après avoir utilisé le lien « Options d'accessibilité », le bouton **sort définitivement de l'ordre de tabulation** (vérifié : Tab après le dernier lien du footer mène au `body`) | 12.8, 7.3 | `index.html:1996-1997` | Ne poser `tabindex` que si la cible n'est pas déjà focalisable, ou exclure `#a11y-toggle` du gestionnaire |
| R2 | Bouton « Me contacter pour ce service » de la modale service : la modale se ferme, la page défile vers `#contact`, puis la restitution du focus renvoie au bouton « Voir plus » et **fait remonter la page jusqu'à la carte**. L'utilisateur, souris ou clavier, n'arrive jamais au formulaire (vérifié : focus sur « Voir plus », `#contact` à 7 300 px sous l'écran) | 7.1, 12.8 | `js/service-modal.js:71`, `:137-138` | Ne pas restaurer le focus quand la fermeture vient du bouton d'action |
| R3 | Boutons « Taille de texte » et « Hauteur de ligne » du widget : plusieurs niveaux (125, 150, 175 %) mais `aria-pressed` binaire. Le niveau courant n'est restitué que par des points visuels | 7.1 | `js/accessibility.js:453`, `:492` | `aria-label` dynamique (« Taille de texte : 150 % ») sans `aria-pressed` sur ces deux boutons |

### 🟡 Défauts mineurs et bonnes pratiques

| # | Constat | Critère | Où | Correction |
|---|---|---|---|---|
| R4 | Avec l'espacement du texte de 10.12, le « O » du ruban « Offre Signature » est coupé (largeur fixe + `overflow: hidden` de la carte) | 10.12 | `.parcours-signature-ribbon` | Élargir le ruban ou le passer en étiquette non pivotée |
| R5 | Titres de catégories du widget (« Texte », « Visuel », « Orientation ») en `<div>` | 9.1 (bonne pratique) | `js/accessibility.js:424` | `<h3>`, ou `role="group"` + `aria-labelledby` |
| R6 | Masque de lecture déplaçable uniquement à la souris ou au toucher | Bonne pratique | `js/accessibility.js:268` | Suivre le focus (`focusin`) |
| R7 | Pas de `scroll-padding-top` : une cible d'ancre ou un élément focalisé peut passer sous la barre fixe | Hors RGAA 4.1.2 (WCAG 2.4.11) | `css/styles.css` | `html { scroll-padding-top: 5rem }` |
| R8 | Styles inline restants, générés par le JS de la modale légale | 10.1 | `js/legal-modal.js:97`, `:133` | Classes CSS |
| R9 | Lien « Email » du footer qui pointe vers `#contact` : l'intitulé fait attendre un `mailto:` | 6.1 (confort) | `index.html:1930` | `href="mailto:…"` ou intitulé « Formulaire de contact » |
| R10 | Déclaration d'accessibilité : pas d'échantillon de pages testées ni d'environnement de test (navigateur, technologies d'assistance), contrairement au modèle officiel | Déclaration | `content/accessibilite.md` | Compléter après les tests aux lecteurs d'écran |
| R11 | Toutes les images reçoivent `.loading` (pulsation infinie) retiré seulement à l'événement `load` : une image déjà chargée pourrait pulser sans fin. Non reproduit en navigateur, mais fragile | 13.8 | `index.html:2130`, `css/styles.css:2301` | Tester `img.complete`, ou supprimer ce bloc |
| R12 | Trois `@keyframes slideDown` différentes : la dernière écrase la première et la fermeture de la modale service joue une animation d'entrée | Hors RGAA | `css/styles.css:643`, `:2347`, `index.html:2059` | Renommer les animations |

### Vérifié conforme lors du second audit

- Aucun `id` dupliqué (8.2), y compris dans le contenu copié dans la modale service ; titres cohérents dans la modale (`h2` puis `h3`).
- Pas d'iframe, pas de carrousel, pas de `title` superflu ; tous les SVG sont en `aria-hidden`.
- Nom accessible cohérent avec le libellé visible (Epsilon, A+, TempoKids, réseaux sociaux, xgueret).
- Formulaire : `label`, mention de l'astérisque, `autocomplete`, aides liées, champ anti-robot en `hidden`.
- Photo « Qui suis-je » : portrait d'Adeline, `alt` pertinent (1.3). Point retiré des tests restants.

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

### 2.7 🖼️ Alternative textuelle erronée de l'image du hero — RGAA 1.3

- **Constat** : `hero-image.png` montre un **bureau avec du matériel pédagogique** (planning visuel, livres, formes), pas Adeline. Son `alt` (« Adeline Guillot Gueret - Enseignante spécialisée en Guadeloupe ») décrit donc une personne absente de l'image.
- **Où** : `index.html:191-196`.
- **Correction** : `alt=""` si l'image est décorative, ou une description fidèle (ex. « Bureau de travail avec planning visuel, livres et matériel pédagogique adapté »).

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
| Zoom navigateur à 200 % (10.4) | Simulé à 640 px de large (second audit) : aucun défilement horizontal ni contenu coupé. Zoom navigateur réel non testé |
| Mode contraste élevé Windows (`forced-colors`) | Émulé dans Chromium (second audit) : focus et contenus visibles. À confirmer sur Windows |
| Widget à 150 % et plus sur écran de 320 px | Des titres de cartes et descriptions de parcours débordent encore (18 à 50 px). Au-delà des exigences du RGAA, laissé en l'état |
| Espacement du texte (10.12) | Confirmé visuellement au second audit : seul le ruban « Offre Signature » perd du texte (R4). Le débordement de `.hero` vient de décors |
| Page de succès Netlify Forms après envoi | Hors site, non auditée (langue, retour vers le site) |

------

## 🎓 Plan d'action

| Ordre | Action | Critères | Fichiers | Effort | Statut |
|---|---|---|---|---|---|
| 1 | Masquer le panneau a11y fermé (`visibility` / `inert`) | 10.8, 12.8 | `accessibility.css`, `accessibility.js` | XS | ✅ |
| 2 | Focus visible global en `outline`, supprimer le hack `keyboard-nav` | 10.7 | `styles.css`, `index.html` | S | ✅ |
| 3 | `<header>`, `<main>`, lien d'évitement | 12.6, 12.7 | `index.html`, `styles.css` | S | ✅ |
| 4 | Corriger les 7 couples de contrastes | 3.2, 10.6 | `styles.css`, `index.html` | S | ✅ |
| 5 | Grilles en `minmax(min(…, 100%), 1fr)` | 10.11 | `styles.css` | XS | ✅ |
| 6 | Formulaire : mention `*`, `autocomplete`, bordures | 11.10, 11.13, 3.3 | `index.html`, `styles.css` | S | ✅ |
| 7 | Boutons « Voir plus » : ARIA + intitulé, retirer le double gestionnaire | 7.1, 6.1 | `index.html`, `app.js` | S | ✅ |
| 8 | Animations JS conditionnées à `prefers-reduced-motion` | 13.8 | `index.html` | S | ✅ |
| 9 | Tableau tarifaire en `<table>` | 5.x | `index.html`, `styles.css` | M | ✅ |
| 10 | Titres et listes | 9.1, 9.3 | `index.html`, `legal-modal.js` | M | ✅ |
| 11 | Modale légale : `aria-busy`, liens, erreur | 7.1 | `legal-modal.js` | S | ✅ |
| 12 | P3 + déclaration d'accessibilité | — | divers | S | ✅ |
| 13 | Campagne de tests manuels (lecteurs d'écran, zoom) | toutes | — | M | ⏳ À faire |
| 14 | Second audit : R1 à R3 (widget, modale service) | 7.1, 7.3, 12.8 | `index.html`, `service-modal.js`, `accessibility.js` | S | ⏳ À faire |
| 15 | Second audit : R4 à R12 | divers | divers | S | ⏳ À faire |

> 💡 **Note** : les actions 1 à 6 (toute la P1) tiennent dans une seule PR d'environ 100 lignes, surtout du CSS. À valider visuellement étape par étape, avec captures d'écran, avant chaque commit.

## 📚 Ressources

- Référentiel RGAA 4.1.2 : <https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/>
- Modèle de déclaration d'accessibilité : <https://accessibilite.numerique.gouv.fr/obligations/declaration-accessibilite/>
- axe-core : <https://github.com/dequelabs/axe-core>

------

> **Document créé le** : 2026-09-24
> **Mis à jour le** : 2026-09-24 (suivi des corrections, second audit)
> **Auteur** : pré-audit technique assisté par Claude Code
> **Version** : 1.2
