# Operation Bulletin — Cost Sheet Builder (React + Vite)

This is the React/Vite version of the Operation Bulletin app, structured to
match a standard Vite React project (App.jsx, main.jsx, index.html,
package.json, vite.config.js) so it can be developed/deployed the same way
as your other apps (e.g. via Vercel).

## How it's put together

The original app was a single self-contained HTML file (markup + CSS +
vanilla JS, no React state/components). Rather than risk breaking its
working logic by rewriting thousands of lines into React hooks/components,
it's been split into standard Vite/React file locations while keeping the
original logic intact and untouched in behavior:

- `src/App.jsx` — mounts the app's markup into the page and starts the
  existing JS logic once, on mount.
- `src/markup.html` — the original UI markup (all the tabs/panels/modals),
  imported as raw HTML and injected into the page.
- `src/App.css` — all of the original CSS (colors, layout, components).
- `src/ob-app.js` — all of the original application logic (master data
  seed, save/load, Excel export, PDF export, users/login, etc.) wrapped in
  an `initObApp()` function that App.jsx calls once after the markup is on
  the page.
- `src/main.jsx` — standard Vite/React entry point, renders `<App />`.

Functionally this behaves exactly like the single-file version — same
screens, same buttons, same save behavior (falls back to the browser's
`localStorage` automatically if a `window.storage` API isn't already
provided by the hosting environment).

## Running it locally

```
npm install
npm run dev
```

## Building for production / deploying (e.g. Vercel)

```
npm install
npm run build
```

This outputs a static `dist/` folder — deploy it the same way you deploy
your other Vite apps (Vercel will auto-detect the Vite framework if you
just point it at this folder).

## Data storage — now Firebase (Firestore)

Saved data (Master Data, Users, Saved OBs) is now stored in your "OB MASTER"
Firebase project's Firestore database (see `src/firebase.js`), instead of
the browser's own `localStorage`. This means everyone who opens the app —
any device, any browser — reads and writes the same data.

Two things to check in the Firebase console before this works:

1. **Firestore must be enabled.** Firebase console → your project → Build →
   Firestore Database → Create database (if you haven't already).
2. **Firestore security rules must allow read/write.** By default a new
   Firestore database is either fully locked or open only for 30 days
   ("test mode"). For a quick internal tool like this (not open to the
   public internet), open rules are the simplest option:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

   This is fine for an internal team tool but means anyone with your
   Firebase config (which is not secret, but still) could read/write this
   data. If you want it locked down to your team only, add Firebase
   Authentication and update these rules to require `request.auth != null`
   — ask if you want help wiring that in.

If saves silently stop working, check the browser console for Firestore
permission errors first — that almost always means the rules above.
