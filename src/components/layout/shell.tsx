import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  Atom,
  BookOpen,
  Compass,
  FileText,
  FlaskConical,
  GraduationCap,
  LayoutGrid,
  Library,
  Map,
  Menu,
  ScrollText,
  Sigma,
  Swords,
  Timer,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { buildSidebarModel } from "./navigation-model";
import { ShellNavigationContext, type ChapterSidebarRegistration } from "./shell-context";

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
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [chapterSidebar, setChapterSidebar] = useState<ChapterSidebarRegistration | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const model = useMemo(
    () =>
      buildSidebarModel({
        pathname,
        subject: chapterSidebar?.subject,
        chapterTitle: chapterSidebar?.chapterTitle,
        topics: chapterSidebar?.topics,
        activeTopic: chapterSidebar?.activeTopic,
      }),
    [chapterSidebar, pathname],
  );

  const navigationValue = useMemo(() => ({ chapterSidebar, setChapterSidebar }), [chapterSidebar]);

  return (
    <ShellNavigationContext.Provider value={navigationValue}>
      <div className="min-h-dvh bg-bg text-fg">
        <Sidebar
          model={model}
          chapterSidebar={chapterSidebar}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {mobileOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur-md md:hidden">
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="grid size-10 place-items-center rounded-lg border border-border text-muted transition-colors hover:bg-raised hover:text-fg"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <Link to="/" className="font-display text-xl font-medium tracking-tight">
            Meridian
          </Link>
          {model.mode === "chapter" && chapterSidebar && (
            <span className="ml-auto max-w-[45%] truncate text-xs text-muted">
              {chapterSidebar.chapterTitle}
            </span>
          )}
        </header>

        <main className="pb-10 md:ml-72">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-10 md:py-10">{children}</div>
        </main>
      </div>
    </ShellNavigationContext.Provider>
  );
}

function Sidebar({
  model,
  chapterSidebar,
  mobileOpen,
  onCloseMobile,
}: {
  model: ReturnType<typeof buildSidebarModel>;
  chapterSidebar: ChapterSidebarRegistration | null;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-[min(88vw,18rem)] flex-col border-r border-border bg-surface transition-transform duration-200 md:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-5">
        <Link to="/" className="flex items-baseline gap-2" onClick={onCloseMobile}>
          <span className="font-display text-xl font-medium tracking-tight">Meridian</span>
          <span className="text-[10px] tracking-[0.18em] text-subtle uppercase">Atlas</span>
        </Link>
        <button
          type="button"
          aria-label="Close navigation"
          className="grid size-9 place-items-center rounded-lg text-subtle hover:bg-raised hover:text-fg md:hidden"
          onClick={onCloseMobile}
        >
          <X className="size-4" />
        </button>
      </div>

      {model.mode === "chapter" && chapterSidebar ? (
        <ChapterSidebar
          chapterSidebar={chapterSidebar}
          model={model}
          onCloseMobile={onCloseMobile}
        />
      ) : (
        <GlobalSidebar model={model} onCloseMobile={onCloseMobile} />
      )}

      <div className="mt-auto border-t border-border px-5 py-4 text-xs text-subtle">
        Class 11 · 12 · Main · Advanced
      </div>
    </aside>
  );
}

function GlobalSidebar({
  model,
  onCloseMobile,
}: {
  model: ReturnType<typeof buildSidebarModel>;
  onCloseMobile: () => void;
}) {
  return (
    <nav
      className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4"
      aria-label="Main navigation"
    >
      <p className="mb-2 px-3 text-[10px] font-medium tracking-[0.18em] text-subtle uppercase">
        Study space
      </p>
      {NAV.map((item) => {
        const active = model.items.find((candidate) => candidate.label === item.label)?.active;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onCloseMobile}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors duration-150",
              active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg",
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.6} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function ChapterSidebar({
  chapterSidebar,
  model,
  onCloseMobile,
}: {
  chapterSidebar: ChapterSidebarRegistration;
  model: ReturnType<typeof buildSidebarModel>;
  onCloseMobile: () => void;
}) {
  const progress = chapterSidebar.topics.length
    ? ((chapterSidebar.activeTopic + 1) / chapterSidebar.topics.length) * 100
    : 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="border-b border-border px-5 py-5">
        <Link
          to="/academy"
          onClick={onCloseMobile}
          className="inline-flex items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" /> {model.backLabel}
        </Link>
        <p className="mt-5 text-[10px] font-medium tracking-[0.18em] text-subtle uppercase">
          {chapterSidebar.subject} · chapter map
        </p>
        <h2 className="font-display mt-2 text-xl leading-tight">{chapterSidebar.chapterTitle}</h2>
        <div className="mt-5 flex items-center justify-between text-xs text-subtle">
          <span>Scroll through the lesson</span>
          <span className="font-mono tabular-nums">
            {chapterSidebar.activeTopic + 1}/{chapterSidebar.topics.length}
          </span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-raised"
          aria-label="Lesson progress"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-subtle">
          The full chapter is loaded below. Choose a section to jump there.
        </p>
      </div>

      <nav
        className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4"
        aria-label="Chapter topics"
      >
        {chapterSidebar.topics.map((topic, index) => {
          const active = model.items[index]?.active;
          return (
            <button
              key={`${topic}-${index}`}
              type="button"
              onClick={() => {
                chapterSidebar.onSelectTopic(index);
                onCloseMobile();
              }}
              className={cn(
                "flex min-h-11 w-full items-start gap-3 rounded-md border-l-2 px-3 py-2 text-left text-sm transition-colors",
                active
                  ? "border-accent bg-raised text-fg"
                  : "border-transparent text-muted hover:bg-raised/70 hover:text-fg",
              )}
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "mt-0.5 font-mono text-xs tabular-nums",
                  active ? "text-fg" : "text-subtle",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="line-clamp-2">{topic}</span>
            </button>
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
    <p className="mb-2 text-[11px] font-medium tracking-[0.2em] text-subtle uppercase">
      {children}
    </p>
  );
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{children}</h1>
  );
}

export function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-sm text-muted">
      <BookOpen className="mt-0.5 size-4 shrink-0 text-subtle" />
      <p>{children}</p>
    </div>
  );
}
