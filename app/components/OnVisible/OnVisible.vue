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

	onMounted(() => {
		if (visible.value) {
			seen.value = true
			return
		}
		// Fallback in case visibility state settles a frame later
		requestAnimationFrame(() => {
			if (visible.value) seen.value = true
		})
	})

	onActivated(() => {
		seen.value = true
	})
</script>
