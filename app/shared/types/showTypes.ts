import type { z } from 'zod'
import type { ShowSchema, ShowListSchema, ShowSearchResultSchema } from '~/shared/schemas/showSchemas'

type Show = z.infer<typeof ShowSchema>
type ShowList = z.infer<typeof ShowListSchema>
type OrganizedShowList = Record<string, ShowList>

type ShowSearchResults = z.infer<typeof ShowSearchResultSchema>
type ShowSearchResultItem = ShowSearchResults[number]

export type { Show, ShowList, OrganizedShowList, ShowSearchResults, ShowSearchResultItem }
