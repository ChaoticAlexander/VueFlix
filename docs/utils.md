## Utilities

Location: `app/shared/utils`

### http.ts

- `tryFetch(url: string, opts?: FetchOptions): Promise<unknown>`
  - Wraps `$fetch`; on failure throws `TRPCError` with `code: 'SERVICE_UNAVAILABLE'` and a generic message.
  - Usage: All tRPC procedures fetch via `tryFetch` to normalize upstream failures.

### showUtils.ts

- `organizeShowListByGenre<T>(shows: T[]): OrganizedShowList<T>`
- `filterShowListByGenre<T>(shows: T[], genre: string): T[]`
- `sortShowListByRating<T extends { rating?: number }>(shows: T[]): T[]`
- `sortOrganizedShowListByRating<T extends { rating?: number }>(shows: OrganizedShowList<T>): OrganizedShowList<T>`
- `getShowRunningYearsString<T extends { premiered: string|null; ended: string|null }>(show: T): string`
  - Example output: `(2010 - 2014)` or `(2010 - Ongoing)`

### index.ts

- `stripHTML(input?: string | null): string`
  - Removes basic HTML tags from summaries before rendering.

Related: [api/trpc.md](./api/trpc.md), [schemas.md](./schemas.md)
