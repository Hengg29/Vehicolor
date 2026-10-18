import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import QtyStepper from './QtyStepper.jsx'
import { useQuote } from '../quote/QuoteContext.js'
import { CATEGORIES, PRODUCTS, waLink } from '../data/vehicolor.js'

// Asistente virtual: pide los datos uno por uno, deja escoger productos con casillas
// y cantidad, y al final muestra la orden para confirmarla y mandarla por WhatsApp.
const AVATAR = '/img/vico.webp'
const digits = (s) => s.replace(/\D/g, '')
const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]))
const QUICK_QTY = [1, 2, 3, 5, 10]

// Pasos donde Vico espera texto
const TEXT_STEPS = {
  cliente: {
    ask: '¡Hola! Soy Vico 🐾 Te ayudo a cotizar. ¿Cuál es el nombre del cliente?',
    placeholder: 'Nombre y apellido',
    input: { autoComplete: 'name' },
    check: (v) => (v.trim().length >= 2 ? null : 'Escribe el nombre del cliente.'),
    show: (v) => v.trim(),
  },
  telefono: {
    ask: (d) => `Mucho gusto, ${d.cliente.split(' ')[0]}. ¿Cuál es su teléfono?`,
    placeholder: 'Teléfono a 10 dígitos',
    input: { type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
    check: (v) => (digits(v).length === 10 ? null : 'El teléfono debe tener 10 dígitos.'),
    show: (v) => digits(v),
  },
  direccion: {
    ask: '¿A qué dirección te lo llevamos? Escríbela o comparte tu ubicación actual 📍',
    placeholder: 'Calle, número, colonia y ciudad',
    input: { autoComplete: 'street-address' },
    check: (v) => (v.trim().length >= 8 ? null : 'Escribe la dirección completa: calle, número y colonia.'),
    show: (v) => v.trim(),
    geo: true, // muestra el botón "Usar mi ubicación actual"
  },
}
// Orden de la plática: cliente → teléfono → productos → dirección → confirmar → enviado
const NEXT = { cliente: 'telefono', telefono: 'productos', productos: 'direccion', direccion: 'confirm' }

let uid = 0
const msg = (m) => ({ id: ++uid, from: 'bot', type: 'text', ...m })
const askText = (phase, data) => {
  const ask = TEXT_STEPS[phase]?.ask
  return typeof ask === 'function' ? ask(data) : ask
}

// Mensajes con los que Vico abre cada paso
function promptFor(phase, data) {
  if (TEXT_STEPS[phase]) return [msg({ text: askText(phase, data) })]
  if (phase === 'productos') {
    return [msg({ text: '¿Qué productos vas a cotizar? Marca los que ocupes y ajusta la cantidad.' }), msg({ type: 'picker' })]
  }
  if (phase === 'confirm') return [msg({ text: 'Revisa tu orden antes de enviarla:' }), msg({ type: 'summary' })]
  return []
}

const linesText = (lines) => lines.map(({ product, qty }) => `${qty} × ${product.name}`).join('\n')

function buildMessage(d, lines) {
  return [
    '*Cotización Vehicolor* (vía Vico)',
    '',
    `*Cliente:* ${d.cliente}`,
    `*Teléfono:* ${d.telefono}`,
    `*Dirección:* ${d.direccion}`,
    ...(d.mapa ? [`*Ubicación:* ${d.mapa}`] : []),
    '',
    '*Productos:*',
    ...lines.map(({ product, qty }) => `• ${qty} × ${product.name} (${product.en})`),
  ].join('\n')
}

/* ---------- Piezas del chat ---------- */

// Tarjeta del producto que se agregó con "Cotizar": foto, datos y cantidad
function ProductCard({ product, pending, onConfirm, confirmedQty }) {
  const { items, setQty } = useQuote()
  const qty = pending ? items[product.id] || 0 : confirmedQty
  const category = CATEGORIES.find((c) => c.id === product.cat)?.name

  return (
    <div className={`vico-card${pending ? '' : ' vico-card--done'}`}>
      {/* Encabezado: foto chica a la izquierda y datos a un lado */}
      <div className="vico-card__head">
        <img src={product.img} alt={product.name} width="96" height="72" />
        <div className="vico-card__info">
          {category && <span className="vico-card__tag">{category}</span>}
          <h3 className="vico-card__name">{product.name}</h3>
          <p className="vico-card__en">{product.en}</p>
          {!pending && <p className="vico-card__qty"><Icon name="check" size={16} /> {qty} {qty === 1 ? 'pieza' : 'piezas'}</p>}
        </div>
      </div>

      {pending && (
        <div className="vico-card__body">
          <p className="vico-card__text">{product.summary}</p>
          <p className="vico-card__ask">¿Cuántas piezas ocupas?</p>
          <div className="vico-chips" role="group" aria-label="Cantidades rápidas">
            {QUICK_QTY.map((n) => (
              <button
                key={n}
                type="button"
                className={`vico-chip${qty === n ? ' is-active' : ''}`}
                aria-pressed={qty === n}
                onClick={() => setQty(product.id, n)}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="vico-card__row">
            <QtyStepper product={product} />
            <button type="button" className="btn btn--red btn--sm" disabled={!qty} onClick={() => onConfirm(product.id)}>
              <Icon name="check" size={16} /> Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Lista de productos con casillas y cantidad, agrupada por categoría
function Picker({ onContinue, editing }) {
  const { items, setQty, remove, count } = useQuote()

  return (
    <div className="vico-picker">
      {CATEGORIES.map((c) => (
        <fieldset key={c.id} className="vico-picker__group">
          <legend>{c.name}</legend>
          {PRODUCTS.filter((p) => p.cat === c.id).map((p) => {
            const checked = Boolean(items[p.id])
            return (
              <div key={p.id} className={`vico-pick${checked ? ' is-checked' : ''}`}>
                <label className="vico-pick__label">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => (e.target.checked ? setQty(p.id, 1) : remove(p.id))}
                  />
                  <span className="vico-pick__box" aria-hidden="true"><Icon name="check" size={14} /></span>
                  <img src={p.img} alt="" width="44" height="33" />
                  <span className="vico-pick__text">
                    <strong>{p.name}</strong>
                    <small>{p.en}</small>
                  </span>
                </label>
                {checked && <QtyStepper product={p} />}
              </div>
            )
          })}
        </fieldset>
      ))}
      <button type="button" className="btn btn--red btn--block vico-picker__go" disabled={!count} onClick={onContinue}>
        {count
          ? `${editing ? 'Listo' : 'Continuar'} · ${count} ${count === 1 ? 'pieza' : 'piezas'}`
          : 'Marca al menos un producto'}
      </button>
    </div>
  )
}

// Resumen final de la orden
function Summary({ data }) {
  const { lines, count } = useQuote()
  return (
    <div className="vico-summary">
      <p className="vico-summary__title"><Icon name="list" size={18} /> Orden a cotizar</p>
      <dl className="vico-summary__data">
        <div><dt>Cliente</dt><dd>{data.cliente}</dd></div>
        <div><dt>Teléfono</dt><dd>{data.telefono}</dd></div>
        <div>
          <dt>Dirección</dt>
          <dd>
            {data.direccion}
            {data.mapa && <> · <a href={data.mapa} target="_blank" rel="noreferrer">Ver en mapa</a></>}
          </dd>
        </div>
      </dl>
      {lines.length ? (
        <ul className="vico-summary__items">
          {lines.map(({ product, qty }) => (
            <li key={product.id}>
              <img src={product.img} alt="" width="44" height="33" />
              <span>{product.name}</span>
              <strong>× {qty}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="vico-summary__empty">No hay productos. Toca “Cambiar productos”.</p>
      )}
      <p className="vico-summary__total">{count} {count === 1 ? 'pieza' : 'piezas'} en total</p>
    </div>
  )
}

/* ---------- Vico ---------- */

const START = () => promptFor('cliente', {})

// La plática se guarda en el navegador para que no se pierda al recargar; caduca a los 7 días
const STORE_KEY = 'vico-chat'
const STORE_TTL = 7 * 24 * 60 * 60 * 1000
const PHASES = ['cliente', 'telefono', 'productos', 'direccion', 'confirm', 'sent']
const MSG_TYPES = ['text', 'product', 'picker', 'summary']

const validMsg = (m) =>
  m && Number.isInteger(m.id) && ['bot', 'user'].includes(m.from) && MSG_TYPES.includes(m.type) &&
  (m.type !== 'text' || typeof m.text === 'string') &&
  (m.type !== 'product' || (byId[m.productId] && Number.isInteger(m.qty)))

function loadChat() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY))
    if (!saved || Date.now() - saved.savedAt > STORE_TTL) return null
    if (!PHASES.includes(saved.phase) || !Array.isArray(saved.messages) || !saved.messages.length || !saved.messages.every(validMsg)) return null
    uid = Math.max(uid, ...saved.messages.map((m) => m.id))
    return { phase: saved.phase, data: saved.data || {}, messages: saved.messages, editing: Boolean(saved.editing) }
  } catch {
    return null
  }
}

export default function Vico() {
  const quote = useQuote()
  const { open, setOpen, incoming, lines, count } = quote
  const [saved] = useState(loadChat)
  const [phase, setPhase] = useState(saved?.phase ?? 'cliente')
  const [data, setData] = useState(saved?.data ?? {})
  const [messages, setMessages] = useState(() => saved?.messages ?? START())
  const [editing, setEditing] = useState(saved?.editing ?? false) // cambiando productos desde el resumen
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [locating, setLocating] = useState(false)
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const step = TEXT_STEPS[phase]
  const lastAdded = byId[incoming[incoming.length - 1]]

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ phase, data, messages, editing, savedAt: Date.now() }))
    } catch { /* modo privado o almacenamiento lleno */ }
  }, [phase, data, messages, editing])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open, incoming])

  useEffect(() => {
    if (open && step) inputRef.current?.focus()
  }, [open, step])

  // Celular: el chat ocupa solo el área visible (sin el teclado) y la página de atrás no se mueve
  useEffect(() => {
    const vv = window.visualViewport
    if (!open || !vv || !window.matchMedia('(max-width: 600px)').matches) return
    const root = rootRef.current
    const fit = () => {
      root.style.setProperty('--vv-top', `${vv.offsetTop}px`)
      root.style.setProperty('--vv-h', `${vv.height}px`)
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
    }
    fit()
    vv.addEventListener('resize', fit)
    vv.addEventListener('scroll', fit)
    document.documentElement.classList.add('vico-lock')
    return () => {
      vv.removeEventListener('resize', fit)
      vv.removeEventListener('scroll', fit)
      document.documentElement.classList.remove('vico-lock')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const goTo = (next, nextData, extra = []) => {
    setPhase(next)
    setMessages((m) => [...m, ...extra, ...promptFor(next, nextData)])
  }

  // Guarda la respuesta del paso actual y pasa al siguiente
  const answerStep = (answer, extra = {}) => {
    const next = { ...data, [phase]: answer, ...extra }
    setData(next)
    setValue('')
    setError(null)
    goTo(NEXT[phase], next, [msg({ from: 'user', text: answer })])
  }

  // Respuesta escrita (nombre, teléfono, dirección)
  const onSubmit = (e) => {
    e.preventDefault()
    const problem = step.check(value)
    if (problem) {
      setError(problem)
      return
    }
    answerStep(step.show(value), phase === 'direccion' ? { mapa: null } : {})
  }

  // Ubicación en tiempo real: manda un enlace de Google Maps con las coordenadas del GPS
  const shareLocation = () => {
    if (!navigator.geolocation) {
      setError('Tu navegador no permite compartir ubicación. Escribe la dirección, por favor.')
      return
    }
    setLocating(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false)
        const lat = coords.latitude.toFixed(6)
        const lng = coords.longitude.toFixed(6)
        answerStep(`📍 Mi ubicación actual (±${Math.round(coords.accuracy)} m)`, {
          mapa: `https://www.google.com/maps?q=${lat},${lng}`,
        })
      },
      (err) => {
        setLocating(false)
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'No diste permiso para usar tu ubicación. Puedes escribir la dirección.'
            : 'No pude obtener tu ubicación. Intenta de nuevo o escribe la dirección.',
        )
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    )
  }

  // Lista de casillas: sigue a la dirección o, si venía del resumen, regresa a confirmar
  const onPickerDone = () => {
    setMessages((m) => m.map((x) => (x.type === 'picker' && !x.done ? { ...x, done: true } : x)))
    const userMsg = msg({ from: 'user', text: linesText(lines) })
    if (editing) {
      setEditing(false)
      goTo('confirm', data, [userMsg])
    } else {
      goTo(NEXT.productos, data, [userMsg])
    }
  }

  // Tarjeta de producto confirmada: queda en el chat y Vico retoma donde iba
  const onCardConfirm = (id) => {
    const product = byId[id]
    const qty = quote.items[id] || 0
    quote.dismissIncoming(id)
    const card = msg({ type: 'product', productId: id, qty })
    const answer = msg({ from: 'user', text: `${qty} × ${product.name}` })
    const ok = msg({ text: '¡Anotado! ✅' })

    if (phase === 'sent') {
      // Ya se había enviado una orden: arranca una nueva con este producto
      setPhase('cliente')
      setData({})
      setMessages([card, answer, msg({ text: '¡Anotado! ✅ Empecemos una nueva cotización.' }), ...START()])
      return
    }
    const resume =
      TEXT_STEPS[phase] ? [msg({ text: `Sigamos: ${askText(phase, data)}` })]
        : phase === 'confirm' ? [msg({ text: 'Ya actualicé tu orden 👆' })]
          : []
    setMessages((m) => [...m, card, answer, ok, ...resume])
  }

  const editProducts = () => {
    setEditing(true)
    goTo('productos', data)
  }

  const send = () => {
    window.open(waLink(buildMessage(data, lines)), '_blank', 'noopener')
    quote.clear()
    setPhase('sent')
    setMessages((m) => [...m, msg({ text: 'Ya abrí WhatsApp con tu orden. Solo dale enviar y te respondemos con precios. 🐾' })])
  }

  const restart = () => {
    setPhase('cliente')
    setData({})
    setEditing(false)
    setMessages(START())
    setValue('')
    setError(null)
  }

  return (
    <div ref={rootRef} className={`vico${open ? ' is-open' : ''}`}>
      {open && (
        <section className="vico-chat" role="dialog" aria-labelledby="vico-title">
          <header className="vico-chat__head">
            <img className="vico-chat__avatar" src={AVATAR} alt="" width="56" height="56" />
            <div>
              <h2 id="vico-title">Vico</h2>
              <p>Asistente virtual · Vehicolor</p>
            </div>
            <button type="button" className="vico-chat__close" aria-label="Cerrar asistente" onClick={() => setOpen(false)}>
              <Icon name="close" size={22} />
            </button>
          </header>

          <ol ref={listRef} className="vico-chat__list" aria-live="polite">
            {messages.map((m) => {
              if (m.type === 'picker' && m.done) return null
              const wide = m.type !== 'text'
              return (
                <li key={m.id} className={`vico-msg vico-msg--${m.from}${wide ? ' vico-msg--wide' : ''}`}>
                  {m.from === 'bot' && <img className="vico-msg__avatar" src={AVATAR} alt="" width="36" height="36" />}
                  {m.type === 'text' && <p className="vico-msg__bubble">{m.text}</p>}
                  {m.type === 'product' && <ProductCard product={byId[m.productId]} confirmedQty={m.qty} />}
                  {m.type === 'picker' && <Picker onContinue={onPickerDone} editing={editing} />}
                  {m.type === 'summary' && <Summary data={data} />}
                </li>
              )
            })}

            {/* Productos agregados con "Cotizar" que esperan su cantidad */}
            {incoming.map((id) => (
              <li key={`in-${id}`} className="vico-msg vico-msg--bot vico-msg--wide">
                <img className="vico-msg__avatar" src={AVATAR} alt="" width="36" height="36" />
                <div className="vico-msg__stack">
                  <p className="vico-msg__bubble">¡Buena elección! Agregaste este producto:</p>
                  <ProductCard product={byId[id]} pending onConfirm={onCardConfirm} />
                </div>
              </li>
            ))}
          </ol>

          <footer className="vico-chat__foot">
            {step && (
              <form className="vico-chat__form" onSubmit={onSubmit} noValidate>
                <label htmlFor="vico-input" className="sr-only">{askText(phase, data)}</label>
                <input
                  ref={inputRef}
                  id="vico-input"
                  key={phase}
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setError(null) }}
                  placeholder={step.placeholder}
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'vico-error' : undefined}
                  {...step.input}
                />
                <button type="submit" className="vico-chat__send" aria-label="Enviar respuesta">
                  <Icon name="send" size={22} />
                </button>
              </form>
            )}
            {step?.geo && (
              <button type="button" className="vico-geo" onClick={shareLocation} disabled={locating}>
                <Icon name="pin" size={18} /> {locating ? 'Buscando tu ubicación…' : 'Usar mi ubicación actual'}
              </button>
            )}
            {phase === 'productos' && <p className="vico-chat__hint">Marca tus productos arriba y toca “{editing ? 'Listo' : 'Continuar'}”.</p>}
            {phase === 'confirm' && (
              <div className="vico-chat__actions">
                <button type="button" className="btn btn--red btn--block" disabled={!count} onClick={send}>
                  <Icon name="chat" size={20} /> Confirmar y enviar por WhatsApp
                </button>
                <button type="button" className="vico-chat__link" onClick={editProducts}>Cambiar productos</button>
              </div>
            )}
            {phase === 'sent' && (
              <div className="vico-chat__actions">
                <button type="button" className="btn btn--red btn--block" onClick={restart}>Hacer otra cotización</button>
              </div>
            )}
            {error
              ? <p id="vico-error" className="vico-chat__error">{error}</p>
              : step && <p className="vico-chat__note">Tus datos solo se usan para atender tu solicitud.</p>}
          </footer>
        </section>
      )}

      <div className="vico__launch">
        {!open && (
          <span className="vico__bubble" aria-hidden="true">
            {lastAdded ? `Agregaste ${lastAdded.name} 👀` : '¿Necesitas ayuda?'}
          </span>
        )}
        <button
          type="button"
          className="vico__btn"
          aria-label={
            open ? 'Cerrar a Vico'
              : incoming.length ? `Abrir a Vico: ${incoming.length} producto${incoming.length > 1 ? 's' : ''} por confirmar`
                : 'Abrir a Vico, asistente virtual'
          }
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <img src={AVATAR} alt="" width="88" height="88" />
          {!open && incoming.length > 0 && (
            <span key={incoming.length} className="vico__badge" aria-hidden="true">{incoming.length}</span>
          )}
        </button>
      </div>
    </div>
  )
}
