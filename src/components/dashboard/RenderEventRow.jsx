import { memo } from 'react'

const COLORS = {
  ChildA: 'text-cyan-200',
  ChildB: 'text-amber-200',
  ChildC: 'text-emerald-200',
  ParentComponent: 'text-zinc-200',
  ControlBar: 'text-sky-200',
  OptimizationToggles: 'text-violet-200',
  UnoptimizedSide: 'text-red-200',
  OptimizedSide: 'text-emerald-200',
  TechniqueSection: 'text-zinc-200',
  LazySection: 'text-cyan-200',
  HeavyComponentA: 'text-cyan-200',
  HeavyComponentB: 'text-cyan-200',
  LazyFallback: 'text-zinc-400',
}

function RenderEventRowBase({ event }) {
  const tone = COLORS[event.component] ?? 'text-zinc-200'
  const time = new Date(event.timestamp).toLocaleTimeString([], {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="animate-slide-in flex items-center justify-between gap-3 rounded-xl border border-border-subtle bg-bg-tertiary/80 px-3 py-2 text-xs">
      <span className="font-mono text-zinc-500">{time}</span>
      <span className={`font-medium ${tone}`}>{event.component}</span>
      <span className="font-mono text-zinc-400">{event.side === 'left' ? 'L' : 'R'}</span>
      <span className="font-mono text-zinc-300">render #{event.renderCount}</span>
    </div>
  )
}

export default memo(RenderEventRowBase)
