<template>
	<div ref="root">
		<slot v-if="seen" />
		<div v-else class="min-h-[260px]" />
	</div>
</template>

<script setup lang="ts">
	const root = useTemplateRef<HTMLElement>('root')
	const seen = ref(false)
	const visible = useElementVisibility(root, { threshold: 0.01 })

	watch(visible, (v) => {
		if (v) seen.value = true
	})
</script>
