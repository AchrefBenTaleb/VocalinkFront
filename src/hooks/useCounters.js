import { useEffect } from 'react'

export function useCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll('.num[data-count]')
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const target = parseInt(el.dataset.count, 10)
            const suffix = el.dataset.suffix || ''
            let current = 0
            const step = Math.max(1, Math.round(target / 40))
            const tick = () => {
              current += step
              if (current >= target) {
                el.textContent = target + suffix
              } else {
                el.textContent = current + suffix
                requestAnimationFrame(tick)
              }
            }
            tick()
            counterObserver.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )
    counters.forEach((c) => counterObserver.observe(c))
    return () => counterObserver.disconnect()
  }, [])
}
