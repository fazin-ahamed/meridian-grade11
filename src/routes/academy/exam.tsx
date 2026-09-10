import { createFileRoute } from "@tanstack/react-router";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { EXAM_LAB } from "@/data/exam";

export const Route = createFileRoute("/academy/exam")({ component: ExamLab });

function ExamLab() {
  return (
    <div>
      <PageKicker>Rules of the game</PageKicker>
      <PageTitle>Exam lab</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Pattern, marking, and the tactics that survive a hard shift. Numbers below are the 2026
        notified pattern — always re-read the year’s information bulletin the week you fill the form.
      </p>
      {[EXAM_LAB.main, EXAM_LAB.advanced, EXAM_LAB.boards].map((block) => (
        <section key={block.title} className="mt-12">
          <h2 className="font-display text-2xl">{block.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{block.body}</p>
          <dl className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {block.pattern.map((row) => (
              <div key={row.k} className="grid gap-1 bg-surface px-4 py-3 sm:grid-cols-3">
                <dt className="text-xs tracking-wide text-subtle uppercase">{row.k}</dt>
                <dd className="text-sm text-muted sm:col-span-2">{row.v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted">
            {block.tactics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ))}
      <section className="mt-12">
        <h2 className="font-display text-2xl">What a score usually means</h2>
        <p className="mt-2 text-sm text-muted">
          Bands drift every year. Use them as planning, not prophecy.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          {EXAM_LAB.percentiles.map((p) => (
            <div key={p.band} className="grid gap-1 border-b border-border bg-surface px-4 py-3 last:border-0 sm:grid-cols-3">
              <p className="text-sm font-medium">{p.band}</p>
              <p className="text-sm tabular-nums text-muted">{p.score}</p>
              <p className="text-sm text-muted">{p.meaning}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-2xl">Weekly rhythm</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {EXAM_LAB.weekRhythm.map((w) => (
            <li key={w.name} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-medium">{w.name}</p>
              <p className="mt-2 text-sm text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
