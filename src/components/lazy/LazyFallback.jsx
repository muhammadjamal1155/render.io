import { useRenderTracker } from '../../hooks/useRenderTracker'

export default function LazyFallback() {
  const renderCount = useRenderTracker('LazyFallback', 'right')

  return (
    <div className="animate-pulse rounded-2xl border border-border-subtle bg-bg-tertiary/80 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-2 w-40 rounded-full bg-white/5" />
        </div>
        <span className="rounded-full border border-border-subtle bg-bg-secondary px-3 py-1 font-mono text-xs text-zinc-400">
          {renderCount}
        </span>
      </div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
        Loading deferred module
      </p>
      <div className="space-y-3">
        <div className="h-24 rounded-xl bg-white/5" />
        <div className="h-10 rounded-xl bg-white/5" />
        <div className="h-10 w-2/3 rounded-xl bg-white/5" />
      </div>
    </div>
  )
}
