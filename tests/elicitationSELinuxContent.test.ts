import { beforeAll, describe, expect, it } from "vitest";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";

/*
 * Roadmap task 9 (elicitation & identity fraud, Obj 2.2) and task 13 (SELinux,
 * MAC vs DAC and UAC, Obj 4.5/1.2): autonomous, searchable glossary entries
 * that reuse existing social-engineering and access-model content without
 * duplicating it, keeping collection/abuse and MAC/UAC/sandbox distinct.
 */

beforeAll(loadEnglishOverlay);

const EXAMPLE = { it: /Piccolo Esempio Concentrato/, en: /Focused Mini-Example/ } as const;

describe.each(["it", "en"] as const)("elicitation / identity fraud / SELinux (%s)", (lang) => {
  const byKey = (k: string) => Object.values(getAllTopics(lang)).flat().flatMap((g) => g.subtopics).find((s) => s.checklistKey === k);

  it("adds autonomous entries with a definition and a worked example", () => {
    for (const key of ["ElicitationSE", "IdentityFraudSE", "SELinuxOS"]) {
      const c = byKey(key);
      expect(c, key).toBeTruthy();
      expect(c!.definition.length).toBeGreaterThan(30);
      expect(c!.details).toMatch(EXAMPLE[lang]);
      expect(c!.examTip.length).toBeGreaterThan(0);
    }
  });

  it("keeps elicitation distinct from pretexting and impersonation", () => {
    const c = byKey("ElicitationSE")!;
    expect(c.details.toLowerCase()).toContain("pretext");
    expect(c.details.toLowerCase()).toContain("impersonation");
  });

  it("separates collecting identity data from committing fraud", () => {
    const c = byKey("IdentityFraudSE")!;
    expect(c.examTip.toLowerCase()).toMatch(lang === "it" ? /raccolta/ : /collection/);
    expect(c.examTip.toLowerCase()).toMatch(lang === "it" ? /abuso/ : /abuse/);
  });

  it("explains SELinux as MAC over DAC and distinguishes UAC and sandbox", () => {
    const c = byKey("SELinuxOS")!;
    expect(c.details).toContain("MAC");
    expect(c.details).toContain("DAC");
    expect(c.details.toLowerCase()).toContain("type enforcement");
    expect(c.examTip).toContain("UAC");
    expect(c.examTip.toLowerCase()).toContain("sandbox");
  });
});
