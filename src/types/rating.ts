/** A star level in the rating breakdown (1 = worst, 5 = best). */
export type StarValue = 1 | 2 | 3 | 4 | 5

/** How many reviews were given a particular star level. */
export interface RatingCount {
  stars: StarValue
  count: number
}

/** The product rating data as returned by the API. */
export interface RatingSummary {
  maxStars: number
  breakdown: RatingCount[]
}
