import Icon from './Icon.jsx'
import { BENEFITS } from '../data/vehicolor.js'

// Sección "Por qué Vehicolor": la tarjeta bajo el cursor se vuelve negra
export default function Pillars() {
  return (
    <section id="beneficios" className="section section--light">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow eyebrow--dark"><span className="eyebrow__bar" aria-hidden="true" />Por qué Vehicolor</p>
          <h2 className="section__title pillars__title">
            Cuatro pilares para tu <span className="pillars__mark">taller</span>
          </h2>
        </header>
        <ol className="pillars">
          {BENEFITS.map((b, i) => (
            <li key={b.title} className="pillar">
              <div className="pillar__top">
                <span className="pillar__icon"><Icon name={b.icon} size={26} /></span>
                <span className="pillar__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="pillar__stat">
                <strong>{b.stat}</strong>
                <span>{b.statLabel}</span>
              </p>
              <h3>{b.title}</h3>
              <p className="pillar__text">{b.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
