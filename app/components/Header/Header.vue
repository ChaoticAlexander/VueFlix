<template>
	<div class="flex items-center justify-between">
		<Logo />
		<Input
			icon="mdi:search"
			icon-position="right"
			class="max-w-xs"
			@action="console.log('clicked')"
		/>
	</div>
</template>

<script setup lang="ts"></script>
