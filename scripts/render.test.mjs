// scripts/render.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatNumberFr, euro, renderDataFile, injectMarkers } from './render.mjs';

test('formatNumberFr groups thousands with a regular space', () => {
  assert.equal(formatNumberFr(525), '525');
  assert.equal(formatNumberFr(1040), '1 040');
  assert.equal(formatNumberFr(3555), '3 555');
});

test('euro formats with or without a space before the symbol', () => {
  assert.equal(euro(525), '525 €');
  assert.equal(euro(1040, { space: false }), '1 040€');
});

test('injectMarkers replaces content between matching markers', () => {
  const html = 'A <!--price:foo:price-->old<!--/price--> B';
  const { html: out, missing } = injectMarkers(html, { 'foo:price': '525 €' });
  assert.equal(out, 'A <!--price:foo:price-->525 €<!--/price--> B');
  assert.deepEqual(missing, []);
});

test('injectMarkers reports keys whose markers are absent', () => {
  const { missing } = injectMarkers('no markers here', { 'foo:price': '1 €' });
  assert.deepEqual(missing, ['foo:price']);
});

test('renderDataFile emits window.PRICING with prices and text fields', () => {
  const computed = [
    { id: 'decouverte', label: 'Découverte', childSessions: 10, parentSessions: 2, discountPct: 6, value: 560, price: 525 },
    { id: 'equilibre', label: 'Équilibre', childSessions: 80, parentSessions: 8, discountPct: 12, value: 4040, price: 3555, perWeek: 90, perMonth: 355 },
  ];
  const out = renderDataFile(computed, { child: 45, parent: 55 });
  assert.match(out, /window\.PRICING =/);
  assert.match(out, /"price": 525/);
  assert.match(out, /"priceText": "525€"/);
  assert.match(out, /"perWeekText": "90€"/);
  assert.match(out, /"minPriceText": "525€"/);
  assert.match(out, /"maxPriceText": "3 555€"/);
});
