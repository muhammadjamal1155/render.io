import { describe, expect, it, beforeEach } from 'vitest'
import {
  appendRenderEvent,
  clearRenderLog,
  deriveRenderStats,
  getRenderLogSnapshot,
} from './useRenderLog'

describe('render log store', () => {
  beforeEach(() => {
    clearRenderLog()
  })

  it('appends events and derives render stats', () => {
    appendRenderEvent({
      component: 'ChildA',
      side: 'left',
      timestamp: 1,
      renderCount: 1,
      kind: 'render',
    })
    appendRenderEvent({
      component: 'ChildA',
      side: 'right',
      timestamp: 2,
      renderCount: 1,
      kind: 'render',
    })
    appendRenderEvent({
      component: 'ChildA',
      side: 'right',
      timestamp: 3,
      renderCount: 1,
      kind: 'compute',
      computeMs: 12,
    })

    const stats = deriveRenderStats(getRenderLogSnapshot())

    expect(stats.totalRenders).toBe(2)
    expect(stats.leftRenders).toBe(1)
    expect(stats.rightRenders).toBe(1)
    expect(stats.computeEvents).toHaveLength(1)
  })

  it('clears the log', () => {
    appendRenderEvent({
      component: 'ChildB',
      side: 'left',
      timestamp: 1,
      renderCount: 1,
      kind: 'render',
    })
    clearRenderLog()

    expect(getRenderLogSnapshot()).toEqual([])
  })
})
