import CodeDiff from './CodeDiff'
import PrincipleDescription from './PrincipleDescription'
import StatusIndicator from './StatusIndicator'

function StatBlock({ label, value, tone = 'text-zinc-50' }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-tertiary px-4 py-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{label}</p>
      <p className={`mt-2 text-lg font-semibold ${tone}`}>{value}</p>
    </div>
  )
}

function GuidanceList({ title, items, tone = 'text-zinc-200' }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-tertiary p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
        {items.map((item) => (
          <li key={item} className={`flex gap-2 ${tone}`}>
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TechniqueCard({ technique, enabled, stats }) {
  if (technique.id === 'lazy') {
    return (
      <div className="space-y-5 rounded-2xl border border-border-subtle bg-bg-secondary p-5">
        <StatusIndicator technique={technique} />

        <PrincipleDescription technique={technique} />

        <CodeDiff technique={technique} />

        <div className="grid gap-3 md:grid-cols-3">
          <StatBlock label="Fallback" value={`${stats.fallbackCount ?? 0} renders`} />
          <StatBlock label="Lazy mounts" value={`${stats.lazyMountCount ?? 0}`} />
          <StatBlock label="Section" value={`${stats.sectionCount ?? 0} renders`} tone="text-accent-green" />
        </div>

        <div className="rounded-2xl border border-border-subtle bg-bg-tertiary p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Impact summary
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Suspense keeps the fallback visible while the deferred module is loading, and the
            deferred panels stay out of the initial bundle path.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <GuidanceList title="Use when" items={technique.useWhen} />
          <GuidanceList title="Avoid when" items={technique.avoidWhen} tone="text-zinc-400" />
        </div>
      </div>
    )
  }

  const renderSummary =
    technique.id === 'useMemo'
      ? `${stats.computeEventsLeft ?? 0} heavy recalculations on the left vs ${stats.computeEventsRight ?? 0} on the right`
      : `${stats.leftCount ?? 0} renders on the left vs ${stats.rightCount ?? 0} on the right`

  const saved =
    technique.id === 'useMemo'
      ? Math.max(0, (stats.computeEventsLeft ?? 0) - (stats.computeEventsRight ?? 0))
      : Math.max(0, (stats.leftCount ?? 0) - (stats.rightCount ?? 0))

  const reduction =
    technique.id === 'useMemo'
      ? stats.computeEventsLeft > 0
        ? Math.round((saved / stats.computeEventsLeft) * 100)
        : 0
      : stats.leftCount > 0
        ? Math.round((saved / stats.leftCount) * 100)
        : 0

  return (
    <div className="space-y-5 rounded-2xl border border-border-subtle bg-bg-secondary p-5">
      <StatusIndicator technique={technique} />

      <PrincipleDescription technique={technique} />

      <CodeDiff technique={technique} />

      <div className="grid gap-3 md:grid-cols-3">
        <StatBlock
          label={technique.id === 'useMemo' ? 'Workload' : 'Before'}
          value={
            technique.id === 'useMemo'
              ? `${stats.computeEventsLeft ?? 0}x`
              : `${stats.leftCount ?? 0} renders`
          }
        />
        <StatBlock
          label={technique.id === 'useMemo' ? 'Cached work' : 'After'}
          value={
            technique.id === 'useMemo'
              ? `${stats.computeEventsRight ?? 0}x`
              : `${stats.rightCount ?? 0} renders`
          }
        />
        <StatBlock
          label="Saved"
          value={
            technique.id === 'useMemo'
              ? `${saved} calculations`
              : `${saved} renders`
          }
          tone="text-accent-green"
        />
      </div>

      <div className="rounded-2xl border border-border-subtle bg-bg-tertiary p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          Impact summary
        </p>
        <p className="mt-2 text-sm text-zinc-300">
          {renderSummary}. {reduction}% reduction relative to the unoptimized side.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <GuidanceList title="Use when" items={technique.useWhen} />
        <GuidanceList title="Avoid when" items={technique.avoidWhen} tone="text-zinc-400" />
      </div>
    </div>
  )
}
