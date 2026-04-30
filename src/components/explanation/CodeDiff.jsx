import CodeSnippet from './CodeSnippet'

export default function CodeDiff({ unoptimizedCode, optimizedCode, optimizedEnabled }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <CodeSnippet code={unoptimizedCode} title="Unoptimized" />
      <CodeSnippet code={optimizedCode} title="Optimized" dimmed={!optimizedEnabled} />
    </div>
  )
}
