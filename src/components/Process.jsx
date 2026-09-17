import '../styles/Process.css'
import { STEPS } from '../data/siteData'

export function Process() {
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-title reveal">
          <span className="eyebrow">Notre méthode</span>
          <h2>Comment ça marche ?</h2>
          <p>Un processus simple et efficace pour démarrer votre campagne rapidement.</p>
        </div>
        <div className="process-steps">
          {STEPS.map((step) => (
            <div className="step reveal" key={step.n}>
              <div className="step-number">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
