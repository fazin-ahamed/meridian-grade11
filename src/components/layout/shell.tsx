import { Link, useRouterState } from "@tanstack/react-router";
import {
  Atom,
  BookOpen,
  Compass,
  FileText,
  FlaskConical,
  GraduationCap,
  LayoutGrid,
  Library,
  Map,
  ScrollText,
  Sigma,
  Swords,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/academy", label: "Atlas", icon: LayoutGrid, exact: true },
  { to: "/academy/syllabus", label: "Syllabus", icon: Map },
  { to: "/academy/practice", label: "Practice", icon: Swords },
  { to: "/academy/papers", label: "Papers", icon: FileText },
  { to: "/academy/start", label: "Start XI", icon: GraduationCap },
  { to: "/academy/method", label: "Method", icon: BookOpen },
  { to: "/academy/tracks", label: "Tracks", icon: Timer },
  { to: "/academy/formulas", label: "Formulas", icon: Library },
  { to: "/academy/boosters", label: "Boosters", icon: Compass },
  { to: "/academy/exam", label: "Exam lab", icon: ScrollText },
];

const MOBILE = NAV.filter((n) =>
  ["/academy", "/academy/syllabus", "/academy/practice", "/academy/papers", "/academy/start"].includes(
    n.to,
  ),
);


export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed top-0 left-0 hidden h-dvh w-56 flex-col border-r border-border bg-surface md:flex">
        <Link to="/" className="flex items-baseline gap-2 px-5 pt-6 pb-5">
          <span className="font-display text-xl font-medium tracking-tight">Meridian</span>
          <span className="text-[10px] tracking-[0.18em] text-subtle uppercase">Atlas</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
                  active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg",
                )}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.6} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-5 py-4 text-xs text-subtle">
          Class 11 · 12 · Main · Advanced
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur-sm md:hidden">
        <Link to="/" className="font-display text-lg font-medium">
          Meridian
        </Link>
        <Link to="/academy/formulas" className="text-xs tracking-wide text-muted uppercase">
          Formulas
        </Link>
      </header>

      <main className="pb-24 md:ml-56 md:pb-12">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-10">{children}</div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        {MOBILE.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 text-[10px] tracking-wide",
                active ? "text-fg" : "text-subtle",
              )}
            >
              <Icon className="size-4" strokeWidth={1.6} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function SubjectIcon({
  subject,
  className,
}: {
  subject: "physics" | "chemistry" | "maths";
  className?: string;
}) {
  const Icon = subject === "physics" ? Atom : subject === "chemistry" ? FlaskConical : Sigma;
  return <Icon className={cn("size-4", className)} strokeWidth={1.6} />;
}

export function PageKicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-subtle uppercase">{children}</p>
  );
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{children}</h1>;
}

export function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-sm text-muted">
      <BookOpen className="mt-0.5 size-4 shrink-0 text-subtle" />
      <p>{children}</p>
    </div>
  );
}
