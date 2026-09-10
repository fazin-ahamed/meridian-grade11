import { BookOpenCheck, Check, ChevronLeft, ChevronRight, Eye, ListTree, RotateCcw, Sparkles, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Figure } from "@/components/diagrams";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ChapterContent } from "@/data/types";
import type { ChapterMeta } from "@/data/types";
import type { Grade11Guide } from "@/data/learning";
import { teachingTopicsFor, type TeachingTopic, type TopicQuestion } from "@/data/learning/teaching-topics";
import { Prose } from "@/components/tex";
import { cn } from "@/lib/utils";

type OfficialSummary = {
  unit: string;
  ncert: string;
  periods?: string;
  bullets: string[];
  jeeExtra: string[];
};

type ChapterGuideProps = {
  meta: ChapterMeta;
  content: ChapterContent;
  guide: Grade11Guide;
  heroFig?: string;
  official?: OfficialSummary;
};

type RouteMode = "guided" | "outline";

export function ChapterGuide({ meta, content, guide, heroFig, official }: ChapterGuideProps) {
  const topics = useMemo(() => teachingTopicsFor(meta, content, guide), [content, guide, meta]);
  const [mode, setMode] = useState<RouteMode>("guided");
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [showTopicAnswer, setShowTopicAnswer] = useState(false);
  const [topicPicked, setTopicPicked] = useState<number | null>(null);
  const current = topics[Math.min(step, topics.length - 1)]!;
  const firstQuestion = content.quiz[0];
  const complete = step === topics.length - 1;

  useEffect(() => {
    setMode("guided");
    setStep(0);
    setShowAnswer(false);
    setPicked(null);
    setShowTopicAnswer(false);
    setTopicPicked(null);
  }, [meta.id]);

  function selectStep(next: number) {
    setStep(Math.min(Math.max(next, 0), topics.length - 1));
    setShowAnswer(false);
    setPicked(null);
    setShowTopicAnswer(false);
    setTopicPicked(null);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-surface p-5 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">Start with the model</p>
            <h2 className="font-display mt-2 text-2xl md:text-3xl">Do not memorise the chapter before you can see it.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{guide.bigIdea}</p>
          </div>
          <Badge variant="outline" className="gap-2">
            <BookOpenCheck className="size-3.5" /> topic-by-topic lesson
          </Badge>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
            <InfoCard label="Before you begin" text={guide.bridge} />
            <InfoCard label="How to represent it" text={guide.representation} />
            <InfoCard label="Your lab mission" text={guide.labMission} />
          </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-muted">
          <span className="inline-flex items-center gap-2 font-medium text-fg"><Target className="size-4 text-accent" /> {topics.length} teachable topics</span>
          <span>Each topic follows: picture → precise idea → method → example → retrieval.</span>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-raised/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">{guide.lens.title}</p>
              <p className="mt-1 text-sm text-muted">{guide.lens.instruction}</p>
            </div>
            <div className="flex rounded-lg border border-border bg-surface p-1" role="group" aria-label="Theory view">
              <button
                type="button"
                className={cn("min-h-10 rounded-md px-3 text-sm", mode === "guided" ? "bg-accent text-accent-fg" : "text-muted hover:text-fg")}
                onClick={() => setMode("guided")}
              >
                <span className="inline-flex items-center gap-2"><Eye className="size-4" /> Guided</span>
              </button>
              <button
                type="button"
                className={cn("min-h-10 rounded-md px-3 text-sm", mode === "outline" ? "bg-accent text-accent-fg" : "text-muted hover:text-fg")}
                onClick={() => setMode("outline")}
              >
                <span className="inline-flex items-center gap-2"><ListTree className="size-4" /> Outline</span>
              </button>
            </div>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-5">
            {guide.lens.steps.map((item, i) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-surface font-mono text-xs text-fg">
                  {i + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <aside className="rounded-2xl border border-border bg-surface p-4 md:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Chapter route</p>
            <h3 className="font-display mt-1 text-xl">Small steps, one idea at a time</h3>
          </div>
            <span className="font-mono text-xs tabular-nums text-subtle">{step + 1}/{topics.length}</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-raised" aria-label="Lesson progress">
            <div className="h-full rounded-full bg-accent transition-[width] duration-200" style={{ width: `${((step + 1) / topics.length) * 100}%` }} />
          </div>
          <nav className="mt-5 space-y-1" aria-label="Topic steps">
            {topics.map((topic, i) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => selectStep(i)}
                className={cn(
                  "flex min-h-11 w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  i === step ? "bg-raised text-fg" : "text-muted hover:bg-raised/70 hover:text-fg",
                )}
              >
                <span className={cn("mt-0.5 font-mono text-xs tabular-nums", i === step ? "text-fg" : "text-subtle")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="line-clamp-2">{topic.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {mode === "guided" ? (
            <TeachingTopicBlock
              topic={current}
              index={step}
              total={topics.length}
              picked={topicPicked}
              showAnswer={showTopicAnswer}
              onPick={setTopicPicked}
              onReveal={() => setShowTopicAnswer(true)}
              onPrevious={() => selectStep(step - 1)}
              onNext={() => selectStep(step + 1)}
            />
          ) : (
            <OutlineBlocks topics={topics} active={step} onSelect={selectStep} />
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-warn/30 bg-warn/5 p-5">
          <p className="text-xs font-medium tracking-[0.14em] text-warn uppercase">Misconception check</p>
          <h3 className="font-display mt-2 text-xl">Catch the tempting wrong idea</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{guide.commonMistake}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Visual checkpoint</p>
          <h3 className="font-display mt-2 text-xl">Explain before you calculate</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{guide.checkpoint}</p>
          {heroFig && (
            <button type="button" onClick={() => selectStep(0)} className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm text-fg underline-offset-4 hover:underline">
              <RotateCcw className="size-4" /> Return to the first picture
            </button>
          )}
        </div>
      </section>

      {heroFig && (
        <section>
          <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">One picture to keep</p>
          <Figure id={heroFig} />
        </section>
      )}

      {official && (
        <details className="rounded-2xl border border-border bg-surface p-5">
          <summary className="cursor-pointer text-sm font-medium">Open the official CBSE boundary for this chapter</summary>
          <div className="mt-4 space-y-4 text-sm text-muted">
            <p className="font-display text-xl text-fg">{official.unit}</p>
            <p>{official.ncert}{official.periods ? ` · ${official.periods}` : ""}</p>
            <ul className="list-disc space-y-1 pl-5">
              {official.bullets.map((item) => <li key={item}>{item}</li>)}
            </ul>
            {official.jeeExtra.length > 0 && (
              <div>
                <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">JEE extension</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {official.jeeExtra.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        </details>
      )}

      {complete && firstQuestion && (
        <RetrievalCheckpoint question={firstQuestion} picked={picked} showAnswer={showAnswer} onPick={setPicked} onReveal={() => setShowAnswer(true)} />
      )}
    </div>
  );
}

function InfoCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-raised/60 p-4">
      <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function TeachingTopicBlock({
  topic,
  index,
  total,
  picked,
  showAnswer,
  onPick,
  onReveal,
  onPrevious,
  onNext,
}: {
  topic: TeachingTopic;
  index: number;
  total: number;
  picked: number | null;
  showAnswer: boolean;
  onPick: (index: number) => void;
  onReveal: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="outline">Topic {index + 1} of {total}</Badge>
        <span className="inline-flex items-center gap-2 text-xs text-subtle"><Sparkles className="size-3.5" /> Learn → use → retrieve</span>
      </div>
      <h3 className="font-display mt-5 text-2xl md:text-3xl">{topic.title}</h3>

      <div className="mt-4 rounded-xl border border-accent/25 bg-accent/5 p-4">
        <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">Why this matters</p>
        <div className="mt-2"><Prose text={topic.purpose} /></div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <TopicPanel label="Start with the picture">
          <Prose text={topic.intuition} />
        </TopicPanel>
        <TopicPanel label="Precise idea">
          <Prose text={topic.preciseIdea} />
        </TopicPanel>
      </div>

      {topic.mechanism && (
        <section className="mt-5 rounded-xl border border-border bg-raised/45 p-4">
          <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">What causes what</p>
          <div className="mt-2"><Prose text={topic.mechanism} /></div>
        </section>
      )}

      {topic.visual && <Figure id={topic.visual.id} caption={topic.visual.caption} />}

      {topic.equations.length > 0 && (
        <section className="mt-5">
          <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">The relationship, with conditions</p>
          <div className="mt-3 grid gap-3">
            {topic.equations.map((equation) => (
              <div key={`${equation.name}-${equation.latex}`} className="rounded-xl border border-border bg-raised/45 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-fg">{equation.name}</p>
                  {equation.conditions && <span className="text-xs text-subtle">{equation.conditions}</span>}
                </div>
                <div className="mt-3 overflow-x-auto text-fg"><Prose text={`$${equation.latex}$`} /></div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{equation.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {topic.keyPoints.length > 0 && (
        <section className="mt-5 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Keep these distinctions</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {topic.keyPoints.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                <Prose text={item} compact />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-5 rounded-xl border border-border bg-raised/45 p-4">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">A reliable method</p>
        <ol className="mt-3 grid gap-2 md:grid-cols-3">
          {topic.method.map((item, methodIndex) => (
            <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface p-3 text-sm text-muted">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-xs text-accent">{methodIndex + 1}</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-fg">Recognise it:</span> {topic.recognitionCue}</p>
      </section>

      {topic.workedExample && (
        <section className="mt-5 rounded-xl border border-ok/25 bg-ok/5 p-4 md:p-5">
          <p className="text-xs font-medium tracking-[0.14em] text-ok uppercase">Worked example — follow the reasoning</p>
          <div className="mt-3"><Prose text={topic.workedExample.prompt} /></div>
          <ol className="mt-4 space-y-2 text-sm text-muted">
            {topic.workedExample.steps.map((step, stepIndex) => (
              <li key={`${stepIndex}-${step}`} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-ok/30 font-mono text-xs text-ok">{stepIndex + 1}</span>
                <Prose text={step} compact />
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-lg border border-border bg-surface p-3 text-sm">
            <p className="font-medium text-fg">Answer</p>
            <div className="mt-1 text-muted"><Prose text={topic.workedExample.answer} /></div>
            <p className="mt-3 text-xs leading-relaxed text-subtle"><span className="font-medium text-fg">Why this method:</span> {topic.workedExample.insight}</p>
          </div>
        </section>
      )}

      {topic.reference && (
        <details className="mt-5 rounded-xl border border-border bg-surface">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-fg">Open derivation, exceptions, and the complete note</summary>
          <div className="space-y-4 border-t border-border p-4">
            <Prose text={topic.reference.text} />
            {topic.reference.bullets && (
              <ul className="space-y-2 text-sm text-muted">
                {topic.reference.bullets.map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-ok" /><Prose text={item} compact /></li>)}
              </ul>
            )}
            {topic.reference.table && (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-raised"><tr>{topic.reference.table.headers.map((head) => <th key={head} className="px-3 py-2 text-left font-medium">{head}</th>)}</tr></thead>
                  <tbody>{topic.reference.table.rows.map((row) => <tr key={row.join("-")} className="border-t border-border">{row.map((cell) => <td key={cell} className="px-3 py-2 text-muted"><Prose text={cell} compact /></td>)}</tr>)}</tbody>
                </table>
              </div>
            )}
            {topic.reference.callout && <div className="rounded-lg border border-warn/30 bg-warn/5 p-3 text-sm text-muted"><span className="font-medium text-fg">Exam note:</span> <Prose text={topic.reference.callout} compact /></div>}
          </div>
        </details>
      )}

      <section className="mt-5 rounded-xl border border-warn/30 bg-warn/5 p-4">
        <p className="text-xs font-medium tracking-[0.14em] text-warn uppercase">Misconception repair</p>
        <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-fg">Tempting:</span> {topic.misconception.tempting}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-fg">Repair:</span> {topic.misconception.repair}</p>
      </section>

      <TopicCheck question={topic.quickCheck} picked={picked} showAnswer={showAnswer} onPick={onPick} onReveal={onReveal} />

      {topic.practice && (
        <details className="rounded-xl border border-border bg-surface">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-fg">Try a small transfer before moving on</summary>
          <div className="border-t border-border p-4 text-sm text-muted">
            <Prose text={topic.practice.prompt} />
            <details className="mt-3 rounded-lg border border-border bg-raised/45">
              <summary className="cursor-pointer px-3 py-2 text-xs font-medium text-subtle uppercase">Show a model answer</summary>
              <div className="border-t border-border p-3"><Prose text={topic.practice.answer} /><p className="mt-2 text-xs leading-relaxed text-subtle">{topic.practice.explanation}</p></div>
            </details>
          </div>
        </details>
      )}

      <div className="mt-6 flex flex-wrap justify-between gap-2">
        <Button variant="outline" onClick={onPrevious} disabled={index === 0}>
          <ChevronLeft className="size-4" /> Previous topic
        </Button>
        <Button onClick={onNext} disabled={index === total - 1}>
          {index === total - 1 ? "Chapter check" : "Next topic"} <ChevronRight className="size-4" />
        </Button>
      </div>
    </article>
  );
}

function TopicPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-raised/45 p-4">
      <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">{label}</p>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function TopicCheck({
  question,
  picked,
  showAnswer,
  onPick,
  onReveal,
}: {
  question: TopicQuestion;
  picked: number | null;
  showAnswer: boolean;
  onPick: (index: number) => void;
  onReveal: () => void;
}) {
  const hasOptions = Boolean(question.options?.length);
  return (
    <section className="mt-5 rounded-2xl border border-accent/30 bg-accent/5 p-4 md:p-5">
      <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">Close the notes</p>
      <h4 className="font-display mt-2 text-xl">Can you retrieve the idea?</h4>
      <div className="mt-3"><Prose text={question.prompt} /></div>
      {hasOptions && (
        <div className="mt-4 grid gap-2">
          {question.options!.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => onPick(index)}
              className={cn("min-h-11 rounded-xl border px-3 py-2 text-left text-sm", picked === index ? "border-accent bg-raised text-fg" : "border-border bg-surface text-muted hover:bg-raised")}
            >
              <Prose text={option} compact />
            </button>
          ))}
        </div>
      )}
      <Button className="mt-4" variant="secondary" onClick={onReveal} disabled={hasOptions && picked == null}>
        {hasOptions ? "Check and explain" : "Reveal the model answer"}
      </Button>
      {showAnswer && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          {hasOptions && <p className={cn("font-medium", picked != null && question.options?.[picked] === question.answer ? "text-ok" : "text-danger")}>{picked != null && question.options?.[picked] === question.answer ? "Correct — the model is holding." : "Not yet — compare your choice with the definition."}</p>}
          <p className="mt-2 leading-relaxed"><span className="font-medium text-fg">Answer:</span> {question.answer}</p>
          <div className="mt-2"><Prose text={question.explanation} /></div>
        </div>
      )}
    </section>
  );
}

function OutlineBlocks({ topics, active, onSelect }: { topics: TeachingTopic[]; active: number; onSelect: (index: number) => void }) {
  return (
    <div className="space-y-3">
      {topics.map((topic, index) => (
        <button
          key={topic.id}
          type="button"
          onClick={() => onSelect(index)}
          className={cn("flex min-h-16 w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left", index === active ? "border-accent bg-raised" : "border-border bg-surface hover:bg-raised")}
        >
          <span>
            <span className="block font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
            <span className="mt-1 block text-sm text-fg">{topic.title}</span>
            <span className="mt-1 block line-clamp-1 text-xs text-subtle">{topic.purpose}</span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-subtle" />
        </button>
      ))}
    </div>
  );
}

function RetrievalCheckpoint({
  question,
  picked,
  showAnswer,
  onPick,
  onReveal,
}: {
  question: ChapterContent["quiz"][number];
  picked: number | null;
  showAnswer: boolean;
  onPick: (index: number) => void;
  onReveal: () => void;
}) {
  return (
    <section className="rounded-2xl border border-ok/30 bg-ok/5 p-5 md:p-7">
      <p className="text-xs font-medium tracking-[0.14em] text-ok uppercase">Retrieval checkpoint</p>
      <h3 className="font-display mt-2 text-2xl">Close the notes and choose an answer</h3>
      <div className="mt-3"><Prose text={question.stem} /></div>
      <div className="mt-5 grid gap-2">
        {question.options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => onPick(index)}
            className={cn("min-h-11 rounded-xl border px-3 py-2 text-left text-sm", picked === index ? "border-accent bg-raised text-fg" : "border-border bg-surface text-muted hover:bg-raised")}
          >
            <Prose text={option} compact />
          </button>
        ))}
      </div>
      <Button className="mt-5" variant="secondary" onClick={onReveal} disabled={picked == null}>Reveal reasoning</Button>
      {showAnswer && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className={cn("font-medium", picked === question.correct ? "text-ok" : "text-danger")}>{picked === question.correct ? "Correct — the idea is holding." : "Not yet — use the explanation to repair the model."}</p>
          <div className="mt-2"><Prose text={question.why} /></div>
        </div>
      )}
    </section>
  );
}
