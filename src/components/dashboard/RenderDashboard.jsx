import { useMemo, useState } from 'react'
import { usePlayground } from '../../context/PlaygroundContext'
import { clearRenderLog, deriveRenderStats } from '../../hooks/useRenderLog'
import RenderEventRow from './RenderEventRow'
import SectionHeader from '../ui/SectionHeader'

export default function RenderDashboard({ renderLog }) {
  const { resetRenderCounts } = usePlayground()
  const [collapsed, setCollapsed] = useState(false)

  const stats = useMemo(() => deriveRenderStats(renderLog), [renderLog])
  const timeline = renderLog.filter((event) => event.kind !== 'compute').slice(-30).reverse()

  return (
    <section className="panel-shell flex min-h-0 flex-1 flex-col p-5">
      <SectionHeader
        eyebrow="render dashboard"
        title="Live timeline"
        description="The last 30 render events stay pinned here. Clear the timeline to reset the counters and the log."
        action={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-cyan/50 hover:text-cyan-200"
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
            <button
              type="button"
              onClick={() => {
                clearRenderLog()
                resetRenderCounts()
              }}
              className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-amber/50 hover:text-amber-200"
            >
              Clear Timeline
            </button>
          </div>
        }
      />

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Comparison total
          </p>
          <p className="mt-2 text-lg font-semibold text-zinc-50">{stats.totalRenders}</p>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Comparison L/R
          </p>
          <p className="mt-2 text-lg font-semibold text-accent-cyan">
            {stats.leftRenders} / {stats.rightRenders}
          </p>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">Reduction</p>
          <p className="mt-2 text-lg font-semibold text-accent-green">{stats.renderReduction}%</p>
        </div>
      </div>

      {!collapsed ? (
        <div className="mt-5 grid min-h-0 flex-1 gap-2 overflow-y-auto pr-1">
          {timeline.length ? (
            timeline.map((event) => <RenderEventRow key={event.id} event={event} />)
          ) : (
            <p className="rounded-2xl border border-dashed border-border-subtle bg-bg-tertiary px-4 py-5 text-sm text-zinc-400">
              The timeline is empty. Interact with the playground to begin logging renders.
            </p>
          )}
        </div>
      ) : (
        <p className="mt-5 rounded-2xl border border-border-subtle bg-bg-tertiary px-4 py-5 text-sm text-zinc-400">
          Timeline collapsed.
        </p>
      )}
    </section>
  )
}
