## Testing

Test runner: Vitest.

Scripts:

- `pnpm test` → run tests
- `pnpm test:ui` → Vitest UI
- `pnpm test:watch` → watch mode

### Unit Tests

- `tests/unit/schemas.spec.ts`
  - Verifies `ShowImagesSchema` transformation and `ShowCastListSchema` mapping.
  - Ensures `RawShowSchema` accepts missing optionals.

- `tests/unit/showUtils.spec.ts`
  - Covers organize/filter/sort utilities and running years formatter.

- `tests/unit/showsRouter.errors.spec.ts`
  - Mocks `$fetch` and asserts error mapping to `SERVICE_UNAVAILABLE` for `search` and `details`.

Related: [schemas.md](./schemas.md), [api/trpc.md](./api/trpc.md)
