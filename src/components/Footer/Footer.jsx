import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.mark}>✦</span> Ravenmoor & Co.
        </div>
        <p className={styles.tagline}>
          Discreet representation for distinguished hauntings since 1923.
        </p>
        <p className={styles.fineprint}>
          All listings disclosed in accordance with the Spectral Disclosure Act of 1947.
          Demonic clauses non-negotiable in select states.
        </p>
      </div>
    </footer>
  )
}
