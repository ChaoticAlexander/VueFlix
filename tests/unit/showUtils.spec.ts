import { describe, it, expect } from 'vitest'
import {
	organizeShowListByGenre,
	filterShowListByGenre,
	sortShowListByRating,
	sortOrganizedShowListByRating,
	getShowRunningYearsString,
} from '../../app/shared/utils/showUtils'

describe('showUtils', () => {
	interface TestShow {
		id?: number
		genres?: string[]
		rating?: number
		premiered?: string | null
		ended?: string | null
	}

	it('organizeShowListByGenre handles undefined genres', () => {
		const input: TestShow[] = [
			{ id: 1 },
			{ id: 2, genres: ['Drama', 'Comedy'] },
		]
		const res = organizeShowListByGenre(input)
		expect(res.Drama.length).toBe(1)
		expect(res.Comedy.length).toBe(1)
		expect(res.Action).toBeUndefined()
	})

	it('filterShowListByGenre filters correctly', () => {
		const input: TestShow[] = [
			{ id: 1, genres: ['Drama'] },
			{ id: 2, genres: ['Comedy'] },
			{ id: 3 },
		]
		expect(filterShowListByGenre(input, 'Drama').map((s) => s.id)).toEqual([1])
		expect(filterShowListByGenre(input, 'Sci-Fi')).toEqual([])
	})

	it('sortShowListByRating sorts and pushes undefined to end', () => {
		const input: TestShow[] = [
			{ rating: 9 },
			{ rating: undefined },
			{ rating: 7 },
		]
		const res = sortShowListByRating(input)
		expect(res.map((s) => s.rating)).toEqual([9, 7, undefined])
	})

	it('sortOrganizedShowListByRating sorts each genre independently', () => {
		const organized: Record<string, TestShow[]> = {
			Drama: [{ rating: 3 }, { rating: 9 }],
			Comedy: [{ rating: 1 }, { rating: 5 }],
		}
		const res = sortOrganizedShowListByRating(organized)
		expect(res.Drama.map((s) => s.rating)).toEqual([9, 3])
		expect(res.Comedy.map((s) => s.rating)).toEqual([5, 1])
	})

	it('getShowRunningYearsString handles ongoing and same-year endings', () => {
		expect(
			getShowRunningYearsString({ premiered: '2012-01-01', ended: null }),
		).toBe('(2012 - Ongoing)')
		expect(
			getShowRunningYearsString({
				premiered: '2012-01-01',
				ended: '2012-12-31',
			}),
		).toBe('(2012)')
		expect(getShowRunningYearsString({ premiered: null, ended: null })).toBe('')
	})
})
