import { CATALOG } from "./catalog";
import type { CrashTrack, TrackDay } from "./types";

function packDays(
  chapterIds: string[],
  days: number,
  hours: number,
  titles: (d: number, ids: string[]) => string,
  focus: (d: number, ids: string[]) => string,
): TrackDay[] {
  const n = Math.max(1, chapterIds.length);
  const out: TrackDay[] = [];
  for (let d = 1; d <= days; d++) {
    const start = Math.floor(((d - 1) * n) / days);
    const end = Math.max(start + 1, Math.floor((d * n) / days));
    const ids = chapterIds.slice(start, Math.min(n, end));
    const unique = ids.length ? ids : [chapterIds[Math.min(n - 1, start)]!];
    out.push({
      day: d,
      title: titles(d, unique),
      chapterIds: unique,
      focus: focus(d, unique),
      hours,
    });
  }
  return out;
}

function names(ids: string[]) {
  return ids
    .map((id) => CATALOG.find((c) => c.id === id)?.title ?? id)
    .join(" · ");
}

const PHY11 = CATALOG.filter((c) => c.subject === "physics" && (c.classLevel === 11 || c.classLevel === "both")).map((c) => c.id);
const PHY12 = CATALOG.filter((c) => c.subject === "physics" && c.classLevel === 12).map((c) => c.id);
const CHE11 = CATALOG.filter((c) => c.subject === "chemistry" && (c.classLevel === 11 || c.classLevel === "both") && c.jeeMain).map((c) => c.id);
const CHE12 = CATALOG.filter((c) => c.subject === "chemistry" && c.classLevel === 12 && c.jeeMain).map((c) => c.id);
const MAT11 = CATALOG.filter((c) => c.subject === "maths" && c.classLevel === 11).map((c) => c.id);
const MAT12 = CATALOG.filter((c) => c.subject === "maths" && c.classLevel === 12 && c.jeeMain).map((c) => c.id);

const MAIN = CATALOG.filter((c) => c.jeeMain).map((c) => c.id);
const ADV = CATALOG.filter((c) => c.jeeAdvanced).map((c) => c.id);
const HIGH = CATALOG.filter((c) => c.mainWeight === "very-high" || c.advWeight === "very-high").map((c) => c.id);
const BOARDS = CATALOG.filter((c) => c.boards).map((c) => c.id);

export const TRACKS: CrashTrack[] = [
  {
    id: "foundation-11",
    title: "Class 11 Foundation",
    audience: "Starting XI · aiming IIT in 2028/29",
    days: 180,
    hoursPerDay: "4–6 h",
    blurb:
      "Eighteen weeks of XI PCM in the only order that doesn’t leak. NCERT first, then JEE-grade numericals. No Class 12 until the spine is rigid.",
    outcomes: [
      "Every XI chapter completed with formula sheet + quiz",
      "Mechanics and GOC treated as rank subjects, not ‘later’",
      "A weekly mixed problem set so forgetting cannot hide",
    ],
    schedule: packDays(
      [...PHY11, ...CHE11, ...MAT11],
      180,
      5,
      (d, ids) => `Day ${d} · ${names(ids)}`,
      (d, ids) =>
        d % 7 === 0
          ? `Weekly mixed drill on ${names(ids)}. Re-quiz anything under 80%.`
          : `Theory + 15 numericals on ${names(ids)}. Close with the in-chapter quiz.`,
    ),
  },
  {
    id: "class-12-main",
    title: "Class 12 + JEE Main",
    audience: "XII students sitting Main this year",
    days: 150,
    hoursPerDay: "6–8 h",
    blurb:
      "XII NCERT in lockstep with Main-weight chapters. Boards and Main share 80% of the page — this track refuses to study them twice.",
    outcomes: [
      "XII PCM board-ready with derivations",
      "Main high-weight chapters (current, electrostatics, calculus, organic) cycled three times",
      "Full syllabus mock every Sunday from day 90",
    ],
    schedule: packDays(
      [...PHY12, ...CHE12, ...MAT12, ...PHY11.slice(0, 8), ...CHE11.slice(0, 8), ...MAT11.slice(0, 8)],
      150,
      7,
      (d, ids) => `Day ${d} · ${names(ids)}`,
      (d, ids) =>
        d > 90 && d % 7 === 0
          ? "Full 3-hour Main mock, then error log. No new theory today."
          : `Board derivation in the morning, JEE numericals on ${names(ids)} after.`,
    ),
  },
  {
    id: "main-60",
    title: "JEE Main 60-day Crash",
    audience: "Syllabus done once · score not moving",
    days: 60,
    hoursPerDay: "8–10 h",
    blurb:
      "Only high-weight Main chapters, PYQ pattern, and timed blocks. This is not a first reading. If a chapter is still ‘new’, park it and use the 180-day track.",
    outcomes: [
      "Two full revisions of every very-high weight chapter",
      "20+ timed 1-hour sectional tests",
      "A personal error book of at most 80 recurring mistakes",
    ],
    schedule: packDays(
      HIGH.filter((id) => CATALOG.find((c) => c.id === id)?.jeeMain),
      60,
      9,
      (d, ids) => `Crash ${d} · ${names(ids)}`,
      (d, ids) =>
        d % 5 === 0
          ? "Sectional mock (25 Q, 60 min) then rewrite every wrong idea in one line."
          : `Formula dump from memory, then 25 PYQs on ${names(ids)}.`,
    ),
  },
  {
    id: "main-30",
    title: "Main 30-day Salvage",
    audience: "Under a month · percentile over perfection",
    days: 30,
    hoursPerDay: "10 h",
    blurb:
      "Scoring chapters only. Skip vanity topics. Chemistry NCERT line-by-line, maths calculus + coordinate, physics modern + current + electrostatics.",
    outcomes: [
      "A realistic 95+ percentile map, not a 99 fantasy",
      "Chemistry as the stable 80/100 floor",
      "No new books. PYQ + this atlas only.",
    ],
    schedule: packDays(
      [
        "chem-goc",
        "chem-hc",
        "chem-coord",
        "chem-electro",
        "chem-eq",
        "chem-bio",
        "chem-dblock",
        "chem-carbonyl",
        "phy-current",
        "phy-charges",
        "phy-potential",
        "phy-semiconductors",
        "phy-dual",
        "phy-atoms",
        "phy-ray",
        "phy-thermo",
        "math-int",
        "math-cont",
        "math-aod",
        "math-conic",
        "math-matrices",
        "math-dets",
        "math-prob-12",
        "math-vec",
        "math-3d-12",
      ],
      30,
      10,
      (d, ids) => `Salvage ${d} · ${names(ids)}`,
      () => "Morning: NCERT highlights. Afternoon: 40 mixed PYQs. Night: formula recitation + 15 min error log.",
    ),
  },
  {
    id: "advanced-90",
    title: "JEE Advanced 90-day",
    audience: "Main 98+ile or equivalent mock level",
    days: 90,
    hoursPerDay: "8–10 h",
    blurb:
      "Multi-correct, paragraph, integer — the paper is a different sport. This track adds Advanced-only chapters (solid state, salt analysis, gases) and stretches mechanics, electrostatics, organic, conics.",
    outcomes: [
      "Comfort with multi-correct without option-elimination panic",
      "Salt analysis and p-block at Advanced density",
      "Two full Advanced mocks per week after day 50",
    ],
    schedule: packDays(
      ADV,
      90,
      9,
      (d, ids) => `Adv ${d} · ${names(ids)}`,
      (d, ids) =>
        d > 50 && d % 3 === 0
          ? "One Advanced paper (3 h). Next morning: re-solve every wrong and every lucky-correct."
          : `Multi-correct drill on ${names(ids)}. Write why each wrong option fails.`,
    ),
  },
  {
    id: "rank-500",
    title: "Rank 500 Protocol",
    audience: "Already clearing Advanced comfortably",
    days: 120,
    hoursPerDay: "8 h",
    blurb:
      "Not more content — sharper selection. Mixed-subject days, olympiad-adjacent extras, and a ruthless mock post-mortem. Irodov/Krotov only where tagged.",
    outcomes: [
      "Error types classified: concept / calculation / misread / time",
      "Booster modules completed",
      "Paper-2 stamina (6 hours in a day) trained, not hoped for",
    ],
    schedule: packDays(
      [...HIGH, ...ADV.filter((id) => !HIGH.includes(id)).slice(0, 20)],
      120,
      8,
      (d, ids) => `R500 · ${names(ids)}`,
      (d) =>
        d % 4 === 0
          ? "Full Advanced pair across two sessions. Sleep. Next day is analysis only."
          : "One hard mixed set (Irodov-style mechanics or integer calculus) plus a light NCERT inorganic pass.",
    ),
  },
  {
    id: "boards-45",
    title: "CBSE 95+ in 45 days",
    audience: "XII boards in six weeks",
    days: 45,
    hoursPerDay: "7 h",
    blurb:
      "Derivations, NCERT in-text + exercises, exemplar, and sample papers. JEE numericals paused except as board numericals. Linear programming returns.",
    outcomes: [
      "Every NCERT derivation writable from memory",
      "Exemplar numericals done once",
      "Five CBSE sample papers in exam conditions",
    ],
    schedule: packDays(
      BOARDS,
      45,
      7,
      (d, ids) => `Board ${d} · ${names(ids)}`,
      (d, ids) =>
        d % 6 === 0
          ? "3-hour CBSE sample paper. Mark with official scheme, not vibes."
          : `NCERT theory + in-text + exercises for ${names(ids)}. Write two derivations by hand.`,
    ),
  },
];

export const TRACK_BY_ID = Object.fromEntries(TRACKS.map((t) => [t.id, t]));
