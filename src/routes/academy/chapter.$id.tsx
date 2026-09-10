import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Bookmark, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CHAPTER_FIGURE, Figure, figuresFor } from "@/components/diagrams";
import { ChapterGuide } from "@/components/learning-guide";
import { ChapterLab, hasLab } from "@/components/labs";
import { PageKicker, SubjectIcon } from "@/components/layout/shell";
import { DrillSession } from "@/components/session";
import { Prose, TeX } from "@/components/tex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATALOG, CHAPTER_BY_ID } from "@/data/catalog";
import { getContent } from "@/data/content";
import { guideFor } from "@/data/learning";
import { MILL_PER_CHAPTER } from "@/data/mill/count";
import { officialFor } from "@/data/official";
import { papersForChapter } from "@/data/papers";
import type { ExamTag, PlayItem, TheoryBlock } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/academy/chapter/$id")({
  component: ChapterPage,
});

const BASE_TABS = ["theory", "lab", "formulas", "problems", "quiz", "mill", "boost"] as const;
type Tab = (typeof BASE_TABS)[number] | "papers";

export function ChapterPage() {
  const { id } = Route.useParams();
  const meta = CHAPTER_BY_ID[id];
  if (!meta) throw notFound();
  const content = getContent(id);
  const papers = papersForChapter(id);
  const tabs: Tab[] = papers.length
    ? ["theory", "lab", "formulas", "problems", "quiz", "papers", "mill", "boost"]
    : [...BASE_TABS];
  const [tab, setTab] = useState<Tab>("theory");
  const [millItems, setMillItems] = useState<PlayItem[]>([]);
  const [seed, setSeed] = useState(1);
  const [showFigs, setShowFigs] = useState(false);
  const setLast = useProgress((s) => s.setLastChapter);
  const markSection = useProgress((s) => s.markSection);
  const completeChapter = useProgress((s) => s.completeChapter);
  const toggleBookmark = useProgress((s) => s.toggleBookmark);
  const bookmarks = useProgress((s) => s.bookmarks);
  const ch = useProgress((s) => s.chapters[id]);
  const notes = useProgress((s) => s.notes[id] ?? "");
  const setNote = useProgress((s) => s.setNote);

  useEffect(() => {
    setLast(id);
    setTab("theory");
  }, [id, setLast]);

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
  const heroFig = CHAPTER_FIGURE[id];
  const extraFigs = figuresFor(id).filter((f) => f !== heroFig);
  const guide = guideFor(meta);
  const idx = CATALOG.findIndex((c) => c.id === id);
  const prev = idx > 0 ? CATALOG[idx - 1] : undefined;
  const next = idx >= 0 && idx < CATALOG.length - 1 ? CATALOG[idx + 1] : undefined;
  const theoryHasHero = content.theory.some((b) => b.diagram === heroFig);
  const official = officialFor(id);

  return (
    <article className="mx-auto max-w-5xl">
      <Link
        to="/academy/subject/$subject"
        params={{ subject: meta.subject }}
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        <ChevronLeft className="size-4" /> {meta.subject}
      </Link>
      <PageKicker>
        {meta.ncert} · {meta.unit}
      </PageKicker>
      <div className="mt-1 flex items-start justify-between gap-3">
        <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{meta.title}</h1>
        <button
          type="button"
          onClick={() => toggleBookmark(id)}
          className="size-11 shrink-0 rounded-md border border-border text-muted hover:text-fg"
          aria-label="Bookmark"
        >
          <Bookmark className={cn("mx-auto size-4", bookmarks.includes(id) && "fill-fg text-fg")} />
        </button>
      </div>
      <p className="mt-3 max-w-2xl text-muted">{meta.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="gap-1">
          <SubjectIcon subject={meta.subject} />
          Class {meta.classLevel === "both" ? "11–12" : meta.classLevel}
        </Badge>
        {meta.jeeMain && <Badge variant="outline">Main · {meta.mainWeight}</Badge>}
        {meta.jeeAdvanced && <Badge variant="outline">Advanced · {meta.advWeight}</Badge>}
        {meta.boards && <Badge variant="outline">Boards</Badge>}
        <Badge variant="outline">{meta.hours}h</Badge>
        <Badge variant="outline">Difficulty {meta.difficulty}/5</Badge>
      </div>

      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              markSection(id, t);
            }}
            className={cn(
              "h-11 shrink-0 px-4 text-sm capitalize",
              tab === t ? "border-b-2 border-accent text-fg" : "text-muted hover:text-fg",
            )}
          >
            {t === "boost"
              ? "Extras"
              : t === "mill"
                ? "Mill"
                : t === "lab"
                  ? hasLab(id)
                    ? "Lab · live"
                    : "Lab"
                  : t === "theory"
                    ? "Notes"
                    : t === "papers"
                      ? `Papers · ${papers.length}`
                      : t}
          </button>
        ))}
      </div>

      {tab === "theory" && (
        <div className="mt-8 space-y-10">
          <ChapterGuide meta={meta} content={content} guide={guide} heroFig={heroFig} official={official} />
          <details className="rounded-2xl border border-border bg-surface p-5">
            <summary className="cursor-pointer text-sm font-medium">Open full reference notes</summary>
            <div className="mt-8 space-y-10">
          {content.starter && (
            <section className="rounded-xl border border-border bg-raised p-5">
              <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">If you just started Class 11</p>
              <h2 className="font-display mt-2 text-xl">{content.starter.heading}</h2>
              <div className="mt-2">
                <Prose text={content.starter.body} />
              </div>
              {content.starter.bullets && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                  {content.starter.bullets.map((b) => (
                    <li key={b}>
                      <Prose text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
          {heroFig && !theoryHasHero && <Figure id={heroFig} />}
          {official && (
            <section className="rounded-xl border border-border bg-surface p-5">
              <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Official CBSE list</p>
              <h2 className="font-display mt-2 text-xl">{official.unit}</h2>
              <p className="mt-1 text-sm text-muted">
                {official.ncert}
                {official.periods ? ` · ${official.periods}` : ""}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                {official.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {official.jeeExtra.length > 0 && (
                <>
                  <p className="mt-4 text-[11px] tracking-[0.16em] text-subtle uppercase">
                    What JEE still adds
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                    {official.jeeExtra.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}
          {extraFigs.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => setShowFigs((s) => !s)}
                className="text-sm text-muted hover:text-fg"
              >
                {showFigs ? "Hide extra figures" : `Show ${extraFigs.length} extra figure${extraFigs.length > 1 ? "s" : ""}`}
              </button>
              {showFigs && extraFigs.map((f) => <Figure key={f} id={f} />)}
            </div>
          )}
          <section>
            <h2 className="font-display text-xl">Objectives</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              {meta.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
          {content.classNotes && content.classNotes.length > 0 && (
            <section className="space-y-10">
              <div>
                <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Class notebook</p>
                <h2 className="font-display mt-2 text-2xl">Definition first, then the board.</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Term, meaning, formula, trap — the same spine as a classroom note. Read this before
                  the JEE stretch below.
                </p>
              </div>
              {content.classNotes.map((block, i) => (
                <NoteBlock key={block.id} block={block} index={i} />
              ))}
            </section>
          )}
          {content.theory.length > 0 && (
            <section className="space-y-10">
              {content.classNotes && content.classNotes.length > 0 && (
                <div>
                  <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">JEE stretch</p>
                  <h2 className="font-display mt-2 text-2xl">What Main and Advanced still add.</h2>
                </div>
              )}
              {content.theory.map((block) => (
                <NoteBlock key={block.id} block={block} />
              ))}
            </section>
          )}
          <section>
            <h2 className="font-display text-xl">Traps</h2>
            <ul className="mt-3 space-y-2">
              {content.traps.map((t) => (
                <li key={t} className="rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
                  <Prose text={t} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl">Exam tactics</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
              {content.tricks.map((t) => (
                <li key={t}>
                  <Prose text={t} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl">How papers use this</h2>
            <div className="mt-3">
              <Prose text={content.pyqInsight} />
            </div>
          </section>
            </div>
          </details>
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
                idea — projectile, incline, SHM, Gauss, YDSE, unit circle, Bayes, and the rest of the
                lab map. Here the static figure plus the theory tab is the right load.
              </p>
            </div>
          )}
        </div>
      )}

      {tab === "formulas" && (
        <div className="mt-8 overflow-hidden rounded-xl border border-border">
          {content.formulas.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted">Formula sheet fills in with the full notes pack.</p>
          )}
          {content.formulas.map((f, i) => (
            <div
              key={`${f.name}-${i}`}
              className="border-b border-border px-4 py-4 last:border-0"
            >
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
            Thirty-two fresh mill items for this chapter, drawn from a {MILL_PER_CHAPTER}-item computed
            bank — mixed numericals and concept MCQs, numbers recomputed each shuffle. The mill is
            built only when you open this tab, so the theory page stays light.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setSeed((s) => s + 1)}>
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

function NoteBlock({ block, index }: { block: TheoryBlock; index?: number }) {
  return (
    <section>
      {index != null && (
        <p className="text-xs tabular-nums tracking-[0.14em] text-subtle">
          {String(index + 1).padStart(2, "0")}
        </p>
      )}
      <h2 className={cn("font-display text-xl", index != null && "mt-1")}>{block.heading}</h2>
      {block.diagram && <Figure id={block.diagram} />}
      <div className={cn("mt-3", index != null && "rounded-xl border border-border bg-raised p-4")}>
        <Prose text={block.body} />
      </div>
      {block.table && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-raised">
                {block.table.headers.map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, i) => (
                <tr key={row.join("-")} className="border-b border-border last:border-0">
                  {row.map((cell) => (
                    <td key={cell} className="px-3 py-2 text-muted">
                      <Prose text={cell} compact />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {block.bullets && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
          {block.bullets.map((b) => (
            <li key={b}>
              <Prose text={b} />
            </li>
          ))}
        </ul>
      )}
      {block.callout && <Callout kind={block.callout.kind} text={block.callout.text} />}
    </section>
  );
}

function Callout({
  kind,
  text,
}: {
  kind: "main" | "advanced" | "trap" | "board" | "extra";
  text: string;
}) {
  const label =
    kind === "main"
      ? "JEE Main"
      : kind === "advanced"
        ? "JEE Advanced"
        : kind === "trap"
          ? "Trap"
          : kind === "board"
            ? "Boards"
            : "Extra";
  return (
    <div className="mt-4 rounded-lg border border-border bg-raised px-4 py-3">
      <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">{label}</p>
      <div className="mt-1">
        <Prose text={text} />
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
        Hand-written chapter quiz. For a 20-item computed mill with new numbers, open the Mill tab.
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
