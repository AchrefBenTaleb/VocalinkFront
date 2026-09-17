import { useState } from 'react'
import '../styles/Faq.css'
import { FAQS } from '../data/siteData'

export function Faq() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-title reveal">
          <span className="eyebrow">Questions fréquentes</span>
          <h2>Vous vous posez peut-être ces questions</h2>
        </div>
        <div className="faq-list reveal">
          {FAQS.map((item, i) => (
            <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={item.q}>
              <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}<span className="icon">+</span>
              </div>
              <div className="faq-answer"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
