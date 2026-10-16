import { AddToQuote, DocLinks } from './ProductActions.jsx'

// Muestra de color y acabado de cada producto (solo visual).
const LOOKS = {
  'base-1k': { finish: 'Sólido', from: '#d84a44', to: '#8f1414' },
  'plata-1k': { finish: 'Metálico', from: '#e9ebee', to: '#8c9198' },
  'perla-1k': { finish: 'Perlado', from: '#efe4ef', to: '#a9b3c4' },
  'solido-2k': { finish: 'Alto brillo', from: '#3a3b3f', to: '#050506', sheen: true },
}
const BY_CATEGORY = {
  masilla: { finish: 'Poliéster', from: '#d9cfbd', to: '#8e8473' },
  primario: { finish: 'Fondo', from: '#a7abb1', to: '#55585e' },
  barniz: { finish: 'Transparente', from: '#2c2d31', to: '#0b0b0c', sheen: true },
  pintura: { finish: 'Color', from: '#d84a44', to: '#8f1414' },
}

export default function ProductCard({ product: p, onSpecs }) {
  const look = LOOKS[p.id] || BY_CATEGORY[p.cat]
  const system = p.en.match(/\b[12]K\b/)?.[0]
  const ref = p.en.replace(/\b[12]K\b/, '').trim()

  return (
    <article
      className={`pcard${look.sheen ? ' pcard--sheen' : ''}${look.finish === 'Metálico' ? ' pcard--metallic' : ''}`}
      style={{ '--sw-from': look.from, '--sw-to': look.to }}
    >
      <div className="pcard__swatch">
        <span className="pcard__tape">
          {system && <b>{system}</b>} {ref}
        </span>
      </div>

      <img className="pcard__img" src={p.img} alt="" loading="lazy" width="120" height="120" />

      <div className="pcard__body">
        <p className="pcard__finish">
          <span className="pcard__chip" aria-hidden="true" />
          {look.finish}
        </p>
        <h3 className="pcard__title">{p.name}</h3>
        <p className="pcard__text">{p.summary}</p>

        <div className="pcard__actions">
          <AddToQuote product={p} label="+ Cotizar" />
          <button type="button" className="btn btn--ghost" onClick={() => onSpecs(p)} aria-label={`Ficha técnica de ${p.name}`}>
            Ficha
          </button>
        </div>
      </div>

      <div className="pcard__docs">
        <DocLinks p={p} />
      </div>
    </article>
  )
}
