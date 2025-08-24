<template>
	<NuxtLink
		:to="{ name: 'details-page', params: { id: show.id } }"
		class="show-cover bg-surface relative h-[260px] w-[180px] shrink-0 overflow-hidden rounded-lg transition-transform active:scale-95 md:h-[300px] md:w-[200px]"
	>
		<ShowCover
			:src="imgSrc"
			:alt="show.name"
			img-class="h-full w-full rounded-lg object-cover"
			loading="lazy"
			decoding="async"
			fetchpriority="low"
			class="h-full w-full"
		/>
		<ShowCoverOverlay
			:show
			class="show-overlay pointer-events-none invisible hidden rounded-lg opacity-0 backdrop-blur-xs md:flex"
		/>
	</NuxtLink>
</template>

<script setup lang="ts">
	import type { ShowIndexItem } from '~/shared/types/showTypes'
	import ShowCoverOverlay from '~/components/ShowCover/ShowCoverOverlay.vue'
	import ShowCover from '~/components/ShowCover/ShowCover.vue'

	const props = defineProps<{
		show: ShowIndexItem
	}>()

	const imgSrc = computed(() => props.show?.image?.medium)
</script>

<style scoped>
	.show-overlay {
		transition:
			opacity 0.2s ease,
			visibility 0s linear 0.2s;
	}
	@media (hover: hover) and (pointer: fine) {
		.show-cover:hover > .show-overlay {
			visibility: visible;
			opacity: 1;
			cursor: pointer;
			transition-delay: 0s, 0s;
		}
	}
</style>
