export interface StarIconProps {
  className?: string
}

/** A decorative five-pointed star. Colour comes from the CSS `color` of the parent. */
export function StarIcon({ className }: StarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.5l2.94 6.18 6.76.85-4.97 4.68 1.27 6.7L12 17.62l-6 3.29 1.27-6.7L2.3 9.53l6.76-.85L12 2.5z" />
    </svg>
  )
}
