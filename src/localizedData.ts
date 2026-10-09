import { TopicGroup, Subtopic, Question, type Deprecation } from "./types";
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
import { CERTIFICATE_REVOCATION_TOPICS_IT, CERTIFICATE_REVOCATION_TOPICS_EN } from "./certificateRevocationTopics";
import { EAP_METHOD_TOPICS } from "./eapMethodTopics";
import { acronymAppendixTopics } from "./acronymAppendixTopics";
import { CANONICAL_TERMS, conceptRef, parseConceptRef } from "./canonicalTerms";
import {
  PHYSICAL_VECTOR_QUESTIONS,
  PHYSICAL_VECTOR_QUESTION_EN,
  PHYSICAL_VECTOR_QUESTION_EN_EXTRA,
} from "./physicalVectorQuestions";
import {
  DOMAIN_1_ATTACK_QUESTIONS,
  DOMAIN_2_ATTACK_QUESTIONS,
  DOMAIN_1_ATTACK_QUESTION_EN,
  DOMAIN_2_ATTACK_QUESTION_EN,
} from "./attackTopicQuestions";
import { NETWORK_CLOUD_QUESTIONS, NETWORK_CLOUD_QUESTION_EN } from "./networkCloudQuestions";
import {
  IAM_HARDENING_COMPLIANCE_QUESTIONS,
  IAM_HARDENING_COMPLIANCE_QUESTION_EN,
} from "./iamHardeningComplianceQuestions";

/**
 * Deprecated content stays in the dataset, so its id keeps pointing at
 * something, but the app no longer shows it, draws it in a quiz or counts it.
 */
export const isActive = (item: { deprecated?: Deprecation }): boolean => !item.deprecated;

const activeTopics = (groups: TopicGroup[]): TopicGroup[] =>
  groups
    .map((g) => (g.subtopics.every(isActive) ? g : { ...g, subtopics: g.subtopics.filter(isActive) }))
    .filter((g) => g.subtopics.length > 0);

const IT_TOPICS: Record<number, TopicGroup[]> = {
  1: activeTopics(DOMAIN_1_TOPICS),
  2: activeTopics(DOMAIN_2_TOPICS),
  3: activeTopics(DOMAIN_3_TOPICS),
  4: activeTopics(DOMAIN_4_TOPICS),
  5: activeTopics(DOMAIN_5_TOPICS),
};

const IT_QUESTIONS: Record<number, Question[]> = {
  1: [...DOMAIN_1_QUESTIONS.filter(isActive), ...(PHYSICAL_VECTOR_QUESTIONS[1] ?? []), ...DOMAIN_1_ATTACK_QUESTIONS],
  2: [...DOMAIN_2_QUESTIONS.filter(isActive), ...(PHYSICAL_VECTOR_QUESTIONS[2] ?? []), ...DOMAIN_2_ATTACK_QUESTIONS],
  3: [...DOMAIN_3_QUESTIONS.filter(isActive), ...(NETWORK_CLOUD_QUESTIONS[3] ?? [])],
  4: [...DOMAIN_4_QUESTIONS.filter(isActive), ...(NETWORK_CLOUD_QUESTIONS[4] ?? []), ...(IAM_HARDENING_COMPLIANCE_QUESTIONS[4] ?? [])],
  5: [...DOMAIN_5_QUESTIONS.filter(isActive), ...(IAM_HARDENING_COMPLIANCE_QUESTIONS[5] ?? [])],
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

/**
 * Localized topic groups before canonical definitions are filled in. A
 * canonical entry is never itself a duplicate, so resolving reads from this
 * layer and cannot loop (Domain 4 points to Domain 5 and Domain 5 to Domain 4).
 */
function refineEapParent(groups: TopicGroup[], lang: Lang): TopicGroup[] {
  return groups.map((group) => ({
    ...group,
    subtopics: group.subtopics.map((sub) => sub.checklistKey === "EAPProtocol_New"
      ? {
          ...sub,
          definition: lang === "it"
            ? "EAP offre metodi diversi per autenticare il client e, quando previsto, il server tramite 802.1X."
            : "EAP provides different methods to authenticate the client and, when provided, the server through 802.1X.",
          details: lang === "it"
            ? "EAP-TLS, EAP-TTLS e PEAP differiscono per credenziali client e uso del tunnel TLS. Consulta le rispettive voci autonome e la guida D4.1 per il confronto. In ogni metodo il client deve validare CA e identità del server secondo un profilo gestito; i ruoli supplicant, authenticator e authentication server sono spiegati nella voce 802.1X. **Piccolo Esempio Concentrato:** nell'esempio Kestrelia, un profilo EAP-TTLS verifica il nome RADIUS atteso prima dell'invio delle credenziali."
            : "EAP-TLS, EAP-TTLS, and PEAP differ in client credentials and TLS-tunnel use. See their standalone entries and the D4.1 guide for comparison. In every method, the client must validate the server CA and identity according to a managed profile; supplicant, authenticator, and authentication-server roles are explained in the 802.1X entry. **Mini-Example:** in the Kestrelia example, an EAP-TTLS profile checks the expected RADIUS name before sending credentials.",
          examTip: lang === "it"
            ? "Il certificato del server non è un secondo fattore dell'utente. La fiducia richiede la validazione della catena CA e dell'identità attesa; un profilo gestito riduce il rischio di accettare un access point malevolo."
            : "A server certificate is not a second user factor. Trust requires validation of the CA chain and expected identity; a managed profile reduces the risk of accepting a malicious access point."
        }
      : sub)
  }));
}

function getBaseTopics(domainId: number, lang: Lang): TopicGroup[] {
  const it = IT_TOPICS[domainId] || [];
  // Falls back to Italian if the overlay chunk has not landed yet; the
  // LanguageProvider awaits it before switching, so this is a safety net.
  if (lang === "it" || !englishOverlay) {
    const localized = refineEapParent(it, "it");
    const withEap = domainId === 3 ? [...localized, EAP_METHOD_TOPICS.it] : localized;
    const withRevocation = domainId === 1 ? [...withEap, ...CERTIFICATE_REVOCATION_TOPICS_IT] : withEap;
    return [...withRevocation, ...acronymAppendixTopics(domainId, "it")];
  }
  const cache = (baseTopicsCache[lang] ??= {});
  // English subtopic overrides are scoped per domain because checklistKeys
  // are not globally unique across domains.
  if (!cache[domainId]) {
    const subOverrides = englishOverlay.SUBTOPIC_EN[domainId] || {};
    const localized = it.map((g) => localizeGroup(g, englishOverlay!.GROUP_EN, subOverrides));
    cache[domainId] = refineEapParent(localized, "en");
  }
  const withEap = domainId === 3 ? [...cache[domainId], EAP_METHOD_TOPICS.en] : cache[domainId];
  const withRevocation = domainId === 1 ? [...withEap, ...CERTIFICATE_REVOCATION_TOPICS_EN] : withEap;
  return [...withRevocation, ...acronymAppendixTopics(domainId, "en")];
}
const baseTopicsCache: Partial<Record<Lang, Record<number, TopicGroup[]>>> = {};

/** A duplicate concept with the definition of its canonical entry (src/canonicalTerms.ts). */
function withCanonicalDefinition(domainId: number, sub: Subtopic, lang: Lang): Subtopic {
  const target = CANONICAL_TERMS[conceptRef(domainId, sub.checklistKey)];
  if (!target) return sub;
  const { domainId: canonicalDomain, checklistKey } = parseConceptRef(target);
  const canonical = getBaseTopics(canonicalDomain, lang)
    .flatMap((g) => g.subtopics)
    .find((s) => s.checklistKey === checklistKey);
  // tests/canonicalTerms.test.ts guarantees the target exists and is active.
  if (!canonical) return sub;
  return {
    ...sub,
    definition: canonical.definition,
    canonical: { domainId: canonicalDomain, checklistKey, name: canonical.name },
  };
}

/** Localized topic groups for a domain. Italian is the source of truth. */
export function getDomainTopics(domainId: number, lang: Lang): TopicGroup[] {
  const effectiveLang: Lang = lang === "en" && englishOverlay ? "en" : "it";
  const cache = (topicsCache[effectiveLang] ??= {});
  if (!cache[domainId]) {
    cache[domainId] = getBaseTopics(domainId, effectiveLang).map((g) => ({
      ...g,
      subtopics: g.subtopics.map((s) => withCanonicalDefinition(domainId, s, effectiveLang)),
    }));
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
      effectiveLang === "en" ? {
        ...(englishOverlay!.QUESTION_EN[domainId] || {}),
        ...(PHYSICAL_VECTOR_QUESTION_EN[domainId] || {}),
        ...(PHYSICAL_VECTOR_QUESTION_EN_EXTRA[domainId] || {}),
        ...(NETWORK_CLOUD_QUESTION_EN[domainId] || {}),
        ...(IAM_HARDENING_COMPLIANCE_QUESTION_EN[domainId] || {}),
        ...(domainId === 1 ? DOMAIN_1_ATTACK_QUESTION_EN : DOMAIN_2_ATTACK_QUESTION_EN),
      } : {};
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
