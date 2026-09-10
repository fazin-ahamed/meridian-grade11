import { CATALOG, CHAPTER_BY_ID } from "../catalog";
import type { ExamTag, PlayItem, SubjectId } from "../types";
import { bankItem } from "./bank";
import { MILL_PER_CHAPTER } from "./build";
import { millCount } from "./count";
import { chemistryItem } from "./chemistry";
import { extraItem } from "./extra";
import { masteryItem } from "./mastery";
import { mathsItem } from "./maths";
import { officialItem } from "./official";
import { physicsItem } from "./physics";
import { hashStr, mulberry32 } from "./rng";

export { MILL_PER_CHAPTER } from "./build";
export { millCount } from "./count";

function parametric(chapterId: string, idx: number): PlayItem | null {
  if (chapterId.startsWith("phy-")) return physicsItem(chapterId, idx);
  if (chapterId.startsWith("chem-")) return chemistryItem(chapterId, idx);
  if (chapterId.startsWith("math-")) return mathsItem(chapterId, idx);
  return null;
}

export function millItem(chapterId: string, i: number): PlayItem | null {
  const idx = ((i % MILL_PER_CHAPTER) + MILL_PER_CHAPTER) % MILL_PER_CHAPTER;
  const lane = idx % 6;
  let item: PlayItem | null = null;
  if (lane === 0 || lane === 1) item = parametric(chapterId, idx);
  else if (lane === 2) item = extraItem(chapterId, idx + 17) ?? officialItem(chapterId, idx);
  else if (lane === 3) item = officialItem(chapterId, idx + 11) ?? bankItem(chapterId, idx);
  else if (lane === 4) item = masteryItem(chapterId, idx + 23) ?? officialItem(chapterId, idx + 41);
  else item = officialItem(chapterId, idx + 7) ?? masteryItem(chapterId, idx) ?? parametric(chapterId, idx + 3);
  if (!item) item = officialItem(chapterId, idx);
  if (!item) item = masteryItem(chapterId, idx);
  if (!item) item = extraItem(chapterId, idx);
  if (!item) item = parametric(chapterId, idx);
  if (!item) item = bankItem(chapterId, idx);
  if (!item) return null;
  const meta = CHAPTER_BY_ID[chapterId];
  return { ...item, id: `mill:${chapterId}:${idx}`, chapter: meta?.title, chapterId };
}

export function millForChapter(chapterId: string, n = 12, offset = 0): PlayItem[] {
  const out: PlayItem[] = [];
  const seen = new Set<string>();
  for (let k = 0; k < n * 4 && out.length < n; k++) {
    const item = millItem(chapterId, offset + k);
    if (!item || seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

export function millById(id: string): PlayItem | null {
  const m = /^mill:([^:]+):(\d+)$/.exec(id);
  if (!m) return null;
  return millItem(m[1]!, Number(m[2]));
}

export function millMixed(opts: {
  subject?: SubjectId | "all";
  exam?: ExamTag | "all";
  chapterId?: string;
  n: number;
  seed?: number;
}): PlayItem[] {
  let chapters = CATALOG;
  if (opts.chapterId) chapters = CATALOG.filter((c) => c.id === opts.chapterId);
  else if (opts.subject && opts.subject !== "all") {
    chapters = CATALOG.filter((c) => c.subject === opts.subject);
  }
  if (!chapters.length) return [];
  const rng = mulberry32(opts.seed ?? hashStr(`mix:${opts.subject}:${opts.exam}:${opts.n}`));
  const out: PlayItem[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < opts.n && guard < opts.n * 40) {
    guard++;
    const ch = chapters[Math.floor(rng() * chapters.length)]!;
    const idx = Math.floor(rng() * MILL_PER_CHAPTER);
    const item = millItem(ch.id, idx);
    if (!item) continue;
    if (opts.exam && opts.exam !== "all" && item.exam !== opts.exam) continue;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

export function millMainMock(seed = 1): PlayItem[] {
  const phy = millMixed({ subject: "physics", n: 25, seed: seed + 11 });
  const che = millMixed({ subject: "chemistry", n: 25, seed: seed + 29 });
  const mat = millMixed({ subject: "maths", n: 25, seed: seed + 47 });
  return [...phy, ...che, ...mat];
}

export function millAdvMock(seed = 3): PlayItem[] {
  return millMixed({ exam: "advanced", n: 18, seed: seed + 101 });
}

export function millCoverage() {
  const missing: string[] = [];
  for (const c of CATALOG) {
    const item = millItem(c.id, 0);
    if (!item) missing.push(c.id);
  }
  return { total: millCount(), chapters: CATALOG.length, per: MILL_PER_CHAPTER, missing };
}
