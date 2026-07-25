import { useEffect, useRef } from 'react'
import './App.css'
import './firebase.js' // sets window.storage to a Firestore-backed store, must load before initObApp()
import markup from './markup.html?raw'
import { initObApp } from './ob-app.js'

export default function App() {
  const mounted = useRef(false)

  useEffect(() => {
    // Guard so the original app's setup (event listeners, initial render,
    // login gate, etc.) only runs once, even if this effect were ever
    // invoked more than once.
    if (mounted.current) return
    mounted.current = true
    initObApp()
  }, [])

  // The original app's markup (all tabs, panels, and modals) is injected
  // as-is — see src/markup.html and the note in src/ob-app.js for why this
  // isn't rewritten as JSX/components.
  return <div dangerouslySetInnerHTML={{ __html: markup }} />
}
