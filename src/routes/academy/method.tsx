import { createFileRoute, Link } from "@tanstack/react-router";
import { PageKicker, PageTitle } from "@/components/layout/shell";
import { millCount } from "@/data/mill/count";
import { METHOD } from "@/data/method";

export const Route = createFileRoute("/academy/method")({ component: MethodPage });

function MethodPage() {
  const n = millCount();
  return (
    <div>
      <PageKicker>{METHOD.promise.kicker}</PageKicker>
      <PageTitle>{METHOD.promise.title}</PageTitle>
      <p className="mt-4 max-w-2xl text-muted">{METHOD.promise.lead}</p>
      <Link to="/academy/start" className="mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline">
        Just started Class 11? Use the twelve-week on-ramp first.
      </Link>

      <section className="mt-12">
        <h2 className="font-display text-2xl">The learning science, without the TED talk</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {METHOD.science.map((s) => (
            <article key={s.name} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-medium">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Day zero — Class 11, this afternoon</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
          {METHOD.dayZero.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">The first thirty days</h2>
        <div className="mt-6 grid gap-3">
          {METHOD.firstThirty.map((w) => (
            <article key={w.week} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">{w.week}</p>
              <h3 className="mt-1 font-medium">{w.focus}</h3>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                {w.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">A 6-hour day that actually happens</h2>
        <p className="mt-2 text-sm text-muted">{METHOD.daily.title}</p>
        <ol className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
          {METHOD.daily.blocks.map((b) => (
            <li key={b.n} className="grid gap-1 bg-surface px-4 py-3 sm:grid-cols-4">
              <p className="text-xs tabular-nums tracking-wide text-subtle uppercase">{b.t}</p>
              <p className="font-medium sm:col-span-1">{b.n}</p>
              <p className="text-sm text-muted sm:col-span-2">{b.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Two-year spine</h2>
        <div className="mt-6 space-y-4">
          {METHOD.twoYear.map((t) => (
            <article key={t.name} className="border-l-2 border-border pl-4">
              <h3 className="font-medium">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">{METHOD.errorBook.title}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {METHOD.errorBook.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <Link to="/academy/errors" className="mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline">
          Open the error book on this device
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">{METHOD.mocks.title}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {METHOD.mocks.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">{METHOD.ninetyFive.title}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {METHOD.ninetyFive.points.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">How to use the mill ({n.toLocaleString()} items)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {METHOD.millHow.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <Link to="/academy/practice" className="mt-4 inline-block text-sm text-fg underline-offset-4 hover:underline">
          Open the arena
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">How to read NCERT so it actually sticks</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {METHOD.ncert.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Subject operating systems</h2>
        <div className="mt-6 grid gap-3">
          {METHOD.subjects.map((s) => (
            <article key={s.id} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.method}</p>
              <p className="mt-3 text-xs tracking-wide text-subtle uppercase">Stack</p>
              <p className="mt-1 text-sm text-muted">{s.stack}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Spaced loop for every chapter</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
          {METHOD.spaced.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">The anti-list</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
          {METHOD.anti.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">The only books</h2>
        <dl className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
          {METHOD.books.map((b) => (
            <div key={b.name} className="grid gap-1 bg-surface px-4 py-3 sm:grid-cols-3">
              <dt className="text-sm font-medium">{b.name}</dt>
              <dd className="text-sm text-muted sm:col-span-2">{b.why}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
