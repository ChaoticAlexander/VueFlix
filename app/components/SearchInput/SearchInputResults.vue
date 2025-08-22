<template>
	<div class="h-full w-full p-4 max-h-[300px] overflow-y-auto">
		<SearchInputResultItem v-for="result in searchResults" :key="result.id" :item="result" />
		<div v-if="!searchResults.length" class="text-center text-sm text-gray-400">
			No results
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ShowSearchResults } from '~/shared/types/showTypes'
import SearchInputResultItem from '~/components/SearchInput/SearchInputResultItem.vue'

defineProps<{
	searchResults: ShowSearchResults
}>()
</script>

<style scoped></style>
