// Horaires d'ouverture pour la prise de rendez-vous
export const OPENING_HOUR = '08:30'
export const CLOSING_HOUR = '19:30'
const OPEN_MINUTES = 8 * 60 + 30
const CLOSE_MINUTES = 18 * 60 + 30

export function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function isWeekend(date) {
  const day = date.getDay() // 0 = dimanche, 6 = samedi
  return day === 0 || day === 6
}

/** Indique si l'entreprise est actuellement ouverte (jour ouvré + dans les horaires). */
export function isOpenNow(date = new Date()) {
  if (isWeekend(date)) return false
  const minutes = date.getHours() * 60 + date.getMinutes()
  return minutes >= toMinutes(OPENING_HOUR) && minutes <= toMinutes(CLOSING_HOUR)
}

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Valide un champ de formulaire et lui applique un message d'erreur
 * personnalisé en français via setCustomValidity, afin que
 * field.checkValidity() / field.validationMessage reflètent nos règles métier.
 */
export function validate(field) {
  field.setCustomValidity('')

  const value = field.value ? field.value.trim() : ''

  // 1) Champ obligatoire
  if (field.required && value === '') {
    field.setCustomValidity('Ce champ est obligatoire.')
    return field.checkValidity()
  }

  if (value !== '') {
    // 2) Email
    if (field.type === 'email' && field.validity.typeMismatch) {
      field.setCustomValidity('Merci de saisir une adresse email valide (ex. nom@domaine.com).')
    }

    // 3) Téléphone
    if (field.type === 'tel') {
      const digits = value.replace(/[^0-9]/g, '')
      if (digits.length < 8) {
        field.setCustomValidity('Merci de saisir un numéro de téléphone valide.')
      }
    }

    // 4) Date : doit être aujourd'hui ou après, et un jour ouvré (lun-ven)
    if (field.type === 'date') {
      const selected = startOfDay(new Date(`${value}T00:00:00`))
      const today = startOfDay(new Date())
      if (selected < today) {
        field.setCustomValidity("La date doit être aujourd'hui ou une date future.")
      } else if (isWeekend(selected)) {
        field.setCustomValidity('Nous sommes fermés le week-end. Merci de choisir un jour entre lundi et vendredi.')
      }
    }

    // 5) Heure : doit être dans l'intervalle d'ouverture, cohérente avec la date choisie
    if (field.type === 'time') {
      const minutes = toMinutes(value)
      if (minutes < OPEN_MINUTES || minutes > CLOSE_MINUTES) {
        field.setCustomValidity(`Nos rendez-vous sont disponibles entre ${OPENING_HOUR} et ${CLOSING_HOUR}.`)
      } else {
        const dateField = field.form?.elements?.namedItem('date')
        if (dateField && dateField.value) {
          const selectedDate = startOfDay(new Date(`${dateField.value}T00:00:00`))
          if (isWeekend(selectedDate)) {
            field.setCustomValidity('Nos rendez-vous ne sont pas disponibles le week-end.')
          } else {
            const now = new Date()
            const selectedDateTime = new Date(`${dateField.value}T${value}`)
            const today = startOfDay(now)
            if (selectedDate.getTime() === today.getTime() && selectedDateTime < now) {
              field.setCustomValidity("Cet horaire est déjà passé. Merci de choisir une heure à venir.")
            }
          }
        }
      }
    }
  }

  return field.checkValidity()
}

/** Renvoie le message d'erreur lisible pour un champ (après un appel à validate). */
export function getErrorMessage(field) {
  return field.validationMessage
}
