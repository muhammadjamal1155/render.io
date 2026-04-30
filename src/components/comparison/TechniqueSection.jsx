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
  const { state, setActivePanel } = usePlayground()
  const technique = techniquesById[techniqueId]
  const renderCount = useRenderTracker(`TechniqueSection:${techniqueId}`)

  if (!technique) {
    return null
  }

  return (
    <section id={`${techniqueId}-section`} className="panel-shell p-5">
      <SectionHeader
        eyebrow={`demo ${techniqueId}`}
        title={technique.title}
        description={technique.description}
        action={
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActivePanel(techniqueId)}
              className="rounded-full border border-border-bright bg-bg-secondary px-4 py-2 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-accent-cyan/50 hover:text-cyan-200"
            >
              Open explanation
            </button>
            <RenderCountBadge count={renderCount} />
          </div>
        }
      />

      <ComparisonLayout
        title={`Left: unoptimized, right: optimized`}
        subtitle="The controls above keep both sides in sync. The optimized side only changes behavior when the relevant toggle is enabled."
      >
        <UnoptimizedSide
          title="Unoptimized"
          note="Always renders the straightforward version."
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
        >
          <ParentComponent techniqueId={techniqueId} side="right" />
        </OptimizedSide>
      </ComparisonLayout>
    </section>
  )
}
