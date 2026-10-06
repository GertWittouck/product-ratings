import type { RatingCount } from '../types/rating'

/** Adds up the number of reviews across all star levels. */
export function getTotalReviews(breakdown: RatingCount[]): number {
  return breakdown.reduce((total, row) => total + row.count, 0)
}

/** Weighted average of all reviews, rounded to one decimal place. Returns 0 when there are no reviews. */
export function getAverageRating(breakdown: RatingCount[]): number {
  const total = getTotalReviews(breakdown)
  if (total === 0) {
    return 0
  }

  const sumOfStars = breakdown.reduce((sum, row) => sum + row.stars * row.count, 0)
  return Math.round((sumOfStars / total) * 10) / 10
}

/** Turns an average rating into the word shown above the stars. */
export function getRatingLabel(average: number): string {
  if (average >= 4.5) return 'Excellent'
  if (average >= 3.5) return 'Very good'
  if (average >= 2.5) return 'Good'
  if (average >= 1.5) return 'Fair'
  return 'Poor'
}

/** Percentage (0-100) that `count` is of `total`. Returns 0 when total is 0 to avoid dividing by zero. */
export function getPercentage(count: number, total: number): number {
  if (total <= 0) {
    return 0
  }
  return (count / total) * 100
}

/**
 * How much of a single star tile should be filled, between 0 and 1.
 * `index` is zero-based, so for a rating of 4.6 the tiles are 1, 1, 1, 1, 0.6.
 */
export function getStarFill(index: number, rating: number): number {
  const fill = rating - index
  return Math.min(Math.max(fill, 0), 1)
}
