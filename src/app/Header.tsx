import type { JSX } from 'react'
import { NavLink } from 'react-router'
import './style.css'

export const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/map', label: 'Map' },
  { to: '/diy', label: 'DIY Setup' },
  { to: '/contribute', label: 'How To' },
  { to: '/learning', label: 'Learn' },
]

export const Header = (): JSX.Element => {
  return (
    <header style={{background: 'var(--blue-low)'}}>
      <nav className="siteNav" aria-label="Primary">
        <div className="siteBrand">Nature Sound Check</div>
        <div className="siteNavLinks">
          {navLinks.map((nav) => (
            <NavLink
              key={nav.to}
              to={nav.to}
              end={nav.end}
              className={({ isActive }) =>
                isActive ? 'siteNavLink siteNavLink-active' : 'siteNavLink'
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}