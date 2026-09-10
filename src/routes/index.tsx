import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATALOG, SUBJECTS } from "@/data/catalog";
import { TRACKS } from "@/data/tracks";
import { BOOSTERS } from "@/data/boosters";
import { millCount } from "@/data/mill/count";
import { paperStats } from "@/data/papers";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const chapters = CATALOG.length;
  const mill = millCount();
  const papers = paperStats();

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl font-medium">Meridian</span>
          <span className="hidden text-[10px] tracking-[0.2em] text-subtle uppercase sm:inline">
            JEE Mastery Atlas
          </span>
        </div>
        <Link
          to="/academy"
          className="text-sm text-muted transition-colors duration-150 hover:text-fg"
        >
          Enter atlas
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-5 pt-10 pb-16 md:pt-20 md:pb-24">
        <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-subtle uppercase">
          Class 11 · Class 12 · JEE Main · JEE Advanced
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
          Every chapter. Both papers. One atlas.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty md:text-lg">
          A crash-course that refuses to be a pile of PDFs. Full PCM mapped to NCERT, NTA 2026 and
          IIT Advanced — definition-first class notes, official CBSE bullets, sit-down classroom
          papers with marking schemes, interactive labs, and {mill.toLocaleString()} closed-book mill
          items with computed keys.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/academy">
              Open the atlas
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/academy/papers">Sit a classroom paper</Link>
          </Button>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
          {[
            [chapters, "Chapters mapped"],
            [mill, "Mill questions"],
            [papers.questions, "Classroom-paper items"],
            [TRACKS.length, "Crash tracks"],
          ].map(([n, l]) => (
            <div key={String(l)}>
              <dt className="text-xs tracking-wide text-subtle uppercase">{l}</dt>
              <dd className="mt-1 font-display text-3xl tabular-nums">{n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-px bg-border md:grid-cols-3">
          {SUBJECTS.map((s) => (
            <Link
              key={s.id}
              to="/academy/subject/$subject"
              params={{ subject: s.id }}
              className="bg-bg px-6 py-10 transition-colors duration-200 hover:bg-surface"
            >
              <p className="text-[11px] tracking-[0.18em] text-subtle uppercase">{s.kicker}</p>
              <h2 className="font-display mt-2 text-2xl">{s.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{s.blurb}</p>
              <p className="mt-6 text-sm text-fg">
                {CATALOG.filter((c) => c.subject === s.id).length} chapters
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="text-[11px] tracking-[0.2em] text-subtle uppercase">Crash tracks</p>
        <h2 className="font-display mt-2 text-3xl">A plan with a finish line</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {TRACKS.map((t) => (
            <Link
              key={t.id}
              to="/academy/tracks/$id"
              params={{ id: t.id }}
              className="rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:bg-raised"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium">{t.title}</h3>
                <span className="text-xs tabular-nums text-subtle">{t.days}d</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-[11px] tracking-[0.2em] text-subtle uppercase">Rank extras</p>
          <h2 className="font-display mt-2 max-w-xl text-3xl text-balance">
            The chapters boards skip and Advanced still asks.
          </h2>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {BOOSTERS.map((b) => (
              <li key={b.id}>
                <Link
                  to="/academy/boosters/$id"
                  params={{ id: b.id }}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm hover:bg-surface"
                >
                  <span>{b.title}</span>
                  <span className="tabular-nums text-subtle">{b.minutes}m</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-subtle sm:flex-row sm:justify-between">
          <p>Meridian · independent study atlas, aligned to NTA 2026 and JEE Advanced 2026.</p>
          <p>Progress stays on this device.</p>
        </div>
      </footer>
    </div>
  );
}
