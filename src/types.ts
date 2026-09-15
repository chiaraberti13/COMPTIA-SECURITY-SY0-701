export interface Subtopic {
  name: string;
  checklistKey: string;
  definition: string;
  details: string;
  keyFormulas?: string[];
  comparativeTable?: {
    headers: string[];
    rows: string[][];
  };
  examTip: string;
}

export interface TopicGroup {
  title: string;
  description: string;
  icon: string;
  subtopics: Subtopic[];
}

export interface Question {
  id: number;
  topic: string;
  level: "RICORDO" | "COMPRENSIONE" | "APPLICAZIONE" | "ANALISI";
  scenario: string;
  question: string;
  options: string[];
  /**
   * The correct option, 0-based. On a multi-response question this is the
   * lowest correct index, so anything reading only this field still points
   * at a genuinely correct option rather than a distractor.
   */
  answerIndex: number;
  /**
   * Every correct option, 0-based, for a multi-response question of the
   * "choose TWO" kind the real exam uses. Omitted on single-answer
   * questions; when present it must contain `answerIndex` and have at least
   * two entries. Read it through `correctIndexes()` in quiz.ts, which
   * collapses both shapes to one list.
   */
  answerIndexes?: number[];
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "trainer" | "system";
  text: string;
  timestamp: Date;
}

/** One completed exam run, persisted so the learner can track progress. */
export interface QuizResult {
  /** Completion time, epoch milliseconds. */
  at: number;
  score: number;
  total: number;
  /** Domain ids the run covered. */
  domains: number[];
  /** Whether the run reached the 80% passing threshold. */
  passed: boolean;
}
