import styles from './FeefoLogo.module.css'

export interface FeefoLogoProps {
  className?: string
}

/** The feefo wordmark with its two yellow "eyes". */
export function FeefoLogo({ className }: FeefoLogoProps) {
  return (
    <svg
      className={[styles.logo, className].filter(Boolean).join(' ')}
      viewBox="0 0 114 36"
      role="img"
      aria-label="Feefo"
    >
      <text x="0" y="32" className={styles.wordmark}>
        feefo
      </text>
      <circle cx="99" cy="10" r="5" className={styles.eye} />
      <circle cx="108" cy="10" r="5" className={styles.eye} />
    </svg>
  )
}
