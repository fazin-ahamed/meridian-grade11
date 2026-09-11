import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, Check, ChevronLeft, ChevronRight, Clock3, Layers3, Target } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CHAPTER_FIGURE, Figure } from "@/components/diagrams";
import { ChapterReference } from "@/components/chapter-reference";
import { ChapterGuide } from "@/components/learning-guide";
import { ChapterLab, hasLab } from "@/components/labs";
import { clampLessonStep } from "@/components/learning-navigation";
import { PageKicker, SubjectIcon } from "@/components/layout/shell";
import { useRegisterChapterSidebar } from "@/components/layout/shell-context";
import { DrillSession } from "@/components/session";
import { Prose, TeX } from "@/components/tex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATALOG, CHAPTER_BY_ID } from "@/data/catalog";
import { getContent } from "@/data/content";
import { guideFor } from "@/data/learning";
import { teachingTopicsFor } from "@/data/learning/teaching-topics";
import { MILL_PER_CHAPTER } from "@/data/mill/count";
import { officialFor } from "@/data/official";
import { papersForChapter } from "@/data/papers";
import type { ExamTag, PlayItem } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/academy/chapter/$id")({
  component: ChapterPage,
});

const BASE_TABS = [
  "lesson",
  "reference",
  "lab",
  "formulas",
  "problems",
  "quiz",
  "mill",
  "boost",
] as const;
type Tab = (typeof BASE_TABS)[number] | "papers";

export function ChapterPage() {
  const { id } = Route.useParams();
  const meta = CHAPTER_BY_ID[id];
  if (!meta) throw notFound();
  const content = useMemo(() => getContent(id), [id]);
  const papers = useMemo(() => papersForChapter(id), [id]);
  const tabs: Tab[] = papers.length
    ? ["lesson", "reference", "lab", "formulas", "problems", "quiz", "papers", "mill", "boost"]
    : [...BASE_TABS];
  const [tab, setTab] = useState<Tab>("lesson");
  const [millItems, setMillItems] = useState<PlayItem[]>([]);
  const [seed, setSeed] = useState(1);
  const setLast = useProgress((s) => s.setLastChapter);
  const markSection = useProgress((s) => s.markSection);
  const completeChapter = useProgress((s) => s.completeChapter);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const bookmarks = useProgress((s) => s.bookmarks);
  const ch = useProgress((s) => s.chapters[id]);
  const notes = useProgress((s) => s.notes[id] ?? "");
  const setNote = useProgress((s) => s.setNote);
  const guide = useMemo(() => guideFor(meta), [meta]);
  const lessonTopics = useMemo(
    () => teachingTopicsFor(meta, content, guide),
    [content, guide, meta],
  );
  const [activeLessonTopic, setActiveLessonTopic] = useState(0);
  const [pendingLessonTopic, setPendingLessonTopic] = useState<number | null>(null);

  const scrollToLessonTopic = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return;
      window.requestAnimationFrame(() => {
        document.getElementById(`guided-topic-${lessonTopics[index]?.id}`)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [lessonTopics],
  );

  const selectLessonTopic = useCallback(
    (next: number) => {
      const target = clampLessonStep(next, lessonTopics.length);
      setActiveLessonTopic(target);
      if (tab !== "lesson") {
        setPendingLessonTopic(target);
        setTab("lesson");
        return;
      }
      scrollToLessonTopic(target);
    },
    [lessonTopics.length, scrollToLessonTopic, tab],
  );

  useEffect(() => {
    setLast(id);
    setTab("lesson");
    setActiveLessonTopic(0);
    setPendingLessonTopic(null);
  }, [id, setLast]);

  useEffect(() => {
    if (tab !== "lesson" || pendingLessonTopic == null) return;
    const frame = window.requestAnimationFrame(() => {
      scrollToLessonTopic(pendingLessonTopic);
      setPendingLessonTopic(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pendingLessonTopic, scrollToLessonTopic, tab]);

  useEffect(() => {
    if (tab !== "mill") return;
    let dead = false;
    import("@/data/mill").then((m) => {
      if (!dead) setMillItems(m.millForChapter(id, 32, seed * 17));
    });
    return () => {
      dead = true;
    };
  }, [id, seed, tab]);
  const sidebarRegistration = useMemo(
    () => ({
      subject:
        meta.subject === "maths"
          ? "Mathematics"
          : meta.subject[0]!.toUpperCase() + meta.subject.slice(1),
      chapterTitle: meta.title,
      topics: lessonTopics.map((topic) => topic.title),
      activeTopic: activeLessonTopic,
      onSelectTopic: selectLessonTopic,
    }),
    [activeLessonTopic, lessonTopics, meta.subject, meta.title, selectLessonTopic],
  );

  useRegisterChapterSidebar(sidebarRegistration);

  const heroFig = CHAPTER_FIGURE[id];
  const idx = CATALOG.findIndex((c) => c.id === id);
  const prev = idx > 0 ? CATALOG[idx - 1] : undefined;
  const next = idx >= 0 && idx < CATALOG.length - 1 ? CATALOG[idx + 1] : undefined;
  const official = officialFor(id);

  return (
    <article className="mx-auto max-w-5xl">
      <header className="border-b border-border pb-8">
        <Link
          to="/academy/subject/$subject"
          params={{ subject: meta.subject }}
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
        >
          <ChevronLeft className="size-4" /> Back to {meta.subject}
        </Link>
        <PageKicker>
          {meta.ncert} · {meta.unit}
        </PageKicker>
        <div className="mt-1 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
              {meta.title}
            </h1>
            <p className="mt-4 max-w-3xl text-[1.02rem] leading-relaxed text-muted">
              {meta.summary}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleBookmark(id)}
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-border text-muted transition-colors hover:bg-raised hover:text-fg"
            aria-label={bookmarks.includes(id) ? "Remove bookmark" : "Bookmark chapter"}
          >
            <Bookmark className={cn("size-4", bookmarks.includes(id) && "fill-fg text-fg")} />
          </button>
        </div>

        <div className="mt-7 grid gap-0 border-y border-border sm:grid-cols-3">
          <ChapterStat
            icon={Layers3}
            label="Lesson map"
            value={`${lessonSectionCount(content)} sections`}
          />
          <ChapterStat icon={Clock3} label="Suggested time" value={`${meta.hours} hours`} />
          <ChapterStat
            icon={Target}
            label="Exam focus"
            value={meta.jeeAdvanced ? "Main + Advanced" : meta.jeeMain ? "Boards + Main" : "Boards"}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-subtle">
          <span className="inline-flex items-center gap-1.5">
            <SubjectIcon subject={meta.subject} /> Class{" "}
            {meta.classLevel === "both" ? "11–12" : meta.classLevel}
          </span>
          {meta.jeeMain && <span>Main · {meta.mainWeight}</span>}
          {meta.jeeAdvanced && <span>Advanced · {meta.advWeight}</span>}
          <span>Difficulty {meta.difficulty}/5</span>
        </div>
      </header>

      <nav
        className="sticky top-2 z-10 mt-6 flex gap-1 overflow-x-auto border-y border-border bg-bg/90 backdrop-blur-md"
        aria-label="Chapter workspace"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              markSection(id, t);
            }}
            className={cn(
              "h-12 shrink-0 px-3 text-sm transition-colors sm:px-4",
              tab === t ? "border-b-2 border-accent text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t === "boost"
              ? "Extras"
              : t === "mill"
                ? "Practice mill"
                : t === "lab"
                  ? hasLab(id)
                    ? "Lab · live"
                    : "Lab"
                  : t === "lesson"
                    ? "Lesson"
                    : t === "reference"
                      ? "Reference"
                      : t === "formulas"
                        ? "Formula shelf"
                        : t === "problems"
                          ? "Worked problems"
                          : t === "quiz"
                            ? "Chapter quiz"
                            : t === "papers"
                              ? `Papers · ${papers.length}`
                              : t}
          </button>
        ))}
      </nav>

      {tab === "lesson" && (
        <div className="mt-8">
          <ChapterGuide
            meta={meta}
            content={content}
            guide={guide}
            heroFig={heroFig}
            official={official}
            activeTopic={activeLessonTopic}
            onActiveTopicChange={setActiveLessonTopic}
          />
        </div>
      )}

      {tab === "reference" && (
        <div className="mt-8">
          <ChapterReference meta={meta} content={content} official={official} />
        </div>
      )}

      {tab === "lab" && (
        <div className="mt-8">
          {hasLab(id) ? (
            <ChapterLab chapterId={id} />
          ) : (
            <div className="space-y-4">
              {heroFig && <Figure id={heroFig} />}
              <p className="max-w-2xl text-sm text-muted">
                Interactive sliders live on the chapters where a moving picture actually teaches the
                idea — projectile, incline, SHM, Gauss, YDSE, unit circle, Bayes, and the rest of
                the lab map. Here the static figure plus the theory tab is the right load.
              </p>
            </div>
          )}
        </div>
      )}

      {tab === "formulas" && (
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          {content.formulas.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted">
              Formula sheet fills in with the full notes pack.
            </p>
          )}
          {content.formulas.map((f, i) => (
            <div key={`${f.name}-${i}`} className="border-b border-border px-4 py-4 last:border-0">
              <p className="text-xs tracking-wide text-subtle uppercase">{f.name}</p>
              <div className="mt-2 overflow-x-auto">
                <TeX expr={f.latex} display />
              </div>
              {f.note && <p className="mt-1 text-sm text-muted">{f.note}</p>}
            </div>
          ))}
        </div>
      )}

      {tab === "problems" && (
        <div className="mt-8 space-y-6">
          {content.worked.map((w) => (
            <Worked key={w.id} {...w} />
          ))}
        </div>
      )}

      {tab === "quiz" && <QuizPanel chapterId={id} items={content.quiz} />}

      {tab === "papers" && (
        <div className="mt-8 space-y-4">
          <p className="max-w-2xl text-sm text-muted">
            Timed classroom papers for this chapter. Sit them closed-book; the marking scheme opens
            after you submit.
          </p>
          {papers.map((p) => (
            <Link
              key={p.id}
              to="/academy/papers/$id"
              params={{ id: p.id }}
              className="block rounded-xl border border-border bg-surface p-5 hover:bg-raised"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-medium">{p.title}</h2>
                <Badge variant="outline">{p.mm} mm</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">
                {p.paperNo} · {p.minutes} min · {p.questions.length} questions
                {p.topics ? ` · ${p.topics}` : ""}
              </p>
            </Link>
          ))}
        </div>
      )}

      {tab === "mill" && (
        <div className="mt-8">
          <p className="max-w-2xl text-sm text-muted">
            Thirty-two fresh mill items for this chapter, drawn from a {MILL_PER_CHAPTER}-item
            computed bank — mixed numericals and concept MCQs, numbers recomputed each shuffle. The
            mill is built only when you open this tab, so the theory page stays light.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setSeed((s) => s + 1)}
          >
            Shuffle a new 32
          </Button>
          <div className="mt-6">
            <DrillSession
              key={`${id}-${seed}`}
              items={millItems}
              title="Chapter mill"
              sessionId={`mill:${id}:${seed}`}
              mode="learn"
            />
          </div>
        </div>
      )}

      {tab === "boost" && (
        <div className="mt-8 space-y-6">
          {content.extras.map((e) => (
            <section key={e.title} className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-medium">{e.title}</h2>
              <div className="mt-2">
                <Prose text={e.body} />
              </div>
            </section>
          ))}
          <section>
            <h2 className="font-display text-xl">Mastery checklist</h2>
            <ul className="mt-3 space-y-2">
              {content.checklist.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                  <Prose text={c} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-sm font-medium">Private notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNote(id, e.target.value)}
          placeholder="Error-book lines for this chapter…"
          className="mt-2 min-h-28 w-full rounded-xl border border-border bg-raised px-3 py-2 text-sm text-fg outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant={ch?.completed ? "secondary" : "default"}
          onClick={() => completeChapter(id)}
        >
          {ch?.completed ? "Completed" : "Mark chapter complete"}
        </Button>
        <div className="flex gap-2">
          {prev && (
            <Button asChild variant="outline">
              <Link to="/academy/chapter/$id" params={{ id: prev.id }}>
                <ChevronLeft className="size-4" />
                {prev.title}
              </Link>
            </Button>
          )}
          {next && (
            <Button asChild variant="outline">
              <Link to="/academy/chapter/$id" params={{ id: next.id }}>
                {next.title}
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

function lessonSectionCount(content: ReturnType<typeof getContent>): number {
  const masterySections = (content.mastery ?? [])
    .filter((module) => module.includeInGuide !== false)
    .reduce((total, module) => total + module.sections.length, 0);
  return masterySections || content.classNotes?.length || content.theory.length;
}

function ChapterStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-4 sm:border-r sm:border-border sm:px-4 sm:first:pl-0 sm:last:border-r-0">
      <Icon className="size-4 text-accent" strokeWidth={1.7} />
      <div>
        <p className="text-[11px] tracking-[0.12em] text-subtle uppercase">{label}</p>
        <p className="mt-1 text-sm font-medium text-fg">{value}</p>
      </div>
    </div>
  );
}

function Worked(w: {
  exam: ExamTag;
  prompt: string;
  steps: string[];
  answer: string;
  insight: string;
  diagram?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <Badge variant="outline" className="capitalize">
        {w.exam}
      </Badge>
      <div className="mt-3">
        <Prose text={w.prompt} />
      </div>
      {w.diagram && <Figure id={w.diagram} />}
      <Button variant="secondary" size="sm" className="mt-4" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide solution" : "Show solution"}
      </Button>
      {open && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
            {w.steps.map((s) => (
              <li key={s}>
                <Prose text={s} />
              </li>
            ))}
          </ol>
          <p className="text-sm">
            <span className="text-subtle">Answer · </span>
            <Prose text={w.answer} className="inline" />
          </p>
          <p className="text-sm text-muted">
            <span className="text-subtle">Insight · </span>
            {w.insight}
          </p>
        </div>
      )}
    </div>
  );
}

function QuizPanel({
  chapterId,
  items,
}: {
  chapterId: string;
  items: ReturnType<typeof getContent>["quiz"];
}) {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const recordQuiz = useProgress((s) => s.recordQuiz);
  const best = useProgress((s) => s.chapters[chapterId]?.quizBest);

  const score = items.reduce((n, q) => n + (picked[q.id] === q.correct ? 1 : 0), 0);

  return (
    <div className="mt-8 space-y-6">
      <p className="text-sm text-muted">
        Chapter quiz with exam-tagged options. For fresh numbers and mixed difficulty, open the
        Practice mill.
      </p>
      {best != null && (
        <p className="text-sm text-muted">
          Best on this device: {best}/{items.length}
        </p>
      )}
      {items.map((q, i) => (
        <div key={q.id} className="rounded-xl border border-border bg-surface p-5">
          <div className="flex gap-2">
            <Badge variant="outline" className="capitalize">
              {q.exam}
            </Badge>
            <span className="text-xs tabular-nums text-subtle">Q{i + 1}</span>
          </div>
          <div className="mt-3">
            <Prose text={q.stem} />
          </div>
          <ul className="mt-4 space-y-2">
            {q.options.map((opt, j) => {
              const chosen = picked[q.id] === j;
              const right = submitted && j === q.correct;
              const wrong = submitted && chosen && j !== q.correct;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    disabled={submitted}
                    onClick={() => setPicked((p) => ({ ...p, [q.id]: j }))}
                    className={cn(
                      "w-full rounded-lg border px-3 py-2.5 text-left text-sm",
                      right
                        ? "border-ok/40 bg-ok/10"
                        : wrong
                          ? "border-danger/40 bg-danger/10"
                          : chosen
                            ? "border-accent bg-raised"
                            : "border-border hover:bg-raised",
                    )}
                  >
                    <Prose text={opt} compact />
                  </button>
                </li>
              );
            })}
          </ul>
          {submitted && (
            <div className="mt-3 text-sm text-muted">
              <Prose text={q.why} />
            </div>
          )}
        </div>
      ))}
      {!submitted ? (
        <Button
          disabled={Object.keys(picked).length < items.length}
          onClick={() => {
            setSubmitted(true);
            recordQuiz(chapterId, score, items.length);
          }}
        >
          Submit quiz
        </Button>
      ) : (
        <p className="font-display text-2xl tabular-nums">
          {score}/{items.length}
        </p>
      )}
    </div>
  );
}
