export type SubjectId = "physics" | "chemistry" | "maths";
export type ClassLevel = 11 | 12 | "both";
export type ExamTag = "boards" | "main" | "advanced";
export type Weight = "none" | "low" | "medium" | "high" | "very-high";
export type QuestionKind = "mcq" | "numerical";

export type Formula = {
  name: string;
  latex: string;
  note?: string;
};

export type WorkedProblem = {
  id: string;
  exam: ExamTag;
  prompt: string;
  steps: string[];
  answer: string;
  insight: string;
  diagram?: string;
};

export type QuizItem = {
  id: string;
  exam: ExamTag;
  stem: string;
  options: string[];
  correct: number;
  why: string;
  kind?: QuestionKind;
  numerical?: number;
  tolerance?: number;
  difficulty?: 1 | 2 | 3 | 4 | 5;
};

export type MasteryLevel = "L1" | "L2" | "L3" | "L4";

/**
 * A compact, option-based check from the deep chapter course.
 * L1 = foundation, L2 = standard, L3 = JEE-style trap, L4 = synthesis.
 */
export type MasteryQuestion = {
  id: string;
  section: string;
  level: MasteryLevel;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
};

export type MasterySection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type MasteryModule = {
  id: string;
  title: string;
  summary: string;
  sections: MasterySection[];
  questions: MasteryQuestion[];
  /** Final mixed modules can live in the reference layer without adding a duplicate guide step. */
  includeInGuide?: boolean;
};

export type TheoryBlock = {
  id: string;
  heading: string;
  body: string;
  bullets?: string[];
  callout?: { kind: "main" | "advanced" | "trap" | "board" | "extra"; text: string };
  diagram?: string;
  table?: { headers: string[]; rows: string[][] };
};

export type ChapterContent = {
  id: string;
  theory: TheoryBlock[];
  formulas: Formula[];
  traps: string[];
  tricks: string[];
  worked: WorkedProblem[];
  quiz: QuizItem[];
  extras: { title: string; body: string }[];
  checklist: string[];
  pyqInsight: string;
  starter?: { heading: string; body: string; bullets?: string[] };
  /** Definition-first class notes (NCERT / classroom style). */
  classNotes?: TheoryBlock[];
  /** Deep course layer: syllabus map, full explanations, and levelled MCQs. */
  mastery?: MasteryModule[];
};

export type PaperKind = "mcq" | "numerical" | "long";

export type PaperQuestion = {
  id: string;
  n: number;
  marks: number;
  stem: string;
  kind: PaperKind;
  options?: string[];
  correct?: number;
  numerical?: number;
  tolerance?: number;
  unit?: string;
  steps: string[];
  answer: string;
  insight?: string;
  diagram?: string;
};

export type ClassroomPaper = {
  id: string;
  chapterId: string;
  title: string;
  paperNo: string;
  minutes: number;
  mm: number;
  topics?: string;
  source: string;
  questions: PaperQuestion[];
};

export type ChapterMeta = {
  id: string;
  subject: SubjectId;
  classLevel: ClassLevel;
  unit: string;
  title: string;
  ncert: string;
  hours: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  mainWeight: Weight;
  advWeight: Weight;
  boards: boolean;
  jeeMain: boolean;
  jeeAdvanced: boolean;
  summary: string;
  objectives: string[];
  prereqs: string[];
  tags: string[];
};

export type TrackDay = {
  day: number;
  title: string;
  chapterIds: string[];
  focus: string;
  hours: number;
};

export type CrashTrack = {
  id: string;
  title: string;
  audience: string;
  days: number;
  hoursPerDay: string;
  blurb: string;
  outcomes: string[];
  schedule: TrackDay[];
};

export type Booster = {
  id: string;
  title: string;
  subject: SubjectId | "all";
  minutes: number;
  blurb: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  formulas?: Formula[];
  drills?: QuizItem[];
};

export type PlayItem = {
  id: string;
  chapterId: string;
  chapter?: string;
  subject: SubjectId;
  exam: ExamTag;
  difficulty: 1 | 2 | 3 | 4 | 5;
  kind: QuestionKind;
  stem: string;
  options?: string[];
  correctIndex?: number;
  numerical?: number;
  tolerance?: number;
  why: string;
  tags: string[];
};
