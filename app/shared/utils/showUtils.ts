import type {
	Show,
	ShowList,
	OrganizedShowList,
	ShowSearchResultItem
} from '~/shared/types/showTypes'

const organizeShowsByGenre = (shows: ShowList): OrganizedShowList => {
	const organizedShows: OrganizedShowList = {}

	for (const show of shows) {
		for (const genre of show.genres) {
			;(organizedShows[genre] ??= []).push(show)
		}
	}

	return organizedShows
}

const sortShowList = (shows: ShowList): ShowList => {
	if (!shows) return []
	const score = (show: Show) => show.rating?.average ?? -Infinity
	return [...shows].sort((a, b) => score(b) - score(a))
}

const sortOrganizedShowList = (shows: OrganizedShowList): OrganizedShowList =>
	Object.fromEntries(
		Object.entries(shows).map(([genre, list]) => [genre, sortShowList(list)]),
	)

const getShowRunningYearsString = (show: Show | ShowSearchResultItem) => {
	const premiereYear = show.premiered
		? new Date(show.premiered).getFullYear()
		: null

	const endYear = show.ended
		? new Date(show.ended).getFullYear()
		: 'Ongoing'

	if (!premiereYear) return ''

	return `(${premiereYear === endYear ? premiereYear : `${premiereYear} - ${endYear}`})`
}

export { organizeShowsByGenre, sortShowList, sortOrganizedShowList, getShowRunningYearsString }
