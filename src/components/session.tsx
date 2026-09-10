import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Prose } from "@/components/tex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { PlayItem } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

function isCorrect(item: PlayItem, picked: number | undefined, numeric: string): boolean {
  if (item.kind === "numerical") {
    if (!numeric.trim()) return false;
    const v = Number(numeric);
    if (!Number.isFinite(v) || item.numerical == null) return false;
    const tol = item.tolerance ?? 0;
    return Math.abs(v - item.numerical) <= Math.max(tol, 1e-6);
  }
  return picked === item.correctIndex;
}

export function DrillSession({
  items,
  title,
  blurb,
  sessionId,
  minutes,
  mode = "paper",
}: {
  items: PlayItem[];
  title: string;
  blurb?: string;
  sessionId: string;
  minutes?: number;
  mode?: "paper" | "learn";
}) {
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [numeric, setNumeric] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [left, setLeft] = useState(minutes ? minutes * 60 : null);
  const recordQuiz = useProgress((s) => s.recordQuiz);
  const logMiss = useProgress((s) => s.logMiss);
  const touchStreak = useProgress((s) => s.touchStreak);

  useEffect(() => {
    if (left == null || submitted) return;
    if (left <= 0) {
      finish();
      return;
    }
    const t = window.setTimeout(() => setLeft((s) => (s == null ? s : s - 1)), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, submitted]);

  const score = useMemo(
    () => items.reduce((n, q) => n + (isCorrect(q, picked[q.id], numeric[q.id] ?? "") ? 1 : 0), 0),
    [items, picked, numeric],
  );

  function finish() {
    if (submitted) return;
    const sc = items.reduce((n, q) => n + (isCorrect(q, picked[q.id], numeric[q.id] ?? "") ? 1 : 0), 0);
    setSubmitted(true);
    recordQuiz(sessionId, sc, items.length);
    touchStreak();
    for (const q of items) {
      if (!isCorrect(q, picked[q.id], numeric[q.id] ?? "")) {
        const chosen =
          q.kind === "numerical"
            ? (numeric[q.id] || "blank")
            : (q.options?.[picked[q.id] ?? -1] ?? "skipped");
        const right =
          q.kind === "numerical" ? String(q.numerical) : (q.options?.[q.correctIndex ?? 0] ?? "");
        logMiss({
          chapterId: q.chapterId,
          stem: q.stem,
          chosen,
          correct: right,
        });
      }
    }
  }

  const mm = left != null ? Math.floor(left / 60) : 0;
  const ss = left != null ? left % 60 : 0;
  const visible = mode === "learn" ? items.slice(cursor, cursor + 1) : items;
  const current = items[cursor];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
          {blurb && <p className="mt-2 max-w-2xl text-sm text-muted">{blurb}</p>}
        </div>
        <div className="flex items-center gap-3 text-sm tabular-nums text-muted">
          {left != null && (
            <span className={cn("rounded-md border border-border px-3 py-1.5", left < 60 && "text-danger")}>
              {mm}:{ss.toString().padStart(2, "0")}
            </span>
          )}
          <span>
            {mode === "learn" ? `${Math.min(cursor + 1, items.length)}/${items.length}` : `${items.length} Q`}
          </span>
        </div>
      </div>

      {items.length === 0 && (
        <p className="mt-8 text-sm text-muted">No items matched this filter. Pick another chapter or exam tag.</p>
      )}

      <div className="mt-8 space-y-6">
        {visible.map((q, visIdx) => {
          const i = mode === "learn" ? cursor : visIdx;
          const showWhy = submitted || revealed[q.id];
          const ok = isCorrect(q, picked[q.id], numeric[q.id] ?? "");
          return (
            <article key={q.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="capitalize">
                  {q.exam}
                </Badge>
                <Badge variant="outline">L{q.difficulty}</Badge>
                {q.chapter && <Badge>{q.chapter}</Badge>}
                <span className="text-xs tabular-nums text-subtle">Q{i + 1}</span>
                {q.kind === "numerical" && (
                  <Badge variant="outline">Numerical</Badge>
                )}
              </div>
              <div className="mt-3">
                <Prose text={q.stem} />
              </div>

              {q.kind === "numerical" ? (
                <div className="mt-4 max-w-xs">
                  <Input
                    inputMode="decimal"
                    disabled={showWhy}
                    value={numeric[q.id] ?? ""}
                    onChange={(e) => setNumeric((p) => ({ ...p, [q.id]: e.target.value }))}
                    placeholder="Integer or decimal"
                  />
                </div>
              ) : (
                <ul className="mt-4 space-y-2">
                  {(q.options ?? []).map((opt, j) => {
                    const chosen = picked[q.id] === j;
                    const right = showWhy && j === q.correctIndex;
                    const wrong = showWhy && chosen && j !== q.correctIndex;
                    return (
                      <li key={`${q.id}-${j}`}>
                        <button
                          type="button"
                          disabled={showWhy}
                          onClick={() => setPicked((p) => ({ ...p, [q.id]: j }))}
                          className={cn(
                            "min-h-11 w-full rounded-lg border px-3 py-2.5 text-left text-sm",
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

              {showWhy && (
                <div className="mt-4 border-t border-border pt-3 text-sm text-muted">
                  {submitted || mode === "learn" ? (
                    <p className={cn("mb-2 text-xs tracking-wide uppercase", ok ? "text-ok" : "text-danger")}>
                      {ok ? "Correct" : "Miss"}
                    </p>
                  ) : null}
                  <Prose text={q.why} />
                  <Link
                    to="/academy/chapter/$id"
                    params={{ id: q.chapterId }}
                    className="mt-2 inline-block text-xs text-fg underline-offset-4 hover:underline"
                  >
                    Open chapter notes
                  </Link>
                </div>
              )}

              {mode === "learn" && !revealed[q.id] && (
                <Button
                  className="mt-4"
                  variant="secondary"
                  size="sm"
                  onClick={() => setRevealed((r) => ({ ...r, [q.id]: true }))}
                  disabled={q.kind === "numerical" ? !(numeric[q.id] ?? "").trim() : picked[q.id] == null}
                >
                  Check
                </Button>
              )}
            </article>
          );
        })}
      </div>

      {mode === "learn" && items.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            variant="outline"
            disabled={cursor === 0}
            onClick={() => setCursor((c) => Math.max(0, c - 1))}
          >
            Previous
          </Button>
          {cursor < items.length - 1 ? (
            <Button onClick={() => setCursor((c) => c + 1)} disabled={!revealed[current?.id ?? ""]}>
              Next
            </Button>
          ) : (
            !submitted && (
              <Button onClick={finish} disabled={Object.keys(revealed).length < items.length}>
                Finish drill
              </Button>
            )
          )}
        </div>
      )}

      {mode === "paper" && items.length > 0 && !submitted && (
        <Button className="mt-8" onClick={finish}>
          Submit {minutes ? "paper" : "set"}
        </Button>
      )}

      {submitted && (
        <div className="mt-8 rounded-xl border border-border bg-raised p-5">
          <p className="font-display text-3xl tabular-nums">
            {score}/{items.length}
          </p>
          <p className="mt-2 text-sm text-muted">
            {Math.round((score / Math.max(items.length, 1)) * 100)}% · misses are in the error book.
            Accuracy over attempt count is how 95 percentile is built.
          </p>
        </div>
      )}
    </div>
  );
}
