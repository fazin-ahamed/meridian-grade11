import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const projectRoot = process.cwd();
const publicDir = join(projectRoot, ".output", "public");
const basePath = process.env.PAGES_BASE_PATH ?? "/meridian-grade11/";
const normalizedBase = `/${basePath.replace(/^\/+|\/+$/g, "")}/`;
const assetsDir = join(publicDir, "assets");

const assetNames = await readdir(assetsDir);
const clientEntry = assetNames.find((name) => /^index-[^/]+\.js$/.test(name));

if (!clientEntry) {
  throw new Error("Could not find the TanStack client entry in .output/public/assets");
}

async function rewriteHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteHtml(path);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;

    const html = await readFile(path, "utf8");
    const clientEntryUrl = `${normalizedBase}assets/${clientEntry}`;
    const devClientEntryUrl = `${normalizedBase}@id/virtual:tanstack-start-dev-client-entry`;
    await writeFile(path, html.replaceAll(devClientEntryUrl, clientEntryUrl), "utf8");
  }
}

await rewriteHtml(publicDir);

const manifestDir = join(publicDir, "__grok");
await writeFile(
  join(manifestDir, "manifest.webmanifest"),
  `${JSON.stringify(
    {
      name: "Meridian — JEE Mastery Atlas",
      short_name: "Meridian",
      start_url: normalizedBase,
      scope: normalizedBase,
      display: "standalone",
      background_color: "#0b0c0e",
      theme_color: "#0b0c0e",
      icons: [
        {
          src: `${normalizedBase}__grok/icon-180.png`,
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(`[pages] Rewired ${clientEntry} into static HTML and wrote the Pages manifest.`);
