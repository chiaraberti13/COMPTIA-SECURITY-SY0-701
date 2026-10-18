import { Check, X } from "lucide-react";
import { useLang } from "../i18n";

/**
 * Words and an icon, next to the green/red colour, that say which option was
 * right and which one the learner picked (WCAG 1.4.1: colour is never the only
 * cue). Part of the option's accessible name, so screen readers hear it too.
 */
export default function OptionVerdict({ isCorrect, isSelected }: { isCorrect: boolean; isSelected: boolean }) {
  const { t } = useLang();
  if (!isCorrect && !isSelected) return null;
  return (
    <span className="ml-2 inline-flex flex-wrap items-center gap-1.5 align-middle text-[10px] font-mono uppercase tracking-wider">
      {isCorrect && (
        <span className="inline-flex items-center gap-0.5 text-emerald-300">
          <Check className="w-3 h-3" aria-hidden="true" />
          {t("quiz.reviewCorrectAnswer")}
        </span>
      )}
      {isSelected && (
        <span className={`inline-flex items-center gap-0.5 ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
          {!isCorrect && <X className="w-3 h-3" aria-hidden="true" />}
          {t("quiz.reviewYourAnswer")}
        </span>
      )}
    </span>
  );
}
