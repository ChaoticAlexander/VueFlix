<template>
	<div class="relative w-full">
		<input
			class="bg-surface w-full rounded-lg p-2 pr-10 pl-4 text-xs focus:outline-0"
			:class="iconClasses?.padding"
			type="text"
			placeholder="Search..."
		/>
		<Icon
			v-if="icon"
			:name="icon"
			class="text-text-secondary absolute top-1/2 -translate-y-1/2 cursor-pointer"
			:class="iconClasses?.position"
			@click="emit('action')"
		/>
	</div>
</template>

<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			icon?: string
			iconPosition?: 'left' | 'right'
		}>(),
		{
			icon: undefined,
			iconPosition: 'left',
		},
	)

	// Computes the correct classes based on given icon parameters.
	// Used for correct placement and spacing of icon on input.
	const iconClasses = computed(() => {
		if (!props.icon) return

		return props.iconPosition === 'right'
			? {
					position: 'right-3',
					padding: 'pl-4 pr-10',
				}
			: {
					position: 'left-3',
					padding: 'pl-10 pr-4',
				}
	})

	const emit = defineEmits(['action'])
</script>
