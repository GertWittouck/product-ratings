import { getPercentage } from '../../utils/rating'
import { StarIcon } from '../StarIcon/StarIcon'
import styles from './RatingBar.module.css'

export interface RatingBarProps {
  stars: number
  count: number
  total: number
}

/** One row of the breakdown: star level, a bar showing its share of all reviews, and the count. */
export function RatingBar({ stars, count, total }: RatingBarProps) {
  const percentage = getPercentage(count, total)

  return (
    <li className={styles.row}>
      {/* Read out by screen readers instead of the visual parts below */}
      <span className="visually-hidden">
        {stars} {stars === 1 ? 'star' : 'stars'}: {count} reviews ({Math.round(percentage)}%)
      </span>

      <span className={styles.stars} aria-hidden="true">
        {stars}
      </span>
      <StarIcon className={styles.icon} />
      <span className={styles.track} aria-hidden="true">
        <span
          className={styles.bar}
          style={{ width: `${percentage}%` }}
          data-testid="rating-bar-fill"
        />
      </span>
      <span className={styles.count} aria-hidden="true">
        {count}
      </span>
    </li>
  )
}
