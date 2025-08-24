import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createCallerFactory } from '../../server/trpc/init'
import { appRouter } from '../../server/trpc/routers'

// Mock global $fetch used in server routers
const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

const createCaller = createCallerFactory(appRouter)

type ShowsCaller = {
	shows: {
		search: (input: { query: string }) => Promise<unknown>
		details: (input: { id: string }) => Promise<unknown>
	}
}

// Helpers
const getShows = () =>
	(createCaller({ auth: undefined as unknown }) as unknown as ShowsCaller).shows

const expectServiceUnavailable = async (fn: () => Promise<unknown>) =>
	await expect(fn()).rejects.toMatchObject({ code: 'SERVICE_UNAVAILABLE' })

describe('showsRouter error handling', () => {
	beforeEach(() => {
		mockFetch.mockReset()
	})

	it('search maps upstream failure to SERVICE_UNAVAILABLE', async () => {
		mockFetch.mockRejectedValueOnce(new Error('network down'))
		const shows = getShows()
		await expectServiceUnavailable(() => shows.search({ query: 'dexter' }))
	})

	it('details maps upstream failure to SERVICE_UNAVAILABLE', async () => {
		mockFetch.mockRejectedValueOnce(new Error('network down'))
		const shows = getShows()
		await expectServiceUnavailable(() => shows.details({ id: '1' }))
	})
})
