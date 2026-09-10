import { createFileRoute, Link } from "@tanstack/react-router";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { PaperMarks } from "@/components/paper-session";
import { Badge } from "@/components/ui/badge";
import { CHAPTER_BY_ID } from "@/data/catalog";
import { CLASSROOM_PAPERS, paperStats } from "@/data/papers";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/academy/papers/")({ component: PapersIndex });

function PapersIndex() {
  const stats = paperStats();
  const attempts = useProgress((s) => s.paperAttempts) ?? {};
  const grouped = new Map<string, typeof CLASSROOM_PAPERS>();
  for (const p of CLASSROOM_PAPERS) {
    const list = grouped.get(p.chapterId) ?? [];
    list.push(p);
    grouped.set(p.chapterId, list);
  }

  return (
    <div>
      <PageKicker>Classroom papers</PageKicker>
      <PageTitle>Sit the actual test papers.</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        {stats.papers} timed papers · {stats.questions} questions · {stats.marks} marks. These are
        the Class 11 classroom tests — Units, Straight Line, Plane, Laws of Motion, Work–Energy, and
        Mechanical Properties of Solids — with full marking schemes.
      </p>
      <div className="mt-10 space-y-10">
        {[...grouped.entries()].map(([chapterId, papers]) => {
          const meta = CHAPTER_BY_ID[chapterId];
          return (
            <section key={chapterId}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl">{meta?.title ?? chapterId}</h2>
                <Link
                  to="/academy/chapter/$id"
                  params={{ id: chapterId }}
                  className="text-sm text-muted hover:text-fg"
                >
                  Class notes
                </Link>
              </div>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {papers.map((p) => {
                  const last = attempts[p.id];
                  return (
                    <li key={p.id}>
                      <Link
                        to="/academy/papers/$id"
                        params={{ id: p.id }}
                        className="block rounded-xl border border-border bg-surface p-5 hover:bg-raised"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-medium">{p.paperNo}</h3>
                          <Badge variant="outline">{p.mm} mm</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted">{p.title}</p>
                        <p className="mt-3 text-xs tracking-wide text-subtle uppercase">
                          {p.minutes} min · {p.questions.length} Q
                          {last ? ` · last ${last.score}/${last.total}` : ""}
                        </p>
                        <div className="mt-2">
                          <PaperMarks paper={p} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
