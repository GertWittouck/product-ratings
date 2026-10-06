import { useId } from 'react'
import type { RatingSummary } from '../../types/rating'
import { getAverageRating, getRatingLabel } from '../../utils/rating'
import { FeefoLogo } from '../FeefoLogo/FeefoLogo'
import { RatingBreakdown } from '../RatingBreakdown/RatingBreakdown'
import { StarRating } from '../StarRating/StarRating'
import styles from './ProductRating.module.css'

export interface ProductRatingProps {
  data: RatingSummary
}

/** The Feefo product rating card: overall score at the top, breakdown per star level below. */
export function ProductRating({ data }: ProductRatingProps) {
  const headingId = useId()
  const average = getAverageRating(data.breakdown)
  const label = getRatingLabel(average)

  return (
    <section className={styles.card} aria-labelledby={headingId}>
      <header className={styles.summary}>
        <h2 id={headingId} className={styles.label}>
          {label}
        </h2>
        <StarRating rating={average} maxStars={data.maxStars} />
        <p className={styles.score}>
          {average.toFixed(1)} out of {data.maxStars}
        </p>
        <p className={styles.brand}>
          Product Rating <FeefoLogo />
        </p>
      </header>

      <RatingBreakdown breakdown={data.breakdown} />
    </section>
  )
}
