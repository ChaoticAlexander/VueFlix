## Styles

VueFlix uses TailwindCSS v4 with a small set of custom CSS variables and utilities.

Locations:

- `app/assets/css/main.css` → imports Tailwind, `colors.css`, `utility.css`, sets global styles and scrollbar styling.
- `app/assets/css/colors.css` → defines color variables and semantic mappings under `@theme`.
- `app/assets/css/utility.css` → custom utilities (`scrollbar-none`, horizontal fade edges for scrollers) layered under `@layer utilities`.

Nuxt Image is used only for local/static assets (e.g., the app logo). Remote TVMaze images are loaded with native `<img>` via `components/ShowCover/ShowCover.vue`, which gracefully falls back to `/images/generic-cover.png` on errors. No explicit remote domain configuration is required.

Related: [config.md](./config.md)
