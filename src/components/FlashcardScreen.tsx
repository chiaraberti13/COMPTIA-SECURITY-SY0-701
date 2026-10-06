import { useEffect, useMemo, useState } from "react";
import { Layers, ChevronRight, Check, X, RotateCcw, Eye, ArrowRight, BookOpen } from "lucide-react";
import { useLang, translate, type UIKey } from "../i18n";
import { InlineText } from "./MarkdownText";
import type { FlashcardSession } from "../hooks/useFlashcards";
import {
  deckStats,
  filterDeck,
  objectivesOf,
  selectDueCards,
  type AcronymCard,
  type DeckFilter,
  type FlashcardDirection,
} from "../flashcards";

/**
 * Acronym flashcard drill. A chooser filters the deck by domain and objective
 * and picks the quiz direction (sigla→significato or the reverse); then one
 * card at a time is shown, flipped on demand, and self-assessed with
 * "I knew it / I didn't know it", which feeds the local spaced-repetition
 * schedule. A summary closes the run.
 *
 * Accessibility: everything is driven by real buttons and native <select>
 * controls (operable from the keyboard, with convenience keys Space/Enter to
 * reveal and 1/2 to self-assess); the revealed answer is announced through a
 * polite live region; nothing relies on colour alone (WCAG 1.4.1).
 */
export default function FlashcardScreen({
  session,
  deck,
  onStudyConcept,
}: {
  session: FlashcardSession;
  deck: AcronymCard[];
  onStudyConcept?: (card: AcronymCard) => void;
}) {
  if (!session.started) {
    return <FlashcardSetup session={session} deck={deck} />;
  }
  if (session.finished) {
    return <FlashcardSummary session={session} deck={deck} />;
  }
  if (!session.current) return null;
  return <FlashcardActive session={session} onStudyConcept={onStudyConcept} />;
}

/* ------------------------------------------------------------------ *
 * Chooser
 * ------------------------------------------------------------------ */

function FlashcardSetup({ session, deck }: { session: FlashcardSession; deck: AcronymCard[] }) {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<DeckFilter>({ domain: "all", objective: "all" });
  const [direction, setDirection] = useState<FlashcardDirection>("acronymToExpansion");

  // Objectives available for the chosen domain; reset the objective when the
  // domain changes so a stale (now empty) objective cannot hide the whole deck.
  const objectives = useMemo(() => objectivesOf(deck, filter.domain), [deck, filter.domain]);
  const filtered = useMemo(() => filterDeck(deck, filter), [deck, filter]);
  const stats = useMemo(() => deckStats(filtered, session.progress), [filtered, session.progress]);

  const setDomain = (value: string) =>
    setFilter({ domain: value === "all" ? "all" : Number(value), objective: "all" });

  const startReview = () =>
    session.begin(selectDueCards(filtered, session.progress), direction);
  const startAll = () => session.begin(filtered, direction);

  const domainName = (id: number) => translate(lang, `glossDom.${id}.short` as UIKey);

  return (
    <div className="space-y-5" id="flash_setup">
      <div className="flex items-center gap-2">
        <Layers className="w-5 h-5 text-cyan-400" aria-hidden="true" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200" id="flash_setup_title">
          {t("flash.title")}
        </h2>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed" id="flash_intro">
        {t("flash.intro")}
      </p>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="flash_domain" className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
            {t("flash.filterDomain")}
          </label>
          <select
            id="flash_domain"
            value={filter.domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-2 text-xs"
          >
            <option value="all">{t("flash.allDomains")}</option>
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                {t("flash.domainOption", { id, name: domainName(id) })}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="flash_objective" className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
            {t("flash.filterObjective")}
          </label>
          <select
            id="flash_objective"
            value={filter.objective}
            disabled={objectives.length === 0}
            onChange={(e) => setFilter((f) => ({ ...f, objective: e.target.value }))}
            className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-2 text-xs disabled:opacity-60"
          >
            <option value="all">{t("flash.allObjectives")}</option>
            {objectives.map((code) => (
              <option key={code} value={code}>
                {t("flash.objectiveOption", { code })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Direction */}
      <fieldset className="space-y-2">
        <legend className="text-[10px] font-mono uppercase tracking-wider text-slate-400">{t("flash.direction")}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label={t("flash.direction")}>
          {([
            ["acronymToExpansion", "flash.dirAcronym"],
            ["expansionToAcronym", "flash.dirExpansion"],
          ] as const).map(([value, key]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={direction === value}
              id={`flash_dir_${value}`}
              onClick={() => setDirection(value)}
              className={`px-3 py-2 rounded border text-xs font-semibold transition-all text-left ${
                direction === value
                  ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/40"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800/40"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Stats */}
      <dl className="grid grid-cols-4 gap-2 text-center" id="flash_stats">
        {([
          ["flash.statTotal", stats.total],
          ["flash.statDue", stats.due],
          ["flash.statStarted", stats.started],
          ["flash.statMastered", stats.mastered],
        ] as const).map(([key, value]) => (
          <div key={key} className="p-2 rounded border border-slate-800 bg-slate-950/40">
            <dd className="text-lg font-bold text-cyan-400 tabular-nums">{value}</dd>
            <dt className="text-[9px] font-mono uppercase tracking-wider text-slate-400">{t(key)}</dt>
          </div>
        ))}
      </dl>

      {filtered.length === 0 ? (
        <p className="text-xs text-amber-300" id="flash_empty" role="status">
          {t("flash.emptyDeck")}
        </p>
      ) : (
        <div className="space-y-2">
          <button
            id="flash_start_review"
            onClick={startReview}
            disabled={stats.due === 0}
            className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-900 disabled:text-slate-600 text-white font-bold py-3 rounded transition-all text-xs flex items-center justify-center gap-1.5"
          >
            <span>{t("flash.startReview", { n: stats.due })}</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" aria-hidden="true" />
          </button>
          <button
            id="flash_start_all"
            onClick={startAll}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold py-3 rounded transition-all text-xs"
          >
            {t("flash.startAll", { n: filtered.length })}
          </button>
          {stats.due === 0 && (
            <p className="text-[11px] text-slate-400" id="flash_none_due">
              {t("flash.noneDue")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Active card
 * ------------------------------------------------------------------ */

function FlashcardActive({
  session,
  onStudyConcept,
}: {
  session: FlashcardSession;
  onStudyConcept?: (card: AcronymCard) => void;
}) {
  const { lang, t } = useLang();
  const card = session.current!;
  const acronymIsPrompt = session.direction === "acronymToExpansion";
  const prompt = acronymIsPrompt ? card.acronym : card.expansion;
  const answer = acronymIsPrompt ? card.expansion : card.acronym;

  // Convenience keys: Space/Enter reveals, then 1 = didn't know, 2 = knew.
  // Native button focus already makes the controls keyboard-operable; this just
  // spares the learner a Tab on every card. Typing in a field is left alone.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable)) return;
      if (!session.revealed) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          session.reveal();
        }
        return;
      }
      if (e.key === "1") {
        e.preventDefault();
        session.grade(false);
      } else if (e.key === "2") {
        e.preventDefault();
        session.grade(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [session]);

  const domainName = translate(lang, `glossDom.${card.domainId}.short` as UIKey);

  return (
    <div className="space-y-6" id="flash_active">
      <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400" id="flash_progress">
        <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold truncate">
          {acronymIsPrompt ? t("flash.dirAcronym") : t("flash.dirExpansion")}
        </span>
        <span className="shrink-0">{t("flash.progress", { i: session.index + 1, n: session.cards.length })}</span>
      </div>

      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${((session.index + 1) / session.cards.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-400" id="flash_card_meta">
        <span className="bg-slate-800/60 px-2 py-0.5 rounded">{t("flash.domainOption", { id: card.domainId, name: domainName })}</span>
        {card.objectives.map((code) => (
          <span key={code} className="bg-slate-800/60 px-2 py-0.5 rounded">{t("flash.objectiveOption", { code })}</span>
        ))}
      </div>

      {/* Prompt side */}
      <div className="p-5 rounded-lg border border-slate-800 bg-slate-950/60 text-center space-y-1" id="flash_prompt_box">
        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {acronymIsPrompt ? t("flash.acronymLabel") : t("flash.answerLabel")}
        </p>
        <p className={`font-bold text-slate-100 ${acronymIsPrompt ? "text-3xl tracking-wide" : "text-xl leading-snug"}`} id="flash_prompt">
          {prompt}
        </p>
        <p className="text-[11px] text-slate-400">
          {acronymIsPrompt ? t("flash.promptAcronym") : t("flash.promptExpansion")}
        </p>
      </div>

      {/* Answer side (revealed on demand) */}
      <p className="sr-only" role="status" aria-live="polite" id="flash_answer_announcer">
        {session.revealed ? t("flash.answerAnnounce", { answer }) : ""}
      </p>

      {session.revealed ? (
        <div className="space-y-4" id="flash_answer">
          <div className="p-4 rounded-lg border border-cyan-500/30 bg-cyan-500/[0.04] text-center space-y-1" id="flash_answer_box">
            <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              {acronymIsPrompt ? t("flash.answerLabel") : t("flash.acronymLabel")}
            </p>
            <p className={`font-bold text-cyan-200 ${acronymIsPrompt ? "text-xl leading-snug" : "text-3xl tracking-wide"}`} id="flash_answer_text">
              {answer}
            </p>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed space-y-2" id="flash_answer_detail">
            <p><InlineText text={card.definition} /></p>
            {card.examTip && (
              <p className="text-[11px] text-amber-200/90 bg-amber-500/[0.06] border border-amber-500/20 rounded p-2.5">
                <span className="font-semibold text-amber-300">{t("flash.examTipLabel")} </span>
                <InlineText text={card.examTip} />
              </p>
            )}
            {onStudyConcept && (
              <button
                type="button"
                id="flash_study_concept"
                onClick={() => onStudyConcept(card)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                {t("flash.studyConcept")}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2" id="flash_grade">
            <button
              id="flash_didnt_know"
              onClick={() => session.grade(false)}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-rose-500/40 text-rose-200 font-bold py-3 rounded transition-all text-xs"
            >
              <X className="w-4 h-4" aria-hidden="true" />
              {t("flash.didntKnow")}
            </button>
            <button
              id="flash_knew"
              onClick={() => session.grade(true)}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-emerald-500/40 text-emerald-200 font-bold py-3 rounded transition-all text-xs"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              {t("flash.knew")}
            </button>
          </div>
        </div>
      ) : (
        <button
          id="flash_reveal"
          onClick={session.reveal}
          className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 rounded transition-all text-xs flex items-center justify-center gap-1.5"
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          {t("flash.reveal")}
        </button>
      )}

      <button
        id="flash_exit"
        onClick={session.exit}
        className="w-full text-[11px] text-slate-400 hover:text-slate-300 transition-colors py-1"
      >
        {t("flash.exit")}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Summary
 * ------------------------------------------------------------------ */

function FlashcardSummary({ session, deck }: { session: FlashcardSession; deck: AcronymCard[] }) {
  const { t } = useLang();
  const knew = session.results.filter((r) => r.knew).length;
  const total = session.results.length;
  const byId = new Map(deck.map((c) => [c.id, c]));
  const missed = session.results.filter((r) => !r.knew);
  const lastRun = session.results.map((r) => byId.get(r.id)).filter((c): c is AcronymCard => !!c);

  return (
    <div className="space-y-5" id="flash_summary">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200" id="flash_summary_title">
        {t("flash.summaryTitle")}
      </h2>
      <div className="p-4 rounded border border-slate-800 bg-slate-950/40 text-center space-y-1" id="flash_summary_score">
        <p className="text-2xl font-bold text-cyan-400 tabular-nums">{t("flash.summaryScore", { knew, total })}</p>
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{t("flash.summaryNote")}</p>
      </div>

      {missed.length > 0 && (
        <div className="space-y-2" id="flash_missed">
          <h3 className="text-[11px] font-mono uppercase tracking-wider text-rose-300">{t("flash.missedTitle")}</h3>
          <ul className="space-y-1.5">
            {missed.map((r) => {
              const card = byId.get(r.id);
              if (!card) return null;
              return (
                <li key={r.id} className="flex items-center gap-2 p-2 rounded border border-slate-800 bg-slate-950/40 text-xs">
                  <span className="font-bold text-slate-200 w-24 shrink-0">{card.acronym}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 text-slate-400">{card.expansion}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <button
          id="flash_restart"
          onClick={() => session.begin(lastRun, session.direction)}
          disabled={lastRun.length === 0}
          className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-900 disabled:text-slate-600 text-white font-bold py-3 rounded transition-all text-xs flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{t("flash.restart")}</span>
        </button>
        <button
          id="flash_back"
          onClick={session.exit}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold py-3 rounded transition-all text-xs"
        >
          {t("flash.backToList")}
        </button>
      </div>
    </div>
  );
}
