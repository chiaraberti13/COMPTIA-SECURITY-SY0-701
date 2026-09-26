import { useMemo, useState } from "react";
import { useLang } from "../i18n";
import { getDomainTopics } from "../localizedData";
import { sanitizeChecklist } from "../progressBackup";
import { STORAGE_KEYS, readJSON, writeJSON } from "../storage";
import type { Subtopic } from "../types";

export type DomainNumber = 1 | 2 | 3 | 4 | 5;

/**
 * The study area: the domain on screen, the selected concept and the
 * checklist of concepts the learner has ticked (saved in localStorage).
 *
 * Only the key of the selected concept is state; the concept itself is
 * looked up in the active language, so a language switch needs no effect.
 */
export function useStudySession() {
  const { lang } = useLang();
  const [activeDomain, setActiveDomain] = useState<DomainNumber>(1);
  const [selectedKey, setSelectedKey] = useState<string>(
    () => getDomainTopics(1, lang)[0].subtopics[0].checklistKey
  );

  const selectedSubtopic = useMemo<Subtopic>(() => {
    const topics = getDomainTopics(activeDomain, lang);
    for (const group of topics) {
      const found = group.subtopics.find(s => s.checklistKey === selectedKey);
      if (found) return found;
    }
    return topics[0].subtopics[0];
  }, [activeDomain, lang, selectedKey]);

  // Read once, on the first render. Sanitised: localStorage is user-controlled
  // and may hold anything.
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => sanitizeChecklist(readJSON<unknown>(STORAGE_KEYS.checklist, {}))
  );

  const save = (updated: Record<string, boolean>) => {
    setCheckedItems(updated);
    writeJSON(STORAGE_KEYS.checklist, updated);
  };

  /** Shows a domain, starting from its first concept. */
  const switchDomain = (domain: DomainNumber) => {
    setActiveDomain(domain);
    setSelectedKey(getDomainTopics(domain, lang)[0].subtopics[0].checklistKey);
  };

  /** Ticks or unticks one concept. */
  const toggleCheck = (key: string) => save({ ...checkedItems, [key]: !checkedItems[key] });

  /** Ticks every concept of a group, or unticks them all when all are ticked. */
  const toggleGroupCheck = (keys: string[]) => {
    const target = !keys.every(k => !!checkedItems[k]);
    const updated = { ...checkedItems };
    keys.forEach(k => {
      updated[k] = target;
    });
    save(updated);
  };

  return {
    activeDomain,
    selectedSubtopic,
    selectSubtopic: (subtopic: Subtopic) => setSelectedKey(subtopic.checklistKey),
    switchDomain,
    checkedItems,
    toggleCheck,
    toggleGroupCheck,
  };
}
