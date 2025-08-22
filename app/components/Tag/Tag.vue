<template>
	<div class="bg-background/80 rounded-full px-2 py-1 text-[10px] text-gray-300">
		{{ title }}
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
}>()
</script>
