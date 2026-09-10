import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TRACK_BY_ID } from "@/data/tracks";
import { CHAPTER_BY_ID } from "@/data/catalog";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/tracks/$id")({
  component: TrackPage,
});

function TrackPage() {
  const { id } = Route.useParams();
  const track = TRACK_BY_ID[id];
  if (!track) throw notFound();
  const setTrack = useProgress((s) => s.setTrack);
  const active = useProgress((s) => s.trackId);
  const [show, setShow] = useState(14);

  return (
    <div>
      <Link to="/academy/tracks" className="text-sm text-muted hover:text-fg">
        All tracks
      </Link>
      <PageKicker>{track.audience}</PageKicker>
      <PageTitle>{track.title}</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">{track.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline">{track.days} days</Badge>
        <Badge variant="outline">{track.hoursPerDay} / day</Badge>
      </div>
      <Button className="mt-6" variant={active === id ? "secondary" : "default"} onClick={() => setTrack(id)}>
        {active === id ? "Pinned as active track" : "Pin this track"}
      </Button>
      <h2 className="font-display mt-10 text-xl">Outcomes</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
        {track.outcomes.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
      <h2 className="font-display mt-10 text-xl">Day-by-day</h2>
      <ol className="mt-4 space-y-2">
        {track.schedule.slice(0, show).map((d) => (
          <li key={d.day} className="rounded-xl border border-border bg-surface px-4 py-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium">
                <span className="tabular-nums text-subtle">Day {d.day}</span>
                <span className="mx-2 text-subtle">·</span>
                {d.title.replace(/^[^·]+·\s*/, "")}
              </p>
              <span className="text-xs tabular-nums text-subtle">{d.hours}h</span>
            </div>
            <p className="mt-1 text-sm text-muted">{d.focus}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {d.chapterIds.map((cid) => (
                <Link
                  key={cid}
                  to="/academy/chapter/$id"
                  params={{ id: cid }}
                  className="text-xs text-fg underline-offset-4 hover:underline"
                >
                  {CHAPTER_BY_ID[cid]?.title ?? cid}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ol>
      {show < track.schedule.length && (
        <Button variant="secondary" className="mt-4" onClick={() => setShow((s) => s + 21)}>
          Show next 21 days
        </Button>
      )}
    </div>
  );
}
