import type { Show, ShowList, OrganizedShowList } from '~/shared/types/showTypes'

const organizeShowsByGenre = (shows: ShowList): OrganizedShowList => {
	const organizedShows: OrganizedShowList = {}

	for (const show of shows) {
		for (const genre of show.genres) {
			(organizedShows[genre] ??= []).push(show)
		}
	}

	return organizedShows;
}

const sortShowList = (shows: ShowList): ShowList => {
	if (!shows) return []
	const score = (show: Show) => show.rating?.average ?? -Infinity
	return [...shows].sort((a, b) => score(b) - score(a))
}

const sortOrganizedShowList = (shows: OrganizedShowList): OrganizedShowList =>
	Object.fromEntries(
		Object.entries(shows).map(([genre, list]) => [genre, sortShowList(list)])
	)

export {
	organizeShowsByGenre,
	sortShowList,
	sortOrganizedShowList
}