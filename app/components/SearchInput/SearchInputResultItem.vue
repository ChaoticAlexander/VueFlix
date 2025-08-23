<template>
	<div class="flex items-center gap-4 p-3 cursor-pointer hover:bg-primary-hover/30 rounded-md">
		<div class="h-12 w-12 overflow-clip rounded-md">
			<NuxtImg
				:src="item.image?.medium ?? '/images/generic-cover.png'"
				height="48px"
				width="48px"
				:alt="`${item.name} Cover`"
				class="h-full w-full object-cover"
			/>
		</div>
		<div>
			<div class="text-sm">{{ item.name }}</div>
			<div class="text-xs text-gray-400">
				{{ getShowRunningYearsString(item) }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ShowSearchResultItem } from '~/shared/types/showTypes'
	import { getShowRunningYearsString } from '~/shared/utils/showUtils'

	defineProps<{ item: ShowSearchResultItem }>()
</script>

<style scoped></style>
