import '../styles/Contact.css'
import { ContactForm } from './ContactForm'

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <span className="eyebrow">Demande de devis</span>
            <h3>Parlons de votre prochain projet</h3>
            <p>Vous avez besoin de développer votre prospection, de gérer vos appels entrants ou d'améliorer votre service client ? Présentez-nous votre besoin et recevez une réponse personnalisée sous 24 heures.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
