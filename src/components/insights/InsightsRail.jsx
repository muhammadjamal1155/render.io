import { useRenderLog } from '../../hooks/useRenderLog'
import ExplanationPanel from '../explanation/ExplanationPanel'
import RenderDashboard from '../dashboard/RenderDashboard'
import { usePlayground } from '../../context/PlaygroundContext'

export default function InsightsRail() {
  const { renderLog } = useRenderLog()
  const { state, setActivePanel } = usePlayground()

  return (
    <aside className="flex min-h-0 flex-col gap-5 lg:h-full lg:pl-1">
      <div className="panel-shell shrink-0 p-4">
        <div className="flex flex-wrap gap-2">
          {['memo', 'useMemo', 'useCallback', 'lazy'].map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActivePanel(id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                state.activePanel === id
                  ? 'border-accent-cyan/40 bg-accent-cyan/10 text-cyan-200'
                  : 'border-border-subtle bg-bg-secondary text-zinc-400 hover:border-border-bright hover:text-zinc-200'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <ExplanationPanel renderLog={renderLog} />
      <RenderDashboard renderLog={renderLog} />
    </aside>
  )
}
