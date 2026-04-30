import { usePlayground } from '../../context/PlaygroundContext'
import { techniquesById } from '../../data/techniques'
import TechniqueCard from './TechniqueCard'
import SectionHeader from '../ui/SectionHeader'

function getTechniqueStats(renderLog, technique) {
  if (technique.id === 'lazy') {
    const fallbackRenders = renderLog.filter(
      (event) => event.kind !== 'compute' && event.component === 'LazyFallback',
    )
    const lazyMounts = renderLog.filter(
      (event) =>
        event.kind !== 'compute' &&
        (event.component === 'HeavyComponentA' || event.component === 'HeavyComponentB'),
    )
    const sectionRenders = renderLog.filter(
      (event) => event.kind !== 'compute' && event.component === 'LazySection',
    )

    return {
      fallbackCount: fallbackRenders.length,
      lazyMountCount: lazyMounts.length,
      sectionCount: sectionRenders.length,
    }
  }

  const renderEvents = renderLog.filter(
    (event) => event.kind !== 'compute' && event.component === technique.component,
  )
  const computeEvents = renderLog.filter(
    (event) => event.kind === 'compute' && event.component === technique.component,
  )

  const leftEvents = renderEvents.filter((event) => event.side === 'left')
  const rightEvents = renderEvents.filter((event) => event.side === 'right')
  const leftComputeEvents = computeEvents.filter((event) => event.side === 'left')
  const rightComputeEvents = computeEvents.filter((event) => event.side === 'right')

  return {
    leftCount: leftEvents.length,
    rightCount: rightEvents.length,
    computeEventsLeft: leftComputeEvents.length,
    computeEventsRight: rightComputeEvents.length,
  }
}

export default function ExplanationPanel({ renderLog }) {
  const { state } = usePlayground()
  const technique = techniquesById[state.activePanel] ?? techniquesById.memo
  const enabled = technique.toggleKey ? Boolean(state[technique.toggleKey]) : true
  const stats = getTechniqueStats(renderLog, technique)

  return (
    <section className="panel-shell shrink-0 p-5">
      <SectionHeader
        eyebrow="explanation rail"
        title={`${technique.title} in context`}
        description="This panel updates as toggles change, showing the live principle, code diff, and impact summary."
      />

      <div className="mt-5">
        <TechniqueCard technique={technique} enabled={enabled} stats={stats} />
      </div>
    </section>
  )
}
