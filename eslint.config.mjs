// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	ignores: ['tests/**'],
	rules: {
		// Vue-specific rules
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'always',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			},
		],

		// JavaScript/TypeScript style rules
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
	},
})
