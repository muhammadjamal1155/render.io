import { describe, expect, it } from 'vitest'
import { initialState, playgroundReducer } from './PlaygroundContext'

describe('playgroundReducer', () => {
  it('toggles techniques and updates controls', () => {
    const memoEnabled = playgroundReducer(initialState, {
      type: 'SET_MEMO_ENABLED',
      payload: true,
    })
    const sliderValue = playgroundReducer(memoEnabled, {
      type: 'SET_SLIDER_VALUE',
      payload: 72,
    })

    expect(sliderValue.memoEnabled).toBe(true)
    expect(sliderValue.sliderValue).toBe(72)
  })

  it('increments force and reset versions', () => {
    const forced = playgroundReducer(initialState, { type: 'FORCE_RENDER' })
    const reset = playgroundReducer(forced, { type: 'RESET_RENDER_COUNTS' })

    expect(forced.forceTick).toBe(1)
    expect(reset.resetVersion).toBe(1)
  })

  it('resets playground state without touching reset version', () => {
    const changed = playgroundReducer(
      {
        ...initialState,
        memoEnabled: true,
        controlValue: 'abc',
        resetVersion: 3,
      },
      { type: 'RESET_PLAYGROUND' },
    )

    expect(changed.memoEnabled).toBe(false)
    expect(changed.controlValue).toBe('')
    expect(changed.resetVersion).toBe(3)
  })
})
