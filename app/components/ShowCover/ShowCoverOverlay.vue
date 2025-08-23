<template>
	<div class="bg-background/80 absolute inset-0 flex flex-col gap-2 p-4">
		<div class="leading-none mb-1">
			<span class="font-bold">{{ show.name }}</span><br />
			<span class="text-gray-400 text-xs">{{ runningYears }}</span>
		</div>
		<div class="line-clamp-7 text-xs shrink-0">
			{{ stripHTML(show.summary) }}
		</div>
		<div class="flex flex-wrap gap-1">
			<Tag
				v-for="genre in show.genres?.slice(0, 3)"
				:key="genre"
				:title="genre"
			/>
		</div>
		<div
			v-if="show.rating"
			class="text-muted mt-auto flex items-center justify-end gap-1 text-xs"
		>
			<span>{{ show.rating }}</span>
			<NuxtImg src="images/imdb.png" height="12px" alt="imdb logo" class="inline" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ShowIndexItem } from '~/shared/types/showTypes'
	import { stripHTML } from '~/shared/utils'
	import { getShowRunningYearsString } from '~/shared/utils/showUtils'

	const props = defineProps<{
		show: ShowIndexItem
	}>()

	const runningYears = computed(() => getShowRunningYearsString(props.show))
</script>
