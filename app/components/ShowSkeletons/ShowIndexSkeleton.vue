<template>
	<div class="flex flex-col gap-8">
		<!-- Repeat genre row placeholders -->
		<div v-for="i in 4" :key="i" class="w-full">
			<div class="bg-surface mb-2 h-6 w-40 animate-pulse rounded" />
			<div class="scrollbar-none overflow-x-auto">
				<div class="flex gap-4">
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
