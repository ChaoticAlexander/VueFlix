import { z } from 'zod'

// Show Index Schema
const ShowSchema = z.object({
	id: z.number(),
	name: z.string(),
	url: z.string(),
	status: z.string(),
	genres: z.array(z.string()),
	premiered: z.string().nullable(),
	ended: z.string().nullable(),
	rating: z
		.object({
			average: z.number().nullable(),
		})
		.nullish(),
	image: z
		.object({
			medium: z.string(),
			original: z.string(),
		})
		.nullish(),
	summary: z.string().nullish(),
})

const ShowListSchema = z.array(ShowSchema)

// Search Result Schemas
const RawSearchResultSchema = z.object({
	id: z.number(),
	name: z.string(),
	rating: z
		.object({
			average: z.number().nullable(),
		})
		.nullish(),
	image: z
		.object({
			medium: z.string(),
		})
		.nullish()
		.transform((e) => e?.medium),
	premiered: z.string().nullable(),
	ended: z.string().nullable(),
})

const ShowSearchResultSchema = z
	.array(
		z.object({
			score: z.number(),
			show: RawSearchResultSchema,
		}),
	)
	.transform((list) =>
		list.map(({ show }) => show))

export { ShowSchema, ShowListSchema, ShowSearchResultSchema }
