export default function ToggleSwitch({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3 text-left transition-colors duration-150 hover:border-border-bright hover:bg-bg-tertiary"
    >
      <span className="space-y-1">
        <span className="block text-sm font-semibold text-zinc-50">{label}</span>
        {description ? <span className="block text-xs text-zinc-400">{description}</span> : null}
      </span>
      <span
        className={`relative h-7 w-12 rounded-full border transition-colors duration-150 ${
          checked
            ? 'border-accent-cyan/40 bg-accent-cyan/20'
            : 'border-border-bright bg-white/5'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full shadow-md transition-transform duration-150 ${
            checked ? 'translate-x-6 bg-accent-cyan' : 'translate-x-1 bg-zinc-500'
          }`}
        />
      </span>
    </button>
  )
}
