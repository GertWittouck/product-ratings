import { getStarFill } from '../../utils/rating'
import { StarTile } from '../StarTile/StarTile'
import styles from './StarRating.module.css'

export interface StarRatingProps {
  rating: number
  maxStars?: number
}

/**
 * A row of star tiles showing a rating such as 4.6 out of 5.
 * It is hidden from screen readers because the rating is also shown as text next to it.
 */
export function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  const tiles = []
  for (let index = 0; index < maxStars; index++) {
    tiles.push(<StarTile key={index} fill={getStarFill(index, rating)} />)
  }

  return (
    <div className={styles.stars} aria-hidden="true">
      {tiles}
    </div>
  )
}
