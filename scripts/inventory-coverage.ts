/**
 * Generates docs/inventory-coverage.md: breadth check of the COMPLETE official
 * SY0-701 objective enumeration (scripts/sy0701-inventory.ts) against what the
 * app teaches, in Italian and English (issue #103 — Phase A).
 *
 * Unlike scripts/objective-coverage.ts, whose denominator is the 249 curated
 * sub-topics, this measures every bulleted leaf of the official objectives
 * document. The goal of Phase A is to MEASURE and LIST the gaps (not to close
 * them): a leaf is "covered" in a language when a referenceable glossary/guide
 * entry or a quiz mentions it in that language. Matching reuses the same
 * plural-tolerant whole-phrase rule as objective-coverage.
 *
 * Deterministic output (no dates), so tests/inventoryCoverage.test.ts fails CI
 * when the committed file is stale. The not-yet-bilingual list is shrink-only,
 * to be closed one domain at a time in later reviews (Phase B).
 *
 * Usage: npm run inventory-coverage
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getAllTopics, getInitialQuestions, loadEnglishOverlay } from "../src/localizedData";
import { DOMAIN_GUIDES_IT, DOMAIN_GUIDES_EN } from "../src/domainGuides";
import type { Lang } from "../src/i18n";
import {
  SY0701_INVENTORY,
  SY0701_SYLLABUS_VERSION,
  SY0701_SYLLABUS_SOURCE,
  type InventoryItem,
} from "./sy0701-inventory";

export const INVENTORY_COVERAGE_PATH = path.join("docs", "inventory-coverage.md");

const LANGS: Lang[] = ["it", "en"];
const GUIDES: Record<Lang, typeof DOMAIN_GUIDES_IT> = { it: DOMAIN_GUIDES_IT, en: DOMAIN_GUIDES_EN };

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stripEmphasis = (text: string): string => text.replace(/[*`_]/g, "");

/** Whole-phrase match with optional English plural suffix (see objective-coverage). */
const mentions = (text: string, phrase: string): boolean =>
  new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(phrase)}(?:e?s)?(?![\\p{L}\\p{N}])`, "iu").test(text);

/** Teaching text of one language: glossary entries + guide teaching, no objective bullets. */
function teachingText(lang: Lang): string {
  const glossary = Object.values(getAllTopics(lang))
    .flat()
    .flatMap((g) => g.subtopics.filter((s) => !s.deprecated).map((s) => `${s.name}\n${s.definition}\n${s.details}\n${s.examTip}`))
    .join("\n");
  const guideTeaching = Object.values(GUIDES[lang])
    .map(({ objectives: _objectives, ...rest }) => JSON.stringify(rest))
    .join("\n");
  return stripEmphasis(`${glossary}\n${guideTeaching}`);
}

function questionText(lang: Lang): string {
  return stripEmphasis(
    getInitialQuestions(lang)
      .filter((q) => !q.deprecated)
      .map((q) => `${q.scenario}\n${q.question}\n${q.options.join("\n")}\n${q.explanation}`)
      .join("\n")
  );
}

const termsOf = (item: InventoryItem): string[] => item.match ?? [item.item];

export type ItemWhere = "bilingual" | "italianOnly" | "englishOnly" | "absent";

export interface InventoryCoverage {
  total: number;
  bilingual: number;
  anyLanguage: number;
  items: { code: string; group: string; item: string; where: ItemWhere }[];
}

/** Requires loadEnglishOverlay() to have run. */
export function inventoryCoverage(): InventoryCoverage {
  const corpus = Object.fromEntries(
    LANGS.map((l) => [l, `${teachingText(l)}\n${questionText(l)}`])
  ) as Record<Lang, string>;
  const items = SY0701_INVENTORY.map((entry) => {
    const terms = termsOf(entry);
    const inIt = terms.some((t) => mentions(corpus.it, t));
    const inEn = terms.some((t) => mentions(corpus.en, t));
    const where: ItemWhere = inIt && inEn ? "bilingual" : inIt ? "italianOnly" : inEn ? "englishOnly" : "absent";
    return { code: entry.code, group: entry.group, item: entry.item, where };
  });
  return {
    total: items.length,
    bilingual: items.filter((i) => i.where === "bilingual").length,
    anyLanguage: items.filter((i) => i.where !== "absent").length,
    items,
  };
}

/** Leaves not yet covered in both languages, as "code — item", sorted (shrink-only). */
export function notYetBilingual(): string[] {
  return inventoryCoverage()
    .items.filter((i) => i.where !== "bilingual")
    .map((i) => `${i.code} — ${i.item}`)
    .sort();
}

const WHERE_LABEL: Record<Exclude<ItemWhere, "bilingual">, string> = {
  italianOnly: "solo IT",
  englishOnly: "solo EN",
  absent: "assente",
};

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));

export function renderInventoryCoverage(): string {
  const cov = inventoryCoverage();
  const byCode = new Map<string, InventoryCoverage["items"]>();
  for (const it of cov.items) {
    const list = byCode.get(it.code) ?? [];
    list.push(it);
    byCode.set(it.code, list);
  }
  const codes = [...byCode.keys()].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const lines: string[] = [
    "# Copertura dell'inventario ufficiale SY0-701",
    "",
    "<!-- Generato da scripts/inventory-coverage.ts: non modificare a mano, esegui `npm run inventory-coverage`. -->",
    "",
    `Inventario completo delle sotto-voci puntate degli obiettivi ufficiali (1.1–5.6), non la`,
    `lista curata di 249 termini di [\`objective-coverage.md\`](objective-coverage.md). Denominatore:`,
    `**${SY0701_SYLLABUS_VERSION}**. Fonte: ${SY0701_SYLLABUS_SOURCE}`,
    "",
    "Una voce è **coperta** in una lingua quando una voce ricercabile di glossario/guida o una domanda",
    "la cita in quella lingua. **Fase A**: questo documento *misura* e *elenca* i gap; non li colma. Le",
    "voci non ancora bilingui vanno chiuse un dominio alla volta nelle revisioni successive (Fase B),",
    "con parità IT/EN. L'elenco può solo accorciarsi.",
    "",
    "> **English summary.** Breadth check of the full official SY0-701 objective enumeration against",
    "> what the app teaches, in Italian and English. Phase A measures and lists the gaps; it does not",
    "> close them. Generated by `scripts/inventory-coverage.ts`; the not-yet-bilingual list is",
    "> shrink-only and `tests/inventoryCoverage.test.ts` keeps this file current.",
    "",
    "## Riepilogo",
    "",
    "| Metrica | Conteggio | Quota |",
    "|---|---|---|",
    `| Voci ufficiali enumerate | ${cov.total} | 100% |`,
    `| Coperte in entrambe le lingue (IT **e** EN) | ${cov.bilingual} | ${pct(cov.bilingual, cov.total)}% |`,
    `| Coperte in almeno una lingua (ampiezza) | ${cov.anyLanguage} | ${pct(cov.anyLanguage, cov.total)}% |`,
    `| Da completare (non ancora bilingui) | ${cov.total - cov.bilingual} | ${pct(cov.total - cov.bilingual, cov.total)}% |`,
    "",
    "## Voci da completare, per obiettivo",
    "",
    "Stato: `solo IT` reperibile solo in italiano, `solo EN` solo in inglese, `assente` in nessuna",
    "lingua (gap di contenuto o solo formulazione diversa dai sinonimi dell'inventario).",
    "",
  ];

  let anyGap = false;
  for (const code of codes) {
    const gaps = byCode.get(code)!.filter((i) => i.where !== "bilingual");
    if (gaps.length === 0) continue;
    anyGap = true;
    lines.push(`### Obiettivo ${code}`, "");
    for (const g of gaps.sort((a, b) => a.item.localeCompare(b.item))) {
      lines.push(`- ${g.item} (${g.group}) — \`${WHERE_LABEL[g.where as Exclude<ItemWhere, "bilingual">]}\``);
    }
    lines.push("");
  }
  if (!anyGap) lines.push("Nessuna: ogni voce ufficiale è coperta in entrambe le lingue.", "");

  return lines.join("\n").replace(/\n+$/, "\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await loadEnglishOverlay();
  writeFileSync(INVENTORY_COVERAGE_PATH, renderInventoryCoverage());
  const cov = inventoryCoverage();
  console.log(
    `Written ${INVENTORY_COVERAGE_PATH} — ${cov.total} leaves, ${cov.bilingual} bilingual, ${cov.anyLanguage} covered in at least one language.`
  );
}
