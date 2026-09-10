import type { ClassroomPaper, PaperQuestion } from "../types";

export function mcq(
  id: string,
  n: number,
  marks: number,
  stem: string,
  options: string[],
  correct: number,
  steps: string[],
  answer: string,
  extra?: Partial<PaperQuestion>,
): PaperQuestion {
  return { id, n, marks, stem, kind: "mcq", options, correct, steps, answer, ...extra };
}

export function num(
  id: string,
  n: number,
  marks: number,
  stem: string,
  numerical: number,
  steps: string[],
  answer: string,
  extra?: Partial<PaperQuestion>,
): PaperQuestion {
  return {
    id,
    n,
    marks,
    stem,
    kind: "numerical",
    numerical,
    tolerance: extra?.tolerance ?? 0.05,
    steps,
    answer,
    ...extra,
  };
}

export function longQ(
  id: string,
  n: number,
  marks: number,
  stem: string,
  steps: string[],
  answer: string,
  extra?: Partial<PaperQuestion>,
): PaperQuestion {
  return { id, n, marks, stem, kind: "long", steps, answer, ...extra };
}

export function paper(p: ClassroomPaper): ClassroomPaper {
  return p;
}
