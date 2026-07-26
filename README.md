# Operation Bulletin — Cost Sheet Builder

A single-page cost sheet / operation bulletin builder (login, master data,
saved styles, layout builder, Excel/PDF export). Built as a plain
HTML+JS app, wrapped in a small Vite project so it's easy to run locally
and deploy.

## Run locally

```bash
npm install
npm run dev
```

This opens the app at `http://localhost:5173`.

## Build for deployment

```bash
npm run build
```

This produces a `dist/` folder with the finished static site — this is
what you upload to any static host.

## Getting a live website link

Pick any one of these (all free for a project like this):

### Option A — Netlify (easiest)
1. Go to https://app.netlify.com/drop
2. Run `npm run build` locally, then drag the generated `dist` folder
   onto that page.
3. Netlify gives you a live `https://your-site.netlify.app` link instantly.

### Option B — Vercel
1. Create a free account at https://vercel.com
2. Install the CLI: `npm i -g vercel`
3. Run `vercel` inside this project folder and follow the prompts.

### Option C — GitHub Pages
1. Push this project to a GitHub repository.
2. In the repo settings, enable GitHub Pages, or use the
   `gh-pages` npm package to publish the `dist` folder.
3. Your link will be `https://<username>.github.io/<repo>`.

## Uploading to GitHub (avoiding "file missing" errors)

This usually happens for one of two reasons:

1. **The `.gitignore` file didn't get uploaded.** It starts with a dot,
   so Windows Explorer hides it by default. Turn on "Show hidden items"
   (File Explorer → View tab) before dragging files into GitHub, or use
   GitHub Desktop instead (see below) — it uploads everything correctly
   without this problem.
2. **Files ended up nested inside an extra folder.** Make sure you drag
   the *contents* of this zip (index.html, package.json, src, etc.)
   directly into the repo — not a folder that contains them. GitHub Pages
   looks for `index.html` at the repo root.

**Most reliable method — GitHub Desktop:**
1. Install https://desktop.github.com
2. File → Add Local Repository → pick this unzipped folder
3. Commit → Publish repository
This uploads every file (including hidden ones) with no drag-and-drop issues.



- Data (master data, users, saved styles, layouts) is stored in Firebase
  Realtime Database, so it's shared across every device that opens the
  deployed link — not just the browser it was built in.
- If Firebase is unreachable, the app falls back to the browser's own
  local storage automatically.
