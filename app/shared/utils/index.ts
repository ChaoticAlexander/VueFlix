const stripHTML = (input: string): string =>
	input.replace(/<\/?[^>]+(>|$)/g, '')

export {
	stripHTML,
}