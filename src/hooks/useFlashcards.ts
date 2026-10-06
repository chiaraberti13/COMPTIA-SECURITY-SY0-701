import { useState } from "react";
import { STORAGE_KEYS, readJSON, removeKey, writeJSON } from "../storage";
import {
  gradeCard,
  sanitizeCardProgress,
  type AcronymCard,
  type CardProgress,
  type FlashcardDirection,
} from "../flashcards";

/**
 * Drives an acronym flashcard run and the spaced-repetition progress it leaves
 * behind. The run (the cards in play, the position, whether the back is shown)
 * lives in memory; the per-card schedule is persisted to localStorage, reusing
 * the quiz's 1-3-7-14-30 day intervals. Progress is keyed by the acronym token,
 * which is the same in both languages, so switching language keeps it.
 */

export interface FlashcardResult {
  id: string;
  knew: boolean;
}

export function useFlashcards() {
  const [progress, setProgress] = useState<Record<string, CardProgress>>(
    () => sanitizeCardProgress(readJSON<unknown>(STORAGE_KEYS.acronymProgress, {}))
  );

  const [cards, setCards] = useState<AcronymCard[]>([]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [direction, setDirection] = useState<FlashcardDirection>("acronymToExpansion");
  const [results, setResults] = useState<FlashcardResult[]>([]);

  const current: AcronymCard | undefined = cards[index];
  const started = cards.length > 0;
  const finished = started && index >= cards.length;

  /** Starts a run over `list`, prompting in `dir`. */
  const begin = (list: AcronymCard[], dir: FlashcardDirection) => {
    setCards(list);
    setDirection(dir);
    setIndex(0);
    setRevealed(false);
    setResults([]);
  };

  /** Flips the current card to show the answer side. */
  const reveal = () => {
    if (current) setRevealed(true);
  };

  /**
   * Records the self-assessment for the current card, updates its schedule and
   * advances. The answer must be revealed first, so the learner judges honestly.
   */
  const grade = (knew: boolean) => {
    if (!current || !revealed) return;
    setProgress((prev) => {
      const next = gradeCard(prev, current.id, knew);
      writeJSON(STORAGE_KEYS.acronymProgress, next);
      return next;
    });
    setResults((prev) => [...prev, { id: current.id, knew }]);
    setIndex((prev) => prev + 1);
    setRevealed(false);
  };

  /** Leaves the run and returns to the chooser. */
  const exit = () => {
    setCards([]);
    setIndex(0);
    setRevealed(false);
    setResults([]);
  };

  /** Forgets every saved acronym schedule (kept separate from the quiz history). */
  const resetProgress = () => {
    setProgress({});
    removeKey(STORAGE_KEYS.acronymProgress);
  };

  return {
    progress,
    cards,
    index,
    current,
    started,
    finished,
    revealed,
    direction,
    results,
    begin,
    reveal,
    grade,
    exit,
    resetProgress,
  };
}

export type FlashcardSession = ReturnType<typeof useFlashcards>;
