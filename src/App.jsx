import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Products from './components/Products.jsx'
import Icon from './components/Icon.jsx'
import QuoteDrawer from './components/QuoteDrawer.jsx'
import { useQuote } from './quote/QuoteContext.js'
import logo from './assets/logo-vehicolor-blanco.png'
import { BENEFITS, SITE, waLink } from './data/vehicolor.js'
import './App.css'

function Benefits() {
  return (
    <section id="beneficios" className="section section--light">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow eyebrow--dark"><span className="eyebrow__bar" aria-hidden="true" />Por qué Vehicolor</p>
          <h2 className="section__title">Cuatro pilares para tu taller</h2>
        </header>
        <div className="benefits">
          {BENEFITS.map((b) => (
            <article key={b.title} className="benefit">
              <span className="benefit__icon"><Icon name={b.icon} size={28} /></span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

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
          <p>Agrega los productos con sus cantidades, llena tus datos y mándanos el pedido por WhatsApp. Te respondemos con precio y disponibilidad.</p>
        </div>
        <div className="cta__actions">
          <button type="button" className="btn btn--black btn--lg" onClick={() => setOpen(true)}>
            <Icon name="list" size={20} /> Ver mi cotización
          </button>
          <a className="cta__link" href={waLink()} target="_blank" rel="noreferrer">
            ¿Dudas? Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

// Botón flotante: aparece cuando hay productos en la cotización
function QuoteFab() {
  const { count, open, setOpen } = useQuote()
  if (!count || open) return null
  return (
    <button type="button" className="fab" onClick={() => setOpen(true)}>
      <Icon name="list" size={20} /> Ver cotización <span className="badge badge--dark">{count}</span>
    </button>
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
  return (
    <>
      <a className="skip-link" href="#productos">Saltar al catálogo</a>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Products />
        <Benefits />
        <ColorMatch />
        <Contact />
      </main>
      <Footer />
      <QuoteFab />
      <QuoteDrawer />
    </>
  )
}
