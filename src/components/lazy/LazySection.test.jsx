import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PlaygroundProvider } from '../../context/PlaygroundContext'
import LazySection from './LazySection'
import { clearRenderLog } from '../../hooks/useRenderLog'

describe('LazySection', () => {
  it('mounts a lazy card, shows fallback, then resolves content', async () => {
    clearRenderLog()

    render(
      <PlaygroundProvider>
        <LazySection delayA={1} delayB={1} />
      </PlaygroundProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: /^load a$/i }))
    expect(screen.getByText(/loading deferred module/i)).toBeInTheDocument()

    expect(await screen.findByText(/heavycomponenta/i)).toBeInTheDocument()
  })
})
