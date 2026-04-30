export default function DocumentationPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 lg:px-6 lg:pb-6">
      <section className="panel-shell p-5">
        <div className="space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            Documentation
          </p>
          <h2 className="text-xl font-semibold text-zinc-50">
            How to use this React performance playground
          </h2>
          <p className="max-w-4xl text-sm leading-6 text-zinc-400">
            This page explains what React.memo, useMemo, and useCallback do, and how to compare
            the optimized and unoptimized versions in the playground.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="panel-shell p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            Overview
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-50">What this site demonstrates</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            The playground shows how React components behave when the parent re-renders. It
            compares a normal implementation with an optimized one so users can see the effect of
            memoization in real time.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            The left side of each demo is the baseline. The right side becomes optimized when the
            matching toggle is enabled.
          </p>
        </article>

        <article className="panel-shell p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            How to compare
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-50">Recommended demo flow</h3>
          <ol className="mt-3 space-y-3 text-sm leading-6 text-zinc-400">
            <li>1. Open the Playground tab.</li>
            <li>2. Turn on the toggle for the technique you want to test.</li>
            <li>3. Type in the input to trigger parent re-renders.</li>
            <li>4. Watch the left and right render counters.</li>
            <li>5. Change the slider when you want to trigger dependency changes.</li>
          </ol>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="panel-shell p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            React.memo
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-50">Skip unchanged child renders</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            React.memo prevents a child from re-rendering when its props stay the same. In this
            app, typing in the input re-renders the parent, but the memoized child can skip work if
            the slider-driven label does not change.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Best used when a child is pure, receives stable props, and is rendered often.
          </p>
        </article>

        <article className="panel-shell p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            useMemo
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-50">Cache expensive calculations</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            useMemo does not stop a component from rendering. It only prevents a heavy calculation
            from running again unless its dependency changes. In this demo, the Fibonacci result is
            reused until the slider value changes.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            The render count may still go up, but the computation count should stay flatter.
          </p>
        </article>

        <article className="panel-shell p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
            useCallback
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-50">Keep function references stable</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            useCallback returns the same function reference until one of its dependencies changes.
            That matters when a memoized child receives a callback prop, because a new function
            reference would otherwise look like a prop change.
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            In this project, the child can skip unnecessary renders when the callback stays stable.
          </p>
        </article>
      </section>

      <section className="panel-shell p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
          Reading the results
        </p>
        <h3 className="mt-2 text-lg font-semibold text-zinc-50">What to look at while testing</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
            <p className="text-sm font-semibold text-zinc-50">Render counters</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              These show how often each component rendered. They are useful for spotting
              unnecessary updates.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
            <p className="text-sm font-semibold text-zinc-50">Computation count</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              This is especially important in the useMemo section because it shows whether the
              heavy calculation actually reran.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
            <p className="text-sm font-semibold text-zinc-50">Dependency changes</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              If the slider changes, some optimized results will update because the dependency
              changed. If only the input changes, you can see what stays stable.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
