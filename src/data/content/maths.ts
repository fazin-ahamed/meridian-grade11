import type { ChapterContent } from "../types";
import { MATHS_ALGEBRA } from "./maths-algebra";
import { MATHS_REST } from "./maths-rest";

export const MATHS_CONTENT: Record<string, ChapterContent> = {
  ...MATHS_ALGEBRA,
  ...MATHS_REST,
};
