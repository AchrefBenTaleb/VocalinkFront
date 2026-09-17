import { useState } from 'react'
import '../styles/Header.css'
import { ScrollLink } from './ScrollLink'
import { useActiveNav } from '../hooks/useActiveNav'
import { NAV_LINKS } from '../data/siteData'
import { HoursTicker } from './HoursTicker'
import logo from '../assets/logo.png'

export function Header() {
  const [activeSection, setActiveSection] = useState('')
  useActiveNav(setActiveSection)

  return (
    <header>
      <div className="container">
        <nav>
          <ScrollLink href="#" className="logo">
            <img className="logo-img" src={logo} alt="Vocalink Tunisie" />
          </ScrollLink>
          <ul className="nav-links" id="navLinks">
            {NAV_LINKS.map((link) => (
              <li key={link.section}>
                <ScrollLink
                  href={link.href}
                  data-section={link.section}
                  className={activeSection === link.section ? 'active' : ''}
                >
                  {link.label}
                </ScrollLink>
              </li>
            ))}
          </ul>
          <div className="nav-cta-group">
            <ScrollLink href="#rendez-vous" className="btn btn-secondary">Prendre rendez-vous</ScrollLink>
            <ScrollLink href="#contact" className="btn btn-primary">Demander un devis</ScrollLink>
          </div>
        </nav>
      </div>
      <HoursTicker />
    </header>
  )
}
