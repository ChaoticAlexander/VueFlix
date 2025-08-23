import { z } from 'zod'

// sub-schemas
const CountrySchema = z.object({
	name: z.string(),
	code: z.string().optional(),
	timezone: z.string(),
})

const NetworkSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	country: CountrySchema.nullish(),
	officialSite: z.url().nullish(),
})

const ScheduleSchema = z.object({
	time: z.string(),
	days: z.array(z.string()),
})

const RatingSchema = z.object({
	average: z.number().nullable(),
}).transform(({ average }) => average ?? undefined)

const ExternalsSchema = z.object({
	tvrage: z.number().nullish(),
	thetvdb: z.number().nullish(),
	imdb: z.string().nullish(),
})

const ImageSchema = z.object({
	medium: z.url(),
	original: z.url(),
})

const LinkRefSchema = z.object({
	href: z.url(),
	name: z.string().optional(),
})

const LinksSchema = z.object({
	self: LinkRefSchema,
	previousepisode: LinkRefSchema.optional(),
})

// Main Schema
export const RawShowSchema = z.object({
	id: z.number(),
	url: z.url(),
	name: z.string(),
	type: z.string(),
	language: z.string().optional(),
	genres: z.array(z.string()).optional(),
	status: z.string().optional(),
	runtime: z.number().nullish(),
	averageRuntime: z.number().nullish(),
	premiered: z.string().nullable(),
	ended: z.string().nullable(),
	officialSite: z.url().nullish(),
	schedule: ScheduleSchema,
	rating: RatingSchema.optional(),
	weight: z.number().optional(),
	network: NetworkSchema.nullish(),
	externals: ExternalsSchema.optional(),
	image: ImageSchema.optional().nullable(),
	summary: z.string().nullable(),
	updated: z.number(),
	_links: LinksSchema,
})
