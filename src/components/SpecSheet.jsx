import Icon from './Icon.jsx'
import { AddToQuote, DocLinks } from './ProductActions.jsx'
import { CATEGORIES } from '../data/vehicolor.js'

// Ficha técnica en dos columnas: producto a la izquierda, datos de aplicación a la derecha.
// Lee los mismos `specs` de texto de PRODUCTS y saca de ahí la barra de mezcla y la secuencia;
// si algún texto no se puede interpretar, solo se muestra en la tabla.

const RANGE = String.raw`\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?`

// "2 barniz : 1 catalizador + 10–20% thinner" → partes con peso para la barra
function parseMix(text, fallbackLabel) {
  if (!text || !text.includes(':')) return null
  const basis = /\(peso\)/.test(text) ? 'en peso' : /^Vol\./.test(text) ? 'en volumen' : null
  const [main, ...extra] = text.replace(/\(peso\)|^Vol\./g, '').split('+')
  const parts = main.split(':').map((s) => {
    const m = s.trim().match(new RegExp(`^(${RANGE})\\s*(.*)$`))
    return m && { amount: m[1], label: m[2] || fallbackLabel, weight: parseFloat(m[1]) }
  })
  if (parts.length < 2 || parts.some((p) => !p)) return null
  return { parts, extra: extra.map((s) => s.trim()).join(' + '), basis }
}

// "2–3 manos, 15–25 µm" + "5–10 min entre manos; 10–15 min antes del barniz" → pasos
function parseSequence(specs) {
  const coats = specs.Manos?.match(new RegExp(`^(\\d+)(?:\\s*[–-]\\s*(\\d+))?\\s*manos?(?:,\\s*(${RANGE})\\s*µm)?`))
  if (!coats) return null
  const min = Number(coats[1])
  const max = Number(coats[2] || coats[1])
  const between = specs.Oreo?.match(new RegExp(`(${RANGE}\\s*min)\\s*entre manos`))?.[1]
  const beforeClear = specs.Oreo?.match(new RegExp(`(${RANGE}\\s*min)\\s*antes del barniz`))?.[1]

  const steps = Array.from({ length: max }, (_, i) => ({
    label: `Mano ${i + 1}`,
    sub: i < min ? (coats[3] ? `${coats[3]} µm` : '') : 'opcional',
    optional: i >= min,
    gap: i < max - 1 ? between : null,
  }))

  let last = null
  if (beforeClear) last = { label: 'Barniz', sub: '2K' }
  else if (specs.Lijado) last = { label: 'Lijado', sub: specs.Lijado.match(/P\d+(?:–P\d+)?/)?.[0] }
  else if (specs.Secado) last = { label: 'Secado', sub: specs.Secado.match(new RegExp(`${RANGE}\\s*(?:min|h)\\b`))?.[0] }
  if (last) {
    steps[steps.length - 1].gap = beforeClear
    steps.push({ ...last, final: true })
  }
  return steps
}

export default function SpecSheet({ product: p, onClose }) {
  const { Mezcla, ...rows } = p.specs
  const mix = parseMix(Mezcla, p.name.split(' ')[0].toLowerCase())
  const sequence = parseSequence(p.specs)
  const category = CATEGORIES.find((c) => c.id === p.cat)?.name
  const system = p.en.match(/\b[12]K\b/)?.[0]

  return (
    <div className="sheet">
      <aside className="sheet__side">
        <img className="sheet__img" src={p.img} alt={p.name} width="400" height="300" />
        <dl className="sheet__meta">
          {category && <div><dt>Categoría</dt><dd>{category}</dd></div>}
          {system && <div><dt>Sistema</dt><dd>{system}</dd></div>}
          <div><dt>Referencia</dt><dd>{p.en}</dd></div>
        </dl>
        <div className="sheet__buy">
          <AddToQuote product={p} label="Cotizar" />
        </div>
        <div className="sheet__docs">
          <DocLinks p={p} />
        </div>
      </aside>

      <div className="sheet__main">
        <button type="button" className="specs-dialog__close" aria-label="Cerrar ficha técnica" onClick={onClose}>
          <Icon name="close" />
        </button>

        <p className="sheet__label">Ficha técnica · {p.en}</p>
        <h3 id="specs-title" className="sheet__title">{p.name}</h3>
        <p className="sheet__summary">{p.summary}</p>

        {Mezcla && (
          <section className="sheet__block">
            <h4 className="sheet__label">Proporción de mezcla{mix?.basis && ` · ${mix.basis}`}</h4>
            {mix ? (
              <>
                <div className="mix">
                  {mix.parts.map((part, i) => (
                    <span key={i} className="mix__part" style={{ flexGrow: part.weight }}>
                      {part.amount} {part.label}
                    </span>
                  ))}
                </div>
                {mix.extra && <p className="mix__extra">+ {mix.extra}</p>}
              </>
            ) : (
              <p className="mix__text">{Mezcla}</p>
            )}
          </section>
        )}

        <section className="sheet__block">
          <h4 className="sheet__label">Aplicación</h4>
          <dl className="sheet__table">
            {Object.entries(rows).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v.split(/\s·\s|;\s/).map((line) => <span key={line}>{line}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {sequence && (
          <section className="sheet__block">
            <h4 className="sheet__label">Secuencia</h4>
            <ol className="steps">
              {sequence.map((s, i) => (
                <li key={s.label} className="steps__item">
                  <span className={`step${s.optional ? ' step--optional' : ''}${s.final ? ' step--final' : ''}`}>
                    <strong>{s.label}</strong>
                    {s.sub && <small>{s.sub}</small>}
                  </span>
                  {i < sequence.length - 1 && <span className="steps__gap">{s.gap}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  )
}
