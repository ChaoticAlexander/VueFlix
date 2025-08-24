import { TRPCError } from '@trpc/server'

type FetchOptions = Parameters<typeof $fetch>[1]

const tryFetch = async (url: string, opts?: FetchOptions): Promise<unknown> => {
	try {
		return (await $fetch(url, opts)) as unknown
	} catch (e) {
		throw new TRPCError({
			code: 'SERVICE_UNAVAILABLE',
			message: 'Upstream service unavailable',
			cause: e,
		})
	}
}

export { tryFetch }
