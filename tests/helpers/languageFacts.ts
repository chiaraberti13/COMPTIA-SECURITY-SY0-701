/*
 * Language-independent "facts" of a sentence, used to check that the Italian
 * source and its English translation say the same thing. A faithful
 * translation keeps every number, acronym, objective code and literal token
 * (*.example.com, ../); a missing or extra one means content drifted.
 */

/** Every string in a value, keyed by the path it sits at (e.g. ".3.options.1"). */
export function strings(value: unknown, path = ""): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((item, i) => strings(item, `${path}.${i}`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => strings(item, path ? `${path}.${key}` : key));
  }
  return [];
}

/** Italian words in capitals (emphasis) and Italian acronyms, with the English token they match. */
const IT_TO_EN: Record<string, string> = {
  CHI: "WHO", DOPO: "AFTER", MAI: "NEVER", NON: "NOT", MEGLIO: "BEST", MIGLIORE: "BEST", PIÙ: "MOST",
  MAGGIORMENTE: "MOST", MAGGIORE: "GREATEST", MAGGIOR: "GREATEST", MOLTO: "MOST", PRIMO: "FIRST",
  PRIMA: "FIRST", FINALE: "FINAL", QUANDO: "WHEN", PRIVATA: "PRIVATE", PUBBLICA: "PUBLIC", MENO: "LEAST",
  SEMPRE: "ALWAYS", SOLO: "ONLY", COSA: "WHAT", QUALE: "WHICH", PERCHÉ: "WHY", COME: "HOW",
  APPLICARE: "APPLY", INVESTIGARE: "INVESTIGATE", MITIGARE: "MITIGATE", PIANIFICARE: "PLAN", AGIRE: "ACT",
  IMMEDIATAMENTE: "IMMEDIATELY", ENTRAMBI: "BOTH", TUTTI: "ALL", ECCETTO: "EXCEPT", IDEALE: "IDEAL",
  FONDAMENTALE: "FUNDAMENTAL", PRIORITÀ: "PRIORITY", TEMPO: "TIME", ANNO: "YEAR", DATI: "DATA", UN: "ONE",
  UE: "EU", USA: "US", SO: "OS", PMI: "SMB", IA: "AI", TAC: "CT", AAAA: "YYYY",
};

/** Synonymous emphasis in either language, folded to one token. */
const SAME_CLASS: Record<string, string> = { GREATEST: "MOST", BEFORE: "FIRST", USA: "US" };

/** Capitalized words that carry emphasis, not facts. */
const DROP = new Set([
  "NOT", "NO", "CANNOT", "WHAT", "WHO", "WHICH", "WHY", "HOW", "WHEN", "OK", "AM", "PM",
  "IN", "OF", "UNENCRYPTED", "PER", "NEL", "CHE", "DEL",
]);

/** English acronyms the Italian text may legitimately spell out instead. */
const SPELLED_OUT_IN_ITALIAN: Record<string, RegExp> = {
  OS: /sistem[ai] operativ/i, HR: /risorse umane|personale|\bHR\b/i, IT: /informatic|\bIT\b/, ERP: /gestional/i,
  CEO: /amministratore delegato|direttore generale|dirigente|\bCEO\b/i, US: /statunitens|stati uniti|\bUSA\b/i,
  ID: /identificativ|identit|codic[ei] fiscal/i, AI: /intelligenza artificiale|\bIA\b|\bAI\b/, EUR: /€|\beuro\b/i,
  UAT: /collaudo|accettazione/i, PLC: /\bplc\b/i, SDN: /software-defined|via software|\bSDN\b/i,
  DIY: /fai.da.te/i, PBX: /centralin/i, USB: /chiavett|\bUSB\b/i,
};

/** Italian acronyms the English text may legitimately spell out instead. */
const SPELLED_OUT_IN_ENGLISH: Record<string, RegExp> = {
  SMS: /text message|\bSMS\b/i,
};

/** 12-hour clock hour to 24-hour: to24("5", "p") === 17. */
const to24 = (hour: string, half: string) => (Number(hour) % 12) + (half.toLowerCase() === "p" ? 12 : 0);

function facts(text: string, lang: "it" | "en"): Set<string> {
  const normalized = text
    // 5:50 PM / 5:50 p.m. -> 17:50 and 3 AM -> 3, so 12- and 24-hour clocks compare equal.
    .replace(/\b(\d{1,2}):(\d{2})\s*([ap])\.?m\.?(?![\p{L}])/giu, (_, h, m, ap) => `${to24(h, ap)}:${m}`)
    .replace(/\b(\d{1,2})\s*([ap])\.?m\.?(?![\p{L}])/giu, (_, h, ap) => `${to24(h, ap)}`)
    // Always-on service, however it is written.
    .replace(/24\s*\/\s*7|24 ore su 24|\bh24\b|around the clock|round the clock/gi, " ALWAYSON ");
  const words = [...normalized.matchAll(/(?<![\p{L}\d])(\p{Lu}[\p{Lu}\d]+(?:-\d+)?)s?(?![\p{L}\d])/gu)]
    .map((m) => m[1])
    .map((w) => (lang === "it" ? IT_TO_EN[w] ?? w : w))
    .map((w) => SAME_CLASS[w] ?? w)
    .filter((w) => !DROP.has(w));
  // Thousands separators differ (10.000 / 10,000); decimal commas become points.
  const numbers = (normalized.match(/\d+(?:[.,:]\d+)*/g) ?? []).map((n) =>
    /^\d{1,3}([.,]\d{3})+$/.test(n) ? n.replace(/[.,]/g, "") : n.replace(",", ".")
  );
  // Example domains are localized (*.azienda.it / *.company.com): only the wildcard matters.
  const wildcards = (normalized.match(/\*\.[\w.]+/g) ?? []).map(() => "*.domain");
  const traversal = normalized.includes("../") ? ["../"] : [];
  return new Set([...words, ...numbers, ...wildcards, ...traversal]);
}

/** Describes how two translations of the same sentence differ, or null if they agree. */
export function factDrift(itText: string, enText: string): string | null {
  const it = facts(itText, "it");
  const en = facts(enText, "en");
  for (const [acronym, pattern] of Object.entries(SPELLED_OUT_IN_ITALIAN)) {
    if (en.has(acronym) && pattern.test(itText)) it.add(acronym);
  }
  for (const [acronym, pattern] of Object.entries(SPELLED_OUT_IN_ENGLISH)) {
    if (it.has(acronym) && pattern.test(enText)) en.add(acronym);
  }
  const onlyIt = [...it].filter((x) => !en.has(x)).sort();
  const onlyEn = [...en].filter((x) => !it.has(x)).sort();
  return onlyIt.length || onlyEn.length ? `only IT [${onlyIt.join(" ")}] only EN [${onlyEn.join(" ")}]` : null;
}
