import { memo, useState } from 'react'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'

function ChildCBase({ onAction, side, label, resetVersion }) {
  const renderCount = useRenderTracker('ChildC', side, resetVersion)
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    onAction?.()
    setClickCount((count) => count + 1)
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-50">ChildC</p>
          <p className="mt-1 text-xs text-zinc-400">Memoized child receives the callback prop</p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="mt-4 rounded-xl border border-border-subtle bg-bg-tertiary p-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">
          Stable dependency
        </p>
        <p className="mt-2 text-lg font-semibold text-zinc-50">{label}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleClick}
          className="rounded-full border border-border-bright bg-bg-tertiary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-cyan/50 hover:text-cyan-200"
        >
          Ping parent
        </button>
        <p className="font-mono text-xs text-zinc-400">clicks: {clickCount}</p>
      </div>
      <p className="mt-3 text-xs text-zinc-400">
        The child only skips re-renders if the callback reference stays stable.
      </p>
    </div>
  )
}

const MemoChildC = memo(ChildCBase)

export default function ChildC({ onAction, side, label, resetVersion }) {
  return <MemoChildC onAction={onAction} side={side} label={label} resetVersion={resetVersion} />
}
