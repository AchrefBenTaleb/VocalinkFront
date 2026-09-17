import { useEffect, useRef } from 'react'
import '../styles/Stats.css'
import { STATS } from '../data/siteData'
import { PROJECTS_COUNT_EVENT } from '../utils/projectsCounter'
import { fetchQuoteCount } from '../utils/api'

export function Stats() {
  const projectsRef = useRef(null)
  // Holds the true current count once known (base + real quotes from the DB).
  // Stays null until the initial fetch resolves so we don't show a wrong number.
  const currentCountRef = useRef(null)

  // Fetch the real number of quote requests from the backend and reconcile
  // it with whatever the on-scroll count-up animation is currently showing.
  useEffect(() => {
    let cancelled = false
    const base = STATS.find((s) => s.id === 'projects')?.value ?? 0

    fetchQuoteCount().then((dbCount) => {
      if (cancelled) return
      const total = base + (dbCount ?? 0)
      currentCountRef.current = total

      const el = projectsRef.current
      if (!el) return
      const suffix = el.dataset.suffix || ''
      el.dataset.count = total
      // If the count-up animation already finished (or never had a chance to
      // start), just set the real value directly.
      if (el.textContent === `0${suffix}` || Number(el.textContent) !== total) {
        el.textContent = total + suffix
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  // Optimistic "+1" fired by ContactForm right after a successful submission.
  useEffect(() => {
    function handleIncrement() {
      const el = projectsRef.current
      if (!el || currentCountRef.current === null) return
      currentCountRef.current += 1
      const suffix = el.dataset.suffix || ''
      el.dataset.count = currentCountRef.current
      el.textContent = currentCountRef.current + suffix
      el.classList.remove('bump')
      void el.offsetWidth // restart the animation on repeated increments
      el.classList.add('bump')
    }
    window.addEventListener(PROJECTS_COUNT_EVENT, handleIncrement)
    return () => window.removeEventListener(PROJECTS_COUNT_EVENT, handleIncrement)
  }, [])

  return (
    <div className="container">
      <div className="stats reveal">
        {STATS.map((s) => (
          <div className="stat-item" key={s.label}>
            <div
              className="num"
              ref={s.id === 'projects' ? projectsRef : null}
              data-count={s.value}
              data-suffix={s.suffix}
            >
              0{s.suffix}
            </div>
            <p>{s.label}</p>
          </div>
        ))}
        <div className="stat-item">
          <div className="num-static">FR / EN</div>
          <p>Équipe francophone et anglophone</p>
        </div>
      </div>
    </div>
  )
}
