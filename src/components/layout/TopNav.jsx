import { useRenderLog } from '../../hooks/useRenderLog'
import { usePlayground } from '../../context/PlaygroundContext'

const NAV_ITEMS = [
  { id: 'memo-section', label: 'React.memo' },
  { id: 'useMemo-section', label: 'useMemo' },
  { id: 'useCallback-section', label: 'useCallback' },
  { id: 'lazy-section', label: 'Lazy loading' },
]

function scrollToSection(id) {
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function TopNav() {
  const { leftRenders, rightRenders, renderReduction, totalRenders } = useRenderLog()
  const { state, setActiveView } = usePlayground()

  return (
    <header className="border-b border-border-subtle/80 bg-bg-primary/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
              React Performance Playground
            </p>
            <h1 className="text-2xl font-semibold text-zinc-50 md:text-3xl">
              Render behavior comparison
            </h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Total renders
              </p>
              <p className="mt-1 text-lg font-semibold text-zinc-50">{totalRenders}</p>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Left vs Right
              </p>
              <p className="mt-1 text-lg font-semibold text-accent-cyan">
                {leftRenders} vs {rightRenders}
              </p>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Reduction
              </p>
              <p className="mt-1 text-lg font-semibold text-accent-green">{renderReduction}%</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView('playground')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              state.activeView === 'playground'
                ? 'border-accent-cyan/50 bg-accent-cyan/10 text-cyan-200'
                : 'border-border-subtle bg-bg-secondary text-zinc-400 hover:border-border-bright hover:text-zinc-200'
            }`}
          >
            Playground
          </button>
          <button
            type="button"
            onClick={() => setActiveView('documentation')}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              state.activeView === 'documentation'
                ? 'border-accent-cyan/50 bg-accent-cyan/10 text-cyan-200'
                : 'border-border-subtle bg-bg-secondary text-zinc-400 hover:border-border-bright hover:text-zinc-200'
            }`}
          >
            Documentation
          </button>
          <div className="mx-1 h-5 w-px bg-border-subtle" />
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="rounded-full border border-border-subtle bg-bg-secondary px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-border-bright hover:text-zinc-200"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
