// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
    ssr: true,
    app: {
        head: {
            title: 'VueFlix',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
            ],
        },
    },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
	build: {
		transpile: ['trpc-nuxt']
	},
  modules: [
   "@nuxt/eslint",
   "@nuxt/fonts",
   "@nuxt/icon",
   "@nuxt/image",
   "@nuxt/test-utils",
   "@vueuse/nuxt",
  ],
});