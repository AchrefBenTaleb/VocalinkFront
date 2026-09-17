import { useEffect, useRef, useState } from 'react'
import '../styles/Forms.css'
import { validate, getErrorMessage } from '../utils/validate'
import { submitQuoteRequest } from '../utils/api'
import { notifyProjectsCountIncrement } from '../utils/projectsCounter'

export function ContactForm() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [fieldStates, setFieldStates] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})
  const formRef = useRef(null)

  useEffect(() => {
    function handler(e) {
      e.preventDefault()
      setOpen(true)
      const section = document.getElementById('contact')
      section.classList.add('contact-open')
      document.body.style.overflow = 'hidden'
      setTimeout(() => document.getElementById('nom')?.focus(), 300)
    }
    const triggers = document.querySelectorAll('.btn[href="#contact"]')
    triggers.forEach((t) => t.addEventListener('click', handler))
    return () => triggers.forEach((t) => t.removeEventListener('click', handler))
  }, [])

  useEffect(() => {
    if (!open) return
    const section = document.getElementById('contact')

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
      await submitQuoteRequest(payload)
      setSubmitted(true)
      notifyProjectsCountIncrement()
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
    document.getElementById('contact').classList.remove('contact-open')
    document.body.style.overflow = ''
  }

  return (
    <div className={`contact-form reveal${open ? ' form-open' : ''}${submitted ? ' submitted' : ''}`} id="contactFormWrapper">
      <form id="leadForm" noValidate ref={formRef} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nom">Nom complet *</label>
            <input type="text" id="nom" name="nom" required className={fieldClass('nom')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('nom') && <span className="field-error">{errorFor('nom')}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="entreprise">Entreprise *</label>
            <input type="text" id="entreprise" name="entreprise" required className={fieldClass('entreprise')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('entreprise') && <span className="field-error">{errorFor('entreprise')}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email professionnel *</label>
            <input type="email" id="email" name="email" required className={fieldClass('email')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('email') && <span className="field-error">{errorFor('email')}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="telephone">Téléphone *</label>
            <input type="tel" id="telephone" name="telephone" required className={fieldClass('telephone')} onBlur={onFieldEvent} onInput={onFieldEvent} />
            {errorFor('telephone') && <span className="field-error">{errorFor('telephone')}</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="service">Service souhaité *</label>
          <select id="service" name="service" required className={fieldClass('service')} onBlur={onFieldEvent} onChange={onFieldEvent}>
            <option value="">Sélectionnez un service</option>
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
          <label htmlFor="message">Votre besoin *</label>
          <textarea id="message" name="message" required placeholder="Décrivez brièvement votre projet, vos objectifs et vos attentes..." className={fieldClass('message')} onBlur={onFieldEvent} onInput={onFieldEvent} />
          {errorFor('message') && <span className="field-error">{errorFor('message')}</span>}
        </div>
        {submitError && <p className="form-error">{submitError}</p>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" id="submitBtn" disabled={submitting}>
            {submitting ? 'Envoi en cours...' : 'Confirmer la demande de devis'}
          </button>
          <button type="button" className="btn btn-secondary" id="contactCancelBtn" onClick={handleCancel}>Annuler</button>
        </div>
      </form>

      <div className={`form-success${submitted ? ' show' : ''}`} id="formSuccess">
        <div className="check">✓</div>
        <h4>Message envoyé</h4>
        <p>Merci ! Notre équipe revient vers vous sous 24 heures.</p>
      </div>
    </div>
  )
}
