import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '~~/server/trpc/init'
import {
	ShowIndexSchema,
	ShowSearchResultListSchema,
} from '~/shared/schemas/showSchemas'
import {
	organizeShowListByGenre,
	sortOrganizedShowListByRating,
	filterShowListByGenre,
	sortShowListByRating,
} from '~/shared/utils/showUtils'

const fetchShows = async (page = 1) => {
	const res = await $fetch('https://api.tvmaze.com/shows?page=' + page)
	return ShowIndexSchema.parse(res) // items: ShowIndexItem
}

export const showsRouter = createTRPCRouter({
	index: baseProcedure.query(() => fetchShows(1)),
	organized: baseProcedure.query(async () => {
		const shows = await fetchShows()
		return sortOrganizedShowListByRating(organizeShowListByGenre(shows))
	}),
	byGenre: baseProcedure
		.input(z.object({ genre: z.string(), page: z.number().default(1) }))
		.query(async ({ input }) => {
			const shows = await fetchShows(input.page)
			return sortShowListByRating(filterShowListByGenre(shows, input.genre))
		}),
	search: baseProcedure
		.input(z.object({ query: z.string().trim().min(1) }))
		.query(async ({ input }) => {
			const res = await $fetch(
				'https://api.tvmaze.com/search/shows?q=' + encodeURI(input.query),
			)
			return ShowSearchResultListSchema.parse(res)
		}),
})

// export type definition of API
export type ShowsRouter = typeof showsRouter
