## Components

This section lists app components with their props/slots/events and primary usage locations.

### Layout

- `layouts/default.vue`
  - Wraps content, renders `Header` and `<slot />`.

### Header

- `components/Header/Header.vue`
  - Contains app logo link and `SearchInput`.

### SearchInput

- `components/SearchInput/SearchInput.vue`
  - Props: none
  - Emits: none
  - Slots: none
  - Behavior: debounced client-side trigger of `$trpc.shows.search` with loading and error states. Renders `SearchInputResultItem` list.
- `components/SearchInput/SearchInputResultItem.vue`
  - Props: `{ item: ShowSearchResultItem }`
  - Navigates to details page.

### ErrorBanner

- `components/ErrorBanner/ErrorBanner.vue`
  - Props: `{ message: string, showBackButton?: boolean, backToRouteName?: string = 'home' }`
  - Emits: `retry`

### OnVisible

- `components/OnVisible/OnVisible.vue`
  - Props: none
  - Slots: default (lazy-renders when visible)

### VirtualScroller

- `components/VirtualScroller/VirtualScroller.vue`
  - Generic `<T>`
  - Props: `{ list: T[], scroller: HTMLElement, itemWidth?: number=200, gap?: number=12, elementClasses?: string }`
  - Slots: `default({ item, index })`, optional `post`

### Show Cover

- `components/ShowCover/ShowCover.vue`
  - Props: `{ src?: string, alt?: string, loading?: 'lazy'|'eager', decoding?: 'async'|'auto'|'sync', fetchpriority?: 'high'|'low'|'auto', imgClass?: string, height?: number|string, width?: number|string }`
  - Behavior: preloads via `useImage` and falls back to `/images/generic-cover.png` if loading fails.
- `components/ShowCover/ShowCoverOverlay.vue`
  - Props: `{ show: ShowIndexItem }`
  - Uses `Tag` and `getShowRunningYearsString`
- `components/ShowCover/ShowIndexCover.vue`
  - Props: `{ show: ShowIndexItem }`
  - Composes `ShowCover` and `ShowCoverOverlay` and links to the show details page.
- `components/ShowCover/ShowCoverSkeleton.vue`
  - Skeleton placeholder

### Show Genre Row

- `components/ShowGenreRow/ShowGenreRow.vue`
  - Props: `{ genre: string, list: ShowIndex, loading?: boolean, loadOffset?: number=300 }`
  - Emits: `loadMore(genre: string)` when nearing right edge
  - Uses `VirtualScroller`, `ShowCover`, `ShowCoverSkeleton`

### Tag

- `components/Tag/Tag.vue`
  - Props: `{ title: string }`
- `components/TagRow/TagRow.vue`
  - Props: `{ title?: string, tags: string[] }`

### Skeletons

- `components/ShowSkeletons/ShowIndexSkeleton.vue`
- `components/ShowSkeletons/ShowDetailsSkeleton.vue`

Related: [pages.md](../pages.md), [types.md](../types.md)
