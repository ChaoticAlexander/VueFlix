import { initTRPC } from '@trpc/server'
import type { H3Event } from 'h3'

export const createTRPCContext = async (event: H3Event) => {
	/**
	 * @see: https://trpc.io/docs/server/context
	 */
	return { auth: event.context.auth }
}

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
	/**
	 * @see https://trpc.io/docs/server/data-transformers
	 */
	// transformer: superjson,
	/**
	 * Centralized error formatting to normalize messages and hide stacks in prod.
	 */
	errorFormatter({ shape, error }) {
		const hasName = (val: unknown): val is { name?: string } =>
			typeof val === 'object' && val !== null && 'name' in (val as object)
		const isZod = hasName(error.cause) && error.cause.name === 'ZodError'
		return {
			...shape,
			message: isZod ? 'Invalid input.' : shape.message,
			data: {
				...shape.data,
				stack: import.meta.dev ? shape.data.stack : undefined,
			},
		}
	},
})

// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
