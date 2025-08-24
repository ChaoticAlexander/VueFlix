<template>
	<div
		class="group bg-surface/70 w-full rounded-lg backdrop-blur-lg"
		:class="{ 'border border-red-800/70': error }"
	>
		<!--	Input field	-->
		<div class="relative">
			<input
				ref="input-field"
				name="searchInputField"
				class="w-full p-2 pr-10 pl-4 text-xs focus:outline-0"
				type="text"
				placeholder="Search..."
				@keyup="fetchSearchResults"
			/>
			<div class="icon-container flex items-center">
				<Icon
					v-if="pending"
					name="mdi:loading"
					class="loading-icon origin-center animate-spin"
					@click="clearSearchResults"
				/>
				<Icon
					v-else-if="error"
					v-tooltip="{
						content: 'Something went wrong..',
						popperClass: 'tooltip-error',
					}"
					name="mdi:error"
					class="error-icon text-red-800/70 hover:text-red-700/70"
				/>
				<Icon
					v-else-if="searchResults"
					name="mdi:close-circle"
					@click="clearSearchResults"
				/>
				<Icon v-else name="mdi:search" @click="fetchSearchResults" />
			</div>
		</div>

		<!--	Search Results	-->
		<div
			v-if="searchResults"
			class="hidden h-full max-h-[300px] w-full overflow-y-auto p-4 group-focus-within:block"
		>
			<SearchInputResultItem
				v-for="result in searchResults"
				:key="result.id"
				:item="result"
			/>
			<div
				v-if="!searchResults.length"
				class="text-center text-sm text-gray-400"
			>
				No results
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const { $trpc } = useNuxtApp()

	// Search related logic
	const inputField = useTemplateRef<HTMLInputElement>('input-field')
	const queryParams = reactive({
		query: '',
	})

	const {
		clear,
		data: searchResults,
		pending,
		error,
		execute: executeSearchQuery,
	} = $trpc.shows.search.useQuery(queryParams, {
		immediate: false,
		watch: false,
	})

	const clearSearchResults = () => {
		inputField.value!.value = ''
		clear()
	}

	const fetchSearchResults = useDebounceFn(() => {
		if (!inputField.value?.value) return clearSearchResults()
		Object.assign(queryParams, {
			query: inputField.value.value,
		})
		inputField.value.focus()
		executeSearchQuery()
	}, 300)

	watch(error, () => console.log(error, queryParams))
</script>

<style lang="scss" scoped>
	.icon-container {
		line-height: 0;
		color: var(--color-text-secondary);
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: calc(var(--spacing) * 3);
		cursor: pointer;

		span:not(.loading-icon):not(.error-icon):hover {
			color: var(--color-muted);
		}
	}

	:deep(.tooltip-error .v-popper__inner) {
		@apply text-text bg-red-700/70 backdrop-blur-lg;
	}
</style>
