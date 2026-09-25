import { TopicGroup, Subtopic, Question } from "./types";
import {
  DOMAIN_1_TOPICS,
  DOMAIN_2_TOPICS,
  DOMAIN_3_TOPICS,
  DOMAIN_4_TOPICS,
  DOMAIN_5_TOPICS,
  DOMAIN_1_QUESTIONS,
  DOMAIN_2_QUESTIONS,
  DOMAIN_3_QUESTIONS,
  DOMAIN_4_QUESTIONS,
  DOMAIN_5_QUESTIONS,
} from "./data";
import type { GroupOverride, SubtopicOverride, QuestionOverride } from "./data.en";
import type { Lang } from "./i18n";

const IT_TOPICS: Record<number, TopicGroup[]> = {
  1: DOMAIN_1_TOPICS,
  2: DOMAIN_2_TOPICS,
  3: DOMAIN_3_TOPICS,
  4: DOMAIN_4_TOPICS,
  5: DOMAIN_5_TOPICS,
};

const IT_QUESTIONS: Record<number, Question[]> = {
  1: DOMAIN_1_QUESTIONS,
  2: DOMAIN_2_QUESTIONS,
  3: DOMAIN_3_QUESTIONS,
  4: DOMAIN_4_QUESTIONS,
  5: DOMAIN_5_QUESTIONS,
};

/* ------------------------------------------------------------------ *
 * Lazily loaded English overlay.
 *
 * `data.en.ts` is ~1.6 MB of source. Importing it statically put it in the
 * initial bundle for every visitor, including the Italian ones who never read
 * a single string from it. It is now a dynamic import, so it becomes its own
 * chunk that is fetched only when the user actually runs the app in English.
 * ------------------------------------------------------------------ */

interface EnglishOverlay {
  GROUP_EN: Record<string, GroupOverride>;
  SUBTOPIC_EN: Record<number, Record<string, SubtopicOverride>>;
  QUESTION_EN: Record<number, Record<number, QuestionOverride>>;
}

let englishOverlay: EnglishOverlay | null = null;
let englishOverlayPromise: Promise<EnglishOverlay> | null = null;

/** True once the English dataset chunk has been downloaded and is usable. */
export function isEnglishOverlayReady(): boolean {
  return englishOverlay !== null;
}

/**
 * Downloads the English overlay chunk (idempotent: concurrent callers share
 * one in-flight request, and later calls resolve immediately).
 */
export function loadEnglishOverlay(): Promise<EnglishOverlay> {
  if (englishOverlay) return Promise.resolve(englishOverlay);
  if (!englishOverlayPromise) {
    englishOverlayPromise = import("./data.en")
      .then((m) => {
        englishOverlay = {
          GROUP_EN: m.GROUP_EN,
          SUBTOPIC_EN: m.SUBTOPIC_EN,
          QUESTION_EN: m.QUESTION_EN,
        };
        return englishOverlay;
      })
      .catch((err) => {
        // Allow a later retry instead of caching the failure forever.
        englishOverlayPromise = null;
        throw err;
      });
  }
  return englishOverlayPromise;
}

/* ------------------------------------------------------------------ *
 * Per-language memoized caches so the overlay work happens once.
 * ------------------------------------------------------------------ */

const topicsCache: Partial<Record<Lang, Record<number, TopicGroup[]>>> = {};
const questionsCache: Partial<Record<Lang, Record<number, Question[]>>> = {};

type SubtopicOverrides = Record<string, SubtopicOverride | undefined>;
type QuestionOverrides = Record<number, QuestionOverride | undefined>;

function localizeSubtopic(sub: Subtopic, subOverrides: SubtopicOverrides): Subtopic {
  const o = subOverrides[sub.checklistKey];
  if (!o) return sub;
  return {
    ...sub,
    name: o.name ?? sub.name,
    definition: o.definition ?? sub.definition,
    details: o.details ?? sub.details,
    examTip: o.examTip ?? sub.examTip,
    keyFormulas: o.keyFormulas ?? sub.keyFormulas,
    comparativeTable: o.comparativeTable ?? sub.comparativeTable,
  };
}

function localizeGroup(
  group: TopicGroup,
  groupOverrides: Record<string, GroupOverride>,
  subOverrides: SubtopicOverrides
): TopicGroup {
  const g = groupOverrides[group.title];
  return {
    ...group,
    title: g?.title ?? group.title,
    description: g?.description ?? group.description,
    subtopics: group.subtopics.map((s) => localizeSubtopic(s, subOverrides)),
  };
}

function localizeQuestion(q: Question, qOverrides: QuestionOverrides): Question {
  const o = qOverrides[q.id];
  if (!o) return q;
  return {
    ...q,
    topic: o.topic ?? q.topic,
    scenario: o.scenario ?? q.scenario,
    question: o.question ?? q.question,
    options: o.options ?? q.options,
    explanation: o.explanation ?? q.explanation,
  };
}

/**
 * Globally unique question id.
 *
 * The source dataset numbers questions per domain, so the same id appears in
 * several domains (130 collisions before this was introduced). Anything that
 * keys questions by id — answer maps, wrong-answer tracking, the language
 * re-mapping effect — needs ids that are unique across the whole app, so the
 * domain is folded into the id: source id 141 of domain 1 becomes 10141.
 */
export const questionUid = (domainId: number, sourceId: number): number =>
  domainId * 10000 + sourceId;

/** The domain a namespaced question id belongs to. */
export const domainOfQuestion = (uid: number): number => Math.floor(uid / 10000);

/** The id a namespaced question has in its domain's dataset. */
export const sourceQuestionId = (uid: number): number => uid % 10000;

/** Localized topic groups for a domain. Italian is the source of truth. */
export function getDomainTopics(domainId: number, lang: Lang): TopicGroup[] {
  const it = IT_TOPICS[domainId] || [];
  // Falls back to Italian if the overlay chunk has not landed yet; the
  // LanguageProvider awaits it before switching, so this is a safety net.
  if (lang === "it" || !englishOverlay) return it;
  const cache = (topicsCache[lang] ??= {});
  if (!cache[domainId]) {
    // English subtopic overrides are scoped per domain because checklistKeys
    // are not globally unique across domains.
    const subOverrides = englishOverlay.SUBTOPIC_EN[domainId] || {};
    cache[domainId] = it.map((g) => localizeGroup(g, englishOverlay!.GROUP_EN, subOverrides));
  }
  return cache[domainId];
}

/**
 * Localized questions for a domain, with globally unique ids.
 * Italian is the source of truth.
 */
export function getDomainQuestions(domainId: number, lang: Lang): Question[] {
  const it = IT_QUESTIONS[domainId] || [];
  const effectiveLang: Lang = lang === "en" && englishOverlay ? "en" : "it";
  const cache = (questionsCache[effectiveLang] ??= {});
  if (!cache[domainId]) {
    // English question overrides are scoped per domain because source ids
    // are reused across domains in the Italian source. The overlay is looked
    // up with the original id, then the id is namespaced.
    const qOverrides =
      effectiveLang === "en" ? englishOverlay!.QUESTION_EN[domainId] || {} : {};
    cache[domainId] = it.map((q) => ({
      ...localizeQuestion(q, qOverrides),
      id: questionUid(domainId, q.id),
    }));
  }
  return cache[domainId];
}

/** All localized topic groups keyed by domain id. */
export function getAllTopics(lang: Lang): Record<number, TopicGroup[]> {
  return {
    1: getDomainTopics(1, lang),
    2: getDomainTopics(2, lang),
    3: getDomainTopics(3, lang),
    4: getDomainTopics(4, lang),
    5: getDomainTopics(5, lang),
  };
}

/** All localized questions concatenated (Domain 1..5), like INITIAL_QUESTIONS. */
export function getInitialQuestions(lang: Lang): Question[] {
  return [
    ...getDomainQuestions(1, lang),
    ...getDomainQuestions(2, lang),
    ...getDomainQuestions(3, lang),
    ...getDomainQuestions(4, lang),
    ...getDomainQuestions(5, lang),
  ];
}
