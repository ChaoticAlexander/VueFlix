## Development Guide

### Prerequisites

- Node (per `.nvmrc` if present) and `pnpm` (project uses `packageManager: pnpm@10.x`).
  - Recommended: Node 20.x LTS

### Install

```bash
pnpm install
```

### Run Dev Server

```bash
pnpm dev
```

### Build & Preview

```bash
pnpm build
pnpm preview
```

### Generate Static Site (optional)

```bash
pnpm generate
```

### Tests

```bash
pnpm test
```

### Code Style & Linting

- ESLint and Prettier are configured via `@nuxt/eslint` and `eslint-config-prettier`.
- TailwindCSS class sorting via `prettier-plugin-tailwindcss`.
- Devtools are enabled via `devtools: { enabled: true }` in `nuxt.config.ts`.

### Conventions

- Keep data contracts in Zod schemas; infer types via `z.infer` in `shared/types`.
- Use `$trpc` for data fetching; avoid direct `$fetch` in components.
- Favor small, focused components; co-locate skeleton states.
- For images from TVMaze, use `ShowCover` (native `<img>` with fallback) instead of `NuxtImg`.

Related: [config.md](./config.md), [architecture.md](./architecture.md)
