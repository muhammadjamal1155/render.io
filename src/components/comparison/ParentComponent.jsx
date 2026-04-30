import { useCallback } from 'react'
import { usePlayground } from '../../context/PlaygroundContext'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import ChildA from './ChildA'
import ChildB from './ChildB'
import ChildC from './ChildC'
import RenderCountBadge from '../ui/RenderCountBadge'

export default function ParentComponent({ techniqueId, side }) {
  const {
    state: { controlValue, sliderValue, memoEnabled, useMemoEnabled, useCallbackEnabled, resetVersion },
  } = usePlayground()
  const renderCount = useRenderTracker('ParentComponent', side, resetVersion)

  const label = `Slider value ${sliderValue}`
  const itemsKey = sliderValue
  const shouldMemoize = side === 'right'

  const handleAction = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.__lastPing = `${techniqueId}:${side}:${sliderValue}`
    }
  }, [side, sliderValue, techniqueId])

  const inlineAction = () => {
    if (typeof window !== 'undefined') {
      window.__lastPing = `${techniqueId}:${side}:${sliderValue}`
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-zinc-50">ParentComponent</p>
          <p className="mt-1 text-xs text-zinc-400">
            controlValue updates churn this tree; sliderValue stays the stable prop key.
          </p>
        </div>
        <RenderCountBadge count={renderCount} />
      </div>

      <div className="rounded-2xl border border-border-subtle bg-bg-tertiary/70 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">
          Parent snapshot
        </p>
        <p className="mt-2 text-sm text-zinc-200">
          controlValue: <span className="font-mono text-cyan-200">{controlValue || '(empty)'}</span>
        </p>
      </div>

      {techniqueId === 'memo' ? (
        <ChildA
          label={label}
          side={side}
          memoEnabled={shouldMemoize && memoEnabled}
          resetVersion={resetVersion}
        />
      ) : null}

      {techniqueId === 'useMemo' ? (
        <ChildB
          itemsKey={itemsKey}
          side={side}
          useMemoEnabled={shouldMemoize && useMemoEnabled}
          resetVersion={resetVersion}
        />
      ) : null}

      {techniqueId === 'useCallback' ? (
        <ChildC
          onAction={shouldMemoize && useCallbackEnabled ? handleAction : inlineAction}
          side={side}
          label={`Dependency value ${sliderValue}`}
          resetVersion={resetVersion}
        />
      ) : null}
    </div>
  )
}
