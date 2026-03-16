# Konscio — Project Guidelines

Static Astro 6 publication site for eco-socialist and decolonial analysis. Code is MIT; content is CC0.

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm run check        # TypeScript/Astro type checking (no ESLint)
npm run test         # Vitest (all tests)
npm run format       # Prettier (src/ + package.json)
npm run link-check   # Validate external links
npx vitest run tests/utils/<file>.test.ts  # Single test
```

## Architecture

- **Content**: Markdown/MDX in `src/content/dispatches/`. Frontmatter validated by Zod schema in `src/schemas/dispatches.ts`.
- **Routing**: `/dispatches/[...slug]` (catch-all), `/categories/[category]`. Slugs derive from filenames via `slugifyPath()`.
- **Layout**: Single root `Layout.astro` in `src/components/` (not a `layouts/` dir). Wraps Header, optional Sidebar, Footer.
- **SEO**: Hand-coded JSON-LD, OG, and Twitter card tags in `SEO.astro` — no external SEO library.
- **RSS/Search**: Generated from the dispatches collection in `src/pages/rss.xml.ts` and `search.json.ts`.
- **Config**: Central site metadata in `src/config.ts` — import this, don't hard-code site values.

## Conventions

### Content Querying

Pages use `import.meta.glob("../../content/dispatches/*.{md,mdx}", { eager: true })` — not the Content Layer `getCollection()` API for dynamic routes. Posts are filtered to exclude drafts and future dates:

```ts
.filter((p) => !p.frontmatter.draft)
.filter((p) => new Date(p.frontmatter.datePublished) <= new Date())
```

Frontmatter is accessed via `post.frontmatter.title` (glob import style), not `post.data.title`.

### slugifyPath() Is NOT a URL Sanitizer

`src/utils/slugify.ts` extracts the filename without extension — it preserves spaces, Unicode, and special characters as-is. Do not "improve" it into a typical URL-safe slugifier.

### Components

- Props: `export interface Props { ... }` before the fence, destructured with defaults in frontmatter.
- CSS: Scoped `<style>` blocks per component; no Tailwind, no CSS Modules, no BEM.
- Prefetch: Internal links use `data-astro-prefetch`.

### Styling

- **Design tokens**: Two-tier CSS custom properties in `src/styles/variables.css` — raw values (`--color-accent-red`) mapped to semantic tokens (`--color-accent`). Always use semantic tokens.
- **Fonts**: Loaded via Astro Font API (`fontsource`). Reference semantic aliases (`--font-heading-primary`, `--font-body`, `--font-mono`), never raw font names.
- **Grid**: 8px baseline via `--grid-unit`. No hard-coded pixel values.
- **Dark mode**: `@media (prefers-color-scheme: dark)` overrides in `variables.css`.

### Formatting

Prettier with `printWidth: 100`, double quotes, trailing commas (ES5), `prettier-plugin-astro` and `prettier-plugin-organize-imports`. No ESLint.

### Tests

- Vitest with `happy-dom` (not jsdom). Config in `vitest.config.ts`.
- Tests in `tests/utils/` cover utility functions only; no component tests.
- Mock pattern: `vi.mock("astro:content", ...)` with `vi.fn()`.
- Emphasis on edge cases (Unicode, empty strings, special chars).

## Pitfalls

- **Duplicate post-filtering**: The draft/future-date filter is repeated across pages — keep them consistent if editing.
- **Remark plugin**: `plugins/remark-reading-time.ts` injects `minutesRead` into `file.data.astro.frontmatter`, not `post.data`.
- **Experimental Rust compiler**: `experimental: { rustCompiler: true }` in `astro.config.mjs` — may differ from standard compiler behavior.
- **`trailingSlash: "never"`**: URLs must not end with `/`.
