<template>
	<NuxtLink
		:to="{ name: 'details-page', params: { id: item.id } }"
		class="hover:bg-primary-hover/30 flex cursor-pointer items-center gap-4 rounded-md p-3"
		@mousedown.prevent
		@touchstart.stop
		@click="handleClick"
	>
		<div class="h-12 w-12 overflow-clip rounded-md">
			<ShowCover
				:src="item.image?.medium"
				:alt="`${item.name} Cover`"
				height="48"
				width="48"
				quality="70"
				loading="lazy"
				decoding="async"
				fetchpriority="high"
			/>
		</div>
		<div>
			<div class="text-sm">{{ item.name }}</div>
			<div class="text-xs text-gray-400">
				{{ getShowRunningYearsString(item) }}
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
	import type { ShowSearchResultItem } from '~/shared/types/showTypes'
	import { getShowRunningYearsString } from '~/shared/utils/showUtils'

	defineProps<{ item: ShowSearchResultItem }>()

	const handleClick = () => {
		;(document.activeElement as HTMLElement | null)?.blur()
	}
</script>

<style scoped></style>
