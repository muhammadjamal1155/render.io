import CodeSnippet from './CodeSnippet'
import { usePlayground } from '../../context/PlaygroundContext'
import { getTechniqueEnabled } from '../../data/techniques'

export default function CodeDiff({ technique }) {
  const { state } = usePlayground()
  const isEnabled = getTechniqueEnabled(technique, state)

  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="mb-1.5 font-mono text-xs text-red-400">❌ Unoptimized</p>
        <CodeSnippet code={technique.unoptimizedCode} dimmed={false} />
      </div>
      <div>
        <p className="mb-1.5 font-mono text-xs text-emerald-400">✅ Optimized</p>
        <CodeSnippet code={technique.optimizedCode} dimmed={!isEnabled} />
      </div>
    </div>
  )
}
