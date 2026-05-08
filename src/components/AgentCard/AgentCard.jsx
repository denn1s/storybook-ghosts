import styles from './AgentCard.module.css'

export default function AgentCard({ agent, compact = false }) {
  if (!agent) return null

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <div className={styles.portraitWrap}>
        <img src={agent.portrait} alt={agent.name} className={styles.portrait} loading="lazy" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{agent.name}</h3>
        <p className={styles.title}>{agent.title}</p>
        <p className={styles.specialty}>
          <span className={styles.specialtyLabel}>Specialty </span>
          {agent.specialty}
        </p>
        {!compact && (
          <>
            <p className={styles.bio}>{agent.bio}</p>
            <blockquote className={styles.motto}>"{agent.motto}"</blockquote>
            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt>Years active</dt>
                <dd>{agent.yearsActive}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Languages</dt>
                <dd>{agent.languages.join(', ')}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Contact</dt>
                <dd>
                  <a href={`mailto:${agent.contact}`}>{agent.contact}</a>
                </dd>
              </div>
            </dl>
          </>
        )}
      </div>
    </article>
  )
}
