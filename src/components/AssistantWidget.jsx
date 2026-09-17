import { useEffect, useRef, useState } from 'react'
import '../styles/AssistantWidget.css'
import { QUICK_REPLIES } from '../data/siteData'

export function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Bonjour 👋 Sur quoi puis-je vous renseigner ?' }])
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  const handleQuickReply = (item) => {
    setMessages((prev) => [...prev, { role: 'user', text: item.q }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', text: item.a }])
    }, 700)
  }

  return (
    <>
      <button className="assistant-toggle" id="assistantToggle" aria-label="Ouvrir l'assistant" onClick={() => setOpen((o) => !o)}>
        💬<span className="ping"></span>
      </button>
      <div className={`assistant-panel${open ? ' open' : ''}`} id="assistantPanel">
        <div className="assistant-head">
          <div className="visual-avatar" style={{ background: 'rgba(255,255,255,0.2)' }}>V</div>
          <div>
            <strong>Assistant Vocalink</strong>
            <span>Répond en quelques secondes</span>
          </div>
        </div>
        <div className="assistant-body" id="assistantBody" ref={bodyRef}>
          {messages.map((m, i) => (
            <div key={i} className={`assistant-msg${m.role === 'user' ? ' user' : ''}`}>{m.text}</div>
          ))}
          {typing && (
            <div className="visual-typing"><span></span><span></span><span></span></div>
          )}
        </div>
        <div className="assistant-quick" id="assistantQuick">
          {QUICK_REPLIES.map((item, i) => (
            <button key={i} onClick={() => handleQuickReply(item)}>{item.q}</button>
          ))}
        </div>
      </div>
    </>
  )
}
