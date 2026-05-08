import GhostBadge from '../GhostBadge'
import styles from './GhostCard.module.css'

export default function GhostCard({ ghost }) {
  if (!ghost) return null

  return (
    <article className={styles.card}>
      <div className={styles.portraitWrap}>
        <img src={ghost.portrait} alt={ghost.name} className={styles.portrait} loading="lazy" />
        <div className={styles.portraitOverlay} />
      </div>
      <div className={styles.body}>
        <header className={styles.header}>
          <h3 className={styles.name}>{ghost.name}</h3>
          <GhostBadge type={ghost.type} size="sm" />
        </header>
        <p className={styles.dates}>
          <span className={styles.dateLabel}>Deceased </span>
          {ghost.deceased}
        </p>
        <p className={styles.bio}>{ghost.bio}</p>
        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt>Activity</dt>
            <dd>
              <ActivityBars level={ghost.activityLevel} />
            </dd>
          </div>
          <div className={styles.metaRow}>
            <dt>Grievance</dt>
            <dd className={styles.grievance}>{ghost.grievance}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

function ActivityBars({ level = 0, max = 5 }) {
  return (
    <span className={styles.bars}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`${styles.bar} ${i < level ? styles.barActive : ''}`} />
      ))}
    </span>
  )
}
