import { useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { AddToQuote } from './ProductActions.jsx'
import { useQuote } from '../quote/QuoteContext.js'
import { useMedia } from '../hooks/useMedia.js'
import { useGridColumns } from '../hooks/useGridColumns.js'
import { SERIES_BY_ID, TINTS, TINT_CHARTS, TINT_SERIES } from '../data/tintes.js'
import { waLink } from '../data/vehicolor.js'

// Carta de colores: los tintes de las cartas oficiales 1K y 2K con buscador y filtro por serie.
// En "Todas" van ordenados por tono; al escoger una serie, en el orden de código de la carta.
// Cada tinte abre su ficha con el color puro, cómo se ve en mezcla y el botón para cotizarlo.

// Filas completas visibles en "Todas" antes de tocar "Ver los 137"
const PREVIEW_ROWS = { phone: 6, other: 4 }

// Sin acentos ni mayúsculas: "limon" encuentra "Limón"
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function hsl(hex) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const chroma = max - min
  let h = 0
  if (chroma) {
    if (max === r) h = ((g - b) / chroma) % 6
    else if (max === g) h = (b - r) / chroma + 2
    else h = (r - g) / chroma + 4
  }
  return { h: (h * 60 + 360) % 360, l: (max + min) / 2, chroma }
}

// Los tintes concentrados se ven casi negros en la lata: el tono se lee mejor en el color más
// saturado entre el puro y sus mezclas. Rojos → morados, y al final blancos, grises y negros.
// Las platas se muestran mezcladas con azul 1042: esa mezcla no es su tono y no cuenta.
function hueKey(t) {
  const samples = t.series === '1k-plata' ? [t.hex] : [t.hex, ...t.mix]
  const vivid = samples.map(hsl).sort((a, b) => b.chroma - a.chroma)[0]
  return vivid.chroma < 0.12 ? 1000 + (1 - vivid.l) * 100 : (vivid.h + 20) % 360
}
const BY_HUE = [...TINTS].sort((a, b) => hueKey(a) - hueKey(b))

// Vista previa repartida en todo el espectro
const spread = (list, n) =>
  list.length <= n ? list : Array.from({ length: n }, (_, i) => list[Math.floor((i * list.length) / n)])

const swatchStyle = (t) => ({ '--c': t.hex, '--l': t.light, '--d': t.dark, '--m': t.mix[0], '--ink': t.ink })

const CHIPS = [
  { id: 'todas', name: 'Todas', total: TINTS.length },
  ...TINT_SERIES.map((s) => ({ id: s.id, name: s.name, total: TINTS.filter((t) => t.series === s.id).length })),
]

function TintSheet({ tint: t, onClose }) {
  const s = SERIES_BY_ID[t.series]
  return (
    <div className="tsheet">
      <button type="button" className="specs-dialog__close tsheet__close" aria-label="Cerrar tinte" onClick={onClose}>
        <Icon name="close" />
      </button>

      <div className={`tsheet__swatch fx-${s.effect}`} style={swatchStyle(t)}>
        <span className="tsheet__code">{t.code}</span>
      </div>

      <div className="tsheet__body">
        <p className="sheet__label">{s.name} · {s.en}</p>
        <h3 id="tint-title" className="tsheet__title">{t.color}</h3>
        <p className="tsheet__en">{t.colorEn}</p>
        <p className="tsheet__desc">{t.summary}</p>

        <h4 className="sheet__label">Cómo se ve</h4>
        <ul className="tsheet__mixes">
          <li>
            <span className={`tsheet__chip fx-${s.effect}`} style={swatchStyle(t)} />
            <span><strong>Color puro</strong><small>Tal como sale de la lata</small></span>
          </li>
          {t.mix.map((hex, i) => (
            <li key={s.mix[i].label}>
              <span className="tsheet__chip" style={{ background: hex }} />
              <span><strong>{s.mix[i].label}</strong><small>Proporción {s.mix[i].ratio}</small></span>
            </li>
          ))}
        </ul>

        <div className="tsheet__actions">
          <AddToQuote product={t} label="Cotizar tinte" />
          <a
            className="btn btn--ghost btn--sm"
            href={waLink(`Hola, ¿tienen el tinte Vehicolor ${t.code} (${t.color})?`)}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="chat" size={16} /> Preguntar
          </a>
        </div>
        <p className="tsheet__note">Color aproximado en pantalla. La referencia es la carta impresa.</p>
      </div>
    </div>
  )
}

export default function ColorChart() {
  const [series, setSeries] = useState('todas')
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [active, setActive] = useState(null)
  const dialogRef = useRef(null)
  const countRef = useRef(null)
  const { items } = useQuote()
  const phone = useMedia('(max-width: 600px)')
  const [gridRef, cols] = useGridColumns()

  const all = series === 'todas'
  const q = norm(query.trim())
  const list = (all ? BY_HUE : TINTS).filter((t) =>
    (all || t.series === series) && (!q || norm(`${t.code} ${t.color} ${t.colorEn}`).includes(q)),
  )
  const limited = all && !q && !showAll
  const previewSize = (cols || (phone ? 3 : 8)) * (phone ? PREVIEW_ROWS.phone : PREVIEW_ROWS.other)
  const visible = limited ? spread(list, previewSize) : list
  const filtered = !all || q

  const openTint = (t) => {
    setActive(t)
    dialogRef.current.showModal()
  }
  const closeTint = () => dialogRef.current.close()
  const reset = () => {
    setSeries('todas')
    setQuery('')
  }
  // El botón desaparece al abrir la lista: el foco pasa al inicio de la lista sin mover la pantalla
  const expand = () => {
    setShowAll(true)
    requestAnimationFrame(() => countRef.current?.focus({ preventScroll: true }))
  }

  return (
    <section id="colores" className="section section--dark tints">
      <div className="container">
        <header className="section__head tints__head">
          <p className="eyebrow"><span className="eyebrow__bar" aria-hidden="true" />Carta de colores</p>
          <h2 className="section__title section__title--caps">
            Tintes para <span className="title-mark">mezclar</span> tu color
          </h2>
          <p className="tints__lead">
            Los {TINTS.length} tintes del sistema de mezcla Vehicolor, de las cartas oficiales 1K y 2K.
            Toca uno para ver cómo se ve en mezcla y agregarlo a tu cotización.
          </p>
        </header>

        <div className="tints__tools">
          <div className="tints__series" role="group" aria-label="Filtrar por serie">
            {CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip${series === c.id ? ' is-active' : ''}`}
                aria-pressed={series === c.id}
                onClick={() => setSeries(c.id)}
              >
                {c.name} <span className="chip__count">{c.total}</span>
              </button>
            ))}
          </div>

          <label className="tints__search">
            <Icon name="search" size={18} />
            <span className="sr-only">Buscar tinte por código o color</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Código o color: 1081, azul, perla…"
              autoComplete="off"
              enterKeyHint="search"
            />
          </label>
        </div>

        <p ref={countRef} className="products__count" tabIndex={-1} aria-live="polite">
          {visible.length < list.length ? `${visible.length} de ${list.length} tintes` : `${list.length} ${list.length === 1 ? 'tinte' : 'tintes'}`}
          {list.length > 1 && (all ? ', ordenados por tono' : ', en orden de código')}
          {filtered && <button type="button" className="link-btn" onClick={reset}>Ver todos</button>}
        </p>

        {visible.length > 0 ? (
          <ul ref={gridRef} className="tints__grid">
            {visible.map((t) => {
              const s = SERIES_BY_ID[t.series]
              const qty = items[t.id]
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    className="tint"
                    onClick={() => openTint(t)}
                    aria-label={`${t.code} ${t.color}, ${s.name}${qty ? `, ${qty} en tu cotización` : ''}`}
                  >
                    <span className={`tint__swatch fx-${s.effect}`} style={swatchStyle(t)}>
                      {qty > 0 && <span className="tint__qty"><Icon name="check" size={12} />{qty}</span>}
                    </span>
                    <span className="tint__code">{t.code}<small>{t.system}</small></span>
                    <span className="tint__name">{t.color}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="tints__empty">
            No encontramos “{query.trim()}”. Prueba con el código de 4 dígitos o pide una{' '}
            <a href="#color">igualación de color</a>.
          </p>
        )}

        {visible.length < list.length && (
          <button type="button" className="btn btn--ghost tints__more" onClick={expand}>
            Ver los {list.length} tintes
          </button>
        )}

        <div className="tint-charts">
          <p className="sheet__label tint-charts__label">Cartas oficiales completas</p>
          {TINT_CHARTS.map((c) => (
            <article key={c.id} className="tint-chart">
              <a className="tint-chart__thumb" href={c.image} target="_blank" rel="noreferrer" aria-label={`Ver la ${c.name} completa`}>
                <img src={c.thumb} alt="" loading="lazy" width="640" height="480" style={{ objectPosition: c.focus }} />
              </a>
              <div>
                <h3 className="tint-chart__title">{c.name}</h3>
                <p className="tint-chart__meta">{c.detail}</p>
                <div className="tint-chart__links">
                  <a className="doc-link" href={c.image} target="_blank" rel="noreferrer">
                    <Icon name="eye" size={16} /> Ver carta
                  </a>
                  <a className="doc-link" href={c.pdf} download>
                    <Icon name="download" size={16} /> PDF · {c.size}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <dialog
          ref={dialogRef}
          className="specs-dialog tint-dialog"
          aria-labelledby="tint-title"
          onClose={() => setActive(null)}
          onClick={(e) => e.target === e.currentTarget && closeTint()}
        >
          {active && <TintSheet tint={active} onClose={closeTint} />}
        </dialog>
      </div>
    </section>
  )
}
