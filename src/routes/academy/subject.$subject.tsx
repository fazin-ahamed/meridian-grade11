import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageKicker, PageTitle, SubjectIcon } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CATALOG, SUBJECTS } from "@/data/catalog";
import type { SubjectId } from "@/data/types";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/subject/$subject")({
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useParams();
  const info = SUBJECTS.find((s) => s.id === subject);
  if (!info) throw notFound();
  const list = CATALOG.filter((c) => c.subject === subject);
  const chapters = useProgress((s) => s.chapters);
  const done = list.filter((c) => chapters[c.id]?.completed).length;
  const eleven = list.filter((c) => c.classLevel === 11 || c.classLevel === "both");
  const twelve = list.filter((c) => c.classLevel === 12);

  return (
    <div>
      <PageKicker>
        <span className="inline-flex items-center gap-2">
          <SubjectIcon subject={subject as SubjectId} /> {info.kicker}
        </span>
      </PageKicker>
      <PageTitle>{info.title}</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">{info.blurb}</p>
      <div className="mt-6 flex items-center gap-4">
        <p className="text-sm tabular-nums text-muted">
          {done}/{list.length} complete
        </p>
        <Progress value={(done / list.length) * 100} className="max-w-xs" />
      </div>
      <Band title="Class 11" rows={eleven} />
      <Band title="Class 12" rows={twelve} />
    </div>
  );
}

function Band({ title, rows }: { title: string; rows: typeof CATALOG }) {
  const chapters = useProgress((s) => s.chapters);
  if (!rows.length) return null;
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map((c) => (
          <li key={c.id}>
            <Link
              to="/academy/chapter/$id"
              params={{ id: c.id }}
              className="block h-full rounded-xl border border-border bg-surface p-4 hover:bg-raised"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium">{c.title}</h3>
                {chapters[c.id]?.completed && <Badge variant="ok">Done</Badge>}
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-muted">{c.summary}</p>
              <p className="mt-3 text-xs text-subtle">
                {c.ncert} · {c.hours}h · difficulty {c.difficulty}/5
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
