import type { z } from 'zod'
import type { RawShowSchema } from '~/shared/schemas/RawShowSchema'
import type {
	ShowIndexItemSchema,
	ShowIndexSchema,
	ShowSearchResultItemSchema,
	ShowSearchResultListSchema,
} from '~/shared/schemas/showSchemas'
import type {
	ShowImageSchema,
	ShowImagesSchema,
} from '~/shared/schemas/ShowImageSchemas'
import type {
	ShowCastListSchema,
	CastMemberSchema,
} from '~/shared/schemas/ShowCastSchemas'

// Show Types
export type Show = z.infer<typeof RawShowSchema>
export type ShowIndexItem = z.infer<typeof ShowIndexItemSchema>
export type ShowIndex = z.infer<typeof ShowIndexSchema>
export type OrganizedShowList<T> = Record<string, T[]>

export type ShowSearchResultList = z.infer<typeof ShowSearchResultListSchema>
export type ShowSearchResultItem = z.infer<typeof ShowSearchResultItemSchema>

// Image Types
export type ShowImage = z.infer<typeof ShowImageSchema>
export type ShowImages = z.infer<typeof ShowImagesSchema>

// Cast Types
export type CastMember = z.infer<typeof CastMemberSchema>
export type CastList = z.infer<typeof ShowCastListSchema>
