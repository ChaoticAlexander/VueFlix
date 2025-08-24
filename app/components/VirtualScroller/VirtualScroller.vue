<template>
	<div
		class="relative h-full"
		:style="{ width: rowVirtualizer.getTotalSize() + 'px' }"
	>
		<template v-for="v in rowVirtualizer.getVirtualItems()" :key="v.key">
			<div
				class="absolute top-0"
				:class="elementClasses"
				:style="{ left: v.start + 'px', width: itemWidth + 'px' }"
			>
				<slot
					name="default"
					v-bind="{ item: list[v.index] as T, index: v.index }"
				/>
			</div>
		</template>

		<div
			v-if="$slots.post"
			class="absolute top-0 flex"
			:style="{
        left: rowVirtualizer.getTotalSize() + 'px',
        gap: gap + 'px',
      }"
		>
			<slot name="post" />
		</div>
	</div>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'

const props = withDefaults(
	defineProps<{
		list: T[]
		scroller: HTMLElement
		itemWidth?: number
		gap?: number
		elementClasses?: string
	}>(),
	{
		itemWidth: 200,
		gap: 12,
		elementClasses: ''
	},
)

const itemSize = computed(() => props.itemWidth + props.gap)

const virtualizerOptions = computed(() => ({
	horizontal: true,
	count: props.list.length,
	getScrollElement: () => props.scroller,
	estimateSize: () => itemSize.value,
	overscan: 5,
}))
const rowVirtualizer = useVirtualizer(virtualizerOptions)

// expose so template can use
const { itemWidth, gap } = props
</script>