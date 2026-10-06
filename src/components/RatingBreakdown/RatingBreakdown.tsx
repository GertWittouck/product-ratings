import type { RatingCount } from '../../types/rating'
import { getTotalReviews } from '../../utils/rating'
import { RatingBar } from '../RatingBar/RatingBar'
import styles from './RatingBreakdown.module.css'

export interface RatingBreakdownProps {
  breakdown: RatingCount[]
}

/** The list of bars showing how many reviews each star level received, highest first. */
export function RatingBreakdown({ breakdown }: RatingBreakdownProps) {
  const total = getTotalReviews(breakdown)
  // Copy before sorting so we don't change the data we were given
  const sortedRows = [...breakdown].sort((a, b) => b.stars - a.stars)

  return (
    <ul className={styles.list} aria-label="Rating breakdown">
      {sortedRows.map((row) => (
        <RatingBar key={row.stars} stars={row.stars} count={row.count} total={total} />
      ))}
    </ul>
  )
}
