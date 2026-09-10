import { createFileRoute, Link } from "@tanstack/react-router";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { Prose } from "@/components/tex";
import { Button } from "@/components/ui/button";
import { CHAPTER_BY_ID } from "@/data/catalog";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/errors")({ component: ErrorBook });

function ErrorBook() {
  const misses = useProgress((s) => s.misses);
  const clearMisses = useProgress((s) => s.clearMisses);

  return (
    <div>
      <PageKicker>The only notebook that changes rank</PageKicker>
      <PageTitle>Error book</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Misses from mill drills and papers land here. Template: I did X because I thought Y. Correct
        idea: Z. Strike a line only after two clean retakes three days apart.
      </p>
      {misses.length > 0 && (
        <Button variant="outline" size="sm" className="mt-6" onClick={clearMisses}>
          Clear all
        </Button>
      )}
      {misses.length === 0 && (
        <p className="mt-8 text-sm text-muted">
          Empty — good. Sit a{" "}
          <Link to="/academy/practice" className="text-fg underline-offset-4 hover:underline">
            mill set
          </Link>{" "}
          and it will fill with the ones that actually matter.
        </p>
      )}
      <ul className="mt-8 space-y-4">
        {misses.map((m) => {
          const ch = CHAPTER_BY_ID[m.chapterId];
          return (
            <li key={m.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link
                  to="/academy/chapter/$id"
                  params={{ id: m.chapterId }}
                  className="text-sm font-medium hover:underline"
                >
                  {ch?.title ?? m.chapterId}
                </Link>
                <span className="text-xs tabular-nums text-subtle">
                  {m.at.slice(0, 16).replace("T", " ")}
                </span>
              </div>
              <div className="mt-3 text-sm">
                <Prose text={m.stem} />
              </div>
              <p className="mt-3 text-sm text-danger">You · {m.chosen}</p>
              <p className="mt-1 text-sm text-ok">Right · {m.correct}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
