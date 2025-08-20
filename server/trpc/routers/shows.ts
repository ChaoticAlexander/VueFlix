import { baseProcedure, createTRPCRouter } from '~~/server/trpc/init'
import { z } from 'zod'
import { ShowListSchema } from '~/shared/schemas/showSchemas'
import { organizeShowsByGenre, sortOrganizedShowList } from "~/shared/utils/showUtils";

const fetchShows = async (page: number) => {
	const res = await $fetch('https://api.tvmaze.com/shows?page=' + page)
	return ShowListSchema.parse(res);
}

export const showsRouter = createTRPCRouter({
	index: baseProcedure
		.input(
			z.object({
				page: z.number().default(1),
			}),
		)
		.query(({ input }) => fetchShows(input.page)),
	genres: baseProcedure
		.input(
			z.object({
				page: z.number().default(1),
			}),
		)
		.query(async ({ input }) => {
			const shows = await fetchShows(input.page)
			return sortOrganizedShowList(organizeShowsByGenre(shows))
		}),
});

// export type definition of API
export type ShowsRouter = typeof showsRouter;