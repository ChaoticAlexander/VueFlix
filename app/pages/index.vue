<template>
	<div class="flex flex-col gap-8">
		<OnVisible v-for="(list, genre) in organizedShows" :key="genre">
			<ShowGenreRow
				:loading="loading[genre]"
				:genre
				:list
				hydrate
				@load-more="loadMore"
			/>
		</OnVisible>
	</div>
</template>

<script setup lang="ts">
	import type { OrganizedShowList } from '~/shared/types/showTypes'

	const { $trpc } = useNuxtApp()
	const loading = ref<Record<string, boolean>>({})
	const nextPage = reactive<Record<string, number>>({})
	const organizedShows = ref<OrganizedShowList>({})
	const { data } = await $trpc.shows.organized.useQuery(undefined, {
		watch: false,
	})

	watchEffect(() => data.value && (organizedShows.value = data.value))

	const loadMore = async (genre: string) => {
		loading.value[genre] = true

		// Make sure the next page always has results. (due to how data is being provided by tvmaze)
		for (let tries = 0; tries < 3; tries++) {
			const page = (nextPage[genre] ??= 2)
			const more = await $trpc.shows.byGenre.query({ genre, page })
			nextPage[genre] = page + 1

			if (more.length) {
				organizedShows.value[genre]!.push(...more)
				break
			}
		}

		loading.value[genre] = false
	}
</script>

<style scoped></style>
