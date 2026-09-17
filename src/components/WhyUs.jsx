import '../styles/WhyUs.css'
import { FEATURES } from '../data/siteData'

export function WhyUs() {
  return (
    <section className="why-us" id="why-us">
      <div className="container">
        <div className="section-title reveal">
          <span className="eyebrow">Pourquoi nous</span>
          <h2>Pourquoi choisir Vocalink Tunisie ?</h2>
          <p>Une équipe engagée à vos côtés pour atteindre vos objectifs.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature reveal" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
