## Configuration

### Nuxt Config (`nuxt.config.ts`)

- `ssr: true` → server-side rendering enabled
- `app.head.title: 'VueFlix'`, favicon link
- Fonts via `@nuxt/fonts` (Google Montserrat)
- TailwindCSS v4 plugin via Vite integration
- Transpile: `trpc-nuxt`
- Modules: `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/icon`, `@nuxt/image`, `@vueuse/nuxt`, `@nuxt/test-utils/module`
- Image domains: `static.tvmaze.com`

### Package Scripts (`package.json`)

- `dev`: start dev server
- `build`: production build
- `generate`: SSG
- `preview`: preview production build
- `postinstall`: `nuxt prepare`
- `test`, `test:ui`, `test:watch`: Vitest

### tRPC Plugin (`app/plugins/trpc.ts`)

- Provides `$trpc` to app with `httpBatchLink` pointing to `/api/trpc`.

Server handler at `server/api/trpc/[trpc].ts` binds router and context.

Related: [styles.md](./styles.md)
