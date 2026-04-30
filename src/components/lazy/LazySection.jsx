import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import { usePlayground } from '../../context/PlaygroundContext'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import LazyFallback from './LazyFallback'
import SectionHeader from '../ui/SectionHeader'
import RenderCountBadge from '../ui/RenderCountBadge'

function createLazyA(delayMs = 1200) {
  return lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(import('./HeavyComponentA')), delayMs)
      }),
  )
}

function createLazyB(delayMs = 800) {
  return lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve(import('./HeavyComponentB')), delayMs)
      }),
  )
}

function LoadStats({ label, value }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-zinc-50">{value}</p>
    </div>
  )
}

export default function LazySection({ delayA = 1200, delayB = 800 }) {
  const { setActivePanel } = usePlayground()
  const renderCount = useRenderTracker('LazySection')
  const [reloadKeyA, setReloadKeyA] = useState(0)
  const [reloadKeyB, setReloadKeyB] = useState(0)
  const [showA, setShowA] = useState(false)
  const [showB, setShowB] = useState(false)
  const [loadMsA, setLoadMsA] = useState(null)
  const [loadMsB, setLoadMsB] = useState(null)
  const startedAtA = useRef(performance.now())
  const startedAtB = useRef(performance.now())

  const LazyA = useMemo(() => createLazyA(delayA), [delayA, reloadKeyA])
  const LazyB = useMemo(() => createLazyB(delayB), [delayB, reloadKeyB])

  const restartA = () => {
    startedAtA.current = performance.now()
    setLoadMsA(null)
    setActivePanel('lazy')
    setReloadKeyA((value) => value + 1)
    setShowA(true)
  }

  const restartB = () => {
    startedAtB.current = performance.now()
    setLoadMsB(null)
    setActivePanel('lazy')
    setReloadKeyB((value) => value + 1)
    setShowB(true)
  }

  const loadA = () => {
    startedAtA.current = performance.now()
    setLoadMsA(null)
    setActivePanel('lazy')
    setShowA(true)
  }

  const loadB = () => {
    startedAtB.current = performance.now()
    setLoadMsB(null)
    setActivePanel('lazy')
    setShowB(true)
  }

  return (
    <section id="lazy-section" className="panel-shell p-5">
      <SectionHeader
        eyebrow="lazy loading"
        title="React.lazy + Suspense"
        description="These cards only mount after their deferred bundle resolves, so you can see the fallback and the load time."
        action={<RenderCountBadge count={renderCount} />}
      />

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={loadA}
          className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-cyan/50 hover:text-cyan-200"
        >
          Load A
        </button>
        <button
          type="button"
          onClick={loadB}
          className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-cyan/50 hover:text-cyan-200"
        >
          Load B
        </button>
        <button
          type="button"
          onClick={restartA}
          className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-amber/50 hover:text-amber-200"
        >
          Unload & Reload A
        </button>
        <button
          type="button"
          onClick={restartB}
          className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-amber/50 hover:text-amber-200"
        >
          Unload & Reload B
        </button>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/70 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-zinc-50">Deferred panel A</p>
              <p className="mt-1 text-xs text-zinc-400">1200ms suspense delay</p>
            </div>
            <LoadStats label="Load time" value={loadMsA == null ? 'waiting' : `${loadMsA}ms`} />
          </div>
          {showA ? (
            <Suspense fallback={<LazyFallback />}>
              <LazyA startedAt={startedAtA.current} onLoaded={setLoadMsA} />
            </Suspense>
          ) : (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border-subtle bg-bg-secondary/60 px-4 py-10 text-center text-sm text-zinc-400">
              Press Load A to mount the deferred module.
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/70 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-zinc-50">Deferred panel B</p>
              <p className="mt-1 text-xs text-zinc-400">800ms suspense delay</p>
            </div>
            <LoadStats label="Load time" value={loadMsB == null ? 'waiting' : `${loadMsB}ms`} />
          </div>
          {showB ? (
            <Suspense fallback={<LazyFallback />}>
              <LazyB startedAt={startedAtB.current} onLoaded={setLoadMsB} />
            </Suspense>
          ) : (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border-subtle bg-bg-secondary/60 px-4 py-10 text-center text-sm text-zinc-400">
              Press Load B to mount the deferred module.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
