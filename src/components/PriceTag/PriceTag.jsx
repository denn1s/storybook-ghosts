import styles from './PriceTag.module.css'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function PriceTag({ price, negotiable = false, size = 'md' }) {
  return (
    <div className={`${styles.wrapper} ${styles[`size-${size}`]}`}>
      <span className={styles.price}>{formatter.format(price)}</span>
      {negotiable && <span className={styles.negotiable}>negotiable due to demons</span>}
    </div>
  )
}
