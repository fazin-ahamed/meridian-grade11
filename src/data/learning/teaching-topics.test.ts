import assert from "node:assert/strict";
import test from "node:test";

import { guideFor } from "./grade11.ts";
import { teachingTopicsFor } from "./teaching-topics.ts";
import type { ChapterContent, ChapterMeta } from "../types.ts";

const meta: ChapterMeta = {
  id: "phy-solids",
  subject: "physics",
  classLevel: 11,
  unit: "Properties of matter",
  title: "Mechanical Properties of Solids",
  ncert: "Physics XI · Ch. 8",
  hours: 5,
  difficulty: 2,
  mainWeight: "low",
  advWeight: "low",
  boards: true,
  jeeMain: true,
  jeeAdvanced: true,
  summary: "Stress, strain, elastic moduli, and energy.",
  objectives: ["Distinguish stress types", "Compute extension"],
  prereqs: ["Ratios"],
  tags: ["solids"],
};

const emptyContent: ChapterContent = {
  id: meta.id,
  theory: [],
  formulas: [],
  traps: [],
  tricks: [],
  worked: [],
  quiz: [],
  extras: [],
  checklist: [],
  pyqInsight: "",
};

test("the solids route splits the overloaded modulus block into teachable topics", () => {
  const topics = teachingTopicsFor(meta, emptyContent, guideFor(meta));
  assert.ok(topics.length >= 10);
  assert.ok(topics.some((item) => item.title.includes("Young’s modulus")));
  assert.ok(topics.some((item) => item.title.includes("Poisson’s ratio")));
  assert.ok(topics.some((item) => item.title.includes("Elastic energy")));
  for (const item of topics) {
    assert.ok(item.intuition.length > 40, item.id);
    assert.ok(item.preciseIdea.length > 40, item.id);
    assert.ok(item.quickCheck.prompt.length > 10, item.id);
    assert.ok(item.misconception.repair.length > 10, item.id);
    assert.equal(item.prediction?.options?.length, 4, item.id);
    assert.equal(
      item.prediction?.answer,
      item.prediction?.options?.[item.prediction.correctIndex ?? -1],
      item.id,
    );
    assert.equal(item.application?.options?.length, 4, item.id);
  }
});

test("generic chapter blocks are expanded when one heading contains several topics", () => {
  const genericMeta = {
    ...meta,
    id: "math-rel-11",
    subject: "maths" as const,
    title: "Relations and Functions",
  };
  const content: ChapterContent = {
    ...emptyContent,
    id: genericMeta.id,
    theory: [
      {
        id: "functions",
        heading: "Domain, range, and transformations",
        body: "A function assigns one output to each input. Domain controls which inputs are allowed.",
        bullets: ["Domain is the set of inputs.", "Range is the set of outputs."],
      },
    ],
  };
  const topics = teachingTopicsFor(genericMeta, content, guideFor(genericMeta));
  assert.deepEqual(
    topics.map((item) => item.title),
    ["Domain", "range", "transformations"],
  );
  assert.ok(topics.every((item) => item.method.length >= 3));
});

test("quiz-backed topic checks keep the exam tag and correct option index", () => {
  const content: ChapterContent = {
    ...emptyContent,
    id: "math-rel-11",
    theory: [
      {
        id: "functions",
        heading: "Domain and range",
        body: "A function assigns one output to each input.",
      },
    ],
    quiz: [
      {
        id: "q1",
        exam: "main",
        stem: "Which set is the domain?",
        options: ["A", "B", "C", "D"],
        correct: 2,
        why: "The input set is the domain.",
        difficulty: 2,
      },
      {
        id: "q2",
        exam: "advanced",
        stem: "Which set is the range?",
        options: ["W", "X", "Y", "Z"],
        correct: 1,
        why: "The output set is the range.",
        difficulty: 3,
      },
    ],
  };
  const genericMeta = {
    ...meta,
    id: "math-rel-11",
    subject: "maths" as const,
    title: "Relations and Functions",
  };
  const [topic] = teachingTopicsFor(genericMeta, content, guideFor(genericMeta));
  assert.equal(topic?.quickCheck.correctIndex, 2);
  assert.equal(topic?.quickCheck.exam, "main");
  assert.equal(topic?.application?.exam, "advanced");
});
