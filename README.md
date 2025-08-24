## VueFlix

A lightweight TV show browser built with Nuxt 4 and Vue 3, powered by the public TVMaze API. It demonstrates typed API integration with tRPC and Zod, virtualized UI lists, and a clean component-driven architecture.

- Full project documentation lives in `docs/` → start at `docs/README.md`.

---

## Architectural Decisions

Why these tools:

- Nuxt 4 (Vue 3): modern DX, file-based routing, module ecosystem, Vite build, and great SSR/CSR ergonomics. The app runs with SSR enabled (`ssr: true`) to leverage server rendering benefits while still delivering a snappy client experience.
- tRPC: end-to-end typesafe API without writing OpenAPI/REST boilerplate. Procedures are collocated in `server/trpc/routers`, and the client is generated via `app/plugins/trpc.ts`.
- Zod: runtime validation + compile-time inference for all external data. Every upstream response is parsed and transformed (e.g., images/cast mapping) before it touches the UI.
- TailwindCSS v4: utility-first styling with a tiny layer of design tokens (`app/assets/css/colors.css`) and a couple of custom utilities.
- Nuxt Image: optimized images with domain allow-listing for TVMaze assets.
- @vueuse/nuxt: composables for scroll/visibility/media queries used across the UI.
- @tanstack/vue-virtual: lightweight, reliable virtualization for horizontally scrolling rows.
- Vitest + @nuxt/test-utils: fast unit tests for schemas, utilities, and API error handling.

Other design choices:

- Error handling: upstream `$fetch` is wrapped in `tryFetch`, mapping failures to a consistent `SERVICE_UNAVAILABLE` tRPC error. Centralized error formatting hides stack traces in production.
- Data modeling: schemas live in `app/shared/schemas`, inferred types in `app/shared/types`. Transforms produce UI-friendly shapes while preserving type safety.
- UI composition: small, focused components (e.g., `ShowCover`, `ShowGenreRow`, `VirtualScroller`) and skeletons for loading states.

---

## Requirements

- Node.js: 20.x LTS recommended (Nuxt 4 also supports >= 18.20)
- Package manager: pnpm (project is configured with `packageManager: pnpm@10.x`)
- NPM: If you prefer npm, use npm 10+ (not the default in this repo)

You can verify the exact pnpm/version pin in `package.json` (`packageManager` field).

---

## Getting Started

Install dependencies (pnpm is recommended):

```bash
pnpm install
```

Run the development server (http://localhost:3000):

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

Generate a static site (optional):

```bash
pnpm generate
```

Run tests:

```bash
pnpm test
```

---

## Scripts

- `dev` – start the Nuxt dev server
- `build` – build for production
- `preview` – preview the production build
- `generate` – SSG output
- `test`, `test:ui`, `test:watch` – run unit tests

---

## Configuration & Environment

- No secrets or environment variables are required. The app calls the public TVMaze API.
- Image domains are restricted via `nuxt.config.ts` (`image.domains`).

---

## Project Structure (high level)

```
app/
  components/      # UI components and skeletons
  pages/           # Nuxt pages (home, show details)
  layouts/         # Default layout with header and global search
  plugins/         # tRPC client plugin
  shared/          # schemas, types, and utilities
server/
  api/trpc/        # Nuxt API handler for tRPC
  trpc/routers/    # tRPC routers (shows)
docs/              # Full documentation
```

---

## Documentation

See `docs/README.md` for the full documentation set, including architecture, API, schemas, utilities, components, pages, configuration, styles, testing, and development workflows.
