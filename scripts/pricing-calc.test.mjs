// scripts/pricing-calc.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { roundToNearest, computePack, computeAll } from './pricing-calc.mjs';
import * as config from '../pricing.config.mjs';

test('roundToNearest rounds to the nearest multiple', () => {
  assert.equal(roundToNearest(526.4, 5), 525);
  assert.equal(roundToNearest(1041.6, 5), 1040);
  assert.equal(roundToNearest(1948.95, 5), 1950);
  assert.equal(roundToNearest(3555.2, 5), 3555);
});

test('computePack computes real value and discounted price', () => {
  const p = computePack(
    { id: 'decouverte', label: 'D', childSessions: 10, parentSessions: 2, discountPct: 6 },
    { child: 45, parent: 55 },
    5,
  );
  assert.equal(p.value, 560);
  assert.equal(p.price, 525);
});

test('computePack adds perWeek/perMonth when schedule present', () => {
  const p = computePack(
    { id: 'equilibre', label: 'E', childSessions: 80, parentSessions: 8, discountPct: 12, schedule: { weeks: 40, months: 10 } },
    { child: 45, parent: 55 },
    5,
  );
  assert.equal(p.value, 4040);
  assert.equal(p.price, 3555);
  assert.equal(p.perWeek, 90);
  assert.equal(p.perMonth, 355);
});

test('computeAll returns one entry per configured pack', () => {
  const all = computeAll(config);
  assert.equal(all.length, 4);
  assert.deepEqual(all.map((p) => p.price), [525, 1040, 1950, 3555]);
});
