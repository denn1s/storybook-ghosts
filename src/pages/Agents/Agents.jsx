import AgentCard from '../../components/AgentCard'
import PageHeader from '../../components/PageHeader'
import { agents } from '../../data/agents'
import styles from './Agents.module.css'

export default function Agents() {
  return (
    <div>
      <PageHeader
        eyebrow="Our representatives"
        title="The Agents"
        subtitle="Discreet, licensed, and uniformly unbothered."
      />

      <div className={styles.list}>
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}
