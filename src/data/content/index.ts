import { CATALOG } from "../catalog";
import type { ChapterContent, ChapterMeta } from "../types";
import { CHEMISTRY_CONTENT } from "./chemistry";
import { MATHS_ALGEBRA } from "./maths-algebra";
import { MATHS_DEPTH } from "./maths-depth";
import { MATHS_MASTERY } from "./maths-mastery";
import { MATHS_REST } from "./maths-rest";
import { OFFICIAL_DEPTH } from "./official-depth";
import { PHYSICS_CONTENT } from "./physics";
import { PHYSICS_DEPTH } from "./physics-depth";
import { PHYSICS_EXPERIMENTAL, PHYSICS_MASTERY } from "./physics-mastery";
import { PHYSICS_MASTERY_COURSE } from "./physics-mastery-course";
import { PHYSICS_REST } from "./physics-rest";
import { PHYSICS_XII } from "./physics-xii";
import { CLASSROOM_NOTES } from "./classroom-notes";

const PACK: Record<string, ChapterContent> = {
  ...PHYSICS_REST,
  ...PHYSICS_CONTENT,
  ...PHYSICS_XII,
  ...PHYSICS_EXPERIMENTAL,
  ...CHEMISTRY_CONTENT,
  ...MATHS_ALGEBRA,
  ...MATHS_REST,
};

/** Later layers append — they must not clobber earlier official notes. */
const DEPTH_LAYERS: Record<string, Partial<ChapterContent>>[] = [
  PHYSICS_DEPTH,
  PHYSICS_MASTERY,
  MATHS_DEPTH,
  MATHS_MASTERY,
  OFFICIAL_DEPTH,
  CLASSROOM_NOTES,
  PHYSICS_MASTERY_COURSE,
];

function merge(base: ChapterContent, extra: Partial<ChapterContent>): ChapterContent {
  return {
    ...base,
    starter: extra.starter ?? base.starter,
    theory: [...base.theory, ...(extra.theory ?? [])],
    formulas: [...base.formulas, ...(extra.formulas ?? [])],
    traps: [...base.traps, ...(extra.traps ?? [])],
    tricks: [...base.tricks, ...(extra.tricks ?? [])],
    worked: [...base.worked, ...(extra.worked ?? [])],
    quiz: [...base.quiz, ...(extra.quiz ?? [])],
    extras: [...base.extras, ...(extra.extras ?? [])],
    checklist: [...base.checklist, ...(extra.checklist ?? [])],
    classNotes: [...(base.classNotes ?? []), ...(extra.classNotes ?? [])],
    mastery: [...(base.mastery ?? []), ...(extra.mastery ?? [])],
  };
}

function stackedDepth(id: string): Partial<ChapterContent> | undefined {
  const parts = DEPTH_LAYERS.map((layer) => layer[id]).filter(Boolean) as Partial<ChapterContent>[];
  if (!parts.length) return undefined;
  return parts.reduce((acc, extra) => ({
    ...acc,
    starter: extra.starter ?? acc.starter,
    theory: [...(acc.theory ?? []), ...(extra.theory ?? [])],
    formulas: [...(acc.formulas ?? []), ...(extra.formulas ?? [])],
    traps: [...(acc.traps ?? []), ...(extra.traps ?? [])],
    tricks: [...(acc.tricks ?? []), ...(extra.tricks ?? [])],
    worked: [...(acc.worked ?? []), ...(extra.worked ?? [])],
    quiz: [...(acc.quiz ?? []), ...(extra.quiz ?? [])],
    extras: [...(acc.extras ?? []), ...(extra.extras ?? [])],
    checklist: [...(acc.checklist ?? []), ...(extra.checklist ?? [])],
    classNotes: [...(acc.classNotes ?? []), ...(extra.classNotes ?? [])],
    mastery: [...(acc.mastery ?? []), ...(extra.mastery ?? [])],
  }));
}

function fallback(meta: ChapterMeta): ChapterContent {
  const exam = meta.jeeAdvanced ? "advanced" : meta.jeeMain ? "main" : "boards";
  return {
    id: meta.id,
    starter: {
      heading: "Start here if you just opened Class 11",
      body: meta.summary,
      bullets: meta.objectives,
    },
    theory: [
      {
        id: "aim",
        heading: "What this chapter is for",
        body: meta.summary,
        bullets: meta.objectives,
        callout: meta.jeeMain
          ? {
              kind: "main",
              text: "Tagged for JEE Main. Treat NCERT as the floor, not the ceiling.",
            }
          : meta.jeeAdvanced
            ? {
                kind: "advanced",
                text: "Main-deleted or Advanced-heavy. Skip on a 30-day Main salvage; required for IIT.",
              }
            : {
                kind: "board",
                text: "Boards-focused. Write the NCERT derivation, do not only solve JEE numericals.",
              },
      },
      {
        id: "how",
        heading: "How to study it this week",
        body: `Block ${meta.hours} hours. Prerequisites: ${meta.prereqs.length ? meta.prereqs.join(", ") : "none"}. Difficulty ${meta.difficulty}/5. Read NCERT ${meta.ncert}, then the formula list, then a mixed mill set.`,
        bullets: [
          "Write every boxed formula from memory before looking.",
          "Do 15 graded problems: 5 board, 7 Main, 3 Advanced if tagged.",
          "Log every wrong in one line in the error book.",
        ],
      },
    ],
    formulas: [],
    traps: [
      "Studying from a random PDF instead of NCERT + one problem book.",
      "Skipping the graphs and the sign convention paragraph.",
      "Leaving this chapter ‘for later’ because it feels familiar from class.",
    ],
    tricks: [
      "Teach the objective list out loud in four minutes. If you stall, that line is the study plan.",
      "Convert each objective into one mill item the same evening.",
    ],
    worked: [
      {
        id: "w1",
        exam,
        prompt: `Open NCERT ${meta.ncert} and solve the last two examples without looking at the solution. Then change one given by 10% and recompute.`,
        steps: [
          "Cover the solution.",
          "Write knowns, unknown, principle.",
          "Compute, then un-cover and match method not just the number.",
        ],
        answer: "Self-check against NCERT.",
        insight: "The atlas cannot replace the two NCERT examples you have never re-solved.",
      },
    ],
    quiz: [
      {
        id: "q1",
        exam: "boards",
        stem: `Which statement best matches the aim of ${meta.title}?`,
        options: [
          meta.objectives[0] ?? meta.summary,
          "Memorise every coaching extra without NCERT.",
          "Skip formulae and only watch lectures.",
          "Treat boards and JEE as unrelated subjects.",
        ],
        correct: 0,
        why: "Objectives in this atlas are the exam’s actual demands.",
      },
    ],
    extras: [
      {
        title: "Stretch",
        body: "After the quiz, pick one Advanced PYQ from the last five years in this chapter and write a full solution as if it were Paper 1 paragraph 1.",
      },
    ],
    checklist: meta.objectives,
    pyqInsight: `${meta.title} is ${meta.mainWeight} weight in Main and ${meta.advWeight} in Advanced. ${meta.summary}`,
  };
}

export function getContent(id: string): ChapterContent {
  const meta = CATALOG.find((c) => c.id === id);
  const real = PACK[id];
  const extra = stackedDepth(id);
  if (real) return extra ? merge(real, extra) : real;
  if (meta) return extra ? merge(fallback(meta), extra) : fallback(meta);
  return fallback({
    id,
    subject: "physics",
    classLevel: 11,
    unit: "—",
    title: "Chapter",
    ncert: "—",
    hours: 4,
    difficulty: 3,
    mainWeight: "medium",
    advWeight: "medium",
    boards: true,
    jeeMain: true,
    jeeAdvanced: true,
    summary: "Content is loading.",
    objectives: [],
    prereqs: [],
    tags: [],
  });
}

export function contentCoverage() {
  const missing = CATALOG.filter((c) => !PACK[c.id]).map((c) => c.id);
  return { packed: CATALOG.length - missing.length, total: CATALOG.length, missing };
}

export function allFormulas() {
  return CATALOG.flatMap((meta) => {
    const c = getContent(meta.id);
    if (!c) return [];
    return c.formulas.map((f) => ({
      ...f,
      chapterId: meta.id,
      chapter: meta.title,
      subject: meta.subject,
    }));
  });
}

export function allQuizzes() {
  return CATALOG.flatMap((meta) => {
    const c = getContent(meta.id);
    if (!c) return [];
    return c.quiz.map((q) => ({
      ...q,
      chapterId: meta.id,
      chapter: meta.title,
      subject: meta.subject,
    }));
  });
}
