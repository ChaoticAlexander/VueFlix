import { baseProcedure, createTRPCRouter } from '~~/server/trpc/init'
import { z } from 'zod'
import {
	ShowListSchema,
	ShowSearchResultSchema,
} from '~/shared/schemas/showSchemas'
import {
	organizeShowsByGenre,
	sortOrganizedShowList,
	filterShowsByGenre, sortShowList,
} from '~/shared/utils/showUtils'

const fetchShows = async (page: number = 1) => {
	const res = await $fetch('https://api.tvmaze.com/shows?page=' + page)
	return ShowListSchema.parse(res)
}

export const showsRouter = createTRPCRouter({
	index: baseProcedure.query(() => fetchShows(1)),
	organized: baseProcedure
		.query(async () => {
			const shows = await fetchShows()
			return sortOrganizedShowList(organizeShowsByGenre(shows))
		}),
	byGenre: baseProcedure
		.input(z.object({
			genre: z.string(),
			page: z.number().default(1)
		}))
	.query(async ({ input }) => {
		const shows = await fetchShows(input.page)
		const filteredShows = sortShowList(filterShowsByGenre(shows, input.genre))
		return ShowListSchema.parse(filteredShows)

	}),
	search: baseProcedure
		.input(
			z.object({
				query: z.string().trim().min(1),
			}),
		)
		.query(async ({ input }) => {
			const searchResult = await $fetch(
				'https://api.tvmaze.com/search/shows?q=' + encodeURI(input.query),
			)
			return ShowSearchResultSchema.parse(searchResult)
		}),
})

// export type definition of API
export type ShowsRouter = typeof showsRouter
