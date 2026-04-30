import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'

export default function OptimizedSide({ children, title = 'Optimized', note, resetVersion }) {
  const renderCount = useRenderTracker('OptimizedSide', 'right', resetVersion)

  return (
    <article className="flex h-full flex-col rounded-2xl border border-emerald-500/20 bg-[linear-gradient(180deg,rgba(0,200,83,0.08),rgba(20,20,22,0.95))] p-4">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-emerald-500/15 pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300/90">
            {title}
          </p>
          {note ? <p className="mt-1 text-xs text-emerald-100/70">{note}</p> : null}
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="flex-1">{children}</div>
    </article>
  )
}
