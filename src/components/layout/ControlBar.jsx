import { usePlayground } from '../../context/PlaygroundContext'
import { useState } from 'react'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import RangeSlider from '../ui/RangeSlider'
import RenderCountBadge from '../ui/RenderCountBadge'
import SectionHeader from '../ui/SectionHeader'

export default function ControlBar() {
  const {
    state,
    setControlValue,
    setSliderValue,
    forceRender,
    resetPlayground,
    setActivePanel,
  } = usePlayground()
  const [lastAction, setLastAction] = useState('Type or move the slider to begin.')
  const renderCount = useRenderTracker('ControlBar')

  return (
    <section className="panel-shell p-5">
      <SectionHeader
        eyebrow="Interaction controls"
        title="Primary re-render triggers"
        description="Typing and slider changes intentionally churn the tree so you can see how memoization changes the outcome."
        action={<RenderCountBadge count={renderCount} />}
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <label className="grid gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-zinc-50">Text input</span>
            <span className="font-mono text-xs text-zinc-400">
              controlValue {state.controlValue.length ? `(${state.controlValue.length})` : '(empty)'}
            </span>
          </div>
          <input
            value={state.controlValue}
            onChange={(event) => {
              setControlValue(event.target.value)
              setLastAction(`Typed ${event.target.value.length} characters`)
            }}
            placeholder="Type here to trigger a parent re-render..."
            className="w-full rounded-xl border border-border-subtle bg-bg-secondary px-4 py-3 font-mono text-sm text-zinc-100 outline-none transition-colors duration-150 placeholder:text-zinc-600 focus:border-accent-cyan/50"
          />
        </label>

        <RangeSlider
          label="Slider value"
          value={state.sliderValue}
          onChange={(value) => {
            setSliderValue(value)
            setLastAction(`Slider set to ${value}`)
          }}
          min={0}
          max={100}
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
            Live behavior
          </p>
          <p className="mt-2 text-sm font-semibold text-zinc-50">Typing updates the comparison tree</p>
          <p className="mt-2 text-sm text-zinc-400">
            You should see the counters below and the render timeline change immediately.
          </p>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Live feedback
          </p>
          <p className="mt-2 text-lg font-semibold text-accent-cyan">{lastAction}</p>
          <p className="mt-1 text-sm text-zinc-400">
            The comparison cards below will update as you interact.
          </p>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Current values
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Input: <span className="font-mono text-cyan-200">{state.controlValue || '(empty)'}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-300">
            Slider: <span className="font-mono text-cyan-200">{state.sliderValue}</span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={forceRender}
          className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-cyan/50 hover:text-cyan-200"
        >
          Force Re-render
        </button>
        <button
          type="button"
          onClick={resetPlayground}
          className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-amber/50 hover:text-amber-200"
        >
          Reset Playground
        </button>
        <button
          type="button"
          onClick={() => setActivePanel('memo')}
          className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-green/50 hover:text-emerald-200"
        >
          Focus memo panel
        </button>
      </div>
    </section>
  )
}
