// Source of truth for pack pricing. Edit here, then run `npm run prices`.
// NOT shipped to the browser — consumed only by scripts/generate-prices.mjs.

export const RATES = {
  child: 45, // €/h — accompagnement enfant
  parent: 55, // €/h — guidance parentale
};

export const ROUND_TO = 5; // arrondi des prix au plus proche multiple (€)

export const PACKS = [
  {
    id: "decouverte",
    label: "Découverte",
    childSessions: 10,
    parentSessions: 2,
    discountPct: 6,
  },
  {
    id: "approfondissement",
    label: "Approfondissement",
    childSessions: 20,
    parentSessions: 4,
    discountPct: 7,
  },
  {
    id: "consolidation",
    label: "Consolidation",
    childSessions: 40,
    parentSessions: 6,
    discountPct: 8.5,
  },
  {
    id: "equilibre",
    label: "Équilibre",
    childSessions: 80,
    parentSessions: 8,
    discountPct: 12,
    schedule: { weeks: 40, months: 10 }, // pour « X €/semaine · Y €/mois »
  },
];
