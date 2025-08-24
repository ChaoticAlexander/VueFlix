## Architecture Overview

VueFlix is a Nuxt 4 application with SSR enabled that consumes the public TVMaze API via a thin server layer built with tRPC. Data contracts are defined with Zod and inferred for TypeScript types. The UI is composed of small Vue 3 SFC components, TailwindCSS utilities, and Nuxt Image.

High-level:

- Client: Nuxt app with pages under `app/pages`, components under `app/components`, and a tRPC client plugin in `app/plugins/trpc.ts`.
- Server: tRPC router in `server/trpc/routers` with a Nuxt API handler at `server/api/trpc/[trpc].ts`.
- Data: Zod schemas in `app/shared/schemas` and exported types in `app/shared/types/showTypes.ts`.
- Utilities: HTTP wrapper and show utilities in `app/shared/utils`.
- Styling: TailwindCSS v4 with custom CSS vars under `app/assets/css`.

### Data Flow

1. UI triggers queries via `$trpc` (e.g., `shows.organized`).
2. Server tRPC procedures fetch TVMaze endpoints using `tryFetch` and validate/transform with Zod schemas.
3. Validated data is returned to the client; components render typed data.

### Key Modules

- tRPC initialization: `server/trpc/init.ts` exposes `baseProcedure`, `createTRPCRouter`, and `createCallerFactory` with custom error formatting.
- App router: `server/trpc/routers/index.ts` aggregates route modules.
- Shows domain: `server/trpc/routers/showsRouter.ts` implements queries: `index`, `organized`, `byGenre`, `search`, `details`.

Related docs:

- API details: [api/trpc.md](./api/trpc.md)
- Schemas: [schemas.md](./schemas.md)
- Utilities: [utils.md](./utils.md)
