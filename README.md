# Suraj Ghimire — Portfolio

A single-page portfolio built with Next.js 15 (App Router) and TypeScript. No CSS
framework — the design lives in one stylesheet (`app/globals.css`) driven by CSS
custom properties, so retheming is one block of variables.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Node 18.18+ required. The first build downloads the two Google fonts through
`next/font`, so it needs network access once.

## Before you deploy — edit these

1. **`lib/site.ts`** — set `url` to your real domain (it drives canonical tags, the
   sitemap and every Open Graph tag), and replace the placeholder `github` and
   `linkedin` URLs with your actual profiles.
2. **`lib/projects.ts`** — the `help-nepali` entry has a description I inferred.
   Rewrite the `summary`, `description` and `stack` so they match what you actually
   built. Same for `mahavi-tech` if the stack differs.
3. Drop a `favicon.ico` into `app/` if you want one.

## Structure

```
app/
  layout.tsx            fonts, metadata, Person JSON-LD
  page.tsx              all sections
  globals.css           the whole design system
  opengraph-image.tsx   generated 1200x630 social card
  sitemap.ts / robots.ts
components/
  ProjectRail.tsx       filterable project carousel
lib/
  projects.ts           every project, one array — add new work here
  site.ts               name, links, description
```

## Adding a project

Append an object to the `projects` array in `lib/projects.ts`. `era` must be
`mahavi`, `bridgenext` or `college`; the filter counts, the hero ticker and the
JSON-LD all update from that array automatically.

## SEO already wired in

- Title template, description, keywords, canonical URL
- Open Graph and Twitter card metadata, plus a generated OG image
- `Person` structured data with `worksFor`, `alumniOf`, `knowsAbout` and projects
- `sitemap.xml` and `robots.txt` generated at build
- Semantic landmarks, skip link, one `h1`, fully static prerendered HTML

## Accessibility

Keyboard-operable carousel (arrow keys), visible focus rings, `aria-pressed`
filters, labelled controls, and `prefers-reduced-motion` disables the headline
reveal and the ticker.
