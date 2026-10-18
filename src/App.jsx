import { useCallback, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Products from './components/Products.jsx'
import Icon from './components/Icon.jsx'
import Pillars from './components/Pillars.jsx'
import Splash from './components/Splash.jsx'
import Vico from './components/Vico.jsx'
import { useQuote } from './quote/QuoteContext.js'
import logo from './assets/logo-vehicolor-blanco.png'
import { SITE, waLink } from './data/vehicolor.js'
import './App.css'

function ColorMatch() {
  return (
    <section id="color" className="section section--dark color">
      <div className="container color__grid">
        <img
          className="color__img"
          src="/img/secciones/igualacion-color.webp"
          alt="Técnico igualando un color de pintura automotriz"
          loading="lazy"
          width="960"
          height="596"
        />
        <div>
          <p className="eyebrow"><span className="eyebrow__bar" aria-hidden="true" />Igualación de color</p>
          <h2 className="section__title section__title--left">El tono exacto, a la primera</h2>
          <p className="color__text">
            Vehicolor trabaja con espectrofotómetro y una base de más de 120,000 fórmulas.
            Trae el código de color o una pieza del vehículo y te ayudamos a encontrar la fórmula.
          </p>
          <ul className="checklist">
            <li>Colores sólidos, metálicos y perlados</li>
            <li>Bases 1K y acabados 2K</li>
            <li>Asesoría de aplicación en {SITE.city}</li>
          </ul>
          <a className="btn btn--red btn--lg" href={waLink('Hola, necesito igualar un color de auto.')} target="_blank" rel="noreferrer">
            <Icon name="chat" size={20} /> Pedir igualación
          </a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { setOpen } = useQuote()
  return (
    <section id="contacto" className="cta">
      <div className="container cta__inner">
        <div>
          <h2 className="cta__title">¿Listo para cotizar?</h2>
          <p>Vico, nuestro asistente, te ayuda a escoger productos y cantidades, y te manda la orden por WhatsApp. Te respondemos con precio y disponibilidad.</p>
        </div>
        <div className="cta__actions">
          <button type="button" className="btn btn--black btn--lg" onClick={() => setOpen(true)}>
            <Icon name="chat" size={20} /> Cotizar con Vico
          </button>
          <a className="cta__link" href={waLink()} target="_blank" rel="noreferrer">
            ¿Dudas? Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}


function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={logo} alt="Vehicolor" width="114" height="30" />
        <p>Distribuidor autorizado en {SITE.city}. · <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        <p className="footer__legal">
          Vehicolor® es marca de Vehicolor Limited. Fichas técnicas y hojas de seguridad publicadas por el fabricante.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const [videoReady, setVideoReady] = useState(false)
  const onVideoReady = useCallback(() => setVideoReady(true), [])

  return (
    <>
      <Splash videoReady={videoReady} />
      <a className="skip-link" href="#productos">Saltar al catálogo</a>
      <Header />
      <main>
        <Hero onReady={onVideoReady} />
        <Stats />
        <Products />
        <Pillars />
        <ColorMatch />
        <Contact />
      </main>
      <Footer />
      <Vico />
    </>
  )
}
