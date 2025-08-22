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
	image: z.object({
		medium: z.string(),
		original: z.string(),
	}),
	summary: z.string(),
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
		.nullable()
		.transform((e) => e?.medium),
	premiered: z.string().nullable(),
	ended: z.string().nullable(),
})

// Enforce image on search result for proper type-safety
const ShowSearchResultWithImage = RawSearchResultSchema.extend({
	image: z.string(),
})

const ShowSearchResultSchema = z
	.array(
		z.object({
			score: z.number(),
			show: RawSearchResultSchema,
		}),
	)
	.transform((results) => {
		// filters out shows without images. (usually duplicates)
		const out: Array<z.infer<typeof RawSearchResultSchema>> = []
		for (const { show } of results) {
			if (show.image) out.push(show)
		}
		return out
	})
	.pipe(z.array(ShowSearchResultWithImage))

export { ShowSchema, ShowListSchema, ShowSearchResultSchema }
