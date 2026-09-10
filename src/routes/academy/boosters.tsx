import { createFileRoute, Link } from "@tanstack/react-router";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { BOOSTERS } from "@/data/boosters";

export const Route = createFileRoute("/academy/boosters")({ component: Boosters });

function Boosters() {
  return (
    <div>
      <PageKicker>Beyond NCERT</PageKicker>
      <PageTitle>Rank boosters</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Error analysis, mechanism trees, salt analysis, King integrals, mock protocol — the extras
        that do not have a single NCERT chapter and still decide ranks.
      </p>
      <ul className="mt-8 grid gap-3 md:grid-cols-2">
        {BOOSTERS.map((b) => (
          <li key={b.id}>
            <Link
              to="/academy/boosters/$id"
              params={{ id: b.id }}
              className="block h-full rounded-xl border border-border bg-surface p-5 hover:bg-raised"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-medium">{b.title}</h2>
                <Badge variant="outline" className="tabular-nums">
                  {b.minutes}m
                </Badge>
              </div>
              <p className="mt-2 text-xs capitalize text-subtle">{b.subject}</p>
              <p className="mt-2 text-sm text-muted">{b.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
