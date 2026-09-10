import { createFileRoute, Link } from "@tanstack/react-router";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { CATALOG } from "@/data/catalog";
import { millCount, MILL_PER_CHAPTER } from "@/data/mill/count";
import { PRACTICE_SETS } from "@/data/practice-sets";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/practice")({ component: Practice });

function Practice() {
  const n = millCount();
  const misses = useProgress((s) => s.misses.length);
  return (
    <div>
      <PageKicker>Arena</PageKicker>
      <PageTitle>Thousands of closed-book items. The answer stays hidden.</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        {n.toLocaleString()} computed mill questions sit behind these sets — unique numbers, concept
        banks, Main and Advanced tags. Timed honesty beats a 90% you scored with the solution open.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link to="/academy/papers" className="text-fg underline-offset-4 hover:underline">
          Classroom papers
        </Link>
        <Link to="/academy/drill" className="text-muted underline-offset-4 hover:underline">
          Build a custom drill
        </Link>
        <Link to="/academy/errors" className="text-muted underline-offset-4 hover:underline">
          Error book{misses ? ` (${misses})` : ""}
        </Link>
        <Link to="/academy/method" className="text-muted underline-offset-4 hover:underline">
          How to use the mill
        </Link>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {PRACTICE_SETS.map((s) => (
          <Link
            key={s.id}
            to="/academy/practice/$id"
            params={{ id: s.id }}
            className="rounded-xl border border-border bg-surface p-5 hover:bg-raised"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="font-medium">{s.title}</h2>
              <Badge variant="outline">{s.n} Q</Badge>
            </div>
            <p className="mt-2 text-sm text-muted">{s.blurb}</p>
            <p className="mt-3 text-xs tracking-wide text-subtle uppercase">
              {s.mode}
              {s.minutes ? ` · ${s.minutes} min` : ""}
            </p>
          </Link>
        ))}
      </div>
      <h2 className="font-display mt-12 text-xl">By chapter — {MILL_PER_CHAPTER} items each</h2>
      <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
        {CATALOG.map((c) => (
          <li key={c.id} className="mb-2 break-inside-avoid">
            <Link
              to="/academy/chapter/$id"
              params={{ id: c.id }}
              className="text-sm text-muted hover:text-fg"
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
