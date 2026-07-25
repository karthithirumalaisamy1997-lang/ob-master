# sgps-deploy

Vite + React project wrapping the Operation Bulletin app.

## Structure
```
index.html          Vite entry
src/main.jsx         React entry, renders <App/>
src/App.jsx           Loads src/ob-app.html and shows it full-screen in an iframe
src/ob-app.html        The full OB app — all HTML/CSS/JS in one file
src/storage.js         Not used (OB app handles its own storage) — kept for folder layout only
```

## Run locally
```
npm install
npm run dev
```

## Deploy to Vercel
```
npm install -g vercel
vercel login
vercel --prod
```
Vercel auto-detects Vite (`npm run build` → outputs to `dist/`) and gives you a live URL like
`https://your-project.vercel.app`.

## Data storage note
The OB app saves data using the browser's localStorage when deployed as a website (not Claude.ai).
That means saved OBs are per-browser/per-device, not shared across everyone automatically. If you
need everyone to see the same saved data from any device, you'll need a real backend/database —
ask and this can be added.
