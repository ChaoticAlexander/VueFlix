<template>
	<div class="flex flex-col gap-8">
		<!-- Repeat genre row placeholders -->
		<div v-for="i in 4" :key="i" class="w-full">
			<div
				class="bg-surface mb-2 h-5 w-32 animate-pulse rounded md:h-6 md:w-40"
			/>
			<div class="scrollbar-none overflow-x-auto">
				<div class="flex gap-3 md:gap-4">
					<div v-for="j in 6" :key="j" class="shrink-0">
						<ShowCoverSkeleton />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import ShowCoverSkeleton from '~/components/ShowCover/ShowCoverSkeleton.vue'
</script>
