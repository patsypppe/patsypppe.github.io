# patsypppe.github.io

Personal site. One page, no client-side JavaScript, deployed to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

## How it is built

- **Content is typed data, not markup.** Everything the page says lives in
  [`src/data/portfolio.ts`](src/data/portfolio.ts) behind `Product`, `Tool`, `Publication`, `Role`
  and `School` interfaces. Adding a project is editing one array; the page cannot render one that is
  missing a field, because it will not compile.
- **`astro check` runs before `astro build`.** `npm run build` is the two of them chained, and CI
  runs the same command, so a type error fails the deploy instead of shipping a broken page.
  `tsconfig.json` extends `astro/tsconfigs/strictest`.
- **Screenshots are real captures** of the running apps, stored as WebP in `public/shots/` at two
  widths each and served with `srcset`, so a phone never downloads the retina file. Each one links
  to its full-size version.
- **Every number is a measurement, drawn.** Each project carries typed `Measure` data (what was
  measured, the baseline, the result, and how) and `Measure.astro` renders it as before/after
  bars: grey for the baseline, cobalt for the result. The bars grow once on load in pure CSS and
  stay still under `prefers-reduced-motion`.
- **One light theme, one typeface.** Cool paper, near-black ink, and cobalt used only for results.
  Set entirely in Schibsted Grotesk (SIL Open Font License, one 47 KB variable file self-hosted
  from `public/fonts/`).
- **Diagrams are hand-authored inline SVG**, not images, so they stay sharp at any zoom and carry
  real `aria-label` text. They sit behind a native `<details>` disclosure, so no script is needed.
- **Lighthouse 100 / 100 / 100 / 100** on both the mobile and desktop presets.
- **Nothing is fetched from a third party at runtime.** No analytics, no CDN, no font service.

## Local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check && astro build → dist/
```

## Layout

```
src/data/portfolio.ts          all copy and every number, typed
src/pages/index.astro          the single page
src/components/Shot.astro      a framed, responsive screenshot with a caption
src/components/Measure.astro   before/after measurement bars
src/components/Diagram.astro   inline-SVG architecture diagrams
src/styles/global.css          design tokens and layout
public/shots/                  product screenshots, <name>-<width>.webp
public/fonts/                  Schibsted Grotesk and its licence
public/                        OG card, favicon
```

MIT.
