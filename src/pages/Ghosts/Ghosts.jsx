import { useState } from 'react'
import GhostCard from '../../components/GhostCard'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import { ghosts, ghostTypeDescriptions } from '../../data/ghosts'
import styles from './Ghosts.module.css'

const types = ['all', 'friendly', 'poltergeist', 'wraith', 'banshee', 'demon', 'shade']

export default function Ghosts() {
  const [type, setType] = useState('all')

  const visible = type === 'all' ? ghosts : ghosts.filter((g) => g.type === type)

  return (
    <div>
      <PageHeader
        eyebrow="Resident Spirits"
        title="The Ghost Roster"
        subtitle="Every entity currently on file. Profiles updated quarterly, or sooner if circumstances change."
      />

      <div className={styles.filters}>
        {types.map((t) => (
          <Button
            key={t}
            variant={type === t ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setType(t)}
          >
            {t === 'all' ? 'All Spirits' : t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>

      {type !== 'all' && ghostTypeDescriptions[type] && (
        <p className={styles.typeNote}>{ghostTypeDescriptions[type]}</p>
      )}

      <div className={styles.grid}>
        {visible.map((g) => (
          <GhostCard key={g.id} ghost={g} />
        ))}
      </div>
    </div>
  )
}
