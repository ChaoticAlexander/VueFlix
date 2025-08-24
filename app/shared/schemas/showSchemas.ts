import { z } from 'zod'
import { RawShowSchema } from './RawShowSchema'
import { ShowImagesSchema } from './ShowImageSchemas'
import { ShowCastListSchema } from './ShowCastSchemas'

// Index Page Show Schema
const ShowIndexItemSchema = RawShowSchema.pick({
	id: true,
	name: true,
	url: true,
	genres: true,
	premiered: true,
	ended: true,
	rating: true,
	image: true,
	summary: true,
})

const ShowIndexSchema = z.array(ShowIndexItemSchema)

// Search Results Schemas
const ShowSearchResultItemSchema = RawShowSchema.pick({
	id: true,
	name: true,
	rating: true,
	image: true,
	premiered: true,
	ended: true,
})

const ShowSearchResultListSchema = z
	.array(
		z.object({
			score: z.number(),
			show: ShowSearchResultItemSchema,
		}),
	)
	.transform((list) => list.map(({ show }) => show))

const ShowDetailsSchema = z.object({
	show: RawShowSchema,
	images: ShowImagesSchema,
	cast: ShowCastListSchema,
})

export {
	ShowIndexItemSchema,
	ShowIndexSchema,
	ShowSearchResultItemSchema,
	ShowSearchResultListSchema,
	ShowDetailsSchema,
}
