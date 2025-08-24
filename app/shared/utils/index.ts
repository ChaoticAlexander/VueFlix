const stripHTML = (input?: string | null): string =>
	input?.replace(/<\/?[^>]+(>|$)/g, '') ?? ''

export { stripHTML }
