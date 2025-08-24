import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Map Nuxt root alias `~~` to the project root so tests can import server code
export default defineConfig({
	resolve: {
		alias: {
			'~~': fileURLToPath(new URL('.', import.meta.url)),
			'@@': fileURLToPath(new URL('.', import.meta.url)),
			'~': fileURLToPath(new URL('./app', import.meta.url)),
			'@': fileURLToPath(new URL('./app', import.meta.url)),
		},
	},
})
