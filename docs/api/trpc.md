## tRPC API

The app exposes a typed RPC API consumed by the Nuxt client.

- Client setup: `app/plugins/trpc.ts`
- Server handler: `server/api/trpc/[trpc].ts`
- Routers root: `server/trpc/routers/index.ts`
- Shows router: `server/trpc/routers/showsRouter.ts`

### Context

`server/trpc/init.ts` defines `createTRPCContext(event)` and sets up the base `t` instance, with a centralized error formatter mapping Zod errors to a generic "Invalid input." and stripping stack traces in production.

### Procedures (shows)

All procedures are `baseProcedure` queries.

- `shows.index()` → First page of shows for the home screen.
  - Fetch: `GET https://api.tvmaze.com/shows?page=1`
  - Validates: `ShowIndexSchema`

- `shows.organized()` → Returns shows organized by genre and sorted by rating within each genre.
  - Fetch: `GET https://api.tvmaze.com/shows?page=1`
  - Transform: `organizeShowListByGenre` → `sortOrganizedShowListByRating`

- `shows.byGenre({ genre, page=1 })` → A page of shows filtered by `genre`, sorted by rating.
  - Input: `{ genre: string, page?: number }`
  - Fetch: `GET https://api.tvmaze.com/shows?page={page}`
  - Transform: `filterShowListByGenre` → `sortShowListByRating`

- `shows.search({ query })` → Search shows by text query; returns compact show items.
  - Input: `{ query: string }` (trimmed, min 1)
  - Fetch: `GET https://api.tvmaze.com/search/shows?q={query}`
  - Validates: `ShowSearchResultListSchema` (maps array of `{ score, show }` to list of `show`)

- `shows.details({ id })` → Full details for a show.
  - Input: `{ id: string }`
  - Fetch in parallel: `/shows/{id}`, `/shows/{id}/images`, `/shows/{id}/cast`
  - Validates: `ShowDetailsSchema` yielding `{ show, images, cast }`

### Error Handling

- `tryFetch` wraps `$fetch` and maps failures to `TRPCError` with `code: 'SERVICE_UNAVAILABLE'`.
- Tests in `tests/unit/showsRouter.errors.spec.ts` verify mapping behavior.

Related: [schemas.md](../schemas.md), [utils.md](../utils.md)
