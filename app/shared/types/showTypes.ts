import type { z } from 'zod'
import type { RawShowSchema } from '~/shared/schemas/RawShowSchema'
import type { ShowIndexItemSchema, ShowIndexSchema, ShowSearchResultItemSchema, ShowSearchResultListSchema } from '~/shared/schemas/showSchemas'

type Show = z.infer<typeof RawShowSchema>
type ShowIndexItem = z.infer<typeof ShowIndexItemSchema>
type ShowIndex = z.infer<typeof ShowIndexSchema>
type OrganizedShowList<T> = Record<string, T[]>

type ShowSearchResultList = z.infer<typeof ShowSearchResultListSchema>
type ShowSearchResultItem = z.infer<typeof ShowSearchResultItemSchema>

export type { Show, ShowIndexItem, ShowIndex, OrganizedShowList, ShowSearchResultList, ShowSearchResultItem }
