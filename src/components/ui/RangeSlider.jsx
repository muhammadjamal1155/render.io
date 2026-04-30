export default function RangeSlider({ value, onChange, min = 0, max = 100, label }) {
  return (
    <label className="grid gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/80 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-zinc-50">{label}</span>
        <span className="font-mono text-xs text-cyan-300">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-400"
      />
    </label>
  )
}
