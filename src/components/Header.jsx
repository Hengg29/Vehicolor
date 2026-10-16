import { useEffect, useState } from 'react'
import logo from '../assets/logo-vehicolor-blanco.png'
import Icon from './Icon.jsx'
import { useQuote } from '../quote/QuoteContext.js'

const LINKS = [
  { href: '#productos', label: 'Productos' },
  { href: '#color', label: 'Igualación de color' },
  { href: '#beneficios', label: 'Por qué Vehicolor' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const quote = useQuote()

  useEffect(() => {
    // Igual que el sitio oficial: el header se vuelve sólido a los 100 px
    const onScroll = () => setSolid(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${solid || open ? ' is-solid' : ''}`}>
      <div className="container header__inner">
        <a href="#inicio" className="header__logo" aria-label="Vehicolor, ir al inicio">
          <img src={logo} alt="Vehicolor" width="152" height="40" />
        </a>

        <nav id="menu" className={`nav${open ? ' is-open' : ''}`} aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <button
            type="button"
            className="btn btn--red nav__cta"
            onClick={() => { setOpen(false); quote.setOpen(true) }}
          >
            <Icon name="list" size={18} /> Cotización
            {quote.count > 0 && <span className="badge" aria-label={`${quote.count} productos`}>{quote.count}</span>}
          </button>
        </nav>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
