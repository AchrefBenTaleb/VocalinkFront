import { useEffect, useState } from 'react'
import '../styles/HoursTicker.css'
import { OPENING_HOUR, CLOSING_HOUR, isOpenNow } from '../utils/validate'

function formatHour(hhmm) {
  return hhmm.replace(':', 'h')
}

export function HoursTicker() {
  const [open, setOpen] = useState(() => isOpenNow())

  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenNow()), 60000)
    return () => clearInterval(id)
  }, [])

  const item = (
    <>
      <span>
        <i className="status-dot" data-open={open} />
        {open ? 'Ouvert maintenant' : 'Fermé actuellement'} · Lundi au vendredi
      </span>
      <span>🕒 {formatHour(OPENING_HOUR)} — {formatHour(CLOSING_HOUR)}</span>
    </>
  )

  const group = (
    <div className="hours-ticker-group">
      {item}
      {item}
      {item}
      {item}
      {item}
    </div>
  )

  return (
    <div className="hours-ticker" role="status" aria-label="Horaires d'ouverture">
      <div className="hours-ticker-track">
        {group}
        <div className="hours-ticker-group" aria-hidden="true">
          {item}
          {item}
          {item}
          {item}
          {item}
        </div>
      </div>
    </div>
  )
}
