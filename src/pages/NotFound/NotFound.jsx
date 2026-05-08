import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.eyebrow}>404</p>
      <h1 className={styles.title}>This page is missing.</h1>
      <p className={styles.body}>
        Or it never existed. Records from this floor are unreliable.
      </p>
      <Link to="/" className={styles.link}>
        ← Return to listings
      </Link>
    </div>
  )
}
