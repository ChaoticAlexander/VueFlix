import { describe, it, expect } from 'vitest'
import { ShowImagesSchema } from '../../app/shared/schemas/ShowImageSchemas'
import { ShowCastListSchema } from '../../app/shared/schemas/ShowCastSchemas'
import { RawShowSchema } from '../../app/shared/schemas/RawShowSchema'

describe('schemas', () => {
	it('ShowImagesSchema transforms to a map keyed by type', () => {
		const out = ShowImagesSchema.parse([
			{
				id: 1,
				type: 'background',
				main: true,
				resolutions: {
					original: { url: 'https://x/a.jpg', width: 1, height: 1 },
				},
			},
			{
				id: 2,
				type: null,
				main: false,
				resolutions: {
					original: { url: 'https://x/b.jpg', width: 1, height: 1 },
				},
			},
		] as unknown as Array<{
			id: number
			type: string | null
			main: boolean
			resolutions: { original: { url: string; width: number; height: number } }
		}>)
		expect(out.background.original).toBe('https://x/a.jpg')
		expect(out).not.toHaveProperty('null')
	})

	it('ShowCastListSchema maps to list of names', () => {
		const out = ShowCastListSchema.parse([
			{
				person: {
					id: 1,
					url: 'https://x/1',
					name: 'Alice',
					country: null,
					birthday: null,
					deathday: null,
					gender: null,
					image: null,
					updated: 1,
					_links: { self: { href: 'https://x/s' } },
				},
				character: {
					id: 2,
					url: 'https://x/2',
					name: 'Bob',
					image: null,
					_links: { self: { href: 'https://x/s' } },
				},
				self: false,
				voice: false,
			},
		] as unknown as Array<unknown>)
		expect(out).toEqual(['Alice'])
	})

	it('RawShowSchema accepts missing optional fields', () => {
		const parsed = RawShowSchema.parse({
			id: 123,
			url: 'https://x/show/123',
			name: 'Test',
			type: 'Scripted',
			language: null,
			genres: undefined,
			status: undefined,
			runtime: null,
			averageRuntime: null,
			premiered: null,
			ended: null,
			officialSite: null,
			schedule: { time: '', days: [] },
			rating: undefined,
			weight: undefined,
			network: null,
			externals: undefined,
			image: null,
			summary: null,
			updated: 1,
			_links: { self: { href: 'https://x/self' }, previousepisode: undefined },
		})
		expect(parsed.id).toBe(123)
	})
})
