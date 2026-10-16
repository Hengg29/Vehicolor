import Icon from './Icon.jsx'
import QtyStepper from './QtyStepper.jsx'
import { useQuote } from '../quote/QuoteContext.js'
import { waLink } from '../data/vehicolor.js'

export function DocLinks({ p }) {
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

export function AddToQuote({ product, label = 'Agregar' }) {
  const { items, add } = useQuote()
  if (items[product.id]) return <QtyStepper product={product} />
  return (
    <button type="button" className="btn btn--yellow btn--sm" onClick={() => add(product.id)}>
      {label}
    </button>
  )
}
