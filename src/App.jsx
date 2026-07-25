import React from 'react';
// The OB app is a single self-contained HTML file (its own CSS + JS inside).
// Importing it as a raw string and rendering it inside an iframe keeps it
// running exactly as-is, with no risk of React re-rendering interfering
// with its own DOM manipulation.
import obAppHtml from './ob-app.html?raw';

export default function App() {
  return (
    <iframe
      title="Operation Bulletin"
      srcDoc={obAppHtml}
      style={{ border: 'none', width: '100vw', height: '100vh', display: 'block' }}
    />
  );
}
