import { useEffect, useState } from 'react'
import '../styles/ScrollProgressBar.css'

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setScrollProgress(scrolled)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" id="scrollProgress" style={{ width: `${scrollProgress}%` }}></div>
}
