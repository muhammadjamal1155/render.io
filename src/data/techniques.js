export const techniques = [
  {
    id: 'memo',
    title: 'React.memo',
    toggleKey: 'memoEnabled',
    component: 'ChildA',
    description:
      'Shallow prop comparison stops unnecessary child work when the parent re-renders for unrelated reasons.',
    principle: {
      off: `ChildA is a plain function component. React re-renders it on every parent update regardless of whether its props changed. This is React's default behavior, so expensive child work can repeat even when the visible output is the same.`,
      on: `ChildA is wrapped in React.memo. React performs a shallow comparison of props before rendering, so the child can skip work when the label prop stays stable. Watch the render counter stop climbing while the parent keeps updating.`,
    },
    unoptimizedCode: String.raw`
const ChildA = ({ label }) => {
  // Re-renders on every parent update
  return <div className="rounded-xl">{label}</div>
}
`,
    optimizedCode: String.raw`
const ChildA = React.memo(({ label }) => {
  // Only re-renders when label changes
  return <div className="rounded-xl">{label}</div>
})
`,
    useWhen: [
      'Component renders frequently with unchanged props',
      'Component has expensive render output',
      'Component is a pure function of its props',
    ],
    avoidWhen: [
      'Props change on nearly every render',
      'Component is trivially cheap to render',
    ],
  },
  {
    id: 'useMemo',
    title: 'useMemo',
    toggleKey: 'useMemoEnabled',
    component: 'ChildB',
    description:
      'Memoize expensive derived data so a render can reuse cached work instead of recalculating it every time.',
    principle: {
      off: `ChildB recalculates fibonacci(38) on every single render. This is synchronous CPU work, so even tiny parent updates can stall the UI while the recursive function runs again.`,
      on: `useMemo caches the fibonacci(38) result and only reruns the heavy calculation when the dependency changes. Typing still re-renders the tree, but the expensive work is skipped unless sliderValue changes.`,
    },
    unoptimizedCode: String.raw`
const ChildB = ({ itemsKey }) => {
  const result = fibonacci(38)
  return <div className="rounded-xl">{result}</div>
}
`,
    optimizedCode: String.raw`
const ChildB = ({ itemsKey }) => {
  const result = useMemo(() => fibonacci(38), [itemsKey])
  return <div className="rounded-xl">{result}</div>
}
`,
    useWhen: [
      'Expensive synchronous calculations',
      'Derived data from arrays or primitive keys',
      'Cached values passed into memoized children',
    ],
    avoidWhen: [
      'Simple calculations',
      'Values that change on every render anyway',
    ],
  },
  {
    id: 'useCallback',
    title: 'useCallback',
    toggleKey: 'useCallbackEnabled',
    component: 'ChildC',
    description:
      'Stabilize function identity so memoized children can skip renders when nothing meaningful changed.',
    principle: {
      off: `A new onAction function is created on every render of the parent. Because functions compare by reference, memoized children see a new prop and render again even if the actual behavior is unchanged.`,
      on: `useCallback returns the same function reference while its dependency stays stable. That lets the memoized child preserve identity and skip renders while unrelated parent state keeps changing.`,
    },
    unoptimizedCode: String.raw`
const Parent = () => {
  const onAction = () => {
    doSomething(sliderValue)
  }

  return <ChildC onAction={onAction} />
}
`,
    optimizedCode: String.raw`
const Parent = () => {
  const onAction = useCallback(() => {
    doSomething(sliderValue)
  }, [sliderValue])

  return <ChildC onAction={onAction} />
}
`,
    useWhen: [
      'Callbacks passed to memoized children',
      'Handlers used as useEffect dependencies',
      'Event handlers in frequently-rendering parents',
    ],
    avoidWhen: [
      'Callbacks that never leave the component',
      'Parents that rarely re-render',
    ],
  },
  {
    id: 'lazy',
    title: 'React.lazy + Suspense',
    toggleKey: null,
    component: 'LazySection',
    description:
      'Split heavy code into deferred chunks and reveal a loading fallback while the bundle is being fetched.',
    principle: {
      off: `Without lazy loading, heavy components are bundled up front and can slow initial load. The app has to pay for code before the user even needs it.`,
      on: `React.lazy defers the module fetch until the component is requested, and Suspense displays a fallback while the bundle is loading. That keeps the initial payload lighter and makes the loading boundary explicit.`,
    },
    unoptimizedCode: String.raw`
import HeavyComponentA from './HeavyComponentA'
import HeavyComponentB from './HeavyComponentB'
`,
    optimizedCode: String.raw`
const HeavyComponentA = React.lazy(() =>
  new Promise((resolve) =>
    setTimeout(() => resolve(import('./HeavyComponentA')), 1200),
  ),
)

const HeavyComponentB = React.lazy(() =>
  new Promise((resolve) =>
    setTimeout(() => resolve(import('./HeavyComponentB')), 800),
  ),
)
`,
    useWhen: [
      'Large route-level or panel-level chunks',
      'Features hidden behind user interaction',
      'Components that are not needed on first paint',
    ],
    avoidWhen: [
      'Tiny modules already needed immediately',
      'Critical above-the-fold interactions',
    ],
  },
]

export const techniquesById = Object.fromEntries(techniques.map((technique) => [technique.id, technique]))

// Safe getter for technique enabled state — handles toggleKey: null for lazy section
export function getTechniqueEnabled(technique, state) {
  if (!technique.toggleKey) return true   // lazy is always "enabled"
  return Boolean(state[technique.toggleKey])
}
