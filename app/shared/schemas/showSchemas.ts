import { z } from 'zod'

const ShowSchema = z.object({
	id: z.number(),
	name: z.string(),
	url: z.string(),
	status: z.string(),
	genres: z.array(z.string()),
	premiered: z.string().nullable(),
	ended: z.string().nullable(),
	rating: z.object({
		average: z.number().nullable(),
	}).optional(),
	image: z.object({
		medium: z.string(),
		original: z.string(),
	}),
	summary: z.string(),
})

const ShowListSchema = z.array(ShowSchema)

export {
	ShowSchema,
	ShowListSchema,
}
