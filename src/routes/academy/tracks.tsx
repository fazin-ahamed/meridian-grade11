import { createFileRoute, Link } from "@tanstack/react-router";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { TRACKS } from "@/data/tracks";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/tracks")({ component: Tracks });

function Tracks() {
  const active = useProgress((s) => s.trackId);
  return (
    <div>
      <PageKicker>Plans</PageKicker>
      <PageTitle>Crash tracks with a finish line.</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Pick one. A track is a constraint, not a suggestion. If you are still meeting Class 11 for
        the first time, do not open the 30-day salvage.
      </p>
      <div className="mt-8 grid gap-3">
        {TRACKS.map((t) => (
          <Link
            key={t.id}
            to="/academy/tracks/$id"
            params={{ id: t.id }}
            className="rounded-xl border border-border bg-surface p-5 hover:bg-raised"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl">{t.title}</h2>
              <div className="flex gap-2">
                {active === t.id && <Badge variant="ok">Pinned</Badge>}
                <Badge variant="outline">{t.days} days</Badge>
                <Badge variant="outline">{t.hoursPerDay}</Badge>
              </div>
            </div>
            <p className="mt-2 text-sm text-subtle">{t.audience}</p>
            <p className="mt-2 text-sm text-muted">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
