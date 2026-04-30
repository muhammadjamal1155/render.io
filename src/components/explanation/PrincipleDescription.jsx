import { usePlayground } from '../../context/PlaygroundContext'
import { getTechniqueEnabled } from '../../data/techniques'

export default function PrincipleDescription({ technique }) {
  const { state } = usePlayground()
  const isEnabled = getTechniqueEnabled(technique, state)
  const text = isEnabled ? technique.principle.on : technique.principle.off

  return (
    <div className="rounded-xl border border-border-subtle bg-bg-tertiary p-4">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan-300/70">
        Live Principle
      </p>
      <p key={String(isEnabled)} className="text-sm leading-relaxed text-zinc-300">
        {text}
      </p>
    </div>
  )
}
