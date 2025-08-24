<template>
	<div class="flex flex-col gap-8">
		<ErrorBanner
			v-if="error"
			message="Service is temporarily unavailable. Please try again later."
			@retry="refresh"
		/>
		<ShowIndexSkeleton v-if="pending || error" />
		<template v-else>
			<OnVisible v-for="(list, genre) in organizedShows" :key="genre">
				<ShowGenreRow
					:loading="loading[genre]"
					:genre
					:list
					:load-offset="500"
					@load-more="loadMore"
				/>
			</OnVisible>
		</template>
	</div>
</template>

<script setup lang="ts">
	import type {
		ShowIndexItem,
		OrganizedShowList,
	} from '~/shared/types/showTypes'
	import ShowIndexSkeleton from '~/components/ShowSkeletons/ShowIndexSkeleton.vue'

	const { $trpc } = useNuxtApp()
	const loading = ref<Record<string, boolean>>({})
	const nextPage: Record<string, number> = {}
	const organizedShows = ref<OrganizedShowList<ShowIndexItem>>({})
	const { data, pending, error, refresh } =
		await $trpc.shows.organized.useQuery(undefined, {
			watch: false,
		})

	watchEffect(() => data.value && (organizedShows.value = data.value))

	// one debouncer per genre
	const debouncers = new Map<string, ReturnType<typeof useDebounceFn>>()

	const loadMoreRaw = async (genre: string) => {
		if ((organizedShows.value[genre] ?? []).length > 150) return

		// Make sure the next page always has results.
		// (due to how data is being provided by tvmaze, results for each category are not guaranteed.)
		try {
			for (let tries = 0; tries < 3; tries++) {
				const page = (nextPage[genre] ??= 2)
				const more = await $trpc.shows.byGenre.query({ genre, page })
				nextPage[genre] = page + 1
				if (more.length) {
					organizedShows.value[genre]!.push(...more)
					break
				}
			}
		} catch (e) {
			// Optionally surface a small per-row banner or toast here
			console.error('Failed to load more for', genre, e)
		} finally {
			loading.value[genre] = false
		}
	}

	const loadMore = (genre: string) => {
		if (loading.value[genre]) return
		loading.value[genre] = true

		let fn = debouncers.get(genre)
		if (!fn) {
			fn = useDebounceFn((g: string) => loadMoreRaw(g), 300)
			debouncers.set(genre, fn)
		}
		fn(genre)
	}

	definePageMeta({
		name: 'home',
	})
</script>

<style scoped></style>
