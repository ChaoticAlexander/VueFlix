<template>
	<div
		class="show-cover bg-surface relative h-[300px] w-[200px] shrink-0 overflow-clip rounded-lg"
	>
		<NuxtImg
			:src="show.image.medium"
			height="300px"
			width="200px"
			:alt="show.name"
			quality="70"
			loading="lazy"
			decoding="async"
			fetchpriority="low"
			class="h-full w-full object-cover"
		/>
		<ShowCoverOverlay :show class="show-overlay invisible opacity-0 backdrop-blur-xs" />
	</div>
</template>

<script setup lang="ts">
	import type { Show } from '~/shared/types/showTypes'
	import ShowCoverOverlay from '~/components/ShowCover/ShowCoverOverlay.vue'

	defineProps<{
		show: Show
	}>()
</script>

<style scoped>
	.show-overlay {
		transition: opacity .2s ease, visibility 0s linear .2s;
	}
	.show-cover:hover > .show-overlay {
		visibility: visible;
		opacity: 1;
		cursor: pointer;
		transition-delay: 0s, 0s;
	}
</style>
