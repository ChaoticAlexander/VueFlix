import { createTRPCRouter } from '~~/server/trpc/init'
import { showsRouter } from './shows';

export const appRouter = createTRPCRouter({
	shows: showsRouter,
});

export type AppRouter = typeof appRouter;