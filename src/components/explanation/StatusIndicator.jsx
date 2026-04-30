export default function StatusIndicator({ title, enabled }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          enabled ? 'bg-accent-green shadow-[0_0_0_4px_rgba(0,200,83,0.12)]' : 'bg-zinc-500'
        }`}
      />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">{title}</p>
        <p className={`text-sm font-semibold ${enabled ? 'text-emerald-200' : 'text-zinc-300'}`}>
          {enabled ? 'ACTIVE' : 'INACTIVE'}
        </p>
      </div>
    </div>
  )
}
