import { PlaygroundProvider } from './context/PlaygroundContext'
import TopNav from './components/layout/TopNav'
import ControlBar from './components/layout/ControlBar'
import OptimizationToggles from './components/layout/OptimizationToggles'
import TechniqueSection from './components/comparison/TechniqueSection'
import LazySection from './components/lazy/LazySection'

const techniqueSections = ['memo', 'useMemo', 'useCallback']

export default function App() {
  return (
    <PlaygroundProvider>
      <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.07),transparent_35%),linear-gradient(rgba(255,255,255,0.02),rgba(255,255,255,0.02))]">
        <TopNav />

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 lg:px-6 lg:pb-6">
          <div className="panel-shell p-5">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                React Performance Playground
              </p>
              <h2 className="text-xl font-semibold text-zinc-50">
                Compare Rendering Behavior
              </h2>
              <p className="max-w-4xl text-sm leading-6 text-zinc-400">
                See how React.memo, useMemo, and useCallback affect component rendering.
                Type, drag, and toggle optimizations while the comparison stays visible on
                screen.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
                  Step 1
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-50">Type or drag controls</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Use the input and slider to trigger re-renders in the demo components.
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
                  Step 2
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-50">Flip the optimization toggles</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Turn on React.memo, useMemo, or useCallback to compare optimized behavior.
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
                  Step 3
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-50">Watch the counters</p>
                <p className="mt-2 text-sm text-zinc-400">
                  Render counts update immediately so you can see what changed.
                </p>
              </div>
            </div>
          </div>

          <ControlBar />
          <OptimizationToggles />

          {techniqueSections.map((techniqueId) => (
            <TechniqueSection key={techniqueId} techniqueId={techniqueId} />
          ))}

          <LazySection />
        </main>
      </div>
    </PlaygroundProvider>
  )
}
