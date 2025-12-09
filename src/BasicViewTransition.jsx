// BasicViewTransition.js
// NOTE:
// React's experimental `ViewTransition` component is currently only available
// in the Canary/Experimental builds. In this sample we provide a tiny local
// shim so the code compiles and the structure matches your lesson.
// If you later switch to React Canary, you can:
//   1) remove the local ViewTransition below, and
//   2) import { ViewTransition } from 'react';
import React, { useState, startTransition } from 'react'

// Simple shim: just renders children. No real animation logic here.
function ViewTransition({ children }) {
  return <>{children}</>
}

export default function BasicViewTransition() {
  const [visible, setVisible] = useState(false)

  function toggle() {
    // We wrap the visibility toggle in startTransition so React can
    // treat it as a low-priority state update, like in the docs.
    startTransition(() => {
      setVisible(prev => !prev)
    })
  }

  return (
    <div className="basic-view-transition">
      <button onClick={toggle}>
        {visible ? 'Hide panel' : 'Show panel'}
      </button>

      {visible ? (
        <ViewTransition>
          <div className="panel">
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