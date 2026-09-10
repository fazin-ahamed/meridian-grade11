import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { DrillSession } from "@/components/session";
import { Button } from "@/components/ui/button";
import { CATALOG } from "@/data/catalog";
import { millForChapter, millMixed } from "@/data/mill";
import type { ExamTag, SubjectId } from "@/data/types";

export const Route = createFileRoute("/academy/drill")({ component: DrillBuilder });

function DrillBuilder() {
  const [subject, setSubject] = useState<SubjectId | "all">("all");
  const [exam, setExam] = useState<ExamTag | "all">("all");
  const [chapterId, setChapterId] = useState<string>("");
  const [n, setN] = useState(15);
  const [mode, setMode] = useState<"learn" | "paper">("learn");
  const [minutes, setMinutes] = useState(0);
  const [seed, setSeed] = useState(1);
  const [go, setGo] = useState(false);

  const chapters = useMemo(
    () => (subject === "all" ? CATALOG : CATALOG.filter((c) => c.subject === subject)),
    [subject],
  );

  const items = useMemo(() => {
    if (!go) return [];
    if (chapterId) return millForChapter(chapterId, n, seed * 11);
    return millMixed({
      subject,
      exam,
      n,
      seed: seed * 31 + 4,
    });
  }, [go, chapterId, n, seed, subject, exam]);

  return (
    <div>
      <PageKicker>Custom mill</PageKicker>
      <PageTitle>Build a drill. Then sit still.</PageTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Pick a subject, an exam tag, optionally one chapter. Learn mode checks after each question.
        Paper mode is a mock with an optional timer.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Field label="Subject">
          <select
            className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value as SubjectId | "all");
              setChapterId("");
              setGo(false);
            }}
          >
            <option value="all">All PCM</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="maths">Mathematics</option>
          </select>
        </Field>
        <Field label="Exam tag">
          <select
            className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
            value={exam}
            onChange={(e) => {
              setExam(e.target.value as ExamTag | "all");
              setGo(false);
            }}
          >
            <option value="all">Any</option>
            <option value="boards">Boards</option>
            <option value="main">JEE Main</option>
            <option value="advanced">JEE Advanced</option>
          </select>
        </Field>
        <Field label="Chapter (optional)">
          <select
            className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
            value={chapterId}
            onChange={(e) => {
              setChapterId(e.target.value);
              setGo(false);
            }}
          >
            <option value="">Mixed chapters</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Items">
          <select
            className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
            value={n}
            onChange={(e) => {
              setN(Number(e.target.value));
              setGo(false);
            }}
          >
            {[8, 12, 15, 20, 25, 30, 40].map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Mode">
          <select
            className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
            value={mode}
            onChange={(e) => setMode(e.target.value as "learn" | "paper")}
          >
            <option value="learn">Learn (check each)</option>
            <option value="paper">Paper (submit at end)</option>
          </select>
        </Field>
        <Field label="Timer (minutes, paper)">
          <select
            className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          >
            <option value={0}>Off</option>
            {[20, 30, 40, 45, 60, 90, 180].map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          onClick={() => {
            setSeed((s) => s + 1);
            setGo(true);
          }}
        >
          Start drill
        </Button>
        {go && (
          <Button
            variant="outline"
            onClick={() => {
              setSeed((s) => s + 1);
              setGo(true);
            }}
          >
            Reshuffle
          </Button>
        )}
      </div>

      {go && (
        <div className="mt-10">
          <DrillSession
            key={`${seed}-${chapterId}-${n}-${mode}`}
            items={items}
            title="Custom mill"
            sessionId={`drill:${subject}:${exam}:${chapterId}:${seed}`}
            minutes={mode === "paper" && minutes ? minutes : undefined}
            mode={mode}
          />
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-wide text-subtle uppercase">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
