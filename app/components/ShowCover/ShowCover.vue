<template>
	<div
		class="show-cover bg-surface relative h-[280px] w-[200px] shrink-0 overflow-hidden rounded-lg"
	>
		<NuxtImg
			:src="show.image.medium"
			height="300px"
			width="200px"
			:alt="show.name"
			format="webp"
			quality="70"
			loading="lazy"
			decoding="async"
			fetchpriority="low"
		/>
		<ShowCoverOverlay :show class="show-overlay hidden" />
	</div>
</template>

<script setup lang="ts">
import type { Show } from "~/shared/types/showTypes"
import ShowCoverOverlay from "~/components/ShowCover/ShowCoverOverlay.vue"

defineProps<{
	show: Show
}>()
</script>

<style scoped>
.show-cover:hover > .show-overlay {
	display: block;
	cursor: pointer;
}
</style>
