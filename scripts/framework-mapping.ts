/**
 * Generates docs/framework-mapping.md: for every SY0-701 objective, the closest
 * NIST CSF 2.0 functions, CIS Controls v8 and MITRE ATT&CK tactics. The output
 * is deterministic, so tests/frameworkMapping.test.ts fails CI when the
 * committed file is out of date.
 *
 * Usage: npm run framework-mapping
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { DOMAIN_GUIDES_IT } from "../src/domainGuides";
import { CIS_CONTROLS, CSF_FUNCTIONS, FRAMEWORK_MAPPING } from "../src/frameworkMapping";
import { OFFICIAL_OBJECTIVES } from "../src/questionObjectives";

export const FRAMEWORK_MAPPING_PATH = path.join("docs", "framework-mapping.md");

export function renderFrameworkMapping(): string {
  const lines: string[] = [
    "# Mappatura a framework complementari",
    "",
    "> File generato da `npm run framework-mapping` (`scripts/framework-mapping.ts`): non modificarlo a mano.",
    "> I dati sono in `src/frameworkMapping.ts`; la CI fallisce se il file non è aggiornato.",
    "",
    "Gli obiettivi CompTIA SY0-701 restano il riferimento del progetto: questa tabella indica solo dove",
    "lo stesso concetto compare in **NIST CSF 2.0**, **CIS Controls v8** e **MITRE ATT&CK**, i framework",
    "usati nel lavoro reale. La corrispondenza è approssimata (un obiettivo copre spesso più controlli):",
    "indica il punto di contatto più vicino, non un'equivalenza. NICE non è mappato.",
    "",
  ];
  for (const domain of [1, 2, 3, 4, 5]) {
    lines.push(
      `## Dominio ${domain} — ${DOMAIN_GUIDES_IT[domain].title}`,
      "",
      "| Obiettivo | NIST CSF 2.0 | CIS Controls v8 | MITRE ATT&CK (tattiche) |",
      "|---|---|---|---|"
    );
    for (const code of OFFICIAL_OBJECTIVES[domain]) {
      const m = FRAMEWORK_MAPPING[code];
      const csf = m.csf.map((f) => `${f} ${CSF_FUNCTIONS[f]}`).join(", ");
      const cis = m.cis.map((n) => `${n} ${CIS_CONTROLS[n]}`).join("; ") || "—";
      lines.push(`| ${code} | ${csf} | ${cis} | ${m.attack.join(", ") || "—"} |`);
    }
    lines.push("");
  }
  lines.push(
    "## Note",
    "",
    "- Le tattiche ATT&CK sono elencate solo dove l'obiettivo riguarda minacce o difese contro comportamenti",
    "  osservabili; i temi di governance restano senza.",
    "- Le versioni di riferimento sono NIST CSF 2.0, CIS Controls v8 e ATT&CK Enterprise.",
    ""
  );
  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeFileSync(FRAMEWORK_MAPPING_PATH, renderFrameworkMapping());
  console.log(`Wrote ${FRAMEWORK_MAPPING_PATH}`);
}
