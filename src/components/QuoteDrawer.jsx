import { useEffect, useRef, useState } from 'react'
import Field from './Field.jsx'
import Icon from './Icon.jsx'
import QtyStepper from './QtyStepper.jsx'
import { useQuote } from '../quote/QuoteContext.js'
import { waLink } from '../data/vehicolor.js'

const EMPTY_FORM = { nombre: '', correo: '', direccion: '', notas: '' }

function validate(form, lines) {
  const errors = {}
  if (!form.nombre.trim()) errors.nombre = 'Escribe tu nombre.'
  if (!/^\S+@\S+\.\S+$/.test(form.correo.trim())) errors.correo = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  if (!form.direccion.trim()) errors.direccion = 'Escribe la dirección de entrega.'
  if (!lines.length) errors.productos = 'Agrega al menos un producto.'
  return errors
}

function buildMessage(form, lines) {
  return [
    '*Cotización Vehicolor*',
    '',
    `*Nombre:* ${form.nombre.trim()}`,
    `*Correo:* ${form.correo.trim()}`,
    `*Dirección:* ${form.direccion.trim()}`,
    '',
    '*Productos:*',
    ...lines.map(({ product, qty }) => `• ${qty} × ${product.name} (${product.en})`),
    ...(form.notas.trim() ? ['', `*Notas:* ${form.notas.trim()}`] : []),
  ].join('\n')
}

export default function QuoteDrawer() {
  const { lines, count, remove, clear, open, setOpen } = useQuote()
  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(form, lines)
    setErrors(found)
    const first = Object.keys(found).find((k) => k !== 'productos')
    if (first) {
      formRef.current.elements[first].focus()
      return
    }
    if (found.productos) return

    window.open(waLink(buildMessage(form, lines)), '_blank', 'noopener')
    clear()
    setForm(EMPTY_FORM)
    setSent(true)
  }

  const close = () => setOpen(false)

  return (
    <dialog
      ref={dialogRef}
      className="drawer"
      aria-labelledby="drawer-title"
      onClose={() => { setOpen(false); setSent(false) }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="drawer__panel">
        <header className="drawer__head">
          <h2 id="drawer-title">Tu cotización{count > 0 && <span className="drawer__count">{count}</span>}</h2>
          <button type="button" className="icon-btn" aria-label="Cerrar cotización" onClick={close}>
            <Icon name="close" />
          </button>
        </header>

        {sent ? (
          <div className="drawer__empty">
            <span className="drawer__ok"><Icon name="check" size={28} /></span>
            <h3>¡Listo! Ya se abrió WhatsApp</h3>
            <p>Solo dale enviar al mensaje. Te respondemos con precios y disponibilidad.</p>
            <button type="button" className="btn btn--yellow" onClick={close}>Seguir viendo productos</button>
          </div>
        ) : lines.length === 0 ? (
          <div className="drawer__empty">
            <span className="drawer__ok drawer__ok--muted"><Icon name="list" size={28} /></span>
            <h3>Todavía no agregas productos</h3>
            <p>Usa el botón “Agregar” en cada producto y elige la cantidad.</p>
            <a className="btn btn--yellow" href="#productos" onClick={close}>Ver productos</a>
          </div>
        ) : (
          <form ref={formRef} className="drawer__body" onSubmit={onSubmit} noValidate>
            <ul className="quote-list">
              {lines.map(({ product }) => (
                <li key={product.id} className="quote-item">
                  <img src={product.img} alt="" width="64" height="48" />
                  <div className="quote-item__info">
                    <p className="quote-item__name">{product.name}</p>
                    <QtyStepper product={product} />
                  </div>
                  <button type="button" className="icon-btn" aria-label={`Quitar ${product.name}`} onClick={() => remove(product.id)}>
                    <Icon name="trash" size={18} />
                  </button>
                </li>
              ))}
            </ul>

            <fieldset className="drawer__form">
              <legend>Tus datos</legend>
              <Field id="nombre" label="Nombre" autoComplete="name" value={form.nombre} onChange={onChange} error={errors.nombre} />
              <Field id="correo" label="Correo" type="email" autoComplete="email" value={form.correo} onChange={onChange} error={errors.correo} />
              <Field id="direccion" label="Dirección de entrega" multiline rows="2" autoComplete="street-address" value={form.direccion} onChange={onChange} error={errors.direccion} />
              <Field id="notas" label="Notas (opcional)" multiline rows="2" placeholder="Presentación (litro, galón), código de color, horario de entrega…" value={form.notas} onChange={onChange} />
            </fieldset>

            <footer className="drawer__foot">
              <button type="submit" className="btn btn--red btn--lg btn--block">
                <Icon name="chat" size={20} /> Enviar cotización por WhatsApp
              </button>
              <p>Se abre WhatsApp con tu pedido listo para enviar. Los precios te los confirmamos por ahí.</p>
            </footer>
          </form>
        )}
      </div>
    </dialog>
  )
}
