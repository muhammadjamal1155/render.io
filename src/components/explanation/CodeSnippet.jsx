import { useEffect, useRef } from 'react'
import Prism from 'prismjs'

export default function CodeSnippet({ code, dimmed = false, title }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    ref.current.textContent = code.trim()
    Prism.highlightElement(ref.current)
  }, [code])

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border-subtle bg-bg-tertiary transition-opacity duration-150 ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}
    >
      {title ? (
        <div className="border-b border-border-subtle px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
          {title}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 text-sm">
        <code ref={ref} className="language-jsx">
          {code.trim()}
        </code>
      </pre>
    </div>
  )
}
