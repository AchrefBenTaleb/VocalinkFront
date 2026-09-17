import '../styles/Hero.css'
import { ScrollLink } from './ScrollLink'
import heroImg from '../assets/img.jpg'

export function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(20,32,87,0.82) 0%, rgba(33,56,168,0.72) 48%, rgba(79,110,247,0.54) 100%), url(${heroImg})`,
      }}
    >
      <div className="container hero-inner">
        <div className="hero-badge"><span className="dot"></span> Centre d'appels basé à Sousse, Tunisie</div>
        <h1>Transformez chaque appel en opportunité</h1>
        <p>Vocalink Tunisie met à votre disposition une équipe de téléconseillers formés pour gérer vos appels, développer votre portefeuille client et renforcer votre relation avec vos prospects.</p>
        <div className="hero-buttons">
          <ScrollLink href="#contact" className="btn btn-primary">Demander un devis gratuit</ScrollLink>
          <ScrollLink href="#services" className="btn btn-secondary">Nos services</ScrollLink>
        </div>
      </div>
    </section>
  )
}
