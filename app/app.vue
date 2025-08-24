<template>
	<NuxtLoadingIndicator color="#22c55e" :height="3" :throttle="200" />
	<NuxtLayout>
		<NuxtPage :keepalive="true" />
	</NuxtLayout>
</template>
