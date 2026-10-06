import { StarIcon } from '../StarIcon/StarIcon'
import styles from './StarTile.module.css'

export interface StarTileProps {
  /** How much of the tile is coloured in, from 0 (empty) to 1 (full). */
  fill: number
}

/** A single square star tile, coloured in from the left according to `fill`. */
export function StarTile({ fill }: StarTileProps) {
  return (
    <span className={styles.tile} data-testid="star-tile">
      <span className={styles.fill} style={{ width: `${fill * 100}%` }} />
      <StarIcon className={styles.icon} />
    </span>
  )
}
