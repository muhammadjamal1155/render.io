import { useEffect, useMemo, useRef } from 'react'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'
import { fibonacci } from '../../utils/fibonacci'
import { appendRenderEvent } from '../../hooks/useRenderLog'

function ChildBPlain({ itemsKey, side }) {
  const renderCount = useRenderTracker('ChildB', side)
  const computeCountRef = useRef(0)

  const start = performance.now()
  const value = fibonacci(38)
  const computeMs = Math.round(performance.now() - start)
  computeCountRef.current += 1
  const computeCount = computeCountRef.current

  useEffect(() => {
    appendRenderEvent({
      component: 'ChildB',
      side,
      timestamp: Date.now(),
      renderCount,
      kind: 'compute',
      computeMs,
      itemsKey,
    })
  }, [computeMs, side, renderCount, itemsKey])

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-50">ChildB</p>
          <p className="mt-1 text-xs text-zinc-400">Heavy fibonacci calculation on every render</p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="mt-4 rounded-xl border border-border-subtle bg-bg-tertiary p-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">Result</p>
        <p className="mt-2 text-lg font-semibold text-zinc-50">{value.toLocaleString()}</p>
        <p className="mt-1 font-mono text-xs text-amber-200">
          Computation {computeCount}x | {computeMs}ms
        </p>
      </div>
      <p className="mt-3 text-xs text-zinc-400">
        The expensive work runs again because nothing is cached.
      </p>
    </div>
  )
}

function ChildBMemoized({ itemsKey, side }) {
  const renderCount = useRenderTracker('ChildB', side)
  const computeCountRef = useRef(0)

  const computation = useMemo(() => {
    const start = performance.now()
    const value = fibonacci(38)
    const computeMs = Math.round(performance.now() - start)
    computeCountRef.current += 1

    return {
      value,
      computeMs,
      computeCount: computeCountRef.current,
    }
  }, [itemsKey])

  useEffect(() => {
    appendRenderEvent({
      component: 'ChildB',
      side,
      timestamp: Date.now(),
      renderCount,
      kind: 'compute',
      computeMs: computation.computeMs,
      itemsKey,
    })
  }, [computation, side])

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-50">ChildB</p>
          <p className="mt-1 text-xs text-zinc-400">Heavy fibonacci calculation with useMemo</p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>
      <div className="mt-4 rounded-xl border border-border-subtle bg-bg-tertiary p-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">Result</p>
        <p className="mt-2 text-lg font-semibold text-zinc-50">
          {computation.value.toLocaleString()}
        </p>
        <p className="mt-1 font-mono text-xs text-emerald-200">
          Computation {computation.computeCount}x | {computation.computeMs}ms
        </p>
      </div>
      <p className="mt-3 text-xs text-zinc-400">
        The expensive work only reruns when the dependency changes.
      </p>
    </div>
  )
}

export default function ChildB({ itemsKey, side, useMemoEnabled }) {
  return useMemoEnabled ? (
    <ChildBMemoized itemsKey={itemsKey} side={side} />
  ) : (
    <ChildBPlain itemsKey={itemsKey} side={side} />
  )
}
