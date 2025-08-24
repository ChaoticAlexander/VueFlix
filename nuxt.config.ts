// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
	app: {
		head: {
			title: 'VueFlix',
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' },
			],
		},
	},
	build: {
		transpile: ['trpc-nuxt'],
	},
	compatibilityDate: '2025-07-15',
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
	devtools: { enabled: true },
	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxt/image',
		'@nuxt/test-utils/module',
		'@vueuse/nuxt',
	],
	nitro: {
		compressPublicAssets: true,
	},
	ssr: true,
	vite: {
		plugins: [tailwindcss()],
	},
})
