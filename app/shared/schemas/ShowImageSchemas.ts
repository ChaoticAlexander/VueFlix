import { z } from 'zod'

const ImageResolutionSchema = z.object({
	url: z.url(),
	width: z.number(),
	height: z.number(),
})

export const ShowImageSchema = z.object({
	id: z.number(),
	type: z.string().nullable(),               // e.g. "poster", "background"
	main: z.boolean(),
	resolutions: z.object({
		original: ImageResolutionSchema,
		medium: ImageResolutionSchema.optional(), // not always present
	}),
})

export const ShowImagesSchema = z.array(ShowImageSchema).transform(arr => {
	const out: Record<string, { original: string; medium?: string }> = {}

	for (const img of arr) {
		const t = img.type ?? null
		if (!t) continue
		if (out[t]) continue

		out[t] = {
			original: img.resolutions.original.url,
			medium: img.resolutions.medium?.url,
		}
	}

	return out
})

