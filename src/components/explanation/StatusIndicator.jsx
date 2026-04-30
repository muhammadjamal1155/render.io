import { usePlayground } from '../../context/PlaygroundContext'
import { getTechniqueEnabled } from '../../data/techniques'

export default function StatusIndicator({ technique }) {
  const { state } = usePlayground()
  const isEnabled = getTechniqueEnabled(technique, state)
  const showToggle = technique.toggleKey !== null

  return (
    <div className="flex items-center gap-2">
      <span
        className={[
          'h-2 w-2 rounded-full',
          isEnabled ? 'bg-emerald-400 shadow-[0_0_6px_#00c853]' : 'bg-zinc-600',
        ].join(' ')}
      />
      <span className={[
        'font-mono text-xs font-semibold tracking-widest uppercase',
        isEnabled ? 'text-emerald-400' : 'text-zinc-500',
      ].join(' ')}>
        {!showToggle ? 'DEMO' : isEnabled ? 'ACTIVE' : 'INACTIVE'}
      </span>
    </div>
  )
}
