<template>
	<div class="mx-auto max-w-7xl px-2 md:px-0">
		<ErrorBanner
			v-if="error"
			message="We couldn't load this show right now. Please try again."
			show-back-button
			@retry="refresh"
		/>
		<NuxtLink
			:to="{ name: 'home' }"
			class="flex w-max cursor-pointer items-center gap-2 pb-4 text-neutral-400 hover:text-neutral-300"
		>
			<Icon name="mdi:arrow-left-bold" />
			Back to list
		</NuxtLink>
		<!-- Loading skeleton -->
		<ShowDetailsSkeleton v-if="pending || error" />

		<!-- Content -->
		<div
			v-else
			class="flex flex-col gap-6 md:flex-row md:items-start md:gap-16 lg:gap-24"
		>
			<div
				class="relative aspect-[2/3] w-full max-w-[400px] min-w-[220px] shrink overflow-hidden rounded-lg md:min-w-[300px]"
			>
				<ShowCover
					:src="coverSrc"
					alt=""
					quality="70"
					loading="eager"
					decoding="async"
					fetchpriority="high"
					img-class="h-full w-full object-cover"
					class="h-full w-full"
				/>
			</div>
			<div class="-mt-1 flex flex-col gap-6 md:max-w-[860px]">
				<div>
					<div class="text-2xl font-bold md:text-3xl lg:text-4xl">
						{{ data?.show.name }}
					</div>
					<div class="text-gray-400">
						{{ getShowRunningYearsString(data?.show!) }}
					</div>
				</div>
				<p class="text-sm text-neutral-300 md:text-base">
					{{ stripHTML(data?.show.summary) }}
				</p>
				<TagRow
					v-if="data?.show.genres?.length"
					title="Genres"
					:tags="data?.show.genres ?? []"
				/>
				<TagRow
					v-if="data?.cast.length"
					title="Cast"
					:tags="data?.cast ?? []"
				/>
			</div>
		</div>

		<img
			:src="backgroundImage"
			class="fixed inset-0 -z-10 h-full w-full object-cover blur-xl brightness-40"
		/>
	</div>
</template>

<script setup lang="ts">
	import { stripHTML } from '~/shared/utils'
	import { getShowRunningYearsString } from '~/shared/utils/showUtils'
	import ShowDetailsSkeleton from '~/components/ShowSkeletons/ShowDetailsSkeleton.vue'

	const { $trpc } = useNuxtApp()
	const route = useRoute()

	const queryParams = computed(() => ({ id: route.params.id as string }))
	const { data, error, pending, refresh } =
		await $trpc.shows.details.useQuery(queryParams)

	const coverSrc = computed(() => data.value?.show.image?.original)

	const backgroundImage = computed(
		() =>
			data.value?.images.background?.medium ||
			data.value?.images.background?.original ||
			data.value?.show.image?.original,
	)

	definePageMeta({
		name: 'details-page',
	})
</script>
