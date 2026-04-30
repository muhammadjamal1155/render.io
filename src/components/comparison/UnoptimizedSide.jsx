import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'

export default function UnoptimizedSide({ children, title = 'Unoptimized', note }) {
  const renderCount = useRenderTracker('UnoptimizedSide', 'left')

  return (
    <article className="flex h-full flex-col rounded-2xl border border-red-500/20 bg-[linear-gradient(180deg,rgba(255,68,68,0.08),rgba(20,20,22,0.95))] p-4">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-red-500/15 pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-300/90">{title}</p>
          {note ? <p className="mt-1 text-xs text-red-100/70">{note}</p> : null}
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="flex-1">{children}</div>
    </article>
  )
}
