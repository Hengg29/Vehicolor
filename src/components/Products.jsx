import { useRef, useState } from 'react'
import Icon from './Icon.jsx'
import QtyStepper from './QtyStepper.jsx'
import { useQuote } from '../quote/QuoteContext.js'
import { CATEGORIES, PRODUCTS, waLink } from '../data/vehicolor.js'

function DocLinks({ p }) {
  // Vehicolor no publica TDS/MSDS de los primarios: se piden por WhatsApp
  if (!p.tds && !p.msds) {
    return (
      <a
        className="doc-link"
        href={waLink(`Hola, ¿me pueden enviar la ficha técnica (TDS) y la hoja de seguridad (MSDS) de ${p.name}?`)}
        target="_blank"
        rel="noreferrer"
      >
        <Icon name="chat" size={16} /> Solicitar fichas
      </a>
    )
  }

  return (
    <>
      {p.tds && (
        <a className="doc-link" href={p.tds} target="_blank" rel="noreferrer">
          <Icon name="download" size={16} /> TDS
        </a>
      )}
      {p.msds && (
        <a className="doc-link" href={p.msds} target="_blank" rel="noreferrer">
          <Icon name="download" size={16} /> MSDS
        </a>
      )}
    </>
  )
}

function AddToQuote({ product }) {
  const { items, add } = useQuote()
  if (items[product.id]) return <QtyStepper product={product} />
  return (
    <button type="button" className="btn btn--yellow btn--sm" onClick={() => add(product.id)}>
      Agregar
    </button>
  )
}

export default function Products() {
  const [cat, setCat] = useState('todos')
  const [active, setActive] = useState(null)
  const dialogRef = useRef(null)
  const list = cat === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat)

  const openSpecs = (p) => {
    setActive(p)
    dialogRef.current.showModal()
  }
  const closeSpecs = () => dialogRef.current.close()

  return (
    <section id="productos" className="section section--dark">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow"><span className="eyebrow__bar" aria-hidden="true" />Catálogo</p>
          <h2 className="section__title">Todo para el proceso de repintado</h2>
        </header>

        <div className="categories">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`category${cat === c.id ? ' is-active' : ''}`}
              aria-pressed={cat === c.id}
              onClick={() => setCat(cat === c.id ? 'todos' : c.id)}
            >
              <img src={c.img} alt="" loading="lazy" width="479" height="210" />
              <span className="category__name">{c.name}</span>
            </button>
          ))}
        </div>

        <p className="products__count" aria-live="polite">
          {list.length} productos
          {cat !== 'todos' && (
            <button type="button" className="link-btn" onClick={() => setCat('todos')}>Ver todos</button>
          )}
        </p>

        <div className="products">
          {list.map((p) => (
            <article key={p.id} className="card">
              <img className="card__img" src={p.img} alt={p.name} loading="lazy" width="400" height="300" />
              <div className="card__body">
                <p className="card__en">{p.en}</p>
                <h3 className="card__title">{p.name}</h3>
                <p className="card__text">{p.summary}</p>

                <button type="button" className="specs-btn" onClick={() => openSpecs(p)}>
                  Ficha técnica <span aria-hidden="true">+</span>
                </button>

                <div className="card__docs">
                  <DocLinks p={p} />
                </div>
                <div className="card__buy">
                  <AddToQuote product={p} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="specs-dialog"
          aria-labelledby="specs-title"
          onClose={() => setActive(null)}
          onClick={(e) => e.target === e.currentTarget && closeSpecs()}
        >
          {active && (
            <div className="specs-dialog__inner">
              <button type="button" className="specs-dialog__close" aria-label="Cerrar ficha técnica" onClick={closeSpecs}>
                <Icon name="close" />
              </button>
              <div className="specs-dialog__head">
                <img src={active.img} alt="" width="120" height="90" />
                <div>
                  <p className="card__en">{active.en}</p>
                  <h3 id="specs-title" className="card__title">{active.name}</h3>
                  <p className="specs-dialog__summary">{active.summary}</p>
                </div>
              </div>
              <dl className="specs">
                {Object.entries(active.specs).map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <div className="card__actions">
                <AddToQuote product={active} />
                <DocLinks p={active} />
              </div>
            </div>
          )}
        </dialog>

        <p className="products__note">
          La línea completa también incluye toners 2K, catalizadores, thinners y accesorios. Pregunta por disponibilidad.
        </p>
      </div>
    </section>
  )
}
