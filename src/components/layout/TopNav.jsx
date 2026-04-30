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
  const { state, setActivePanel } = usePlayground()

  return (
    <header className="border-b border-border-subtle/80 bg-bg-primary/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
              React Performance Playground
            </p>
            <h1 className="text-2xl font-semibold text-zinc-50 md:text-3xl">
              Render behavior you can actually feel
            </h1>
            <p className="max-w-3xl text-sm text-zinc-400">
              Flip the toggles, type into the control bar, and watch the render counters change in
              real time while the explanation rail keeps pace.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Comparison renders
              </p>
              <p className="mt-1 text-lg font-semibold text-zinc-50">{totalRenders}</p>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-bg-secondary px-4 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Delta
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                scrollToSection(item.id)
                setActivePanel(item.id.replace('-section', ''))
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                state.activePanel === item.id.replace('-section', '')
                  ? 'border-accent-cyan/40 bg-accent-cyan/10 text-cyan-200'
                  : 'border-border-subtle bg-bg-secondary text-zinc-400 hover:border-border-bright hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
