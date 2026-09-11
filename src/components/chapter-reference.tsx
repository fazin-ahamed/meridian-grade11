import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileQuestion,
  FlaskConical,
  Layers3,
  Lightbulb,
  ListChecks,
  NotebookTabs,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Figure } from "@/components/diagrams";
import { Prose } from "@/components/tex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  ChapterContent,
  ChapterMeta,
  MasteryLevel,
  MasteryModule,
  TheoryBlock,
} from "@/data/types";
import { cn } from "@/lib/utils";

type OfficialSummary = {
  unit: string;
  ncert: string;
  periods?: string;
  bullets: string[];
  jeeExtra: string[];
};

type ChapterReferenceProps = {
  meta: ChapterMeta;
  content: ChapterContent;
  official?: OfficialSummary;
};

type ReferenceQuestionProps = {
  question: ChapterContent["quiz"][number];
  index: number;
};

export function ChapterReference({ meta, content, official }: ChapterReferenceProps) {
  const classNotes = content.classNotes ?? [];
  const masteryModules = content.mastery ?? [];
  const masteryCount = masteryModules.reduce((total, module) => total + module.questions.length, 0);
  const totalNotes =
    classNotes.length +
    content.theory.length +
    masteryModules.reduce((total, module) => total + module.sections.length, 0);
  const faqs = [
    {
      question: `What is the central idea of ${meta.title}?`,
      answer: meta.summary,
    },
    {
      question: "What should I be able to do after one focused revision?",
      answer:
        meta.objectives.slice(0, 3).join(" Then ") ||
        "Define the main quantities, choose the right representation, and explain the conditions behind the central relationships.",
    },
    {
      question: "What is the first mistake to repair?",
      answer:
        content.traps[0] ??
        "Do not start by hunting for a formula. Name the quantity, representation, and condition first.",
    },
    {
      question: "How does this chapter become an exam question?",
      answer: content.pyqInsight,
    },
  ];

  return (
    <section id="chapter-reference" className="scroll-mt-8 space-y-6">
      <section className="rounded-3xl border border-border bg-surface p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.16em] text-subtle uppercase">
              Revision chapter
            </p>
            <h2 className="font-display mt-2 text-2xl md:text-3xl">
              Read the chapter as a map, then practise the moves.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This is the reference layer behind the guided lesson. It follows a textbook rhythm:
              overview, definition-first notes, extensions, demonstrations, exam checks, traps, and
              a final recap.
            </p>
          </div>
          <Badge variant="outline" className="gap-2">
            <NotebookTabs className="size-3.5" /> chapter reference
          </Badge>
        </div>

        <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          <ReferenceStat icon={Layers3} value={totalNotes} label="concept blocks" />
          <ReferenceStat icon={Lightbulb} value={content.worked.length} label="demonstrations" />
          <ReferenceStat icon={FileQuestion} value={content.quiz.length} label="quick checks" />
          <ReferenceStat icon={Target} value={masteryCount} label="mastery MCQs" />
          <ReferenceStat icon={ListChecks} value={content.checklist.length} label="mastery cues" />
        </div>

        <nav
          aria-label="Chapter contents"
          className="mt-6 rounded-2xl border border-border bg-raised/45 p-4"
        >
          <div className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
            <BookOpen className="size-4 text-accent" /> Contents
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <ReferenceAnchor href="#reference-overview" index="01" label="Overview" />
            <ReferenceAnchor href="#reference-notes" index="02" label="Concept notes" />
            {masteryModules.length > 0 && (
              <ReferenceAnchor href="#reference-mastery" index="03" label="Mastery ladder" />
            )}
            <ReferenceAnchor
              href="#reference-formulas"
              index={masteryModules.length ? "04" : "03"}
              label="Formula shelf"
            />
            <ReferenceAnchor
              href="#reference-demonstrations"
              index={masteryModules.length ? "05" : "04"}
              label="Demonstrations"
            />
            <ReferenceAnchor
              href="#reference-checks"
              index={masteryModules.length ? "06" : "05"}
              label="Exam checks"
            />
            <ReferenceAnchor
              href="#reference-traps"
              index={masteryModules.length ? "07" : "06"}
              label="Traps and tactics"
            />
            <ReferenceAnchor
              href="#reference-recap"
              index={masteryModules.length ? "08" : "07"}
              label="Recap and FAQs"
            />
          </div>
        </nav>
      </section>

      {masteryModules.length > 0 && <MasteryLadder modules={masteryModules} />}

      <section
        id="reference-overview"
        className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
      >
        <SectionHeading
          eyebrow="01 · Overview"
          title="Know what the chapter is asking you to build"
          description="Use the overview before reading line by line. It tells you what belongs in the school answer, what gets extended for JEE, and what to be able to retrieve later."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-accent/25 bg-accent/5 p-5">
            <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">
              Chapter in one sentence
            </p>
            <div className="mt-3 text-base leading-relaxed text-fg">
              <Prose text={meta.summary} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="outline">NCERT {meta.ncert}</Badge>
              <Badge variant="outline">{meta.hours} hour route</Badge>
              <Badge variant="outline">Difficulty {meta.difficulty}/5</Badge>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-raised/45 p-5">
            <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              Learning outcomes
            </p>
            <ul className="mt-3 space-y-3 text-sm text-muted">
              {meta.objectives.slice(0, 5).map((objective) => (
                <li key={objective} className="flex gap-3">
                  <Target className="mt-0.5 size-4 shrink-0 text-accent" />
                  <Prose text={objective} compact />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {official && (
          <details className="mt-4 rounded-2xl border border-border bg-raised/35 p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium">
              <span>Open the official syllabus boundary</span>
              <ChevronDown className="size-4 text-subtle" />
            </summary>
            <div className="mt-4 space-y-4 border-t border-border pt-4 text-sm text-muted">
              <p className="font-display text-xl text-fg">{official.unit}</p>
              <p>
                {official.ncert}
                {official.periods ? ` · ${official.periods}` : ""}
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                {official.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {official.jeeExtra.length > 0 && (
                <div>
                  <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
                    JEE extension
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    {official.jeeExtra.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </details>
        )}
      </section>

      <section
        id="reference-notes"
        className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
      >
        <SectionHeading
          eyebrow="02 · Concept notes"
          title="Definition first, then the harder connection"
          description="Open a block when you want the full classroom note. The first layer anchors vocabulary and examples; the second layer shows how Main and Advanced recombine it."
        />
        {classNotes.length > 0 && (
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              <NotebookTabs className="size-4 text-accent" /> Classroom notes
            </div>
            <div className="space-y-3">
              {classNotes.map((block, index) => (
                <ReferenceNote
                  key={block.id}
                  block={block}
                  index={index}
                  defaultOpen={index === 0}
                />
              ))}
            </div>
          </div>
        )}
        {content.theory.length > 0 && (
          <div className={cn("mt-7", classNotes.length === 0 && "mt-6")}>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              <Sparkles className="size-4 text-accent" /> JEE extension
            </div>
            <div className="space-y-3">
              {content.theory.map((block, index) => (
                <ReferenceNote key={block.id} block={block} index={classNotes.length + index} />
              ))}
            </div>
          </div>
        )}
        {totalNotes === 0 && (
          <EmptyReference text="The definition-first notes are still being packed for this chapter." />
        )}
      </section>

      <section
        id="reference-formulas"
        className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
      >
        <SectionHeading
          eyebrow="03 · Formula shelf"
          title="Keep the relationships with their conditions"
          description="A formula is useful only when you can say what each symbol means and when the relationship is allowed."
        />
        {content.formulas.length > 0 ? (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {content.formulas.map((formula, index) => (
              <div
                key={`${formula.name}-${index}`}
                className="rounded-2xl border border-border bg-raised/45 p-4"
              >
                <p className="text-xs font-medium tracking-[0.12em] text-subtle uppercase">
                  {formula.name}
                </p>
                <div className="mt-3 overflow-x-auto text-fg">
                  <Prose text={`$${formula.latex}$`} />
                </div>
                {formula.note && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{formula.note}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <EmptyReference text="The formula shelf is empty for this chapter. Use the concept blocks to build the relationships yourself." />
        )}
      </section>

      <section
        id="reference-demonstrations"
        className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
      >
        <SectionHeading
          eyebrow="04 · Demonstrations"
          title="See the method before you try the question"
          description="These are not answer dumps. Reveal the path, check the limiting idea, and then change one condition in your own head."
        />
        {content.worked.length > 0 ? (
          <div className="mt-6 space-y-3">
            {content.worked.map((problem, index) => (
              <ReferenceWorked key={problem.id} problem={problem} index={index} />
            ))}
          </div>
        ) : (
          <EmptyReference text="No worked demonstrations are attached yet. Start with the method inside the guided topic above." />
        )}
      </section>

      <section
        id="reference-checks"
        className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
      >
        <SectionHeading
          eyebrow="05 · Exam checks"
          title="Close the notes and choose an option"
          description="The reference page uses options for the same reason a JEE question does: your first move becomes visible before the calculation."
        />
        {content.quiz.length > 0 ? (
          <div className="mt-6 space-y-4">
            {content.quiz.map((question, index) => (
              <ReferenceQuestion key={question.id} question={question} index={index} />
            ))}
          </div>
        ) : (
          <EmptyReference text="No chapter checks are attached yet. Use the Mill tab for computed practice." />
        )}
      </section>

      <section
        id="reference-traps"
        className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
      >
        <SectionHeading
          eyebrow="06 · Traps and tactics"
          title="Know what usually goes wrong"
          description="A strong revision note includes the boundary of an idea. Use this section to turn a wrong answer into a rule you can reuse."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <ReferenceList title="Common traps" items={content.traps} tone="warn" />
          <ReferenceList title="Exam tactics" items={content.tricks} tone="accent" />
        </div>
        {content.extras.length > 0 && (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {content.extras.map((extra) => (
              <div key={extra.title} className="rounded-2xl border border-border bg-raised/45 p-4">
                <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
                  Go deeper
                </p>
                <h3 className="mt-2 font-medium text-fg">{extra.title}</h3>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  <Prose text={extra.body} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section
        id="reference-recap"
        className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
      >
        <SectionHeading
          eyebrow="07 · Recap and FAQs"
          title="Leave with a short list you can retrieve"
          description="Return here after a paper. Tick the cues you can explain without looking, then reopen only the block that failed."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-ok/25 bg-ok/5 p-5">
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-ok uppercase">
              <ListChecks className="size-4" /> Mastery checklist
            </div>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {content.checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                  <Prose text={item} compact />
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-raised/45 p-5">
            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              <CircleHelp className="size-4 text-accent" /> Frequently asked
            </div>
            <div className="mt-3 space-y-2">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-border bg-surface p-3"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium">
                    <span>{faq.question}</span>
                    <ChevronDown className="size-4 shrink-0 text-subtle" />
                  </summary>
                  <div className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted">
                    <Prose text={faq.answer} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/5 p-5">
          <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">
            How papers use this
          </p>
          <div className="mt-2 text-sm leading-relaxed text-muted">
            <Prose text={content.pyqInsight} />
          </div>
        </div>
      </section>
    </section>
  );
}

function ReferenceStat({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: number;
  label: string;
}) {
  return (
    <div className="bg-raised/70 p-4">
      <Icon className="size-4 text-accent" />
      <p className="mt-3 font-display text-2xl tabular-nums text-fg">{value}</p>
      <p className="mt-1 text-xs tracking-[0.12em] text-subtle uppercase">{label}</p>
    </div>
  );
}

function ReferenceAnchor({ href, index, label }: { href: string; index: string; label: string }) {
  return (
    <a
      href={href}
      className="flex min-h-10 items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:bg-raised hover:text-fg"
    >
      <span className="font-mono text-xs text-subtle">{index}</span>
      <span>{label}</span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-display mt-2 text-2xl md:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

function MasteryLadder({ modules }: { modules: MasteryModule[] }) {
  const [moduleId, setModuleId] = useState(modules[0]?.id ?? "");
  const [level, setLevel] = useState<MasteryLevel | "all">("all");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const activeModule = modules.find((module) => module.id === moduleId) ?? modules[0];
  const questions =
    activeModule?.questions.filter((question) => level === "all" || question.level === level) ?? [];
  const question = questions[questionIndex];

  const chooseModule = (nextId: string) => {
    setModuleId(nextId);
    setLevel("all");
    setQuestionIndex(0);
    setPicked(null);
    setRevealed(false);
  };

  const chooseLevel = (nextLevel: MasteryLevel | "all") => {
    setLevel(nextLevel);
    setQuestionIndex(0);
    setPicked(null);
    setRevealed(false);
  };

  const moveQuestion = (direction: -1 | 1) => {
    setQuestionIndex((current) => Math.min(Math.max(current + direction, 0), questions.length - 1));
    setPicked(null);
    setRevealed(false);
  };

  if (!activeModule) return null;

  return (
    <section
      id="reference-mastery"
      className="scroll-mt-8 rounded-3xl border border-border bg-surface p-6 md:p-8"
    >
      <SectionHeading
        eyebrow="03 · Mastery ladder"
        title="Read the idea, see the archetype, then choose an option"
        description="This layer follows the attached mastery-course structure. Start with the section map, close the explanation in your head, and move through L1 foundation, L2 standard, L3 JEE-style traps, and L4 synthesis."
      />

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Mastery modules">
        {modules.map((module) => (
          <button
            key={module.id}
            type="button"
            role="tab"
            aria-selected={module.id === activeModule.id}
            onClick={() => chooseModule(module.id)}
            className={cn(
              "rounded-xl border px-3 py-2 text-left text-sm transition-colors",
              module.id === activeModule.id
                ? "border-accent bg-accent/10 text-fg"
                : "border-border bg-raised/35 text-muted hover:bg-raised hover:text-fg",
            )}
          >
            <span className="block font-medium">{module.title}</span>
            <span className="mt-1 block text-xs text-subtle">
              {module.sections.length} sections · {module.questions.length} checks
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-accent/25 bg-accent/5 p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">
          {activeModule.title}
        </p>
        <div className="mt-2 text-sm leading-relaxed text-muted">
          <Prose text={activeModule.summary} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {activeModule.sections.map((section, index) => (
          <article
            key={section.id}
            className="rounded-2xl border border-border bg-raised/35 p-4 md:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-surface font-mono text-xs text-subtle">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-medium leading-relaxed text-fg">{section.title}</h3>
            </div>
            <div className="mt-4 text-sm leading-relaxed text-muted">
              <Prose text={section.body} />
            </div>
            {section.bullets && (
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    <Prose text={bullet} compact />
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              Interactive mastery quiz
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Choose the model before revealing the explanation. Every option is designed to expose
              a common reasoning error.
            </p>
          </div>
          <div className="text-right text-xs text-subtle">
            <p>
              {questions.length
                ? "Question " + (questionIndex + 1) + " of " + questions.length
                : "No checks"}
            </p>
            <p className="mt-1">
              L1 {activeModule.questions.filter((item) => item.level === "L1").length} · L2{" "}
              {activeModule.questions.filter((item) => item.level === "L2").length} · L3{" "}
              {activeModule.questions.filter((item) => item.level === "L3").length} · L4{" "}
              {activeModule.questions.filter((item) => item.level === "L4").length}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Mastery difficulty">
          {(["all", "L1", "L2", "L3", "L4"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={level === item}
              onClick={() => chooseLevel(item)}
              className={cn(
                "min-h-9 rounded-lg border px-3 text-xs font-medium transition-colors",
                level === item
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-raised/35 text-muted hover:bg-raised hover:text-fg",
              )}
            >
              {item === "all"
                ? "All levels"
                : item +
                  " · " +
                  (item === "L1"
                    ? "foundation"
                    : item === "L2"
                      ? "standard"
                      : item === "L3"
                        ? "JEE trap"
                        : "synthesis")}
            </button>
          ))}
        </div>

        {question ? (
          <article className="mt-5 rounded-2xl border border-border bg-raised/35 p-4 md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg border border-border bg-surface font-mono text-xs text-subtle">
                  Q{questionIndex + 1}
                </span>
                <Badge variant="outline">{question.level}</Badge>
              </div>
              <span className="text-xs text-subtle">option-based check</span>
            </div>
            <div className="mt-4 text-sm leading-relaxed text-fg">
              <Prose text={question.prompt} />
            </div>
            <div className="mt-4 grid gap-2">
              {question.choices.map((choice, choiceIndex) => {
                const chosen = picked === choiceIndex;
                const correct = revealed && choiceIndex === question.answer;
                const wrong = revealed && chosen && choiceIndex !== question.answer;
                return (
                  <button
                    key={choice}
                    type="button"
                    aria-pressed={chosen}
                    onClick={() => {
                      setPicked(choiceIndex);
                      setRevealed(false);
                    }}
                    className={cn(
                      "flex min-h-11 items-start gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                      correct
                        ? "border-ok/50 bg-ok/10 text-fg"
                        : wrong
                          ? "border-danger/50 bg-danger/10 text-fg"
                          : chosen
                            ? "border-accent bg-surface text-fg"
                            : "border-border bg-surface text-muted hover:bg-raised hover:text-fg",
                    )}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-md border border-border font-mono text-xs text-subtle">
                      {String.fromCharCode(65 + choiceIndex)}
                    </span>
                    <Prose text={choice} compact />
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setRevealed(true)}
                disabled={picked == null}
              >
                Check this choice
              </Button>
              {revealed && (
                <span
                  className={cn(
                    "text-sm font-medium",
                    picked === question.answer ? "text-ok" : "text-danger",
                  )}
                >
                  {picked === question.answer
                    ? "Correct — the model is holding."
                    : "Not yet — compare the marked option."}
                </span>
              )}
            </div>
            {revealed && (
              <div className="mt-4 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
                <p className="font-medium text-fg">Why</p>
                <div className="mt-2">
                  <Prose text={question.explanation} />
                </div>
              </div>
            )}
            <div className="mt-5 flex flex-wrap justify-between gap-2 border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => moveQuestion(-1)}
                disabled={questionIndex === 0}
              >
                <ChevronLeft className="size-4" /> Previous
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => moveQuestion(1)}
                disabled={questionIndex === questions.length - 1}
              >
                {questionIndex === questions.length - 1 ? "Module complete" : "Next question"}{" "}
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </article>
        ) : (
          <EmptyReference text="No questions are available at this level yet. Try another difficulty filter." />
        )}
      </div>
    </section>
  );
}

function ReferenceNote({
  block,
  index,
  defaultOpen = false,
}: {
  block: TheoryBlock;
  index: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      id={`reference-note-${block.id}`}
      className="group rounded-2xl border border-border bg-raised/35"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 text-left">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-border bg-surface font-mono text-xs text-subtle">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs tracking-[0.12em] text-subtle uppercase">
            Concept block
          </span>
          <span className="mt-1 block font-medium text-fg">{block.heading}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-subtle transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-4 border-t border-border px-4 py-5 md:px-5">
        {block.diagram && <Figure id={block.diagram} />}
        <div className="text-sm leading-relaxed text-muted">
          <Prose text={block.body} />
        </div>
        {block.table && <ReferenceTable table={block.table} />}
        {block.bullets && (
          <ul className="space-y-2 text-sm leading-relaxed text-muted">
            {block.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <Prose text={bullet} compact />
              </li>
            ))}
          </ul>
        )}
        {block.callout && (
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-muted">
            <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">
              {calloutLabel(block.callout.kind)}
            </p>
            <div className="mt-2">
              <Prose text={block.callout.text} />
            </div>
          </div>
        )}
      </div>
    </details>
  );
}

function ReferenceTable({ table }: { table: NonNullable<TheoryBlock["table"]> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>
            {table.headers.map((header) => (
              <th key={header} className="px-3 py-2 text-left font-medium text-fg">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join("-")} className="border-t border-border">
              {row.map((cell) => (
                <td key={cell} className="px-3 py-2 align-top text-muted">
                  <Prose text={cell} compact />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function calloutLabel(kind: NonNullable<TheoryBlock["callout"]>["kind"]): string {
  if (kind === "board") return "Boards lens";
  if (kind === "main") return "JEE Main lens";
  if (kind === "advanced") return "JEE Advanced lens";
  if (kind === "trap") return "Boundary to remember";
  return "Stretch idea";
}

function ReferenceWorked({
  problem,
  index,
}: {
  problem: ChapterContent["worked"][number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-border bg-raised/35 p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg border border-border bg-surface font-mono text-xs text-subtle">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Badge variant="outline" className="capitalize">
            {problem.exam} style
          </Badge>
        </div>
        <span className="text-xs text-subtle">demonstration</span>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-fg">
        <Prose text={problem.prompt} />
      </div>
      {problem.diagram && <Figure id={problem.diagram} />}
      <Button
        variant="secondary"
        size="sm"
        className="mt-4"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Hide model path" : "Reveal model path"}
      </Button>
      {open && (
        <div className="mt-4 space-y-4 border-t border-border pt-4">
          <ol className="space-y-3 text-sm leading-relaxed text-muted">
            {problem.steps.map((step, stepIndex) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-accent/30 font-mono text-xs text-accent">
                  {stepIndex + 1}
                </span>
                <Prose text={step} compact />
              </li>
            ))}
          </ol>
          <div className="rounded-xl border border-ok/25 bg-ok/5 p-4 text-sm text-muted">
            <p className="font-medium text-fg">Answer</p>
            <div className="mt-1">
              <Prose text={problem.answer} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-subtle">
              <span className="font-medium text-fg">Limiting idea:</span> {problem.insight}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

function ReferenceQuestion({ question, index }: ReferenceQuestionProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correct = question.correct;
  return (
    <article className="rounded-2xl border border-border bg-raised/35 p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg border border-border bg-surface font-mono text-xs text-subtle">
            Q{index + 1}
          </span>
          <Badge variant="outline" className="capitalize">
            {question.exam} style
          </Badge>
        </div>
        <span className="text-xs text-subtle">
          {question.kind === "numerical" ? "numerical" : "MCQ"}
        </span>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-fg">
        <Prose text={question.stem} />
      </div>
      <div className="mt-4 grid gap-2">
        {question.options.map((option, optionIndex) => {
          const chosen = picked === optionIndex;
          const right = revealed && optionIndex === correct;
          const wrong = revealed && chosen && optionIndex !== correct;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={chosen}
              onClick={() => setPicked(optionIndex)}
              className={cn(
                "flex min-h-11 items-start gap-3 rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                right
                  ? "border-ok/50 bg-ok/10 text-fg"
                  : wrong
                    ? "border-danger/50 bg-danger/10 text-fg"
                    : chosen
                      ? "border-accent bg-surface text-fg"
                      : "border-border bg-surface text-muted hover:bg-raised hover:text-fg",
              )}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-md border border-border font-mono text-xs text-subtle">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <Prose text={option} compact />
            </button>
          );
        })}
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="mt-4"
        onClick={() => setRevealed(true)}
        disabled={picked == null}
      >
        Check this choice
      </Button>
      {revealed && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className={cn("font-medium", picked === correct ? "text-ok" : "text-danger")}>
            {picked === correct
              ? "Correct: the model is holding."
              : "Not yet: compare the marked option."}
          </p>
          <div className="mt-2 leading-relaxed">
            <Prose text={question.why} />
          </div>
        </div>
      )}
    </article>
  );
}

function ReferenceList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "warn" | "accent";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        tone === "warn" ? "border-warn/30 bg-warn/5" : "border-accent/25 bg-accent/5",
      )}
    >
      <p
        className={cn(
          "text-xs font-medium tracking-[0.14em] uppercase",
          tone === "warn" ? "text-warn" : "text-accent",
        )}
      >
        {title}
      </p>
      {items.length > 0 ? (
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className={cn(
                  "mt-2 size-1.5 shrink-0 rounded-full",
                  tone === "warn" ? "bg-warn" : "bg-accent",
                )}
              />
              <Prose text={item} compact />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted">Nothing logged here yet.</p>
      )}
    </div>
  );
}

function EmptyReference({ text }: { text: string }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-border p-5 text-sm text-muted">
      <FlaskConical className="size-4 text-subtle" />
      <p className="mt-2">{text}</p>
    </div>
  );
}
