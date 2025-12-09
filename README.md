# Basic ViewTransition React App

This is a minimal Vite + React application that demonstrates the
**"1. ViewTransition - basic usage"** example you shared:
toggling a panel in and out, using `startTransition` and a `ViewTransition`
wrapper around the animated content.

## What this app shows

- `startTransition` wraps the state update so React treats it as low priority.
- A tiny `ViewTransition` shim wraps the animated panel; in React 19 this can be replaced with the built-in component when you opt into the experimental channel.
- Conditional rendering flips a simple info panel in and out with CSS transitions.

Key snippet from `src/BasicViewTransition.jsx`:

```jsx
import React, { useState, startTransition } from 'react'

function ViewTransition({ children }) {
  return <>{children}</>
}

export default function BasicViewTransition() {
  const [visible, setVisible] = useState(false)

  function toggle() {
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
```

## How to run

```bash
npm install
npm run dev
```

Then open the URL that Vite prints in the terminal (usually http://localhost:5173).

## About `ViewTransition`

In the screenshot from your lesson, `ViewTransition` is imported like this:

```js
import { ViewTransition, startTransition, useState } from 'react';
```

That API currently exists only in **React Canary / Experimental** builds.

To keep this sample compatible with stable React 18, this project provides a
very small local `ViewTransition` shim in `src/BasicViewTransition.js` that
simply renders `children` and lets CSS handle the visual animation.

If you later move to React Canary, you can:

1. Remove the local `ViewTransition` function.
2. Change the import to:

   ```js
   import { ViewTransition, startTransition, useState } from 'react';
   ```

The rest of the component (JSX structure, `startTransition` usage, etc.)
already matches the example from your materials.
