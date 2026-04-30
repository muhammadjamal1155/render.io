import { describe, expect, it } from 'vitest'
import { techniques, techniquesById } from './techniques'

describe('technique metadata', () => {
  it('contains the three optimization techniques and lazy loading', () => {
    expect(techniques).toHaveLength(4)
    expect(techniquesById.memo.title).toBe('React.memo')
    expect(techniquesById.useMemo.optimizedCode).toContain('useMemo')
    expect(techniquesById.useCallback.unoptimizedCode).toContain('onAction')
    expect(techniquesById.lazy.optimizedCode).toContain('React.lazy')
  })
})
