import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageKicker, PageTitle, SubjectIcon } from "@/components/layout/shell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CATALOG, searchCatalog } from "@/data/catalog";
import { OFFICIAL } from "@/data/official";
import type { ChapterMeta, SubjectId } from "@/data/types";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/academy/syllabus")({ component: Syllabus });

const FILTERS = ["all", "physics", "chemistry", "maths", "11", "12", "main", "advanced", "boards"] as const;

function Syllabus() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof FILTERS)[number]>("all");
  const [view, setView] = useState<"chapters" | "cbse">("cbse");
  const chapters = useProgress((s) => s.chapters);

  const list = useMemo(() => {
    let rows: ChapterMeta[] = q ? searchCatalog(q) : CATALOG;
    if (f === "physics" || f === "chemistry" || f === "maths") rows = rows.filter((c) => c.subject === f);
    if (f === "11") rows = rows.filter((c) => c.classLevel === 11 || c.classLevel === "both");
    if (f === "12") rows = rows.filter((c) => c.classLevel === 12 || c.classLevel === "both");
    if (f === "main") rows = rows.filter((c) => c.jeeMain);
    if (f === "advanced") rows = rows.filter((c) => c.jeeAdvanced);
    if (f === "boards") rows = rows.filter((c) => c.boards);
    return rows;
  }, [q, f]);

  const official = useMemo(() => {
    let rows = OFFICIAL;
    if (f === "physics" || f === "maths") rows = rows.filter((u) => u.subject === f);
    if (f === "chemistry") rows = [];
    if (f === "11") rows = rows.filter((u) => u.classLevel === 11 || u.classLevel === "both");
    if (f === "12") rows = rows.filter((u) => u.classLevel === 12 || u.classLevel === "both");
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      rows = rows.filter((u) =>
        `${u.unit} ${u.ncert} ${u.bullets.join(" ")} ${u.jeeExtra.join(" ")}`.toLowerCase().includes(s),
      );
    }
    return rows;
  }, [f, q]);

  return (
    <div>
      <PageKicker>Full map</PageKicker>
      <PageTitle>Syllabus, without the fog.</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Official CBSE Class 11–12 Physics and Maths bullets, plus the extra JEE still examines.
        Chemistry stays on the chapter list. {CATALOG.length} atlas chapters,{" "}
        {OFFICIAL.length} official physics/maths units mapped line by line.
      </p>
      <div className="mt-6 flex gap-2">
        {(
          [
            ["cbse", "CBSE bullets"],
            ["chapters", "Atlas chapters"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setView(key)}
            className={cn(
              "h-11 rounded-md border px-4 text-sm",
              view === key ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search Gauss, Bayes, capillary, Pascal…"
        className="mt-6 max-w-md"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setF(key)}
            className={cn(
              "h-9 rounded-full border px-3 text-xs capitalize",
              f === key ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {key}
          </button>
        ))}
      </div>

      {view === "cbse" ? (
        <>
          <p className="mt-4 text-xs tabular-nums text-subtle">{official.length} official units</p>
          <ul className="mt-4 space-y-3">
            {official.map((u) => (
              <li key={u.chapterId + u.unit} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                      Class {u.classLevel} · {u.ncert}
                    </p>
                    <h2 className="font-display mt-1 text-xl">
                      <Link to="/academy/chapter/$id" params={{ id: u.chapterId }} className="hover:underline">
                        {CATALOG.find((c) => c.id === u.chapterId)?.title ?? u.chapterId}
                      </Link>
                    </h2>
                    <p className="mt-1 text-sm text-muted">{u.unit}</p>
                  </div>
                  <SubjectIcon subject={u.subject} className="text-muted" />
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                  {u.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {u.jeeExtra.length > 0 && (
                  <div className="mt-3 rounded-md border border-border bg-raised px-3 py-2">
                    <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">JEE still adds</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
                      {u.jeeExtra.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p className="mt-4 text-xs tabular-nums text-subtle">{list.length} chapters</p>
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
            {list.map((c) => (
              <li key={c.id}>
                <Link
                  to="/academy/chapter/$id"
                  params={{ id: c.id }}
                  className="flex items-start gap-3 bg-surface px-4 py-3.5 hover:bg-raised"
                >
                  <SubjectIcon subject={c.subject as SubjectId} className="mt-1 text-muted" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{c.title}</span>
                      {chapters[c.id]?.completed && <Badge variant="ok">Done</Badge>}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{c.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge>
                        {c.classLevel === 11 ? "XI" : c.classLevel === 12 ? "XII" : "XI–XII"}
                      </Badge>
                      <Badge variant="outline">{c.unit}</Badge>
                      {c.jeeMain && <Badge variant="outline">Main · {c.mainWeight}</Badge>}
                      {c.jeeAdvanced && <Badge variant="outline">Adv · {c.advWeight}</Badge>}
                      {!c.jeeMain && c.jeeAdvanced && <Badge variant="warn">Main-deleted</Badge>}
                      {!c.jeeMain && !c.jeeAdvanced && <Badge variant="warn">Boards only</Badge>}
                    </div>
                  </div>
                  <span className="hidden text-xs tabular-nums text-subtle sm:block">{c.hours}h</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
