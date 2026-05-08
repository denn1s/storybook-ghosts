import styles from './WitnessQuote.module.css'

export default function WitnessQuote({ quote, witness, date }) {
  return (
    <figure className={styles.figure}>
      <span className={styles.mark} aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className={styles.quote}>{quote}</blockquote>
      <figcaption className={styles.caption}>
        <span className={styles.witness}>— {witness}</span>
        {date && <span className={styles.date}>{date}</span>}
      </figcaption>
    </figure>
  )
}
