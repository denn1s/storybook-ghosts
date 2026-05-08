import styles from './HauntingRating.module.css'

const labels = {
  1: 'Faintly Haunted',
  2: 'Mildly Haunted',
  3: 'Notably Haunted',
  4: 'Heavily Haunted',
  5: 'Catastrophic',
}

function Skull({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className={`${styles.skull} ${filled ? styles.filled : styles.empty}`}>
      <path
        d="M12 2C7 2 3 5.5 3 10c0 2.4 1 4.4 2.5 5.7V19a2 2 0 0 0 2 2h1v-2h2v2h3v-2h2v2h1a2 2 0 0 0 2-2v-3.3C20 14.4 21 12.4 21 10c0-4.5-4-8-9-8z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {filled && (
        <>
          <circle cx="9" cy="11" r="1.4" fill="#0e0c12" />
          <circle cx="15" cy="11" r="1.4" fill="#0e0c12" />
        </>
      )}
    </svg>
  )
}

export default function HauntingRating({ rating = 0, max = 5, size = 'md', showLabel = false }) {
  const safe = Math.max(0, Math.min(max, rating))

  return (
    <div className={`${styles.wrapper} ${styles[`size-${size}`]}`}>
      <div className={styles.skulls} role="img" aria-label={`${safe} of ${max} skulls`}>
        {Array.from({ length: max }, (_, i) => (
          <Skull key={i} filled={i < safe} />
        ))}
      </div>
      {showLabel && <span className={styles.label}>{labels[safe] || 'Unhaunted'}</span>}
    </div>
  )
}
