# patsypppe.github.io

Personal site. One page, no client-side JavaScript, deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

## Why it is built this way

- **Content is typed data, not markup.** Everything the page says lives in
  [`src/data/portfolio.ts`](src/data/portfolio.ts) behind `Project`, `Publication` and `Role`
  interfaces. Adding a project is editing one array; the page cannot render a project that is
  missing a field, because it will not compile.
- **`astro check` runs before `astro build`.** `npm run build` is the two of them chained, and CI
  runs the same command, so a type error fails the deploy instead of shipping a broken page.
  `tsconfig.json` extends `astro/tsconfigs/strictest`.
- **Diagrams are hand-authored inline SVG**, not images. They inherit the page's colour tokens, so
  they follow light and dark mode, stay sharp at any zoom, and carry real `aria-label` text rather
  than being opaque to a screen reader.
- **Nothing is fetched at runtime.** No fonts, no analytics, no CDN. The whole page is one HTML
  file with its stylesheet inlined.

## Claims

Every figure on the page is traceable to a public repository. Where a number exists only in a
paper and cannot be reproduced from committed code — the cricket accuracy, for instance — the page
says so in place of printing it. That is a deliberate editorial rule, not an oversight.

## Local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check && astro build → dist/
```

## Layout

```
src/data/portfolio.ts       all copy and every number, typed
src/pages/index.astro       the single page
src/components/Diagram.astro  three inline-SVG architecture diagrams
src/styles/global.css       design tokens, light and dark
public/                     terminal panel, OG card, favicon
```

MIT.
