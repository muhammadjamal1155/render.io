import { useMemo, useSyncExternalStore } from 'react'

const MAX_EVENTS = 500
let renderLog = []
const listeners = new Set()
const COMPARISON_COMPONENTS = new Set(['UnoptimizedSide', 'OptimizedSide', 'ParentComponent', 'ChildA', 'ChildB', 'ChildC'])

function notify() {
  listeners.forEach((listener) => listener())
}

function randomId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function appendRenderEvent(event) {
  renderLog = [...renderLog, { ...event, id: event.id ?? randomId() }].slice(-MAX_EVENTS)
  notify()
}

export function clearRenderLog() {
  renderLog = []
  notify()
}

export function getRenderLogSnapshot() {
  return renderLog
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function deriveRenderStats(events) {
  const renderEvents = events.filter(
    (event) => event.kind !== 'compute' && COMPARISON_COMPONENTS.has(event.component),
  )
  const computeEvents = events.filter(
    (event) => event.kind === 'compute' && COMPARISON_COMPONENTS.has(event.component),
  )
  const perComponent = renderEvents.reduce((acc, event) => {
    const key = `${event.component}:${event.side}`
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})
  const bySide = renderEvents.reduce(
    (acc, event) => {
      if (event.side === 'left') {
        acc.left += 1
      } else if (event.side === 'right') {
        acc.right += 1
      }
      return acc
    },
    { left: 0, right: 0 },
  )

  return {
    renderEvents,
    computeEvents,
    perComponent,
    totalRenders: renderEvents.length,
    leftRenders: bySide.left,
    rightRenders: bySide.right,
    renderDelta: bySide.left - bySide.right,
    renderReduction: bySide.left > 0 ? Math.round(((bySide.left - bySide.right) / bySide.left) * 100) : 0,
  }
}

export function useRenderLog() {
  const renderLog = useSyncExternalStore(subscribe, getRenderLogSnapshot, getRenderLogSnapshot)

  return useMemo(() => {
    const stats = deriveRenderStats(renderLog)

    return {
      renderLog,
      ...stats,
      appendRenderEvent,
      clearRenderLog,
    }
  }, [renderLog])
}
