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
				class="scrollbar-none flex gap-3 overflow-x-auto"
			>
				<ShowCover v-for="show in list" :key="show.id" :show />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { ShowList } from '~/shared/types/showTypes'

	defineProps<{
		genre: string
		list: ShowList
	}>()

	const scroller = useTemplateRef<HTMLDivElement>('scroller')
	const { arrivedState } = useScroll(scroller)
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
