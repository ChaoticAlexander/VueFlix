## Schemas (Zod)

Zod schemas define the data contracts for TVMaze responses and internal transformations.

Locations:

- `app/shared/schemas/RawShowSchema.ts`
- `app/shared/schemas/ShowImageSchemas.ts`
- `app/shared/schemas/ShowCastSchemas.ts`
- `app/shared/schemas/showSchemas.ts`

### RawShowSchema

Defines the full TVMaze Show object; optional fields support `null`/`undefined` where applicable. Notable transforms:

- `rating.average` → transformed to `number | undefined`.

### ShowImageSchemas

- `ShowImageSchema` validates image entries including `resolutions` metadata.
- `ShowImagesSchema` transforms the array into a map keyed by `type` with `{ original, medium? }` URLs. Entries with `type: null` are ignored; the first occurrence for a given type wins.

### ShowCastSchemas

- Validates person/character pair entries.
- `ShowCastListSchema` maps array to list of `person.name` strings.

### showSchemas

- `ShowIndexItemSchema`, `ShowIndexSchema`: compact shape for lists.
- `ShowSearchResultListSchema`: maps search API results to a list of compact shows.
- `ShowDetailsSchema`: aggregates `{ show, images, cast }`.

Related: [types.md](./types.md)
