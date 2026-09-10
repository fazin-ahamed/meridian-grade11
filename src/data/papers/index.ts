import type { ClassroomPaper } from "../types";
import { DYNAMICS_PAPERS } from "./dynamics";
import { KINEMATICS_PAPERS } from "./kinematics";
import { PLANE_PAPERS } from "./plane";
import { SOLIDS_PAPERS } from "./solids";
import { UNITS_PAPERS } from "./units";
import { WEP_PAPERS } from "./wep";

export const CLASSROOM_PAPERS: ClassroomPaper[] = [
  ...UNITS_PAPERS,
  ...KINEMATICS_PAPERS,
  ...PLANE_PAPERS,
  ...DYNAMICS_PAPERS,
  ...WEP_PAPERS,
  ...SOLIDS_PAPERS,
];

export function papersForChapter(chapterId: string) {
  return CLASSROOM_PAPERS.filter((p) => p.chapterId === chapterId);
}

export function paperById(id: string) {
  return CLASSROOM_PAPERS.find((p) => p.id === id);
}

export function paperStats() {
  const n = CLASSROOM_PAPERS.reduce((s, p) => s + p.questions.length, 0);
  const marks = CLASSROOM_PAPERS.reduce((s, p) => s + p.mm, 0);
  return { papers: CLASSROOM_PAPERS.length, questions: n, marks };
}
