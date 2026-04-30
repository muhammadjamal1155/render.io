import { usePlayground } from '../../context/PlaygroundContext'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import RenderCountBadge from '../ui/RenderCountBadge'
import SectionHeader from '../ui/SectionHeader'
import ToggleSwitch from '../ui/ToggleSwitch'

export default function OptimizationToggles() {
  const {
    state,
    setMemoEnabled,
    setUseMemoEnabled,
    setUseCallbackEnabled,
  } = usePlayground()
  const renderCount = useRenderTracker('OptimizationToggles', 'right', state.resetVersion)

  return (
    <section className="panel-shell p-5">
      <SectionHeader
        eyebrow="Optimization toggles"
        title="Flip techniques on and off"
        description="Each toggle changes the optimized side immediately without remounting the entire playground."
        action={<RenderCountBadge count={renderCount} />}
      />

      <div className="mt-5 grid gap-3 xl:grid-cols-3">
        <ToggleSwitch
          checked={state.memoEnabled}
          onChange={setMemoEnabled}
          label="React.memo"
          description="Skip re-renders when props are shallow-equal."
        />
        <ToggleSwitch
          checked={state.useMemoEnabled}
          onChange={setUseMemoEnabled}
          label="useMemo"
          description="Cache the fibonacci calculation on the optimized side."
        />
        <ToggleSwitch
          checked={state.useCallbackEnabled}
          onChange={setUseCallbackEnabled}
          label="useCallback"
          description="Stabilize callback identity for memoized children."
        />
      </div>
    </section>
  )
}
