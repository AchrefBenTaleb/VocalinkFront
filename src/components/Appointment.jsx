import '../styles/Appointment.css'
import { AppointmentForm } from './AppointmentForm'

export function Appointment() {
  return (
    <section className="appointment" id="rendez-vous">
      <div className="container">
        <div className="appointment-card reveal">
          <div className="appointment-info">
            <span className="eyebrow">Prendre rendez-vous</span>
            <h2>Réservez un échange avec notre équipe</h2>
            <p>Choisissez une date et un créneau qui vous conviennent. Nous confirmons votre rendez-vous par e-mail ou par téléphone sous 24 heures.</p>
            <ul className="appointment-points">
              <li>Échange téléphonique ou visioconférence, selon votre préférence</li>
              <li>15 à 20 minutes pour comprendre votre besoin</li>
              <li>Aucun engagement de votre part</li>
            </ul>
          </div>
          <AppointmentForm />
        </div>
      </div>
    </section>
  )
}
