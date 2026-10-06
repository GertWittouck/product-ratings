import type { RatingCount } from '../types/rating'
import {
  getAverageRating,
  getPercentage,
  getRatingLabel,
  getStarFill,
  getTotalReviews,
} from './rating'

const breakdown: RatingCount[] = [
  { stars: 5, count: 952 },
  { stars: 4, count: 171 },
  { stars: 3, count: 55 },
  { stars: 2, count: 14 },
  { stars: 1, count: 40 },
]

describe('getTotalReviews', () => {
  it('adds up all the counts', () => {
    expect(getTotalReviews(breakdown)).toBe(1232)
  })

  it('returns 0 for an empty breakdown', () => {
    expect(getTotalReviews([])).toBe(0)
  })
})

describe('getAverageRating', () => {
  it('calculates the weighted average to one decimal place', () => {
    expect(getAverageRating(breakdown)).toBe(4.6)
  })

  it('returns 0 when there are no reviews', () => {
    expect(getAverageRating([])).toBe(0)
    expect(getAverageRating([{ stars: 5, count: 0 }])).toBe(0)
  })
})

describe('getRatingLabel', () => {
  it.each([
    [5, 'Excellent'],
    [4.5, 'Excellent'],
    [4.4, 'Very good'],
    [3.5, 'Very good'],
    [2.5, 'Good'],
    [1.5, 'Fair'],
    [1.4, 'Poor'],
    [0, 'Poor'],
  ])('returns the right label for %s', (average, label) => {
    expect(getRatingLabel(average)).toBe(label)
  })
})

describe('getPercentage', () => {
  it('returns the share of the total as a percentage', () => {
    expect(getPercentage(25, 100)).toBe(25)
  })

  it('returns 0 when the total is 0', () => {
    expect(getPercentage(5, 0)).toBe(0)
  })
})

describe('getStarFill', () => {
  it('fills whole stars and part of the last one', () => {
    const fills = [0, 1, 2, 3, 4].map((index) => getStarFill(index, 4.6))
    expect(fills[0]).toBe(1)
    expect(fills[3]).toBe(1)
    expect(fills[4]).toBeCloseTo(0.6)
  })

  it('never goes below 0 or above 1', () => {
    expect(getStarFill(4, 2)).toBe(0)
    expect(getStarFill(0, 5)).toBe(1)
  })
})
