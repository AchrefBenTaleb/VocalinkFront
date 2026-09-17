const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function postJSON(path, payload) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // no JSON body
  }

  if (!res.ok || !data?.success) {
    const message = data?.errors?.[0]?.message || data?.message || 'Une erreur est survenue, veuillez réessayer.'
    throw new Error(message)
  }

  return data.data
}

export function submitQuoteRequest(payload) {
  return postJSON('/api/quotes', payload)
}

export function submitAppointment(payload) {
  return postJSON('/api/appointments', payload)
}

export function submitFeedback(payload) {
  return postJSON('/api/feedback', payload)
}

export async function fetchHomepageFeedback() {
  try {
    const res = await fetch(`${API_URL}/api/feedback/homepage`)
    const data = await res.json()
    if (!res.ok || !data.success) return null
    return data.data
  } catch {
    return null
  }
}

export async function fetchQuoteCount() {
  try {
    const res = await fetch(`${API_URL}/api/quotes/count`)
    const data = await res.json()
    if (!res.ok || !data.success) return null
    return data.count
  } catch {
    return null
  }
}
