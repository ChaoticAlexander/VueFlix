// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	ssr: false,
	app: {
		head: {
			title: 'VueFlix',
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
			],
		},
	},
	fonts: {
		families: [
			{
				name: 'Montserrat',
				provider: 'google',
				weights: [400, 600, 700],
			},
		],
	},
	css: ['~/assets/css/main.css'],
	vite: {
		plugins: [tailwindcss()],
	},
	build: {
		transpile: ['trpc-nuxt'],
	},
	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@vueuse/nuxt',
		'@nuxt/test-utils/module',
	],
	image: {
		domains: ['static.tvmaze.com', 'static.tvmaze.org'],
	},
})
