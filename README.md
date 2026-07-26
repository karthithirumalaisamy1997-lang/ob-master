# Operation Bulletin

The whole app lives in `index.html` (self-contained HTML/CSS/JS, no framework).
`src/main.js` exists only for folder-structure consistency — it isn't used.

## Local dev
```bash
npm install
npm run dev
```

## Deploy on GitHub Pages
1. Push this repo to GitHub.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch**, Branch: **main**, folder **/(root)**.
3. Live link: `https://<your-username>.github.io/operation-bulletin/`

(No `npm run build` needed for GitHub Pages, since `index.html` needs no bundling —
but `npm run build` still works if you ever add real imports to `src/main.js`.)
