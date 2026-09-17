import { useEffect, useRef, useState } from 'react'
import '../styles/Forms.css'
import { validate, getErrorMessage, OPENING_HOUR, CLOSING_HOUR } from '../utils/validate'
import { submitAppointment } from '../utils/api'

export function AppointmentForm() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [fieldStates, setFieldStates] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})
  const formRef = useRef(null)
  const dateInputRef = useRef(null)
  const heureInputRef = useRef(null)

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.min = new Date().toISOString().split('T')[0]
    }
    if (heureInputRef.current) {
      heureInputRef.current.min = OPENING_HOUR
      heureInputRef.current.max = CLOSING_HOUR
      heureInputRef.current.step = 900
    }
  }, [])

  useEffect(() => {
    function handler(e) {
      e.preventDefault()
      setOpen(true)
      const section = document.getElementById('rendez-vous')
      section.classList.add('appointment-open')
      document.body.style.overflow = 'hidden'
      setTimeout(() => document.getElementById('rdv-nom')?.focus(), 300)
    }
    const triggers = document.querySelectorAll('[data-appointment-trigger], .btn[href="#rendez-vous"]')
    triggers.forEach((t) => t.addEventListener('click', handler))
    return () => triggers.forEach((t) => t.removeEventListener('click', handler))
  }, [])

  useEffect(() => {
    if (!open) return
    const section = document.getElementById('rendez-vous')

    function onBackdropClick(e) {
      if (e.target === section) handleCancel()
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') handleCancel()
    }
    section.addEventListener('click', onBackdropClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      section.removeEventListener('click', onBackdropClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const onFieldEvent = (e) => {
    const field = e.target
    const wasInvalid = fieldStates[field.name] === 'invalid'
    if (e.type === 'blur' || wasInvalid) {
      const valid = validate(field)
      setFieldStates((prev) => ({ ...prev, [field.name]: valid ? 'valid' : 'invalid' }))
      setFieldErrors((prev) => ({ ...prev, [field.name]: valid ? '' : getErrorMessage(field) }))

      // La date et l'heure dépendent l'une de l'autre (jours ouvrés + horaires) :
      // si l'une change, on revalide l'autre si elle a déjà une valeur.
      const form = field.form
      if (field.name === 'date' && form?.elements?.namedItem('heure')?.value) {
        const heureField = form.elements.namedItem('heure')
        const heureValid = validate(heureField)
        setFieldStates((prev) => ({ ...prev, heure: heureValid ? 'valid' : 'invalid' }))
        setFieldErrors((prev) => ({ ...prev, heure: heureValid ? '' : getErrorMessage(heureField) }))
      }
      if (field.name === 'heure' && form?.elements?.namedItem('date')?.value) {
        const dateField = form.elements.namedItem('date')
        const dateValid = validate(dateField)
        setFieldStates((prev) => ({ ...prev, date: dateValid ? 'valid' : 'invalid' }))
        setFieldErrors((prev) => ({ ...prev, date: dateValid ? '' : getErrorMessage(dateField) }))
      }
    }
  }

  const fieldClass = (name) => (fieldStates[name] === 'invalid' ? 'invalid' : fieldStates[name] === 'valid' ? 'valid' : '')
  const errorFor = (name) => (fieldStates[name] === 'invalid' ? fieldErrors[name] : '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = formRef.current
    const fields = form.querySelectorAll('input, select, textarea')
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
    if (!allValid) {
      firstInvalid?.focus()
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const payload = Object.fromEntries(new FormData(form).entries())
      await submitAppointment(payload)
      setSubmitted(true)
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
    setOpen(false)
    setSubmitted(false)
    setSubmitError(null)
    document.getElementById('rendez-vous').classList.remove('appointment-open')
    document.body.style.overflow = ''
  }

  return (
    <div className={`appointment-form-wrapper${open ? ' form-open' : ''}${submitted ? ' submitted' : ''}`} id="appointmentFormWrapper">
      <div className="appointment-intro">
        <p>Choisissez le moment qui vous convient : notre équipe vous répondra sous 24 heures.</p>
        <button type="button" className="btn btn-primary" data-appointment-trigger>Prendre rendez-vous</button>
      </div>
      <form id="appointmentForm" noValidate ref={formRef} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rdv-nom">Nom complet *</label>
            <input type="text" id="rdv-nom" name="nom" required className={fieldClass('nom')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('nom') && <span className="field-error">{errorFor('nom')}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="rdv-entreprise">Entreprise</label>
            <input type="text" id="rdv-entreprise" name="entreprise" className={fieldClass('entreprise')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('entreprise') && <span className="field-error">{errorFor('entreprise')}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rdv-email">Email professionnel *</label>
            <input type="email" id="rdv-email" name="email" required className={fieldClass('email')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('email') && <span className="field-error">{errorFor('email')}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="rdv-telephone">Téléphone *</label>
            <input type="tel" id="rdv-telephone" name="telephone" required className={fieldClass('telephone')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('telephone') && <span className="field-error">{errorFor('telephone')}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rdv-date">Date souhaitée *</label>
            <input type="date" id="rdv-date" name="date" required ref={dateInputRef} className={fieldClass('date')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('date') ? (
              <span className="field-error">{errorFor('date')}</span>
            ) : (
              <span className="form-hint">Du lundi au vendredi uniquement</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="rdv-heure">Heure souhaitée *</label>
            <input type="time" id="rdv-heure" name="heure" required ref={heureInputRef} className={fieldClass('heure')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('heure') ? (
              <span className="field-error">{errorFor('heure')}</span>
            ) : (
              <span className="form-hint">Entre {OPENING_HOUR} et {CLOSING_HOUR}</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rdv-service">Sujet du rendez-vous</label>
          <select id="rdv-service" name="service" className={fieldClass('service')} onBlur={onFieldEvent} onChange={onFieldEvent}>
            <option value="">Sélectionnez un sujet</option>
            <option value="service-client">Service Client</option>
            <option value="back-office">Back Office</option>
            <option value="ecommerce">Support E-commerce</option>
            <option value="commercial">Support Commercial</option>
            <option value="telemarketing">Télémarketing</option>
            <option value="autre">Autre</option>
          </select>
          {errorFor('service') && <span className="field-error">{errorFor('service')}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="rdv-message">Message (facultatif)</label>
          <textarea id="rdv-message" name="message" placeholder="Précisez un point particulier si nécessaire..." className={fieldClass('message')} onBlur={onFieldEvent} onInput={onFieldEvent} />
          {errorFor('message') && <span className="field-error">{errorFor('message')}</span>}
        </div>
        {submitError && <p className="form-error">{submitError}</p>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" id="rdvSubmitBtn" disabled={submitting}>
            {submitting ? 'Envoi en cours...' : 'Confirmer la demande de rendez-vous'}
          </button>
          <button type="button" className="btn btn-secondary" id="rdvCancelBtn" onClick={handleCancel}>Annuler</button>
        </div>
      </form>

      <div className={`form-success${submitted ? ' show' : ''}`} id="rdvFormSuccess">
        <div className="check">✓</div>
        <h4>Demande envoyée</h4>
        <p>Merci ! Nous confirmons votre créneau sous 24 heures.</p>
      </div>
    </div>
  )
}
