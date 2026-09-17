import '../styles/Testimonials.css'
import { useCallback, useEffect, useState } from 'react'
import { fetchHomepageFeedback } from '../utils/api'
import { TestimonialForm } from './TestimonialForm'

function relativeDate(dateStr) {
  const days = Math.max(0, Math.round((Date.now() - new Date(dateStr)) / 86400000))
  if (days === 0) return "Aujourd'hui"
  if (days === 1) return 'Il y a 1 jour'
  return `Il y a ${days} jours`
}

const SERVICE_LABELS = {
  'service-client': 'Service Client',
  'back-office': 'Back Office',
  ecommerce: 'Support E-commerce',
  commercial: 'Support Commercial',
  telemarketing: 'Télémarketing',
  autre: 'Autre service',
}

export function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  // Récupère la sélection d'avis (5 positifs + 1 négatif) exposée par
  // l'API. Ré-appelé après l'envoi d'un nouvel avis pour refléter le
  // remplacement d'un avis ancien.
  const loadReviews = useCallback(async () => {
    setLoading(true)
    const data = await fetchHomepageFeedback()
    setReviews(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  return (
    <section className="testimonials" id="avis">
      <div className="container">
        <div className="feedback-grid">
          <div className="feedback-info reveal">
            <span className="eyebrow">Votre avis</span>
            <h3>Partagez votre expérience</h3>
            <p>Vous avez travaillé avec Vocalink Tunisie ou testé notre centre d'appels ? Vos retours nous aident à améliorer continuellement la qualité de notre service.</p>
            <ul className="feedback-points">
              <li>Vos remarques sont lues par notre équipe</li>
              <li>Réponse possible sous 48 heures si besoin</li>
              <li>Avis traités en toute confidentialité</li>
            </ul>
          </div>

          <div className="feedback-content reveal">
            <div className="feedback-list" aria-label="Les derniers avis clients">
              {loading && <p className="feedback-status">Chargement des avis...</p>}
              {!loading && reviews.length === 0 && (
                <p className="feedback-status">Soyez le premier à partager votre expérience.</p>
              )}
              {reviews.map((review) => (
                <article className="feedback-review" key={review._id}>
                  <div className="review-head">
                    <div className="review-author">
                      <strong>{review.nom}</strong>
                      {review.service && SERVICE_LABELS[review.service] && (
                        <span className="review-service">{SERVICE_LABELS[review.service]}</span>
                      )}
                    </div>
                    <span className="stars" aria-label={`${review.note} sur 5`}>{'★'.repeat(review.note)}</span>
                  </div>
                  <p>{review.message}</p>
                  <time dateTime={review.createdAt}>{relativeDate(review.createdAt)}</time>
                </article>
              ))}
            </div>
            <TestimonialForm onSubmitted={loadReviews} />
          </div>
        </div>
      </div>
    </section>
  )
}
