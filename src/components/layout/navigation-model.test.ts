import assert from "node:assert/strict";
import test from "node:test";
import { buildSidebarModel } from "./navigation-model.ts";

test("chapter pages replace global navigation with one chapter sidebar", () => {
  const model = buildSidebarModel({
    pathname: "/academy/chapter/phy-units",
    subject: "Physics",
    chapterTitle: "Units and measurements",
    topics: ["Measurement and units", "Dimensions", "Significant figures"],
    activeTopic: 1,
  });

  assert.equal(model.mode, "chapter");
  assert.equal(model.backLabel, "Back to Atlas");
  assert.deepEqual(
    model.items.map((item) => item.label),
    ["Measurement and units", "Dimensions", "Significant figures"],
  );
  assert.equal(model.items[1]?.active, true);
});

test("non-chapter pages keep the global learning navigation", () => {
  const model = buildSidebarModel({ pathname: "/academy/practice" });

  assert.equal(model.mode, "global");
  assert.equal(model.items.some((item) => item.label === "Practice"), true);
  assert.equal(model.items.some((item) => item.label === "Back to Atlas"), false);
});
