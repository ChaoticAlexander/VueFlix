<template>
	<div class="w-full">
		<div class="mb-2 text-lg">{{ genre }}</div>
		<div class="flex gap-3 overflow-x-auto">
			<ShowCover v-for="show in list" :key="show.id" :show />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ShowList } from '~/shared/types/showTypes'

defineProps<{
	genre: string,
	list: ShowList
}>()
</script>
