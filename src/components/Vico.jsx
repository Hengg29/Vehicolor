import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { useQuote } from '../quote/QuoteContext.js'
import { PRODUCTS, waLink } from '../data/vehicolor.js'

// Asistente virtual tipo chat: pregunta los datos uno por uno y arma la cotización para WhatsApp
const AVATAR = '/img/vico.webp'
const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
const digits = (s) => s.replace(/\D/g, '')

const STEPS = [
  {
    key: 'cliente',
    ask: '¡Hola! Soy Vico 🐾 Te ayudo a cotizar. ¿Cuál es el nombre del cliente?',
    placeholder: 'Nombre y apellido',
    input: { autoComplete: 'name' },
    check: (v) => (v.trim().length >= 2 ? null : 'Escribe el nombre del cliente.'),
    show: (v) => v.trim(),
  },
  {
    key: 'telefono',
    ask: (d) => `Mucho gusto, ${d.cliente.split(' ')[0]}. ¿Cuál es su teléfono?`,
    placeholder: 'Teléfono a 10 dígitos',
    input: { type: 'tel', inputMode: 'tel', autoComplete: 'tel' },
    check: (v) => (digits(v).length === 10 ? null : 'El teléfono debe tener 10 dígitos.'),
    show: (v) => digits(v),
  },
  {
    key: 'material',
    ask: '¿Qué material ocupa? Puedes escribir el producto y la cantidad.',
    placeholder: 'Ej. Barniz HS, 1 galón',
    input: { list: 'vico-materiales' },
    check: (v) => (v.trim() ? null : 'Dime qué material necesitas.'),
    show: (v) => v.trim(),
  },
  {
    key: 'presupuesto',
    ask: '¿Y cuál es su presupuesto aproximado en pesos?',
    placeholder: 'Ej. 2500',
    input: { inputMode: 'numeric' },
    check: (v) => (Number(digits(v)) > 0 ? null : 'Escribe el presupuesto en pesos, solo números.'),
    show: (v) => money.format(Number(digits(v))),
  },
]

const askText = (step, data) => (typeof step.ask === 'function' ? step.ask(data) : step.ask)

function buildMessage(d) {
  return [
    '*Cotización Vehicolor* (vía Vico)',
    '',
    `*Cliente:* ${d.cliente}`,
    `*Teléfono:* ${d.telefono}`,
    `*Material:* ${d.material}`,
    `*Presupuesto:* ${d.presupuesto} MXN`,
  ].join('\n')
}

const firstMessage = () => [{ from: 'bot', text: askText(STEPS[0], {}) }]

export default function Vico() {
  const { count } = useQuote()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})
  const [messages, setMessages] = useState(firstMessage)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const done = step >= STEPS.length

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    if (open && !done) inputRef.current?.focus()
  }, [open, step, done])

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
  }, [open])

  const onSubmit = (e) => {
    e.preventDefault()
    const current = STEPS[step]
    const problem = current.check(value)
    if (problem) {
      setError(problem)
      return
    }
    const answer = current.show(value)
    const next = { ...data, [current.key]: answer }
    const replies = [{ from: 'user', text: answer }]
    if (step + 1 < STEPS.length) {
      replies.push({ from: 'bot', text: askText(STEPS[step + 1], next) })
    } else {
      replies.push({ from: 'bot', text: '¡Listo! Esta es tu cotización:' }, { from: 'bot', text: buildMessage(next), quote: true })
    }
    setData(next)
    setMessages((m) => [...m, ...replies])
    setStep(step + 1)
    setValue('')
    setError(null)
  }

  const send = () => {
    window.open(waLink(buildMessage(data)), '_blank', 'noopener')
    setMessages((m) => [...m, { from: 'bot', text: 'Ya abrí WhatsApp con tu cotización. Solo dale enviar y te respondemos con precios. 🐾' }])
  }

  const restart = () => {
    setStep(0)
    setData({})
    setMessages(firstMessage())
    setValue('')
    setError(null)
  }

  // Con productos en la cotización manda el botón "Ver cotización"; Vico se quita
  if (count > 0) return null

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
            {messages.map((m, i) => (
              <li key={i} className={`vico-msg vico-msg--${m.from}`}>
                {m.from === 'bot' && <img className="vico-msg__avatar" src={AVATAR} alt="" width="36" height="36" />}
                <p className={`vico-msg__bubble${m.quote ? ' vico-msg__bubble--quote' : ''}`}>
                  {m.quote ? m.text.replaceAll('*', '') : m.text}
                </p>
              </li>
            ))}
          </ol>

          <footer className="vico-chat__foot">
            {done ? (
              <div className="vico-chat__actions">
                <button type="button" className="btn btn--red btn--block" onClick={send}>
                  <Icon name="chat" size={20} /> Enviar por WhatsApp
                </button>
                <button type="button" className="vico-chat__link" onClick={restart}>Hacer otra cotización</button>
              </div>
            ) : (
              <form className="vico-chat__form" onSubmit={onSubmit} noValidate>
                <label htmlFor="vico-input" className="sr-only">{askText(STEPS[step], data)}</label>
                <input
                  ref={inputRef}
                  id="vico-input"
                  key={STEPS[step].key}
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setError(null) }}
                  placeholder={STEPS[step].placeholder}
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'vico-error' : undefined}
                  {...STEPS[step].input}
                />
                <button type="submit" className="vico-chat__send" aria-label="Enviar respuesta">
                  <Icon name="send" size={22} />
                </button>
              </form>
            )}
            {error
              ? <p id="vico-error" className="vico-chat__error">{error}</p>
              : <p className="vico-chat__note">Tus datos solo se usan para atender tu solicitud.</p>}
            <datalist id="vico-materiales">
              {PRODUCTS.map((p) => <option key={p.id} value={p.name} />)}
            </datalist>
          </footer>
        </section>
      )}

      <div className="vico__launch">
        {!open && <span className="vico__bubble" aria-hidden="true">¿Necesitas ayuda?</span>}
        <button
          type="button"
          className="vico__btn"
          aria-label={open ? 'Cerrar a Vico' : 'Abrir a Vico, asistente virtual'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <img src={AVATAR} alt="" width="88" height="88" />
        </button>
      </div>
    </div>
  )
}
