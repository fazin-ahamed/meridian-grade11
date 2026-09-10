import type { ExamTag, PlayItem, SubjectId } from "../types";
import { pick, rngFor, shuffle, uniq } from "./rng";

export const MILL_PER_CHAPTER = 220;

type McqArgs = {
  chapterId: string;
  i: number;
  subject: SubjectId;
  exam?: ExamTag;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  stem: string;
  correct: string;
  wrong: string[];
  why: string;
  tags?: string[];
};

type NumArgs = {
  chapterId: string;
  i: number;
  subject: SubjectId;
  exam?: ExamTag;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  stem: string;
  answer: number;
  why: string;
  tags?: string[];
  tolerance?: number;
};

function examFor(i: number, forced?: ExamTag): ExamTag {
  if (forced) return forced;
  const r = i % 7;
  if (r === 0) return "boards";
  if (r === 6) return "advanced";
  return "main";
}

export function mcq(a: McqArgs): PlayItem {
  const rng = rngFor(a.chapterId, a.i + 9001);
  let options = uniq([a.correct, ...a.wrong]).slice(0, 4);
  if (!options.includes(a.correct)) options = [a.correct, ...options].slice(0, 4);
  while (options.length < 4) {
    options.push(`not ${a.correct} (${options.length})`);
  }
  options = shuffle(rng, options);
  if (!options.includes(a.correct)) options[0] = a.correct;
  return {
    id: `mill:${a.chapterId}:${a.i}`,
    chapterId: a.chapterId,
    subject: a.subject,
    exam: examFor(a.i, a.exam),
    difficulty: a.difficulty ?? ((a.i % 5) + 1) as 1 | 2 | 3 | 4 | 5,
    kind: "mcq",
    stem: a.stem,
    options,
    correctIndex: options.indexOf(a.correct),
    why: a.why,
    tags: a.tags ?? [],
  };
}

export function num(a: NumArgs): PlayItem {
  return {
    id: `mill:${a.chapterId}:${a.i}`,
    chapterId: a.chapterId,
    subject: a.subject,
    exam: examFor(a.i, a.exam ?? "main"),
    difficulty: a.difficulty ?? ((a.i % 5) + 1) as 1 | 2 | 3 | 4 | 5,
    kind: "numerical",
    stem: a.stem,
    numerical: a.answer,
    tolerance: a.tolerance ?? 0,
    why: a.why,
    tags: a.tags ?? ["numerical"],
  };
}

export function cycle<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length]!;
}

export function nint(x: number) {
  return Math.round(x);
}

export function choiceI(chapterId: string, i: number, min: number, max: number) {
  const rng = rngFor(chapterId, i);
  return min + Math.floor(rng() * (max - min + 1));
}

export function choiceOf<T>(chapterId: string, i: number, arr: readonly T[]): T {
  return pick(rngFor(chapterId, i), arr);
}
