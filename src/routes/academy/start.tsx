import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CHAPTER_BY_ID } from "@/data/catalog";
import { millCount } from "@/data/mill/count";
import { START } from "@/data/start";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/start")({ component: StartPage });

function StartPage() {
  const setTrack = useProgress((s) => s.setTrack);
  const n = millCount();

  return (
    <div>
      <PageKicker>{START.kicker}</PageKicker>
      <PageTitle>{START.title}</PageTitle>
      <p className="mt-4 max-w-2xl text-muted">{START.lead}</p>
      <p className="mt-3 text-sm text-subtle">{n.toLocaleString()} mill items sit behind this on-ramp.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <Link
            to="/academy/tracks/$id"
            params={{ id: "foundation-11" }}
            onClick={() => setTrack("foundation-11")}
          >
            Pin the 180-day track
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/academy/method">Full method</Link>
        </Button>
      </div>

      <section className="mt-12 grid gap-3 md:grid-cols-3">
        {START.promise.map((p) => (
          <article key={p.t} className="rounded-xl border border-border bg-surface p-5">
            <h2 className="font-medium">{p.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">This afternoon — week zero</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
          {START.weekZero.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Open these six chapters first</h2>
        <ul className="mt-6 grid gap-3">
          {START.firstChapters.map((row, i) => {
            const ch = CHAPTER_BY_ID[row.id];
            if (!ch) return null;
            return (
              <li key={row.id}>
                <Link
                  to="/academy/chapter/$id"
                  params={{ id: row.id }}
                  className="block rounded-xl border border-border bg-surface p-5 hover:bg-raised"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {i + 1}. {ch.title}
                    </p>
                    <Badge variant="outline">{ch.ncert}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted">{row.why}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Twelve-week spine</h2>
        <div className="mt-6 space-y-3">
          {START.twelve.map((b) => (
            <article key={b.w} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">{b.w}</p>
              <h3 className="mt-1 font-medium">{b.h}</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">How to read a problem so the mill teaches you</h2>
        <div className="mt-6 grid gap-4">
          {START.howToRead.map((h) => (
            <article key={h.t} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-medium">{h.t}</h3>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted">
                {h.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">A week that actually happens</h2>
        <p className="mt-2 text-sm text-muted">
          Two heavy blocks + one light. Numbers in parentheses are minutes. Protect Sunday evening.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-raised text-xs tracking-wide text-subtle uppercase">
              <tr>
                <th className="px-3 py-3 font-medium">Day</th>
                <th className="px-3 py-3 font-medium">Physics</th>
                <th className="px-3 py-3 font-medium">Chemistry</th>
                <th className="px-3 py-3 font-medium">Maths</th>
              </tr>
            </thead>
            <tbody>
              {START.weeklyGrid.map((r) => (
                <tr key={r.d} className="border-t border-border">
                  <td className="px-3 py-3 font-medium">{r.d}</td>
                  <td className="px-3 py-3 text-muted">{r.p}</td>
                  <td className="px-3 py-3 text-muted">{r.c}</td>
                  <td className="px-3 py-3 text-muted">{r.m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Gates — do not skip ahead of these</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {START.gates.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/academy/chapter/$id" params={{ id: "phy-units" }}>
            Start Units & Dimensions
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/academy/practice">Open the mill</Link>
        </Button>
      </div>
    </div>
  );
}
