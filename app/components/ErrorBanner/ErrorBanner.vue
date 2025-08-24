<template>
	<div
		class="my-6 rounded-md border border-red-900/40 bg-red-950/40 p-4 text-sm text-red-200"
	>
		<div class="mb-3 flex items-center gap-2">
			<Icon name="mdi:alert-circle" />
			<span>
				<slot>{{ message }}</slot>
			</span>
		</div>
		<div class="flex gap-3">
			<button
				class="cursor-pointer rounded bg-red-800/60 px-3 py-1 text-xs hover:bg-red-700/60"
				@click="emit('retry')"
			>
				Retry
			</button>
			<NuxtLink
				v-if="showBackButton"
				:to="{ name: backToRouteName }"
				class="rounded border border-red-800/60 px-3 py-1 text-xs hover:bg-red-800/40"
				>Back to list</NuxtLink
			>
		</div>
	</div>
</template>

<script setup lang="ts">
	withDefaults(
		defineProps<{
			message: string
			showBackButton?: boolean
			backToRouteName?: string
		}>(),
		{
			backToRouteName: 'home',
		},
	)

	const emit = defineEmits<{ (e: 'retry'): void }>()
</script>
