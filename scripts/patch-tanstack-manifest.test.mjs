import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { patchTanStackManifest } from "./patch-tanstack-manifest.mjs";

test("replaces the fallback manifest with the production asset manifest", () => {
  const outputDir = mkdtempSync(join(tmpdir(), "meridian-manifest-"));
  const fallback = `scripts: ["/@id/virtual:tanstack-start-dev-client-entry"]`;
  const production = `scripts: ["/assets/index-abc123.js"]`;

  writeFileSync(join(outputDir, "_tanstack-start-manifest_v.mjs"), fallback);
  writeFileSync(
    join(outputDir, "_tanstack-start-manifest_v-abc123.mjs"),
    production,
  );

  const result = patchTanStackManifest(outputDir);

  assert.deepEqual(result, {
    patched: true,
    source: "_tanstack-start-manifest_v-abc123.mjs",
    target: "_tanstack-start-manifest_v.mjs",
  });
  assert.equal(
    readFileSync(join(outputDir, "_tanstack-start-manifest_v.mjs"), "utf8"),
    production,
  );
});

test("is a no-op when the Vercel output does not exist", () => {
  const outputDir = join(mkdtempSync(join(tmpdir(), "meridian-manifest-")), "missing");
  mkdirSync(outputDir, { recursive: true });

  assert.deepEqual(patchTanStackManifest(join(outputDir, "not-built")), {
    patched: false,
    reason: "output-missing",
  });
});
