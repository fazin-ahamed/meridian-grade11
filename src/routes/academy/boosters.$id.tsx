import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { Prose, TeX } from "@/components/tex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BOOSTER_BY_ID } from "@/data/boosters";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/academy/boosters/$id")({
  component: BoosterPage,
});

function BoosterPage() {
  const { id } = Route.useParams();
  const b = BOOSTER_BY_ID[id];
  if (!b) throw notFound();
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <Link to="/academy/boosters" className="text-sm text-muted hover:text-fg">
        All boosters
      </Link>
      <PageKicker>
        {b.subject} · {b.minutes} min
      </PageKicker>
      <PageTitle>{b.title}</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">{b.blurb}</p>
      <div className="mt-10 space-y-10">
        {b.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl">{s.heading}</h2>
            <div className="mt-3">
              <Prose text={s.body} />
            </div>
            {s.bullets && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
                {s.bullets.map((x) => (
                  <li key={x}>
                    <Prose text={x} compact />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      {b.formulas && b.formulas.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl">Keep these</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            {b.formulas.map((f) => (
              <div key={f.name} className="border-b border-border px-4 py-4 last:border-0">
                <p className="text-xs tracking-wide text-subtle uppercase">{f.name}</p>
                <TeX expr={f.latex} display />
                {f.note && <p className="text-sm text-muted">{f.note}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      {b.drills && b.drills.length > 0 && (
        <section className="mt-10 space-y-4">
          <h2 className="font-display text-xl">Drill</h2>
          {b.drills.map((q) => (
            <div key={q.id} className="rounded-xl border border-border bg-surface p-5">
              <Badge variant="outline" className="capitalize">
                {q.exam}
              </Badge>
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
          {!submitted && (
            <Button onClick={() => setSubmitted(true)}>Check</Button>
          )}
        </section>
      )}
    </div>
  );
}
