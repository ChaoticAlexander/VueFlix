<template>
	<header class="flex flex-row items-center justify-between gap-3">
		<NuxtLink :to="{ name: 'home' }" class="order-1 hidden lg:block">
			<NuxtImg src="/images/logo.png" width="48px" height="48px" alt="Logo" />
		</NuxtLink>
		<SearchInput
			icon="mdi:search"
			icon-position="right"
			class="fixed inset-x-4 top-4 z-20 w-auto md:inset-x-6 md:top-6 lg:top-8 lg:right-8 lg:left-auto lg:ml-auto lg:w-[22rem]"
		/>
	</header>
</template>
