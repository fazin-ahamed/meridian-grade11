import { CATALOG } from "./catalog";
import { millAdvMock, millForChapter, millMainMock, millMixed } from "./mill";
import type { ExamTag, PlayItem, SubjectId } from "./types";

export type MillSet = {
  id: string;
  title: string;
  blurb: string;
  n: number;
  minutes?: number;
  mode: "paper" | "learn";
  pick: (seed?: number) => PlayItem[];
};

export const PRACTICE_SETS: MillSet[] = [
  {
    id: "daily-20",
    title: "Daily 20 (learn mode)",
    blurb: "One-by-one with immediate check. Mixed PCM. The forgetting killer.",
    n: 20,
    mode: "learn",
    pick: (seed = 7) => millMixed({ n: 20, seed }),
  },
  {
    id: "main-15",
    title: "JEE Main mixed 15",
    blurb: "Main-tagged mill items. Forty minutes, no pause, paper mode.",
    n: 15,
    minutes: 40,
    mode: "paper",
    pick: (seed = 2) => millMixed({ exam: "main", n: 15, seed }),
  },
  {
    id: "main-75",
    title: "Main pattern 75",
    blurb: "25 each PCM. Three hours. Treat it like a shift — chair, water, no phone.",
    n: 75,
    minutes: 180,
    mode: "paper",
    pick: (seed = 1) => millMainMock(seed),
  },
  {
    id: "adv-18",
    title: "Advanced mixed 18",
    blurb: "Heavier stems. Write why every wrong option fails before you tick.",
    n: 18,
    minutes: 60,
    mode: "paper",
    pick: (seed = 3) => millAdvMock(seed),
  },
  {
    id: "phy-25",
    title: "Physics 25",
    blurb: "Mechanics through modern, one sitting.",
    n: 25,
    minutes: 50,
    mode: "paper",
    pick: (seed = 11) => millMixed({ subject: "physics", n: 25, seed }),
  },
  {
    id: "chem-25",
    title: "Chemistry 25",
    blurb: "Physical numericals mixed with GOC and inorganic sentences.",
    n: 25,
    minutes: 45,
    mode: "paper",
    pick: (seed = 13) => millMixed({ subject: "chemistry", n: 25, seed }),
  },
  {
    id: "math-25",
    title: "Mathematics 25",
    blurb: "Algebra, calculus, coordinate — the Main diet.",
    n: 25,
    minutes: 60,
    mode: "paper",
    pick: (seed = 17) => millMixed({ subject: "maths", n: 25, seed }),
  },
  {
    id: "boards-12",
    title: "Boards 12",
    blurb: "Definitions and NCERT-faithful numericals. Write the sentence, then the number.",
    n: 12,
    minutes: 30,
    mode: "learn",
    pick: (seed = 5) => millMixed({ exam: "boards", n: 12, seed }),
  },
  {
    id: "xi-start",
    title: "Class 11 starter 20",
    blurb: "Units, mole, sets, 1-D, projectile — the first-month diet. Learn mode.",
    n: 20,
    mode: "learn",
    pick: (seed = 19) => {
      const ids = ["phy-units", "phy-motion-1d", "phy-motion-2d", "chem-basic", "chem-atom", "math-sets", "math-trig"];
      const out = ids.flatMap((id, k) => millForChapter(id, 3, seed * 3 + k));
      return out.slice(0, 20);
    },
  },
  {
    id: "high-30",
    title: "High-weight 30",
    blurb: "Rotation, GOC, equilibrium, calculus, electrostatics, conics — the rank chapters.",
    n: 30,
    minutes: 70,
    mode: "paper",
    pick: (seed = 23) => {
      const ids = [
        "phy-rotation",
        "phy-charges",
        "phy-current",
        "chem-goc",
        "chem-eq",
        "chem-electro",
        "math-int",
        "math-conic",
        "math-cont",
      ];
      return ids.flatMap((id, k) => millForChapter(id, 4, seed + k)).slice(0, 30);
    },
  },
  {
    id: "mech-25",
    title: "Mechanics 25",
    blurb: "NLM through rotation and gravitation. Draw first.",
    n: 25,
    minutes: 55,
    mode: "paper",
    pick: (seed = 29) =>
      ["phy-nlm", "phy-wep", "phy-rotation", "phy-gravitation", "phy-fluids"]
        .flatMap((id, k) => millForChapter(id, 5, seed + k))
        .slice(0, 25),
  },
  {
    id: "organic-20",
    title: "Organic 20",
    blurb: "GOC through amines. Intermediate first, name second.",
    n: 20,
    minutes: 40,
    mode: "learn",
    pick: (seed = 31) =>
      ["chem-goc", "chem-hc", "chem-halo", "chem-alcohol", "chem-carbonyl", "chem-amines"]
        .flatMap((id, k) => millForChapter(id, 4, seed + k))
        .slice(0, 20),
  },
  {
    id: "calc-25",
    title: "Calculus 25",
    blurb: "Limits through DE. King, MVT, and a closed-interval max.",
    n: 25,
    minutes: 60,
    mode: "paper",
    pick: (seed = 37) =>
      ["math-limits", "math-cont", "math-aod", "math-int", "math-aoi", "math-de"]
        .flatMap((id, k) => millForChapter(id, 5, seed + k))
        .slice(0, 25),
  },
];

export function setById(id: string) {
  return PRACTICE_SETS.find((s) => s.id === id);
}

export function chapterMill(id: string, n = 20, seed = 1) {
  const meta = CATALOG.find((c) => c.id === id);
  const items = millForChapter(id, n, seed * 9);
  return { meta, items };
}

export type TaggedPlay = PlayItem & { subject: SubjectId; exam: ExamTag };
