/**
 * Stable links to the study content (ROADMAP: "Gerarchia dei titoli corretta",
 * stable anchors). A concept is addressed by its domain and checklistKey,
 * which never change (tests/conventions.test.ts), so a link shared today, or
 * written in a note, still opens the same concept after the content is
 * edited, in either language:
 *
 *   #studio/4/CVE        the CVE concept of Domain 4
 *   #guida/1             the guide of Domain 1
 *   #guida/1/1.4         objective 1.4 in the guide of Domain 1
 *
 * The hash is typed or pasted by anyone, so it is parsed strictly and only
 * turned into an action when it names something that exists; it is never
 * written into the page.
 */
import type { StudyAction } from "./studyPaths";

export type DomainId = 1 | 2 | 3 | 4 | 5;

export const conceptAnchor = (domain: number, checklistKey: string) => `#studio/${domain}/${checklistKey}`;

export const guideAnchor = (domain: number, objective?: string) => (objective ? `#guida/${domain}/${objective}` : `#guida/${domain}`);

const CONCEPT = /^#studio\/([1-5])\/([A-Za-z][A-Za-z0-9_]{0,63})$/;
const GUIDE = /^#guida\/([1-5])(?:\/([1-5]\.[1-9]))?$/;

/**
 * The study action a location hash asks for, or null when it names nothing
 * known. `conceptExists` and `objectiveExists` check against the dataset, so a
 * stale or forged link does nothing instead of opening an empty view.
 */
export function parseStudyAnchor(
  hash: string,
  conceptExists: (domain: DomainId, checklistKey: string) => boolean,
  objectiveExists: (objective: string) => boolean
): StudyAction | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(hash);
  } catch {
    return null;
  }
  const concept = CONCEPT.exec(decoded);
  if (concept) {
    const domain = Number(concept[1]) as DomainId;
    return conceptExists(domain, concept[2]) ? { kind: "concept", domain, checklistKey: concept[2] } : null;
  }
  const guide = GUIDE.exec(decoded);
  if (guide) {
    const domain = Number(guide[1]) as DomainId;
    const objective = guide[2];
    if (!objective) return { kind: "guide", domain };
    // An objective belongs to its own domain: "#guida/2/1.4" is not a real place.
    return Number(objective[0]) === domain && objectiveExists(objective) ? { kind: "guide", domain, objective } : null;
  }
  return null;
}
