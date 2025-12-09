// BasicViewTransition.js

import React, { ViewTransition, useEffect, useState, startTransition } from 'react'

export default function BasicViewTransition() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState('idle') // idle | visible | exiting
  const EXIT_DURATION = 5200 // keep in sync with CSS transition timing

  // Keep the panel in the DOM long enough to animate out when hiding.
  useEffect(() => {
    if (visible) {
      setMounted(true)
      // Defer so the hidden styles apply before we promote to visible.
      const id = requestAnimationFrame(() => setPhase('visible'))
      return () => cancelAnimationFrame(id)
    }

    if (mounted) {
      setPhase('exiting')
      const timeout = setTimeout(() => {
        setMounted(false)
        setPhase('idle')
      }, EXIT_DURATION)
      return () => clearTimeout(timeout)
    }
  }, [visible, mounted])

  function toggle() {
    const updateVisibility = () => setVisible(prev => !prev)

    // If the browser supports View Transitions (Chrome 126+), trigger one
    // around the state flip. Fallback keeps the React transition only.
    if (typeof document !== 'undefined' && document.startViewTransition) {
      document.startViewTransition(() => {
        startTransition(updateVisibility)
      })
    } else {
      startTransition(updateVisibility)
    }
  }

  return (
    <div className="basic-view-transition">
      <button onClick={toggle}>
        {visible ? 'Hide panel' : 'Show panel'}
      </button>

      {mounted ? (
        <ViewTransition>
          <div
            className={[
              'panel',
              phase === 'visible' && 'is-visible',
              phase === 'exiting' && 'is-exiting',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <h2>Animated Panel</h2>
            <p>
              This panel appears and disappears with a smooth CSS transition.
            </p>
          </div>
        </ViewTransition>
      ) : null}
    </div>
  )
}
