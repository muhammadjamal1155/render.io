export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border-subtle/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        {eyebrow ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-xl font-semibold text-zinc-50">{title}</h2>
        {description ? <p className="max-w-3xl text-sm text-zinc-400">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
