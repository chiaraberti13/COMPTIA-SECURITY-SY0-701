import { useEffect, useRef } from "react";
import { useLang, type UIKey } from "../i18n";
import { examAnswerComplete, examAnswerCorrect } from "../exam";
import type { ExamSession } from "../hooks/useExamSession";
import { correctIndexes, hasPassedRun, requiredSelections } from "../quiz";
import { gradePbq } from "../pbq";
import { MatchingTask, OrderingTask } from "./PbqScreen";
import MarkdownText, { InlineText } from "./MarkdownText";
import type { StudyAction } from "../studyPaths";

const button = "min-h-11 px-3 py-2 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 disabled:opacity-40";

export default function ExamScreen({ session, onConfigure, onRepeat, onStudyAction }: {
  session: ExamSession; onConfigure: () => void; onRepeat: () => void; onStudyAction: (action: StudyAction) => void;
}) {
  const { t } = useLang();
  const { current, answers, completed, report } = session;
  const heading = useRef<HTMLHeadingElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [session.index]);
  useEffect(() => { if (completed) title.current?.focus(); }, [completed]);
  if (!current) return null;
  const answer = answers[current.key];
  const correct = examAnswerCorrect(current, answer);
  const pbqGrade = completed && current.kind === "pbq"
    ? gradePbq(current.pbq, answer?.kind === "pbq" ? answer.response : {}) : null;
  const taskSession = { graded: completed, grade: pbqGrade, order: session.response.order ? [...session.response.order] : [],
    matches: { ...session.response.matches }, moveStepAt: session.moveStepAt, setMatch: session.setMatch };

  return (
    <div id="exam_screen" className="space-y-5" onKeyDown={e => e.stopPropagation()}>
      <h2 ref={title} tabIndex={-1} className="text-lg font-bold text-slate-100">{t(completed ? "exam.results" : "exam.title")}</h2>
      {completed && (
        <section id="exam_results" className="space-y-4" aria-label={t("exam.results")}>
          <p id="exam_score" className="text-xl font-bold text-cyan-300">{report.score} / {report.total} · {t(hasPassedRun(report.score, report.total) ? "quiz.passed" : "quiz.failed")}</p>
          <p className="text-xs text-slate-400">{t("exam.scoring")}</p>
          {session.timeUp && <p role="status" className="text-amber-300 text-sm">{t("quiz.timeUpTitle")}</p>}
          <p className="text-xs text-slate-300">{t("exam.unanswered", { n: report.unanswered })}</p>
          <h3 className="font-bold text-sm text-slate-200">{t("exam.byDomain")}</h3>
          <ul className="space-y-1 text-xs text-slate-300" id="exam_domains">
            {report.domains.map(d => <li key={d.code}>{t("sidebar.domShort", { n: d.code })}: {d.correct}/{d.total} ({d.accuracy}%)</li>)}
          </ul>
          <h3 className="font-bold text-sm text-slate-200">{t("quiz.runByObjectiveTitle")}</h3>
          <p className="text-xs text-slate-400">{t("exam.objectiveHint")}</p>
          <ul className="space-y-2" id="exam_objectives">
            {report.objectives.map(o => <li key={o.code} className="text-xs text-slate-300 space-y-1">
              <p>{o.code} · {t(`objective.${o.code}` as UIKey)}: {o.correct}/{o.total} ({o.accuracy}%)</p>
              <button type="button" className={`${button} text-cyan-300`} onClick={() => onStudyAction({ kind: "guide", domain: Number(o.code[0]) as 1 | 2 | 3 | 4 | 5, objective: o.code })}>
                {t("quiz.runByObjectiveOpen", { code: o.code })}
              </button>
            </li>)}
          </ul>
          <div className="flex flex-wrap gap-2">
            <button type="button" id="exam_repeat" className={button} onClick={onRepeat}>{t("quiz.repeatMain")}</button>
            <button type="button" id="exam_configure" className={button} onClick={onConfigure}>{t("exam.configure")}</button>
          </div>
          <h3 className="text-sm font-bold text-slate-200">{t("quiz.reviewTitle")}</h3>
        </section>
      )}
      {!completed && (
        <>
          <p className="text-xs text-slate-400">{t("exam.inProgress")}</p>
          {session.secondsLeft !== null && <p id="exam_timer" role="timer" className="text-sm font-mono text-amber-300">{t("exam.remaining", { min: Math.floor(session.secondsLeft / 60), sec: String(session.secondsLeft % 60).padStart(2, "0") })}</p>}
          <p id="exam_unanswered" className="text-xs text-slate-300">{t("exam.unanswered", { n: report.unanswered })}</p>
        </>
      )}
      <nav aria-label={t("exam.navigation")} className="flex flex-wrap gap-1.5" id="exam_navigation">
        {session.items.map((item, i) => (
          <button type="button" key={item.key} className={`${button} ${i === session.index ? "border-cyan-400 text-cyan-300" : ""}`}
            aria-current={i === session.index ? "step" : undefined} onClick={() => session.goTo(i)}
            aria-label={t("exam.jump", { i: i + 1 }) + " · " + t(examAnswerComplete(item, answers[item.key]) ? "exam.answered" : "quiz.reviewNoAnswer") + (session.flagged.includes(item.key) ? " · " + t("exam.flagged") : "") }>
            {i + 1}{item.kind === "pbq" ? " P" : ""}{session.flagged.includes(item.key) ? " ★" : ""}{examAnswerComplete(item, answers[item.key]) ? " ✓" : ""}
          </button>
        ))}
      </nav>
      <section id="exam_current" className="space-y-4 border-t border-slate-700 pt-4" aria-label={t("exam.jump", { i: session.index + 1 })}>
        <p className="text-xs font-mono text-cyan-300">{session.index + 1}/{session.items.length} · {t("sidebar.domShort", { n: current.domain })} · {current.kind === "pbq" ? "PBQ" : "MCQ"}</p>
        <p className="text-xs text-slate-400 leading-relaxed"><InlineText text={current.kind === "pbq" ? current.pbq.scenario : current.question.scenario} /></p>
        <h3 ref={heading} tabIndex={-1} className="text-sm text-slate-100 font-bold">{current.kind === "pbq" ? current.pbq.prompt : current.question.question}</h3>
        {current.kind === "question" ? (
          <>
            <p className="text-xs text-slate-400">{t("exam.choose", { n: requiredSelections(current.question) })}</p>
            <div className="space-y-2">
              {current.question.options.map((option, i) => <button type="button" key={i} id={`exam_option_${i}`} disabled={completed}
                aria-pressed={answer?.kind === "question" && answer.selected.includes(i)} onClick={() => session.select(i)}
                className={`${button} w-full text-left ${answer?.kind === "question" && answer.selected.includes(i) ? "border-cyan-400 bg-cyan-950" : ""}`}><InlineText text={option} /></button>)}
            </div>
            {completed && <p className="text-xs text-emerald-300">{t("quiz.reviewCorrectAnswer")}: <InlineText text={correctIndexes(current.question).map(i => current.question.options[i]).join(" · ")} /></p>}
          </>
        ) : current.pbq.mechanic === "ordering"
          ? <OrderingTask session={taskSession} pbq={current.pbq} />
          : <MatchingTask session={taskSession} pbq={current.pbq} />}
        {completed && <div id="exam_explanation" className="space-y-2 text-xs text-slate-300" role="status">
          <p className={correct ? "text-emerald-300" : "text-rose-300"}>{t(correct ? "quiz.verdictCorrect" : "quiz.verdictWrong")}</p>
          {pbqGrade && <p>{t("pbq.scoreLine", { correct: pbqGrade.correct, total: pbqGrade.total })}</p>}
          <MarkdownText text={current.kind === "pbq" ? current.pbq.explanation : current.question.explanation} />
        </div>}
      </section>
      <div className="flex flex-wrap gap-2">
        <button type="button" id="exam_previous" className={button} disabled={session.index === 0} onClick={() => session.goTo(session.index - 1)}>{t("exam.previous")}</button>
        <button type="button" id="exam_next" className={button} disabled={session.index === session.items.length - 1} onClick={() => session.goTo(session.index + 1)}>{t("exam.next")}</button>
        {!completed && <button type="button" id="exam_flag" className={button} aria-pressed={session.flagged.includes(current.key)} onClick={session.toggleFlag}>{t("exam.flag")}</button>}
      </div>
      {!completed && <button type="button" id="exam_finish" className={`${button} w-full border-cyan-500 bg-cyan-800`} onClick={() => session.finish()}>{t("exam.finish", { n: report.unanswered })}</button>}
    </div>
  );
}
