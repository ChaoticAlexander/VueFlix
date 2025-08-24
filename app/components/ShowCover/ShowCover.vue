<template>
	<NuxtLink
		:to="{ name: 'details-page', params: { id: show.id } }"
		class="show-cover bg-surface relative h-[260px] w-[180px] shrink-0 overflow-hidden rounded-lg md:h-[300px] md:w-[200px]"
	>
		<NuxtImg
			:src="show?.image?.medium ?? '/images/generic-cover.png'"
			:alt="show.name"
			quality="70"
			loading="lazy"
			decoding="async"
			fetchpriority="low"
			class="h-full w-full rounded-lg object-cover"
		/>
		<ShowCoverOverlay
			:show
			class="show-overlay invisible rounded-lg opacity-0 backdrop-blur-xs"
		/>
	</NuxtLink>
</template>

<script setup lang="ts">
	import type { ShowIndexItem } from '~/shared/types/showTypes'
	import ShowCoverOverlay from '~/components/ShowCover/ShowCoverOverlay.vue'

	defineProps<{
		show: ShowIndexItem
	}>()
</script>

<style scoped>
	.show-overlay {
		transition:
			opacity 0.2s ease,
			visibility 0s linear 0.2s;
	}
	.show-cover:hover > .show-overlay {
		visibility: visible;
		opacity: 1;
		cursor: pointer;
		transition-delay: 0s, 0s;
	}
</style>
