import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageKicker } from "@/components/layout/shell";
import { DrillSession } from "@/components/session";
import { Button } from "@/components/ui/button";
import { setById } from "@/data/practice-sets";

export const Route = createFileRoute("/academy/practice/$id")({
  component: PracticeSetPage,
});

function PracticeSetPage() {
  const { id } = Route.useParams();
  const set = setById(id);
  if (!set) throw notFound();
  const [seed, setSeed] = useState(1);
  const items = useMemo(() => set.pick(seed * 19 + 3), [set, seed]);

  return (
    <div>
      <Link to="/academy/practice" className="text-sm text-muted hover:text-fg">
        All sets
      </Link>
      <PageKicker>Mixed set</PageKicker>
      <div className="mt-6">
        <DrillSession
          key={`${id}-${seed}`}
          items={items}
          title={set.title}
          blurb={set.blurb}
          sessionId={`set:${id}:${seed}`}
          minutes={set.minutes}
          mode={set.mode}
        />
      </div>
      <Button variant="outline" className="mt-8" onClick={() => setSeed((s) => s + 1)}>
        New paper (fresh numbers)
      </Button>
    </div>
  );
}
