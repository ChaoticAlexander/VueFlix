import type { OrganizedShowList } from '~/shared/types/showTypes'

// Organizes a given show list by genre
const organizeShowListByGenre = <T extends { genres?: string[] }>(
	shows: T[],
): OrganizedShowList<T> => {
	const organizedShows: OrganizedShowList<T> = {}

	for (const show of shows) {
		for (const genre of show?.genres ?? []) {
			;(organizedShows[genre] ??= []).push(show)
		}
	}

	return organizedShows
}

// Filters a given list of shows by genre, returning only the items that have that genre
const filterShowListByGenre = <T extends { genres?: string[] }>(
	shows: T[],
	genre: string,
): T[] => shows.filter((show) => show.genres?.includes(genre))

// Sorts a list of shows by rating
const sortShowListByRating = <T extends { rating?: number }>(
	shows: T[],
): T[] => {
	if (!shows) return []
	const score = (show: T) => show.rating ?? -Infinity
	return [...shows].sort((a, b) => score(b) - score(a))
}

// Sorts an organized list of shows, by rating
const sortOrganizedShowListByRating = <T extends { rating?: number }>(
	shows: OrganizedShowList<T>,
): OrganizedShowList<T> =>
	Object.fromEntries(
		Object.entries(shows).map(([genre, list]) => [genre, sortShowListByRating(list)]),
	)

// returns the running years of a show as a string. example: (2010 - 2014)
const getShowRunningYearsString = <
	T extends { premiered: string | null; ended: string | null },
>(
	show: T,
): string => {
	const premiereYear = show.premiered
		? new Date(show.premiered).getFullYear()
		: null

	const endYear = show.ended ? new Date(show.ended).getFullYear() : 'Ongoing'

	if (!premiereYear) return ''

	return `(${premiereYear === endYear ? premiereYear : `${premiereYear} - ${endYear}`})`
}

export {
	organizeShowListByGenre,
	sortShowListByRating,
	sortOrganizedShowListByRating,
	filterShowListByGenre,
	getShowRunningYearsString,
}
