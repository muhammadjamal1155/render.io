import { useEffect } from 'react'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'

export default function HeavyComponentB({ startedAt, onLoaded, resetVersion }) {
  const renderCount = useRenderTracker('HeavyComponentB', 'right', resetVersion)

  useEffect(() => {
    if (typeof onLoaded === 'function') {
      onLoaded(Math.max(0, Math.round(performance.now() - startedAt)))
    }
  }, [onLoaded, startedAt])

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-50">HeavyComponentB</p>
          <p className="mt-1 text-xs text-zinc-400">Another lazy feature panel with independent timing</p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="mt-4 rounded-xl border border-border-subtle bg-bg-tertiary p-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">Payload</p>
        <p className="mt-2 text-sm text-zinc-200">
          Suspense keeps this component off the critical path until requested.
        </p>
      </div>
    </div>
  )
}
