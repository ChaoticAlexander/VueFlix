import type { z } from 'zod'
import type { ShowSchema, ShowListSchema } from '~/shared/schemas/showSchemas'

type Show = z.infer<typeof ShowSchema>
type ShowList = z.infer<typeof ShowListSchema>
type OrganizedShowList = Record<string, ShowList>

export type { Show, ShowList, OrganizedShowList }
