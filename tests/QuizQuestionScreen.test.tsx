// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import QuizQuestionScreen from "../src/components/QuizQuestionScreen";
import { useQuizSession } from "../src/hooks/useQuizSession";
import { LanguageProvider, useLang } from "../src/i18n";
import { getDomainQuestions, loadEnglishOverlay, sourceQuestionId } from "../src/localizedData";
import { correctIndexes, isMultiResponse } from "../src/quiz";
import type { Question } from "../src/types";

/*
 * The question screen of the simulator as the learner uses it: the real
 * session hook, the real screen and the real language provider, with the
 * interactions a screen reader user depends on (radio or checkbox roles,
 * the verdict in words, the live announcement) and the language switch in
 * the middle of a run.
 */

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
});
afterEach(cleanup);

/** Starts a run on the given questions and shows the current one, with a language toggle. */
function Harness({ questions }: { questions: Question[] }) {
  const quiz = useQuizSession({ paused: false });
  const { toggleLang, lang } = useLang();
  return (
    <>
      <button onClick={() => quiz.begin(questions)}>start</button>
      <button onClick={toggleLang}>lang {lang}</button>
      {quiz.quizStarted && !quiz.quizCompleted && (
        <QuizQuestionScreen quiz={quiz} glossaryIndex={new Map()} levelLabel={(level) => level} />
      )}
      {quiz.quizCompleted && <p>score {quiz.quizScore}</p>}
    </>
  );
}

function renderRun(questions: Question[]) {
  render(
    <LanguageProvider>
      <Harness questions={questions} />
    </LanguageProvider>
  );
  fireEvent.click(screen.getByText("start"));
}

const single = getDomainQuestions(1, "it").filter((q) => !isMultiResponse(q)).slice(0, 2);
const multi = getDomainQuestions(1, "it").find(isMultiResponse);

describe("QuizQuestionScreen", () => {
  it("offers the options as radio buttons of a labelled group, and confirms only after a pick", () => {
    renderRun(single);
    const group = screen.getByRole("radiogroup", { name: "Opzioni di risposta" });
    const options = within(group).getAllByRole("radio");
    expect(options).toHaveLength(single[0].options.length);
    const confirm = screen.getByRole("button", { name: /Conferma Risposta/ });
    expect(confirm).toHaveProperty("disabled", true);

    fireEvent.click(options[1]);
    expect(options[1].getAttribute("aria-checked")).toBe("true");
    expect(options[0].getAttribute("aria-checked")).toBe("false");
    expect(confirm).toHaveProperty("disabled", false);
  });

  it("says the verdict in words, on the options and to screen readers", () => {
    renderRun(single);
    const right = correctIndexes(single[0])[0];
    const wrong = (right + 1) % single[0].options.length;
    fireEvent.click(screen.getAllByRole("radio")[wrong]);
    fireEvent.click(screen.getByRole("button", { name: /Conferma Risposta/ }));

    // The live region was mounted before the answer, so the verdict is announced.
    expect(document.getElementById("quiz_feedback_announcer")?.textContent).toBe("DISTRATTORE RILEVATO");
    const options = screen.getAllByRole("radio");
    expect(options[right].textContent).toContain("Risposta corretta");
    expect(options[wrong].textContent).toContain("La tua risposta");
    // Answered options cannot be changed.
    for (const option of options) expect(option).toHaveProperty("disabled", true);
  });

  it("asks for every answer of a multi-response question, as checkboxes", () => {
    expect(multi, "the bank has a multi-response question").toBeDefined();
    renderRun([multi!]);
    const needed = correctIndexes(multi!).length;
    expect(screen.getByText(`Seleziona ${needed} risposte`)).toBeTruthy();
    const boxes = screen.getAllByRole("checkbox");
    const confirm = screen.getByRole("button", { name: /Conferma Risposta/ });
    fireEvent.click(boxes[correctIndexes(multi!)[0]]);
    expect(confirm).toHaveProperty("disabled", true);
    fireEvent.click(boxes[correctIndexes(multi!)[1]]);
    expect(confirm).toHaveProperty("disabled", false);
    fireEvent.click(confirm);
    expect(document.getElementById("quiz_feedback_announcer")?.textContent).toBe("BEST CHOICE SELEZIONATA");
  });

  it("switches language in the middle of a run without losing the question or the answer", async () => {
    await loadEnglishOverlay();
    renderRun(single);
    const right = correctIndexes(single[0])[0];
    fireEvent.click(screen.getAllByRole("radio")[right]);
    fireEvent.click(screen.getByRole("button", { name: /Conferma Risposta/ }));

    await act(async () => fireEvent.click(screen.getByText("lang it")));
    await waitFor(() => expect(screen.getByText("lang en")).toBeTruthy());

    // Same question, now in English, still answered and still right.
    const english = getDomainQuestions(1, "en").find((q) => sourceQuestionId(q.id) === sourceQuestionId(single[0].id))!;
    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(english.question);
    expect(screen.getByRole("radiogroup", { name: "Answer options" })).toBeTruthy();
    expect(document.getElementById("quiz_feedback_announcer")?.textContent).toBe("BEST CHOICE SELECTED");
    expect(screen.getAllByRole("radio")[right].textContent).toContain("Correct answer");

    // The run goes on in the new language up to its result.
    fireEvent.click(screen.getByRole("button", { name: /Next|Prossima/ }));
    fireEvent.click(screen.getAllByRole("radio")[correctIndexes(single[1])[0]]);
    fireEvent.click(screen.getByRole("button", { name: /Confirm Answer/ }));
    fireEvent.click(screen.getByRole("button", { name: /Results|Risultati|Next|Finish/ }));
    expect(screen.getByText("score 2")).toBeTruthy();
  });
});
