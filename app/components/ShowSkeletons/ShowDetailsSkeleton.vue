<template>
	<div
		class="flex animate-pulse flex-col gap-6 md:flex-row md:items-start md:gap-16 lg:gap-24"
	>
		<div
			class="bg-surface/60 aspect-[2/3] w-full max-w-[400px] min-w-[220px] shrink overflow-hidden rounded-lg md:min-w-[300px]"
		/>
		<div class="-mt-1 flex flex-col gap-6 md:max-w-[860px]">
			<!-- Title and running years -->
			<div class="bg-surface/60 h-8 w-3/4 rounded md:h-10" />
			<div class="bg-surface/60 h-4 w-32 rounded" />

			<!-- Summary lines -->
			<div class="mt-2 flex flex-col gap-2">
				<div class="bg-surface/60 h-4 w-full rounded" />
				<div class="bg-surface/60 h-4 w-[92%] rounded" />
				<div class="bg-surface/60 h-4 w-4/5 rounded" />
			</div>

			<!-- Genres row placeholder -->
			<div class="mt-2 flex flex-col gap-3">
				<div class="bg-surface/60 h-4 w-24 rounded" />
				<div class="flex flex-wrap gap-2">
					<div class="bg-surface/60 h-6 w-20 rounded-full" />
					<div class="bg-surface/60 h-6 w-16 rounded-full" />
					<div class="bg-surface/60 h-6 w-24 rounded-full" />
					<div class="bg-surface/60 h-6 w-14 rounded-full" />
				</div>
			</div>

			<!-- Cast row placeholder -->
			<div class="mt-2 flex flex-col gap-3">
				<div class="bg-surface/60 h-4 w-16 rounded" />
				<div class="flex flex-wrap gap-2">
					<div class="bg-surface/60 h-6 w-24 rounded-full" />
					<div class="bg-surface/60 h-6 w-28 rounded-full" />
					<div class="bg-surface/60 h-6 w-20 rounded-full" />
					<div class="bg-surface/60 h-6 w-16 rounded-full" />
					<div class="bg-surface/60 h-6 w-24 rounded-full" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
