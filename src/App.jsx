import { PlaygroundProvider } from './context/PlaygroundContext'
import TopNav from './components/layout/TopNav'
import ControlBar from './components/layout/ControlBar'
import OptimizationToggles from './components/layout/OptimizationToggles'
import TechniqueSection from './components/comparison/TechniqueSection'
import LazySection from './components/lazy/LazySection'
import InsightsRail from './components/insights/InsightsRail'

const techniqueSections = ['memo', 'useMemo', 'useCallback']

export default function App() {
  return (
    <PlaygroundProvider>
      <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.07),transparent_35%),linear-gradient(rgba(255,255,255,0.02),rgba(255,255,255,0.02))]">
        <TopNav />

        <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 lg:min-h-0 lg:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.95fr)] lg:px-6 lg:pb-6 lg:overflow-hidden">
          <div className="space-y-6 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            <div className="panel-shell p-5">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500">
                  Playground overview
                </p>
                <h2 className="text-xl font-semibold text-zinc-50">
                  A live lab for rendering behavior
                </h2>
                <p className="max-w-4xl text-sm leading-6 text-zinc-400">
                  The left side of the page hosts the interactive demos. The right rail stays fixed
                  on desktop and updates the explanation panel and render dashboard without
                  disturbing the tracked tree.
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
                    Step 1
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-50">Type or drag controls</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    These create parent re-renders so the child components have something to respond to.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
                    Step 2
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-50">Flip one optimization</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Turn on React.memo, useMemo, or useCallback to change how the optimized side behaves.
                  </p>
                </div>
                <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
                    Step 3
                  </p>
                  <p className="mt-2 text-sm font-semibold text-zinc-50">Watch counters and logs</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    The badges, explanation panel, and timeline update together so you can see the effect.
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
          </div>

          <InsightsRail />
        </main>
      </div>
    </PlaygroundProvider>
  )
}
