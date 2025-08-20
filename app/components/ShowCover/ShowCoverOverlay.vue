<template>
	<div class="bg-background/80 absolute inset-x-0 inset-y-0 flex flex-col p-4">
		<div class="text-sm font-bold">{{ show.name }} {{ runningYears }}</div>
	</div>
</template>

<script setup lang="ts">
	import type { Show } from '~/shared/types/showTypes'

	const props = defineProps<{
		show: Show
	}>()

	const runningYears = computed(() => {
		const premiereYear = props.show.premiered
			? new Date(props.show.premiered).getFullYear()
			: null

		const endYear = props.show.ended
			? new Date(props.show.ended).getFullYear()
			: 'Ongoing'

		if (!premiereYear) return ''

		return `(${premiereYear === endYear ? premiereYear : `${premiereYear} - ${endYear}`})`
	})
</script>
