export default function ComparisonLayout({ children, title, subtitle }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
        <p className="max-w-4xl text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div className="grid items-stretch gap-4 xl:grid-cols-2">{children}</div>
    </section>
  )
}
