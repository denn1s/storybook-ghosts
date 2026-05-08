import styles from './GhostBadge.module.css'

const labels = {
  poltergeist: 'Poltergeist',
  wraith: 'Wraith',
  friendly: 'Friendly Spirit',
  banshee: 'Banshee',
  demon: 'Demon',
  shade: 'Shade',
}

export default function GhostBadge({ type = 'wraith', size = 'md', label }) {
  const classes = [styles.badge, styles[`type-${type}`], styles[`size-${size}`]].join(' ')

  return (
    <span className={classes}>
      <span className={styles.dot} aria-hidden="true" />
      {label || labels[type] || type}
    </span>
  )
}
