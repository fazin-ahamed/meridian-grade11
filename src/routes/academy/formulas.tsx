import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { TeX } from "@/components/tex";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { allFormulas } from "@/data/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/academy/formulas")({ component: Formulas });

export function Formulas() {
  const [q, setQ] = useState("");
  const [sub, setSub] = useState<"all" | "physics" | "chemistry" | "maths">("all");
  const rows = useMemo(() => {
    const all = allFormulas();
    return all.filter((f) => {
      if (sub !== "all" && f.subject !== sub) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return `${f.name} ${f.latex} ${f.chapter} ${f.note ?? ""}`.toLowerCase().includes(s);
    });
  }, [q, sub]);

  return (
    <div>
      <PageKicker>Vault</PageKicker>
      <PageTitle>Formula vault</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Every boxed relation in the atlas, searchable. Recite, then reveal. If a chapter’s notes
        pack has not landed yet, its formulae appear as soon as that pack is in.
      </p>
      <Input
        className="mt-6 max-w-md"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Nernst, King property, MOI, Gauss…"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", "physics", "chemistry", "maths"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setSub(k)}
            className={cn(
              "h-9 rounded-full border px-3 text-xs capitalize",
              sub === k ? "border-accent bg-accent text-accent-fg" : "border-border text-muted",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs tabular-nums text-subtle">{rows.length} formulae</p>
      <ul className="mt-4 space-y-3">
        {rows.map((f, i) => (
          <li key={`${f.chapterId}-${f.name}-${i}`} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{f.name}</p>
              <Badge variant="outline">{f.subject}</Badge>
            </div>
            <div className="mt-2 overflow-x-auto">
              <TeX expr={f.latex} display />
            </div>
            {f.note && <p className="text-sm text-muted">{f.note}</p>}
            <Link
              to="/academy/chapter/$id"
              params={{ id: f.chapterId }}
              className="mt-2 inline-block text-xs text-subtle hover:text-fg"
            >
              {f.chapter}
            </Link>
          </li>
        ))}
      </ul>
      {rows.length === 0 && (
        <p className="mt-8 text-sm text-muted">No matches. Try “Nernst” or open a chapter’s formula tab.</p>
      )}
    </div>
  );
}
