import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageKicker, PageTitle, SubjectIcon } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CATALOG, SUBJECTS } from "@/data/catalog";
import { millCount } from "@/data/mill/count";
import { paperStats } from "@/data/papers";
import { TRACKS } from "@/data/tracks";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/")({ component: Dashboard });

function Dashboard() {
  const chapters = useProgress((s) => s.chapters);
  const xp = useProgress((s) => s.xp);
  const streak = useProgress((s) => s.streak);
  const last = useProgress((s) => s.lastChapterId);
  const trackId = useProgress((s) => s.trackId);
  const done = CATALOG.filter((c) => chapters[c.id]?.completed).length;
  const pct = Math.round((done / CATALOG.length) * 100);
  const next =
    CATALOG.find((c) => !chapters[c.id]?.completed) ?? CATALOG[0]!;
  const track = TRACKS.find((t) => t.id === trackId);
  const papers = paperStats();

  return (
    <div>
      <PageKicker>Atlas home</PageKicker>
      <PageTitle>Continue the map.</PageTitle>
      <p className="mt-3 max-w-2xl text-muted text-pretty">
        {done} of {CATALOG.length} chapters closed. Streak {streak} · {xp} xp.{" "}
        {millCount().toLocaleString()} mill questions on this device. Progress stays local — no
        account required.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="Mastery" value={`${pct}%`} hint={`${done} chapters complete`} />
        <Stat label="Streak" value={`${streak}d`} hint="Days with a quiz or a close" />
        <Stat label="XP" value={String(xp)} hint="Sections, quizzes, completions" />
      </div>
      <Progress value={pct} className="mt-6" />

      <div className="mt-10 rounded-xl border border-border bg-raised p-5">
        <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Just started Class 11?</p>
        <h2 className="font-display mt-2 text-2xl">Twelve weeks to a spine that can carry 95%ile.</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Language of PCM first, FBDs until they are boring, an error book from day one. Do not open
          rotation or GOC trivia this week. Official CBSE bullets and a slider lab live on every
          Physics/Maths chapter that needs one.
        </p>
        <Button asChild className="mt-4">
          <Link to="/academy/start">
            Open the on-ramp
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Classroom papers</p>
        <h2 className="font-display mt-2 text-2xl">
          {papers.papers} timed tests · {papers.questions} marked questions
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Units, kinematics, Newton, work–energy, solids — sit them like a school paper. Marking
          schemes open after submit.
        </p>
        <Button asChild variant="secondary" className="mt-4">
          <Link to="/academy/papers">
            Open papers
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-3">
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Next chapter</p>
          <h2 className="font-display mt-2 text-2xl">{next.title}</h2>
          <p className="mt-2 text-sm text-muted">{next.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>{next.ncert}</Badge>
            {next.jeeMain && <Badge variant="outline">Main</Badge>}
            {next.jeeAdvanced && <Badge variant="outline">Advanced</Badge>}
            {next.boards && <Badge variant="outline">Boards</Badge>}
          </div>
          <Button asChild className="mt-6">
            <Link to="/academy/chapter/$id" params={{ id: next.id }}>
              Study {next.title}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Active track</p>
          {track ? (
            <>
              <h2 className="mt-2 font-medium">{track.title}</h2>
              <p className="mt-2 text-sm text-muted">{track.blurb}</p>
              <Link
                to="/academy/tracks/$id"
                params={{ id: track.id }}
                className="mt-4 inline-flex text-sm text-fg underline-offset-4 hover:underline"
              >
                Open schedule
              </Link>
            </>
          ) : (
            <>
              <h2 className="mt-2 font-medium">No track pinned</h2>
              <p className="mt-2 text-sm text-muted">
                Pick a 30, 60, 90, 150 or 180-day plan so the atlas has a finish line.
              </p>
              <Button asChild variant="secondary" className="mt-4">
                <Link to="/academy/tracks">Browse tracks</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {SUBJECTS.map((s) => {
          const list = CATALOG.filter((c) => c.subject === s.id);
          const d = list.filter((c) => chapters[c.id]?.completed).length;
          return (
            <Link
              key={s.id}
              to="/academy/subject/$subject"
              params={{ subject: s.id }}
              className="rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:bg-raised"
            >
              <div className="flex items-center gap-2 text-muted">
                <SubjectIcon subject={s.id} />
                <span className="text-sm">{s.title}</span>
              </div>
              <p className="mt-4 font-display text-3xl tabular-nums">
                {d}
                <span className="text-lg text-subtle">/{list.length}</span>
              </p>
              <Progress value={(d / list.length) * 100} className="mt-4" />
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        <Link to="/academy/method" className="rounded-xl border border-border bg-surface p-5 hover:bg-raised">
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Class 11 day one</p>
          <h2 className="mt-2 font-medium">The method</h2>
          <p className="mt-2 text-sm text-muted">Retrieval, spacing, error book, 95-percentile score math.</p>
        </Link>
        <Link to="/academy/practice" className="rounded-xl border border-border bg-surface p-5 hover:bg-raised">
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Arena</p>
          <h2 className="mt-2 font-medium">Mill papers</h2>
          <p className="mt-2 text-sm text-muted">Daily 20, Main 75, Advanced 18 — answers hidden.</p>
        </Link>
        <Link to="/academy/drill" className="rounded-xl border border-border bg-surface p-5 hover:bg-raised">
          <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Custom</p>
          <h2 className="mt-2 font-medium">Build a drill</h2>
          <p className="mt-2 text-sm text-muted">Filter by subject, exam tag, chapter. Timer optional.</p>
        </Link>
      </div>

      {last && (
        <p className="mt-8 text-sm text-muted">
          Last opened:{" "}
          <Link
            to="/academy/chapter/$id"
            params={{ id: last }}
            className="text-fg underline-offset-4 hover:underline"
          >
            {CATALOG.find((c) => c.id === last)?.title ?? last}
          </Link>
        </p>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-4">
      <p className="text-xs text-subtle">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
