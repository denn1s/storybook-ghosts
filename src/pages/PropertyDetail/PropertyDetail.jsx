import { useParams, Link } from 'react-router-dom'
import { findProperty } from '../../data/properties'
import { findGhost } from '../../data/ghosts'
import { findAgent } from '../../data/agents'
import GhostBadge from '../../components/GhostBadge'
import HauntingRating from '../../components/HauntingRating'
import PriceTag from '../../components/PriceTag'
import Button from '../../components/Button'
import WitnessQuote from '../../components/WitnessQuote'
import AgentCard from '../../components/AgentCard'
import GhostCard from '../../components/GhostCard'
import styles from './PropertyDetail.module.css'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = findProperty(id)

  if (!property) {
    return (
      <div className={styles.missing}>
        <h2>This property is not on the market.</h2>
        <p>Or never was. Records are uncertain.</p>
        <Link to="/">← Back to listings</Link>
      </div>
    )
  }

  const ghosts = property.ghostIds.map(findGhost).filter(Boolean)
  const agent = findAgent(property.agentId)

  return (
    <article className={styles.page}>
      <div className={styles.crumb}>
        <Link to="/">← All listings</Link>
      </div>

      <div className={styles.hero}>
        <img src={property.image} alt={property.title} className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroBadges}>
          <GhostBadge type={property.primaryHaunting} />
        </div>
      </div>

      <header className={styles.titleBlock}>
        <div>
          <p className={styles.eyebrow}>{property.style} · Built {property.yearBuilt}</p>
          <h1 className={styles.title}>{property.title}</h1>
          <p className={styles.address}>{property.address}</p>
        </div>
        <div className={styles.priceBlock}>
          <PriceTag price={property.price} negotiable={property.negotiable} size="lg" />
          <Button variant="primary" size="lg">
            Schedule a Viewing
          </Button>
        </div>
      </header>

      <section className={styles.statsRow}>
        <Stat label="Bedrooms" value={property.bedrooms} />
        <Stat label="Bathrooms" value={property.bathrooms} />
        <Stat label="Square feet" value={property.sqft.toLocaleString()} />
        <Stat
          label="Haunting"
          value={<HauntingRating rating={property.hauntingRating} size="md" showLabel />}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About this property</h2>
        <p className={styles.description}>{property.description}</p>
      </section>

      {property.gallery && property.gallery.length > 1 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.gallery}>
            {property.gallery.map((src, i) => (
              <img key={i} src={src} alt={`${property.title} ${i + 1}`} className={styles.galleryImage} />
            ))}
          </div>
        </section>
      )}

      {property.incidents.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Disclosed Incidents</h2>
          <ul className={styles.incidents}>
            {property.incidents.map((incident, i) => (
              <li key={i} className={styles.incident}>
                <span className={styles.incidentMark}>✦</span>
                {incident}
              </li>
            ))}
          </ul>
        </section>
      )}

      {ghosts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Resident Spirits</h2>
          <div className={styles.ghosts}>
            {ghosts.map((g) => (
              <GhostCard key={g.id} ghost={g} />
            ))}
          </div>
        </section>
      )}

      {property.witnessQuotes.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>From the record</h2>
          <div className={styles.quotes}>
            {property.witnessQuotes.map((q, i) => (
              <WitnessQuote key={i} quote={q.quote} witness={q.witness} date={q.date} />
            ))}
          </div>
        </section>
      )}

      {agent && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Listing Agent</h2>
          <AgentCard agent={agent} />
        </section>
      )}
    </article>
  )
}

function Stat({ label, value }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  )
}
