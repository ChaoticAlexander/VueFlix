<template>
	<div class="max-w-7xl mx-auto">
		<NuxtLink
			:to="{ name: 'home' }"
			class="flex w-max cursor-pointer items-center gap-2 py-4 text-neutral-400 hover:text-neutral-300"
		>
			<Icon name="mdi:arrow-left-bold" />
			Back to list
		</NuxtLink>
		<div class="flex items-start gap-24">
			<div class="w-[400px] min-w-[300px] max-w-full aspect-[2/3] shrink overflow-hidden rounded-lg">
				<NuxtImg
					:src="data?.show.image?.original"
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="flex max-w-[860px] flex-col gap-8 -mt-1">
				<div>
					<div class="text-4xl font-bold">{{ data?.show.name }}</div>
					<div class="text-gray-400">
						{{ getShowRunningYearsString(data?.show!) }}
					</div>
				</div>
				<p class="text-neutral-300">{{ stripHTML(data?.show.summary) }}</p>
				<TagRow v-if="data?.show.genres?.length" title="Genres" :tags="data?.show.genres ?? []" />
				<TagRow v-if="data?.cast.length" title="Cast" :tags="data?.cast ?? []" />
			</div>
		</div>

		<NuxtImg
			:src="backgroundImage"
			class="fixed inset-0 -z-10 h-full w-full object-cover blur-xl brightness-40"
		/>
	</div>
</template>

<script setup lang="ts">
	import { stripHTML } from '~/shared/utils'
	import { getShowRunningYearsString } from '~/shared/utils/showUtils'
	import TagRow from '~/components/TagRow/TagRow.vue'

	const { $trpc } = useNuxtApp()
	const router = useRouter()
	const route = useRoute()

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
