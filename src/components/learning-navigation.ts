export type LessonDirection = -1 | 1;

export function clampLessonStep(next: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.max(next, 0), total - 1);
}

export function moveLessonStep(current: number, total: number, direction: LessonDirection): number {
  return clampLessonStep(current + direction, total);
}
