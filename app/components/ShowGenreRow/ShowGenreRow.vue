<template>
	<div class="w-full">
		<div class="mb-2 text-lg font-semibold">{{ genre }}</div>
		<div
			class="fade relative"
			:class="{
        'fade-left': !arrivedState.left,
        'fade-right': !arrivedState.right,
      }"
		>
			<div
				ref="scroller"
				class="scrollbar-none overflow-x-auto h-[310px]"
			>
				<VirtualScroller :list="list" :scroller="scroller!" :gap="16">
					<template #default="{ item }">
						<ShowCover :show="item" />
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
	import ShowCoverSkeleton from '~/components/ShowCover/ShowCoverSkeleton.vue'

	const props = withDefaults(defineProps<{
		genre: string
		list: ShowIndex
		loading?: boolean
		loadOffset?: number
	}>(), {
		loadOffset: 300
	})

	const scroller = useTemplateRef<HTMLDivElement>('scroller')
	const { arrivedState } = useScroll(scroller)
	const { arrivedState: almost, directions } = useScroll(scroller, {
		offset: {
			right: props.loadOffset
		}
	})

	const emit = defineEmits<{
		loadMore: [string]
	}>()
	watch(() => almost.right, () => {
		if (!directions.left) emit('loadMore', props.genre)
	})
</script>

<style scoped>
/* Scoped is fine */
.fade::before,
.fade::after {
	content: '';
	position: absolute;
	top: 0;
	height: 100%;
	width: 40px;
	pointer-events: none;
	opacity: 0;
	z-index: 10;
	transition: opacity 0.1s ease-in-out; /* this will now animate */
	will-change: opacity;
}

.fade::before { left: 0; background: linear-gradient(to left, transparent, var(--color-background)); }
.fade::after  { right: 0; background: linear-gradient(to right, transparent, var(--color-background)); }

.fade-left::before  { opacity: 1; }
.fade-right::after  { opacity: 1; }
</style>
