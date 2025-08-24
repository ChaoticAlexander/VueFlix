import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '~~/server/trpc/init'
import { tryFetch } from '~/shared/utils/http'
import {
	ShowIndexSchema,
	ShowDetailsSchema,
	ShowSearchResultListSchema,
} from '~/shared/schemas/showSchemas'
import {
	organizeShowListByGenre,
	sortOrganizedShowListByRating,
	filterShowListByGenre,
	sortShowListByRating,
} from '~/shared/utils/showUtils'

const fetchShows = async (page = 1) => {
	const res = await tryFetch('https://api.tvmaze.com/shows?page=' + page, {
		timeout: 5000,
	})
	return ShowIndexSchema.parse(res)
}

export const showsRouter = createTRPCRouter({
	// Returns the first page of shows for the home screen
	index: baseProcedure.query(() => fetchShows(1)),

	// Returns shows organized by genre, sorted by rating within each genre
	organized: baseProcedure.query(async () => {
		const shows = await fetchShows()
		return sortOrganizedShowListByRating(organizeShowListByGenre(shows))
	}),

	// Returns a page of shows filtered by a specific genre, sorted by rating
	byGenre: baseProcedure
		.input(z.object({ genre: z.string(), page: z.number().default(1) }))
		.query(async ({ input }) => {
			const shows = await fetchShows(input.page)
			return sortShowListByRating(filterShowListByGenre(shows, input.genre))
		}),

	// Searches for shows by text query; returns compact show items
	search: baseProcedure
		.input(z.object({ query: z.string().trim().min(1) }))
		.query(async ({ input }) => {
			const res = await tryFetch(
				'https://api.tvmaze.com/search/shows?q=' + encodeURI(input.query),
				{ timeout: 5000 },
			)
			return ShowSearchResultListSchema.parse(res)
		}),

	// Returns full details for a show: base data, images map, and cast list
	details: baseProcedure
		.input(z.object({ id: z.string().trim() }))
		.query(async ({ input }) => {
			const id = String(input.id)
			const base = `https://api.tvmaze.com/shows/${id}`
			const endpoints = ['', '/images', '/cast']

			const [show, images, cast] = await Promise.all(
				endpoints.map((suffix) =>
					tryFetch(`${base}${suffix}`, { timeout: 5000 }),
				),
			)
			return ShowDetailsSchema.parse({ show, images, cast })
		}),
})

// export type definition of API
export type ShowsRouter = typeof showsRouter
