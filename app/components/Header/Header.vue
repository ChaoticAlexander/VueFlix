<template>
	<header class="flex items-center justify-between">
		<NuxtLink :to="{name: 'home'}">
			<NuxtImg
				src="/images/logo.png"
				width="48px"
				height="48px"
				alt="Logo"
			/>
		</NuxtLink>
		<SearchInput
			icon="mdi:search"
			icon-position="right"
			class="ml-auto max-w-xs fixed right-8 top-8 z-20"
		/>
	</header>
</template>
