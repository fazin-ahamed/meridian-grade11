import assert from "node:assert/strict";
import test from "node:test";
import { clampLessonStep, moveLessonStep } from "./learning-navigation.ts";

test("lesson steps stay inside the available topic range", () => {
  assert.equal(clampLessonStep(-1, 3), 0);
  assert.equal(clampLessonStep(1, 3), 1);
  assert.equal(clampLessonStep(9, 3), 2);
  assert.equal(clampLessonStep(4, 0), 0);
});

test("previous and next movement stop cleanly at both ends", () => {
  assert.equal(moveLessonStep(0, 3, -1), 0);
  assert.equal(moveLessonStep(0, 3, 1), 1);
  assert.equal(moveLessonStep(2, 3, -1), 1);
  assert.equal(moveLessonStep(2, 3, 1), 2);
});
