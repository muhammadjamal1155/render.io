import { useEffect } from 'react'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'

export default function HeavyComponentA({ startedAt, onLoaded }) {
  const renderCount = useRenderTracker('HeavyComponentA', 'right')

  useEffect(() => {
    if (typeof onLoaded === 'function') {
      onLoaded(Math.max(0, Math.round(performance.now() - startedAt)))
    }
  }, [onLoaded, startedAt])

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-50">HeavyComponentA</p>
          <p className="mt-1 text-xs text-zinc-400">A lazy chunk that simulates a large feature panel</p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="mt-4 rounded-xl border border-border-subtle bg-bg-tertiary p-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">Payload</p>
        <p className="mt-2 text-sm text-zinc-200">
          This module loads after the suspense boundary resolves.
        </p>
      </div>
    </div>
  )
}
