import { useEffect } from 'react'

export function useActiveNav(setActiveSection) {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => navObserver.observe(s))
    return () => navObserver.disconnect()
  }, [setActiveSection])
}
