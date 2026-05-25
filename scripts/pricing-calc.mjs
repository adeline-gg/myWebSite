// scripts/pricing-calc.mjs

/** Round a value to the nearest multiple of `step`. */
export function roundToNearest(value, step) {
  return Math.round(value / step) * step;
}

/** Compute real value, discounted price (and schedule splits) for one pack. */
export function computePack(pack, rates, roundTo) {
  const value = pack.childSessions * rates.child + pack.parentSessions * rates.parent;
  const price = roundToNearest(value * (1 - pack.discountPct / 100), roundTo);
  const result = {
    id: pack.id,
    label: pack.label,
    childSessions: pack.childSessions,
    parentSessions: pack.parentSessions,
    discountPct: pack.discountPct,
    value,
    price,
  };
  if (pack.schedule) {
    result.perWeek = roundToNearest(price / pack.schedule.weeks, roundTo);
    result.perMonth = roundToNearest(price / pack.schedule.months, roundTo);
  }
  return result;
}

/** Compute every pack from a config module ({ RATES, ROUND_TO, PACKS }). */
export function computeAll(config) {
  return config.PACKS.map((pack) => computePack(pack, config.RATES, config.ROUND_TO));
}
