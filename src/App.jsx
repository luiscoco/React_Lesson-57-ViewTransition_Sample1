import React from 'react'
import BasicViewTransition from './BasicViewTransition.jsx'

export default function App() {
  return (
    <div className="app">
      <h1>1. ViewTransition - basic usage</h1>
      <p>
        Simple example: toggling a card in and out, animated via a
        <code> ViewTransition </code>
        inside a <code>startTransition</code>.
      </p>
      <BasicViewTransition />
    </div>
  )
}
