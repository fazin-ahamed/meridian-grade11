import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ChapterProgress = {
  sections: string[];
  quizBest?: number;
  quizTotal?: number;
  mastered: boolean;
  completed: boolean;
};

export type Miss = {
  id: string;
  at: string;
  chapterId: string;
  stem: string;
  chosen: string;
  correct: string;
};

export type PaperAttempt = {
  score: number;
  total: number;
  at: string;
};

type ProgressState = {
  chapters: Record<string, ChapterProgress>;
  bookmarks: string[];
  notes: Record<string, string>;
  misses: Miss[];
  paperAttempts: Record<string, PaperAttempt>;
  trackId: string | null;
  lastChapterId: string | null;
  xp: number;
  streak: number;
  lastActive: string | null;
  hydrateReady: boolean;
  markSection: (chapterId: string, sectionId: string) => void;
  completeChapter: (chapterId: string) => void;
  recordQuiz: (chapterId: string, score: number, total: number) => void;
  toggleBookmark: (id: string) => void;
  setNote: (chapterId: string, note: string) => void;
  logMiss: (m: Omit<Miss, "id" | "at">) => void;
  recordPaper: (paperId: string, score: number, total: number) => void;
  clearMisses: () => void;
  setTrack: (id: string | null) => void;
  setLastChapter: (id: string) => void;
  touchStreak: () => void;
  reset: () => void;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

function emptyChapter(): ChapterProgress {
  return { sections: [], mastered: false, completed: false };
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      chapters: {},
      bookmarks: [],
      notes: {},
      misses: [],
      paperAttempts: {},
      trackId: null,
      lastChapterId: null,
      xp: 0,
      streak: 0,
      lastActive: null,
      hydrateReady: false,
      markSection: (chapterId, sectionId) => {
        const cur = get().chapters[chapterId] ?? emptyChapter();
        if (cur.sections.includes(sectionId)) return;
        set({
          chapters: {
            ...get().chapters,
            [chapterId]: { ...cur, sections: [...cur.sections, sectionId] },
          },
          xp: get().xp + 5,
        });
        get().touchStreak();
      },
      completeChapter: (chapterId) => {
        const cur = get().chapters[chapterId] ?? emptyChapter();
        if (cur.completed) return;
        set({
          chapters: {
            ...get().chapters,
            [chapterId]: { ...cur, completed: true, mastered: (cur.quizBest ?? 0) >= 4 },
          },
          xp: get().xp + 40,
          lastChapterId: chapterId,
        });
        get().touchStreak();
      },
      recordQuiz: (chapterId, score, total) => {
        const cur = get().chapters[chapterId] ?? emptyChapter();
        const best = Math.max(cur.quizBest ?? 0, score);
        set({
          chapters: {
            ...get().chapters,
            [chapterId]: {
              ...cur,
              quizBest: best,
              quizTotal: total,
              mastered: total > 0 ? best >= Math.ceil(total * 0.8) : cur.mastered,
            },
          },
          xp: get().xp + score * 8,
        });
        get().touchStreak();
      },
      toggleBookmark: (id) => {
        const has = get().bookmarks.includes(id);
        set({
          bookmarks: has ? get().bookmarks.filter((x) => x !== id) : [...get().bookmarks, id],
        });
      },
      setNote: (chapterId, note) => {
        set({ notes: { ...get().notes, [chapterId]: note } });
      },
      logMiss: (m) => {
        const miss: Miss = {
          ...m,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          at: new Date().toISOString(),
        };
        set({ misses: [miss, ...get().misses].slice(0, 400) });
      },
      recordPaper: (paperId, score, total) => {
        set({
          paperAttempts: {
            ...(get().paperAttempts ?? {}),
            [paperId]: { score, total, at: new Date().toISOString() },
          },
          xp: get().xp + score * 2,
        });
        get().touchStreak();
      },
      clearMisses: () => set({ misses: [] }),
      setTrack: (id) => set({ trackId: id }),
      setLastChapter: (id) => set({ lastChapterId: id }),
      touchStreak: () => {
        const d = today();
        const last = get().lastActive;
        if (last === d) return;
        const y = new Date();
        y.setDate(y.getDate() - 1);
        const yest = y.toISOString().slice(0, 10);
        set({
          lastActive: d,
          streak: last === yest ? get().streak + 1 : 1,
        });
      },
      reset: () =>
        set({
          chapters: {},
          bookmarks: [],
          notes: {},
          misses: [],
          paperAttempts: {},
          trackId: null,
          lastChapterId: null,
          xp: 0,
          streak: 0,
          lastActive: null,
        }),
    }),
    {
      name: "meridian-progress-v1",
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrateReady = true;
      },
    },
  ),
);
