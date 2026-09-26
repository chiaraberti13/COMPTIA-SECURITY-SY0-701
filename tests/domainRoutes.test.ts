import { describe, expect, it } from "vitest";
import { DOMAIN_ROUTES, getDomainRoute, type DomainId } from "../src/domainRoutes";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { factDrift } from "./helpers/languageFacts";

const DOMAINS: DomainId[] = [1, 2, 3, 4, 5];

describe("domain routes", () => {
  it("give every domain at least two steps before and two steps after", () => {
    for (const d of DOMAINS) {
      expect(DOMAIN_ROUTES[d].before.length, `domain ${d} before`).toBeGreaterThanOrEqual(2);
      expect(DOMAIN_ROUTES[d].next.length, `domain ${d} next`).toBeGreaterThanOrEqual(2);
    }
  });

  it("link only to official objectives of another domain, with the right guide", () => {
    for (const d of DOMAINS) {
      for (const step of [...DOMAIN_ROUTES[d].before, ...DOMAIN_ROUTES[d].next]) {
        if (step.action?.kind !== "guide") continue;
        const code = step.action.objective;
        expect(code, `domain ${d}: a guide link must name its objective`).toBeDefined();
        expect(ALL_OBJECTIVES).toContain(code);
        expect(step.action.domain).toBe(Number(code![0]));
        expect(step.action.domain, `domain ${d} links to itself`).not.toBe(d);
      }
    }
  });

  it("follow the order of the syllabus: prerequisites come from earlier domains, next steps from later ones", () => {
    for (const d of DOMAINS) {
      for (const step of DOMAIN_ROUTES[d].before) {
        if (step.action?.kind === "guide") expect(step.action.domain).toBeLessThan(d);
      }
      for (const step of DOMAIN_ROUTES[d].next) {
        if (step.action?.kind === "guide") expect(step.action.domain).toBeGreaterThan(d);
      }
    }
  });

  it("let every domain after the first build on at least one earlier objective", () => {
    for (const d of DOMAINS.slice(1)) {
      expect(DOMAIN_ROUTES[d].before.some((s) => s.action?.kind === "guide"), `domain ${d}`).toBe(true);
    }
  });

  it("offer an action for every next step, so the learner always knows where to click", () => {
    for (const d of DOMAINS) {
      for (const step of DOMAIN_ROUTES[d].next) expect(step.action, `domain ${d}: ${step.it}`).toBeDefined();
    }
  });

  it("keep numbers and acronyms identical in Italian and English", () => {
    const drift: string[] = [];
    for (const d of DOMAINS) {
      for (const step of [...DOMAIN_ROUTES[d].before, ...DOMAIN_ROUTES[d].next]) {
        const diff = factDrift(step.it, step.en);
        if (diff) drift.push(`domain ${d}: ${diff}`);
      }
    }
    expect(drift).toEqual([]);
  });

  it("localize the text without changing the actions", () => {
    for (const d of DOMAINS) {
      const it = getDomainRoute(d, "it");
      const en = getDomainRoute(d, "en");
      expect(en.before.map((s) => s.action)).toEqual(it.before.map((s) => s.action));
      expect(en.next.map((s) => s.action)).toEqual(it.next.map((s) => s.action));
      expect(it.before[0].text).toBe(DOMAIN_ROUTES[d].before[0].it);
      expect(en.next[0].text).toBe(DOMAIN_ROUTES[d].next[0].en);
    }
  });
});
