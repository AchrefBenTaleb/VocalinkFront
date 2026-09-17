import { useState } from 'react'
import '../styles/Services.css'
import { SERVICES } from '../data/siteData'

export function Services() {
  const [openService, setOpenService] = useState(null)

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-title reveal">
          <span className="eyebrow">Nos Services</span>
          <h2>Votre activité. Notre équipe.</h2>
          <p>Des équipes francophones et anglophones flexibles pour prendre en charge vos opérations de service client, back office et support commercial.</p>
          <div className="value-row">
            <span>Renforcez vos équipes.</span>
            <span>Gagnez en efficacité.</span>
            <span>Concentrez-vous sur votre activité.</span>
          </div>
        </div>
        <div className="services-grid" id="servicesGrid">
          {SERVICES.map((service, i) => (
            <div
              className={`service-card reveal${openService === i ? ' open' : ''}`}
              key={service.title}
              onClick={() => setOpenService(openService === i ? null : i)}
            >
              <div className="service-top">
                <div className="service-icon">{service.icon}</div>
                <div className="service-expand-icon">+</div>
              </div>
              <h3>{service.title}</h3>
              <p className="desc">{service.desc}</p>
              <div className="service-detail">
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
