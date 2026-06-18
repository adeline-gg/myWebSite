// scripts/generate-prices.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as config from "../pricing.config.mjs";
import { computeAll } from "./pricing-calc.mjs";
import { renderDataFile, injectMarkers, euro } from "./render.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** HTML marker replacements. Cards use "525 €" (space); the table range uses "525€". */
function buildHtmlReplacements(computed) {
  const r = {};
  for (const p of computed) {
    r[`${p.id}:value`] = euro(p.value);
    r[`${p.id}:price`] = euro(p.price);
    if (p.perWeek != null) {
      r[`${p.id}:perWeek`] = euro(p.perWeek);
      r[`${p.id}:perMonth`] = euro(p.perMonth);
    }
  }
  const prices = computed.map((p) => p.price);
  r["range:min"] = euro(Math.min(...prices), { space: false });
  r["range:max"] = euro(Math.max(...prices), { space: false });
  return r;
}

async function main() {
  const computed = computeAll(config);

  await writeFile(
    join(root, "js/pricing.data.js"),
    renderDataFile(computed, config.RATES),
    "utf8",
  );

  const htmlPath = join(root, "index.html");
  const html = await readFile(htmlPath, "utf8");
  const { html: out, missing } = injectMarkers(
    html,
    buildHtmlReplacements(computed),
  );
  await writeFile(htmlPath, out, "utf8");
  if (missing.length) {
    console.warn("⚠️  Marqueurs absents dans index.html :", missing.join(", "));
  }

  console.table(
    computed.map((p) => ({
      Pack: p.label,
      "Valeur réelle": euro(p.value),
      Réduction: `${p.discountPct} %`,
      Prix: euro(p.price),
      Économie: euro(p.value - p.price),
    })),
  );
  console.log("✅ js/pricing.data.js régénéré, index.html mis à jour.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
