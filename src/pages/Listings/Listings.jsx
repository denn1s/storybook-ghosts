import { useState, useMemo } from 'react'
import PropertyCard from '../../components/PropertyCard'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import { properties } from '../../data/properties'
import styles from './Listings.module.css'

const filters = [
  { id: 'all', label: 'All Properties' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'poltergeist', label: 'Poltergeist' },
  { id: 'wraith', label: 'Wraith' },
  { id: 'banshee', label: 'Banshee' },
  { id: 'demon', label: 'Demon' },
]

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price (low to high)' },
  { id: 'price-desc', label: 'Price (high to low)' },
  { id: 'haunting-desc', label: 'Most haunted' },
  { id: 'haunting-asc', label: 'Least haunted' },
]

export default function Listings() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('featured')

  const visible = useMemo(() => {
    let list = properties
    if (filter !== 'all') {
      list = list.filter((p) => p.primaryHaunting === filter)
    }
    list = [...list]
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'haunting-desc') list.sort((a, b) => b.hauntingRating - a.hauntingRating)
    if (sort === 'haunting-asc') list.sort((a, b) => a.hauntingRating - b.hauntingRating)
    return list
  }, [filter, sort])

  return (
    <div>
      <PageHeader
        eyebrow="Currently on the market"
        title="Distinguished Hauntings, Now Available"
        subtitle="Ten properties of unusual character. All disclosures on file."
      />

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {filters.map((f) => (
            <Button
              key={f.id}
              variant={filter === f.id ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        <label className={styles.sort}>
          <span className={styles.sortLabel}>Sort</span>
          <select
            className={styles.select}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No properties match that haunting.</p>
          <p className={styles.emptyHint}>Try a less specific filter, or summon something new.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {visible.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
