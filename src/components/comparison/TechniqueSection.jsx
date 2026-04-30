import { usePlayground } from '../../context/PlaygroundContext'
import { useRenderTracker } from '../../hooks/useRenderTracker'
import { techniquesById } from '../../data/techniques'
import SectionHeader from '../ui/SectionHeader'
import ComparisonLayout from './ComparisonLayout'
import UnoptimizedSide from './UnoptimizedSide'
import OptimizedSide from './OptimizedSide'
import ParentComponent from './ParentComponent'
import RenderCountBadge from '../ui/RenderCountBadge'

export default function TechniqueSection({ techniqueId }) {
  const { state } = usePlayground()
  const technique = techniquesById[techniqueId]
  const renderCount = useRenderTracker(`TechniqueSection:${techniqueId}`, 'right', state.resetVersion)

  if (!technique) {
    return null
  }

  return (
    <section id={`${techniqueId}-section`} className="panel-shell p-5">
      <SectionHeader
        eyebrow={`demo ${techniqueId}`}
        title={technique.title}
        description={technique.description}
        action={<RenderCountBadge count={renderCount} />}
      />

      <ComparisonLayout
        title={`Left: unoptimized, right: optimized`}
        subtitle="The controls above keep both sides in sync. The optimized side only changes behavior when the relevant toggle is enabled."
      >
        <UnoptimizedSide
          title="Unoptimized"
          note="Always renders the straightforward version."
          resetVersion={state.resetVersion}
        >
          <ParentComponent techniqueId={techniqueId} side="left" />
        </UnoptimizedSide>
        <OptimizedSide
          title="Optimized"
          note={
            state[technique.toggleKey] === true
              ? 'Optimization is active.'
              : 'Optimization toggle is off.'
          }
          resetVersion={state.resetVersion}
        >
          <ParentComponent techniqueId={techniqueId} side="right" />
        </OptimizedSide>
      </ComparisonLayout>
    </section>
  )
}
