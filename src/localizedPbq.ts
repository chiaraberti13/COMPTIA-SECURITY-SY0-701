/**
 * Localised performance-based scenarios. Italian (src/pbqData.ts) is the source
 * of truth; the English overlay (src/pbqData.en.ts) carries text only, keyed by
 * the same stable ids.
 *
 * Unlike the ~2 MB question dataset, these ten scenarios are tiny, so the
 * English overlay is imported statically rather than lazily: there is no bundle
 * cost worth deferring, and every language switch finds the text already loaded.
 */
import type { Lang } from "./i18n";
import type { MatchingPbq, OrderingPbq, Pbq } from "./pbq";
import { PBQ_SCENARIOS } from "./pbqData";
import { PBQ_EN, type PbqOverride } from "./pbqData.en";

function localizeScenario(pbq: Pbq, o: PbqOverride): Pbq {
  const base = {
    ...pbq,
    title: o.title,
    scenario: o.scenario,
    prompt: o.prompt,
    explanation: o.explanation,
  };
  if (base.mechanic === "ordering") {
    const steps = (pbq as OrderingPbq).steps.map((s) => ({
      ...s,
      text: o.steps?.[s.id] ?? s.text,
    }));
    return { ...(base as OrderingPbq), steps };
  }
  const matching = pbq as MatchingPbq;
  return {
    ...(base as MatchingPbq),
    prompts: matching.prompts.map((p) => ({ ...p, text: o.prompts?.[p.id] ?? p.text })),
    options: matching.options.map((opt) => ({ ...opt, text: o.options?.[opt.id] ?? opt.text })),
  };
}

const cache: Partial<Record<Lang, Pbq[]>> = {};

/** All scenarios in the given language. Italian is returned as authored. */
export function getPbqScenarios(lang: Lang): Pbq[] {
  if (lang === "it") return PBQ_SCENARIOS;
  if (!cache.en) {
    cache.en = PBQ_SCENARIOS.map((pbq) => {
      const o = PBQ_EN[pbq.id];
      return o ? localizeScenario(pbq, o) : pbq;
    });
  }
  return cache.en;
}

/** A single scenario by id, in the given language, or undefined if unknown. */
export function getPbqById(id: number, lang: Lang): Pbq | undefined {
  return getPbqScenarios(lang).find((p) => p.id === id);
}
