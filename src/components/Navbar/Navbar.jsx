import { NavLink, Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/', label: 'Listings', end: true },
  { to: '/ghosts', label: 'Ghost Roster' },
  { to: '/agents', label: 'Agents' },
  { to: '/submit', label: 'Submit a Haunting' },
]

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            ✦
          </span>
          <span className={styles.brandText}>
            Ravenmoor <span className={styles.brandAmp}>&</span> Co.
          </span>
        </Link>

        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.linkActive : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
