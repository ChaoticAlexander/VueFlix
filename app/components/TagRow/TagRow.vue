<template>
	<div>
		<div v-if="title" class="mb-2 text-sm font-semibold text-neutral-400">
			{{ title }}
		</div>
		<div class="flex flex-wrap gap-2">
			<Tag v-for="tag in tags" :key="tag" :title="tag" />
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		title?: string
		tags: string[]
	}>()
</script>

<style scoped></style>
