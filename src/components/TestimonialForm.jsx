import { useRef, useState } from 'react'
import '../styles/Forms.css'
import { validate, getErrorMessage } from '../utils/validate'
import { submitFeedback } from '../utils/api'

export function TestimonialForm({ onSubmitted }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [fieldStates, setFieldStates] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})
  const [rating, setRating] = useState(0)
  const [ratingTouched, setRatingTouched] = useState(false)
  const formRef = useRef(null)

  const onFieldEvent = (e) => {
    const field = e.target
    const wasInvalid = fieldStates[field.name] === 'invalid'
    if (e.type === 'blur' || wasInvalid) {
      const valid = validate(field)
      setFieldStates((prev) => ({ ...prev, [field.name]: valid ? 'valid' : 'invalid' }))
      setFieldErrors((prev) => ({ ...prev, [field.name]: valid ? '' : getErrorMessage(field) }))
    }
  }

  const fieldClass = (name) => (fieldStates[name] === 'invalid' ? 'invalid' : fieldStates[name] === 'valid' ? 'valid' : '')
  const errorFor = (name) => (fieldStates[name] === 'invalid' ? fieldErrors[name] : '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = formRef.current
    const fields = form.querySelectorAll('input[name], select, textarea')
    let allValid = true
    let firstInvalid = null
    const next = {}
    const nextErrors = {}
    fields.forEach((field) => {
      const valid = validate(field)
      next[field.name] = valid ? 'valid' : 'invalid'
      nextErrors[field.name] = valid ? '' : getErrorMessage(field)
      if (!valid) {
        allValid = false
        if (!firstInvalid) firstInvalid = field
      }
    })
    setFieldStates(next)
    setFieldErrors(nextErrors)
    setRatingTouched(true)
    if (!allValid || rating === 0) {
      firstInvalid?.focus()
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const payload = Object.fromEntries(new FormData(form).entries())
      await submitFeedback({ ...payload, note: rating })
      setSubmitted(true)
      onSubmitted?.()
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    formRef.current.reset()
    setFieldStates({})
    setFieldErrors({})
    setRating(0)
    setRatingTouched(false)
    setSubmitted(false)
    setSubmitError(null)
    setOpen(false)
  }

  if (!open) {
    return (
      <div className="feedback-cta">
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>Donner votre avis</button>
      </div>
    )
  }

  return (
    <div className={`feedback-form-wrapper${submitted ? ' submitted' : ''}`}>
      <form noValidate ref={formRef} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fb-nom">Nom complet *</label>
          <input type="text" id="fb-nom" name="nom" required className={fieldClass('nom')} onBlur={onFieldEvent} onInput={onFieldEvent} />
          {errorFor('nom') && <span className="field-error">{errorFor('nom')}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fb-email">Email *</label>
          <input type="email" id="fb-email" name="email" required className={fieldClass('email')} onBlur={onFieldEvent} onInput={onFieldEvent} />
          {errorFor('email') && <span className="field-error">{errorFor('email')}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fb-service">Service concerné</label>
          <select id="fb-service" name="service" className={fieldClass('service')} onBlur={onFieldEvent} onChange={onFieldEvent}>
            <option value="">Sélectionnez un service</option>
            <option value="service-client">Service Client</option>
            <option value="back-office">Back Office</option>
            <option value="ecommerce">Support E-commerce</option>
            <option value="commercial">Support Commercial</option>
            <option value="telemarketing">Télémarketing</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div className="form-group">
          <label>Votre note *</label>
          <div className="rating-group" role="radiogroup" aria-label="Votre note">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                type="button"
                key={value}
                className={value <= rating ? 'selected' : ''}
                aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
                aria-pressed={value <= rating}
                onClick={() => {
                  setRating(value)
                  setRatingTouched(true)
                }}
              >
                ★
              </button>
            ))}
          </div>
          {ratingTouched && rating === 0 && <span className="field-error">Merci de choisir une note.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="fb-message">Votre avis *</label>
          <textarea id="fb-message" name="message" required placeholder="Décrivez votre expérience avec notre équipe..." className={fieldClass('message')} onBlur={onFieldEvent} onInput={onFieldEvent} />
          {errorFor('message') && <span className="field-error">{errorFor('message')}</span>}
        </div>
        {submitError && <p className="form-error">{submitError}</p>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
        </div>
      </form>

      <div className={`form-success${submitted ? ' show' : ''}`}>
        <div className="check">✓</div>
        <h4>Merci pour votre avis !</h4>
        <p>Votre retour a bien été enregistré et sera pris en compte par notre équipe.</p>
      </div>
    </div>
  )
}
