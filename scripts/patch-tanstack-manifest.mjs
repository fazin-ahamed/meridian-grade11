import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const DEV_CLIENT_ENTRY = "/@id/virtual:tanstack-start-dev-client-entry";
const DEFAULT_OUTPUT_DIR = resolve(
  process.cwd(),
  ".vercel/output/functions/__server.func",
);

function findBuiltManifest(outputDir) {
  const candidates = readdirSync(outputDir).filter((name) =>
    /^_tanstack-start-manifest_v-.+\.mjs$/.test(name),
  );

  for (const name of candidates) {
    const filePath = resolve(outputDir, name);
    const contents = readFileSync(filePath, "utf8");

    if (contents.includes("/assets/") && !contents.includes(DEV_CLIENT_ENTRY)) {
      return { contents, name };
    }
  }

  return null;
}

export function patchTanStackManifest(outputDir = DEFAULT_OUTPUT_DIR) {
  if (!existsSync(outputDir)) {
    return { patched: false, reason: "output-missing" };
  }

  const builtManifest = findBuiltManifest(outputDir);
  if (!builtManifest) {
    throw new Error(
      "Could not find a hashed TanStack Start manifest with production asset URLs.",
    );
  }

  const fallbackPath = resolve(outputDir, "_tanstack-start-manifest_v.mjs");
  if (!existsSync(fallbackPath)) {
    return {
      patched: false,
      reason: "fallback-missing",
      source: builtManifest.name,
    };
  }

  const currentContents = readFileSync(fallbackPath, "utf8");
  if (currentContents === builtManifest.contents) {
    return {
      patched: false,
      reason: "already-correct",
      source: builtManifest.name,
    };
  }

  writeFileSync(fallbackPath, builtManifest.contents);

  return {
    patched: true,
    source: builtManifest.name,
    target: "_tanstack-start-manifest_v.mjs",
  };
}

const invokedPath = process.argv[1] && resolve(process.argv[1]);
if (invokedPath === fileURLToPath(import.meta.url)) {
  const result = patchTanStackManifest();
  console.log(
    result.patched
      ? `Patched ${result.target} from ${result.source}.`
      : `TanStack manifest patch skipped (${result.reason}).`,
  );
}
