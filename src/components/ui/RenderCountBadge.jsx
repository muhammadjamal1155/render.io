export default function RenderCountBadge({ count }) {
  const tone =
    count <= 3
      ? 'border-accent-green/30 bg-accent-green/10 text-accent-green'
      : count <= 10
        ? 'border-accent-amber/30 bg-accent-amber/10 text-accent-amber'
        : 'border-accent-red/30 bg-accent-red/10 text-accent-red'

  return (
    <span
      className={`inline-flex min-w-[3.5rem] items-center justify-center rounded-full border px-2.5 py-1 font-mono text-xs font-semibold tracking-wide shadow-sm ${tone}`}
      aria-label={`render count ${count}`}
    >
      <span key={count} className="animate-render-flash">
        {count}
      </span>
    </span>
  )
}
