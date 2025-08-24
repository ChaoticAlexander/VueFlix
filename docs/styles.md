## Styles

VueFlix uses TailwindCSS v4 with a small set of custom CSS variables and utilities.

Locations:

- `app/assets/css/main.css` → imports Tailwind, `colors.css`, `utility.css`, sets global styles and scrollbar styling.
- `app/assets/css/colors.css` → defines color variables and semantic mappings under `@theme`.
- `app/assets/css/utility.css` → custom utilities (`scrollbar-none`, horizontal fade edges for scrollers) layered under `@layer utilities`.

Nuxt Image is used for optimized images (`<NuxtImg />`). Allowed remote domain: `static.tvmaze.com`.

Related: [config.md](./config.md)
