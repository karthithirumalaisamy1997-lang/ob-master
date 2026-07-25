import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Note: StrictMode is intentionally NOT used here. The app's logic
// (src/ob-app.js) attaches DOM event listeners directly (not through React),
// and StrictMode's dev-only double-invoke of effects would risk attaching
// duplicate listeners. initObApp() also guards against double-init on its
// own, but keeping StrictMode off avoids relying on that guard alone.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
