<template>
	<div class="w-full">
		<div class="mb-2 text-lg font-semibold">{{ genre }}</div>
		<div
			class="fade-edges"
			:class="{
				'fade-left': !arrivedState.left,
				'fade-right': !arrivedState.right,
			}"
		>
			<div
				ref="scroller"
				class="scrollbar-none h-[260px] min-w-0 touch-auto overflow-x-auto overflow-y-hidden overscroll-x-contain md:h-[300px]"
			>
				<VirtualScroller
					:list="list"
					:scroller="scroller!"
					:gap="16"
					:item-width="itemWidth"
				>
					<template #default="{ item }">
						<ShowIndexCover :show="item" />
					</template>

					<template #post>
						<template v-if="loading">
							<ShowCoverSkeleton v-for="i in 5" :key="i" />
						</template>
					</template>
				</VirtualScroller>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ShowIndex } from '~/shared/types/showTypes'
	import ShowIndexCover from '~/components/ShowCover/ShowIndexCover.vue'

	const props = defineProps<{
		genre: string
		list: ShowIndex
		loading?: boolean
	}>()

	const scroller = useTemplateRef<HTMLDivElement>('scroller')
	const { arrivedState, directions } = useScroll(scroller)

	const emit = defineEmits<{
		loadMore: [string]
	}>()
	watch(
		() => arrivedState.right,
		(arrivedRight) => {
			if (arrivedRight && !directions.left) emit('loadMore', props.genre)
		},
		{ immediate: true },
	)

	// Responsive item width so covers and skeletons resize on small screens
	const isMd = useMediaQuery('(min-width: 768px)')
	const itemWidth = computed(() => (isMd.value ? 200 : 180))
</script>

<style scoped>
	/* helpers to toggle the utility fade opacity */
	.fade-left::before {
		opacity: 1;
	}
	.fade-right::after {
		opacity: 1;
	}
</style>
