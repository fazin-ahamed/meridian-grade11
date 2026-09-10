import type {
  ChapterContent,
  ExamTag,
  Formula,
  QuizItem,
  TheoryBlock,
  WorkedProblem,
} from "../types";

export function T(
  id: string,
  heading: string,
  body: string,
  extra?: Partial<TheoryBlock>,
): TheoryBlock {
  return { id, heading, body, ...extra };
}

export function F(name: string, latex: string, note?: string): Formula {
  return { name, latex, note };
}

export function W(
  id: string,
  exam: ExamTag,
  prompt: string,
  steps: string[],
  answer: string,
  insight: string,
  diagram?: string,
): WorkedProblem {
  return { id, exam, prompt, steps, answer, insight, diagram };
}

export function Q(
  id: string,
  exam: ExamTag,
  stem: string,
  options: string[],
  correct: number,
  why: string,
): QuizItem {
  return { id, exam, stem, options, correct, why };
}

export function pack(
  id: string,
  theory: TheoryBlock[],
  formulas: Formula[],
  traps: string[],
  tricks: string[],
  worked: WorkedProblem[],
  quiz: QuizItem[],
  extras: { title: string; body: string }[],
  checklist: string[],
  pyqInsight: string,
  starter?: ChapterContent["starter"],
): ChapterContent {
  return {
    id,
    theory,
    formulas,
    traps,
    tricks,
    worked,
    quiz,
    extras,
    checklist,
    pyqInsight,
    starter,
  };
}
