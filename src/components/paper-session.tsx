import { useEffect, useMemo, useState } from "react";
import { Figure } from "@/components/diagrams";
import { Prose } from "@/components/tex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ClassroomPaper, PaperQuestion } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

function autoAward(q: PaperQuestion, picked?: number, numeric?: string): number | null {
  if (q.kind === "mcq") return picked === q.correct ? q.marks : 0;
  if (q.kind === "numerical") {
    if (!numeric?.trim() || q.numerical == null) return 0;
    const v = Number(numeric);
    if (!Number.isFinite(v)) return 0;
    const tol = q.tolerance ?? 0.05;
    return Math.abs(v - q.numerical) <= Math.max(tol, 1e-6) ? q.marks : 0;
  }
  return null;
}

export function PaperSession({ paper }: { paper: ClassroomPaper }) {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [numeric, setNumeric] = useState<Record<string, string>>({});
  const [working, setWorking] = useState<Record<string, string>>({});
  const [selfMark, setSelfMark] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState(paper.minutes * 60);
  const recordPaper = useProgress((s) => s.recordPaper);
  const logMiss = useProgress((s) => s.logMiss);
  const last = useProgress((s) => s.paperAttempts?.[paper.id]);

  useEffect(() => {
    if (submitted) return;
    if (left <= 0) {
      finish();
      return;
    }
    const t = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, submitted]);

  const awarded = useMemo(() => {
    return paper.questions.map((q) => {
      const auto = autoAward(q, picked[q.id], numeric[q.id]);
      if (auto != null) return auto;
      return selfMark[q.id] ?? 0;
    });
  }, [paper.questions, picked, numeric, selfMark]);

  const score = awarded.reduce((s, n) => s + n, 0);

  function finish() {
    if (submitted) return;
    setSubmitted(true);
    const sc = paper.questions.reduce((sum, q) => {
      const auto = autoAward(q, picked[q.id], numeric[q.id]);
      return sum + (auto ?? 0);
    }, 0);
    recordPaper(paper.id, sc, paper.mm);
    for (const q of paper.questions) {
      const auto = autoAward(q, picked[q.id], numeric[q.id]);
      if (auto === 0) {
        logMiss({
          chapterId: paper.chapterId,
          stem: q.stem,
          chosen:
            q.kind === "numerical"
              ? numeric[q.id] || "blank"
              : q.kind === "mcq"
                ? (q.options?.[picked[q.id] ?? -1] ?? "skipped")
                : working[q.id] || "blank",
          correct: q.answer,
        });
      }
    }
  }

  const mm = Math.floor(left / 60);
  const ss = left % 60;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">{paper.paperNo}</p>
          <h1 className="font-display mt-1 text-3xl font-medium tracking-tight md:text-4xl">{paper.title}</h1>
          <p className="mt-2 text-sm text-muted">
            {paper.minutes} min · {paper.mm} marks · {paper.questions.length} questions
            {paper.topics ? ` · ${paper.topics}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm tabular-nums text-muted">
          {!submitted && (
            <span className={cn(left < 120 && "text-danger")}>
              {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
            </span>
          )}
          {last && (
            <span>
              Last {last.score}/{last.total}
            </span>
          )}
        </div>
      </div>

      <p className="mt-4 max-w-2xl text-sm text-muted">
        Closed book. MCQs and numericals mark themselves. Long answers show the classroom marking
        scheme after you submit — then self-score full / half / zero.
      </p>

      <ol className="mt-8 space-y-6">
        {paper.questions.map((q, qi) => (
          <li key={q.id} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs tabular-nums text-subtle">
                Q{q.n} · {q.marks} mark{q.marks === 1 ? "" : "s"} · {q.kind}
              </p>
              {submitted && (
                <Badge variant="outline">
                  {awarded[qi]}/{q.marks}
                </Badge>
              )}
            </div>
            <div className="mt-3">
              <Prose text={q.stem} />
            </div>
            {q.diagram && <Figure id={q.diagram} />}

            {q.kind === "mcq" && q.options && (
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
            )}

            {q.kind === "numerical" && (
              <div className="mt-4 flex items-center gap-2">
                <Input
                  inputMode="decimal"
                  disabled={submitted}
                  value={numeric[q.id] ?? ""}
                  onChange={(e) => setNumeric((n) => ({ ...n, [q.id]: e.target.value }))}
                  placeholder="Numerical answer"
                  className="max-w-xs"
                />
                {q.unit && <span className="text-sm text-muted">{q.unit}</span>}
              </div>
            )}

            {q.kind === "long" && (
              <textarea
                disabled={submitted}
                value={working[q.id] ?? ""}
                onChange={(e) => setWorking((w) => ({ ...w, [q.id]: e.target.value }))}
                placeholder="Working (optional — used when you self-mark)"
                className="mt-4 min-h-24 w-full rounded-lg border border-border bg-raised px-3 py-2 text-sm text-fg outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-accent/40"
              />
            )}

            {submitted && (
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Marking scheme</p>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-muted">
                  {q.steps.map((s) => (
                    <li key={s}>
                      <Prose text={s} />
                    </li>
                  ))}
                </ol>
                <p className="text-sm">
                  <span className="text-subtle">Answer · </span>
                  <Prose text={q.answer} className="inline" compact />
                </p>
                {q.insight && (
                  <p className="text-sm text-muted">
                    <span className="text-subtle">Insight · </span>
                    <Prose text={q.insight} className="inline" compact />
                  </p>
                )}
                {q.kind === "long" && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      [0, "Missed"],
                      [q.marks / 2, "Half"],
                      [q.marks, "Full"],
                    ].map(([m, label]) => (
                      <Button
                        key={String(label)}
                        type="button"
                        size="sm"
                        variant={selfMark[q.id] === m ? "default" : "outline"}
                        onClick={() => setSelfMark((s) => ({ ...s, [q.id]: Number(m) }))}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {!submitted ? (
          <Button onClick={finish}>Submit paper</Button>
        ) : (
          <p className="font-display text-2xl tabular-nums">
            {score}
            <span className="text-lg text-muted"> / {paper.mm}</span>
          </p>
        )}
        {submitted && (
          <p className="text-sm text-muted">
            Auto-marked {paper.questions.filter((q) => q.kind !== "long").length} items. Long answers
            wait for your full / half / zero.
          </p>
        )}
      </div>
    </div>
  );
}

export function PaperMarks({ paper }: { paper: ClassroomPaper }) {
  const parts = paper.questions.reduce(
    (acc, q) => {
      acc[q.kind] = (acc[q.kind] ?? 0) + q.marks;
      return acc;
    },
    {} as Record<string, number>,
  );
  return (
    <p className="text-xs text-subtle">
      {Object.entries(parts)
        .map(([k, v]) => `${v} ${k}`)
        .join(" · ")}
    </p>
  );
}
