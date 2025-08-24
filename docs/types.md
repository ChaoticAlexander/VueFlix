## Types

Types are inferred from Zod schemas and re-exported from `app/shared/types/showTypes.ts`:

- `Show` → `z.infer<typeof RawShowSchema>`
- `ShowIndexItem`, `ShowIndex`
- `OrganizedShowList<T>` → `Record<string, T[]>`
- `ShowSearchResultItem`, `ShowSearchResultList`
- `ShowImage`, `ShowImages`
- `CastMember`, `CastList`

Location: `app/shared/types/showTypes.ts`

Notes:

- `OrganizedShowList<T>` is a simple `Record<string, T[]>` used by the home page to group shows by genre.

Related: [schemas.md](./schemas.md)
