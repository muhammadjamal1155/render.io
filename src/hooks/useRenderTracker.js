import { useEffect, useRef } from 'react'
import { usePlayground } from '../context/PlaygroundContext'
import { appendRenderEvent } from './useRenderLog'

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useRenderTracker(componentName, side = 'right') {
  const { resetVersion } = usePlayground()
  const renderCountRef = useRef(0)
  const lastResetRef = useRef(resetVersion)
  const skipNextLogRef = useRef(false)

  if (lastResetRef.current !== resetVersion) {
    lastResetRef.current = resetVersion
    renderCountRef.current = 0
    skipNextLogRef.current = true
  }

  renderCountRef.current += 1
  const renderCount = renderCountRef.current

  useEffect(() => {
    if (skipNextLogRef.current) {
      skipNextLogRef.current = false
      return
    }

    appendRenderEvent({
      id: createId(),
      component: componentName,
      side,
      timestamp: Date.now(),
      renderCount,
      kind: 'render',
    })

    if (typeof console !== 'undefined' && typeof console.count === 'function') {
      console.count(`[${componentName}] rendered`)
    }
  })

  return renderCount
}
