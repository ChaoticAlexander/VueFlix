<template>
	<div class="flex flex-col gap-8">
		<ShowGenreRow
			v-for="(list, genre) in organizedShows"
			:key="genre"
			:genre
			:list
		/>
	</div>
</template>

<script setup lang="ts">
	const { $trpc } = useNuxtApp()
	const { data: organizedShows } = await $trpc.shows.showsByGenre.useQuery({})
</script>

<style scoped></style>
