<template>
	<div>
		<div
			class="flex w-max cursor-pointer items-center gap-2 py-4"
			@click="goBack"
		>
			<Icon name="mdi:arrow-left-bold" />
			Back to list
		</div>
		<div class="flex gap-24">
			<div class="h-[600px] w-[400px] shrink-0 overflow-clip rounded-lg">
				<NuxtImg
					:src="data?.show.image?.original"
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="flex max-w-[860px] flex-col gap-8 py-4">
				<div>
					<div class="text-4xl font-bold">{{ data?.show.name }}</div>
					<div class="text-gray-400">
						{{ getShowRunningYearsString(data?.show!) }}
					</div>
				</div>
				<p>{{ stripHTML(data?.show.summary) }}</p>
				<div>
					<div class="mb-2 text-sm font-semibold text-gray-400">Genres</div>
					<div class="flex flex-wrap gap-2">
						<Tag v-for="genre in data?.show.genres" :key="genre" :title="genre">
							{{ genre }}
						</Tag>
					</div>
				</div>
				<div v-if="data?.cast?.length">
					<div class="mb-2 text-sm font-semibold text-gray-400">Cast</div>
					<div class="flex flex-wrap gap-2">
						<Tag v-for="member in data?.cast" :key="member" :title="member">
							{{ member }}
						</Tag>
					</div>
				</div>
			</div>
		</div>

		<NuxtImg
			:src="backgroundImage"
			class="fixed inset-0 -z-10 h-full w-full object-cover blur-2xl brightness-60"
		/>
	</div>
</template>

<script setup lang="ts">
	import { stripHTML } from '~/shared/utils'
	import { getShowRunningYearsString } from '~/shared/utils/showUtils'

	const { $trpc } = useNuxtApp()
	const router = useRouter()
	const route = useRoute()
	const goBack = () => router.back()

	const queryParams = computed(() => ({ id: route.params.id as string }))
	const { data } = await $trpc.shows.details.useQuery(queryParams)

	const backgroundImage = computed(
		() =>
			data.value?.images.background?.original ??
			data.value?.show.image?.original,
	)

	definePageMeta({
		name: 'details-page',
	})
</script>
