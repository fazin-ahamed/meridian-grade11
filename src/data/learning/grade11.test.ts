import assert from "node:assert/strict";
import test from "node:test";

import { GRADE11_CORE_IDS, guideFor, isGrade11 } from "./grade11.ts";
import type { ChapterMeta } from "../types.ts";

const meta: ChapterMeta = {
  id: "phy-motion-2d",
  subject: "physics",
  classLevel: 11,
  unit: "Kinematics",
  title: "Motion in a Plane",
  ncert: "Chapter 4",
  hours: 8,
  difficulty: 3,
  mainWeight: "high",
  advWeight: "medium",
  boards: true,
  jeeMain: true,
  jeeAdvanced: true,
  summary: "Vector description of motion and projectile motion.",
  objectives: ["Resolve vectors", "Model projectile motion"],
  prereqs: ["Trigonometry"],
  tags: ["kinematics"],
};

test("grade 11 guide exposes the subject lens and chapter override", () => {
  const guide = guideFor(meta);

  assert.equal(isGrade11(meta), true);
  assert.equal(guide.lens.title, "Physics model");
  assert.equal(guide.lens.steps.length, 5);
  assert.match(guide.bigIdea, /perpendicular components/i);
  assert.match(guide.checkpoint, /constant in ideal projectile motion/i);
});

test("grade 11 guide falls back safely for an unlisted chapter", () => {
  const fallback = guideFor({ ...meta, id: "future-chapter", title: "Future Chapter" });

  assert.equal(fallback.bigIdea, meta.summary);
  assert.match(fallback.bridge, /Start by revising Trigonometry/i);
  assert.equal(fallback.lens.title, "Physics model");
});

test("every Grade 11 core chapter receives a usable guide", () => {
  const lensTitles = new Set<string>();

  assert.ok(GRADE11_CORE_IDS.length >= 30);
  for (const id of GRADE11_CORE_IDS) {
    const subject = id.startsWith("phy-") ? "physics" : id.startsWith("chem-") ? "chemistry" : "maths";
    const chapter = { ...meta, id, subject } as ChapterMeta;
    const guide = guideFor(chapter);
    lensTitles.add(guide.lens.title);
    assert.ok(guide.bigIdea.length > 20, chapter.id);
    assert.ok(guide.labMission.length > 20, chapter.id);
    assert.ok(guide.checkpoint.length > 20, chapter.id);
  }
  assert.deepEqual([...lensTitles].sort(), ["Chemistry three-level view", "Mathematics decision path", "Physics model"]);
});
