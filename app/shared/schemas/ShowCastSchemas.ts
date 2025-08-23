import { z } from 'zod'

const CountrySchema = z.object({
	name: z.string(),
	code: z.string(),
	timezone: z.string(),
})

const ImageSchema = z.object({
	medium: z.url(),
	original: z.url(),
})

const LinkSchema = z.object({
	self: z.object({
		href: z.url(),
	}),
})

const PersonSchema = z.object({
	id: z.number(),
	url: z.url(),
	name: z.string(),
	country: CountrySchema.nullish(),
	birthday: z.string().nullish(),
	deathday: z.string().nullish(),
	gender: z.string().nullish(),
	image: ImageSchema.nullish(),
	updated: z.number(),
	_links: LinkSchema,
})

const CharacterSchema = z.object({
	id: z.number(),
	url: z.url(),
	name: z.string(),
	image: ImageSchema.nullish(),
	_links: LinkSchema,
})

export const CastMemberSchema = z.object({
	person: PersonSchema,
	character: CharacterSchema,
	self: z.boolean(),
	voice: z.boolean(),
})

export const ShowCastListSchema = z
	.array(CastMemberSchema)
	.transform((cast) => cast.map((member) => member.person.name))
