## Pages & Routing

Nuxt routes (named via `definePageMeta`).

- `app/pages/index.vue`
  - Name: `home`
  - Data: `$trpc.shows.organized.useQuery({ watch: false })`
  - Renders: `OnVisible` of `ShowGenreRow` per genre; uses incremental fetching with `shows.byGenre` on near-end scroll and a per-genre debounce.

- `app/pages/show/[id].vue`
  - Name: `details-page`
  - Params: `id: string`
  - Data: `$trpc.shows.details.useQuery({ id })`
  - Renders: show poster, summary, genres via `TagRow`, cast via `TagRow`, with blurred background image. Uses `ShowCover` with graceful image fallback.

Layout: `app/layouts/default.vue`

- Wraps content; includes `Header` with global `SearchInput`.

Related: [components/index.md](./components/index.md), [api/trpc.md](./api/trpc.md)
