import '../styles/Footer.css'
import { ScrollLink } from './ScrollLink'
import logo from '../assets/logo.png'

export function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <a href="#" className="logo"><img className="logo-img" src={logo} alt="Vocalink Tunisie" /></a>
            <p>Basée à Sousse, Vocalink Tunisie accompagne les entreprises dans l'externalisation de leur relation client et le développement commercial, en leur proposant des services téléphoniques professionnels, réactifs et personnalisés.</p>
          </div>
          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li><ScrollLink href="#services">Services</ScrollLink></li>
              <li><ScrollLink href="#why-us">Pourquoi nous</ScrollLink></li>
              <li><ScrollLink href="#process">Processus</ScrollLink></li>
  
              <li><ScrollLink href="#avis">Avis</ScrollLink></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><ScrollLink href="#services">Service Client</ScrollLink></li>
              <li><ScrollLink href="#services">Back Office</ScrollLink></li>
              <li><ScrollLink href="#services">Support E-commerce</ScrollLink></li>
              <li><ScrollLink href="#services">Support Commercial</ScrollLink></li>
              <li><ScrollLink href="#services">Télémarketing</ScrollLink></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Nos coordonnées</h4>
            <div className="contact-details">
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <strong>Notre adresse</strong>
                  <span>Bureaux 3 et 4, 1er étage, Immeuble Jawhara 3, Sousse</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-text">
                  <strong>Email</strong>
                  <span>vocalinktunisie@gmail.com</span>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon" aria-hidden="true">WhatsApp</div>
                <div className="contact-text">
                  <strong>WhatsApp</strong>
                  <a href="https://wa.me/21698111491" target="_blank" rel="noreferrer">+216 98 111 491</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-text">
                  <strong>Téléphone</strong>
                  <span>+216 73 108 654</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Vocalink Tunisie. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
