import { createTRPCRouter } from '~~/server/trpc/init'
import { showsRouter } from './showsRouter'

export const appRouter = createTRPCRouter({
	shows: showsRouter,
})

export type AppRouter = typeof appRouter
