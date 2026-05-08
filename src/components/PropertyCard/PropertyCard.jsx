import { Link } from 'react-router-dom'
import GhostBadge from '../GhostBadge'
import HauntingRating from '../HauntingRating'
import PriceTag from '../PriceTag'
import styles from './PropertyCard.module.css'

export default function PropertyCard({ property }) {
  const {
    id,
    title,
    address,
    price,
    image,
    bedrooms,
    bathrooms,
    sqft,
    hauntingRating,
    primaryHaunting,
    negotiable,
  } = property

  return (
    <Link to={`/property/${id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={image} alt={title} className={styles.image} loading="lazy" />
        <div className={styles.imageOverlay} />
        <div className={styles.badgeRow}>
          <GhostBadge type={primaryHaunting} size="sm" />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <HauntingRating rating={hauntingRating} size="sm" />
        </div>
        <p className={styles.address}>{address}</p>

        <div className={styles.specs}>
          <span>{bedrooms} bd</span>
          <span className={styles.specDot}>·</span>
          <span>{bathrooms} ba</span>
          <span className={styles.specDot}>·</span>
          <span>{sqft.toLocaleString()} sqft</span>
        </div>

        <div className={styles.priceRow}>
          <PriceTag price={price} negotiable={negotiable} size="md" />
        </div>
      </div>
    </Link>
  )
}
