# Operation Bulletin — Cost Sheet Builder

A single-page app for building garment cost sheets: Master Data (operations by
style, with Machine and SMV), Cost Sheet / Operation Breakdown, Layout Builder,
Buyer-wise Saved OBs, Styles drill-down, and Users/permissions.

Everything (markup, styles, and logic) lives in `index.html`. The `src/`
folder is reserved for future modularization and isn't required for the app
to run.

## Run locally

```bash
npm install
npm run dev
```

This opens the app at `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Exports

- **Export Excel** uses `xlsx-js-style` (loaded via CDN in `index.html`) to
  generate a styled `.xlsx` cost sheet.
- **Export PDF** uses `html2pdf.js` (also via CDN) to generate a direct PDF
  download of the cost sheet, with trailing blank pages trimmed automatically.

Both require an internet connection on first load since the libraries are
pulled from a CDN rather than bundled.

## Data & sync

Data (Master Data, Saved OBs, Layouts, Users) persists via Firebase Realtime
Database (also loaded via CDN). Configure your own Firebase project details
inside `index.html` where the Firebase config is initialized.
