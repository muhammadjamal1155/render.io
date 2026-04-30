import { memo } from 'react'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'

function ChildABase({ label, side }) {
  const renderCount = useRenderTracker('ChildA', side)

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-50">ChildA</p>
          <p className="mt-1 text-xs text-zinc-400">Pure render output keyed by sliderValue</p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="mt-4 rounded-xl border border-border-subtle bg-bg-tertiary p-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">Label</p>
        <p className="mt-2 text-lg font-semibold text-zinc-50">{label}</p>
      </div>
      <p className="mt-3 text-xs text-zinc-400">
        {side === 'right'
          ? 'The optimized wrapper skips this body when the label prop stays stable.'
          : 'This version renders again whenever the parent re-renders.'}
      </p>
    </div>
  )
}

const MemoChildA = memo(ChildABase)

export default function ChildA({ label, side, memoEnabled }) {
  return memoEnabled ? <MemoChildA label={label} side={side} /> : <ChildABase label={label} side={side} />
}
