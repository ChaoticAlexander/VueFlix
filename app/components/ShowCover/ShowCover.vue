<template>
	<div class="relative" :class="$attrs.class">
		<div
			v-show="isLoading"
			class="bg-surface/70 pointer-events-none absolute inset-0 animate-pulse"
		/>
		<img
			:src="computedSrc"
			:alt="alt"
			:loading="loading"
			:decoding="decoding"
			:fetchpriority="fetchpriority"
			:class="imgClass"
			:height="height"
			:width="width"
		/>
	</div>
</template>

<script setup lang="ts">
	import { useImage } from '@vueuse/core'

	const props = withDefaults(
		defineProps<{
			src?: string
			alt?: string
			loading?: 'lazy' | 'eager' | undefined
			decoding?: 'async' | 'auto' | 'sync' | undefined
			fetchpriority?: 'high' | 'low' | 'auto' | undefined
			imgClass?: string
			height?: string | number
			width?: string | number
		}>(),
		{
			src: '/images/generic-cover.png',
			alt: 'Tv Show cover',
			loading: 'lazy',
			decoding: 'async',
			fetchpriority: 'auto',
			imgClass: 'h-full w-full object-cover',
			height: undefined,
			width: undefined,
		},
	)

	const { isLoading, error } = useImage({ src: props.src })

	const computedSrc = computed(() => {
		if (error?.value) return '/images/generic-cover.png'
		return props.src
	})
</script>
