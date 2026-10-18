import { useEffect, useMemo, useState } from 'react'
import { QuoteContext } from './QuoteContext.js'
import { PRODUCTS } from '../data/vehicolor.js'

const KEY = 'vehicolor-cotizacion'
const INCOMING_KEY = 'vehicolor-avisos'
const MAX_QTY = 999
const VALID_IDS = new Set(PRODUCTS.map((p) => p.id))

// Recupera la cotización guardada; ignora productos que ya no existan
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY)) || {}
    return Object.fromEntries(
      Object.entries(saved).filter(([id, qty]) => VALID_IDS.has(id) && Number.isInteger(qty) && qty > 0),
    )
  } catch {
    return {}
  }
}

// Avisos pendientes de Vico (productos agregados con "Cotizar" sin confirmar)
function loadIncoming() {
  try {
    const saved = JSON.parse(localStorage.getItem(INCOMING_KEY))
    return Array.isArray(saved) ? [...new Set(saved.filter((id) => VALID_IDS.has(id)))] : []
  } catch {
    return []
  }
}

export default function QuoteProvider({ children }) {
  const [items, setItems] = useState(load) // { [productId]: cantidad }
  const [open, setOpen] = useState(false)
  // Productos que se agregaron con "Cotizar" y Vico todavía no muestra (globito de notificación)
  const [incoming, setIncoming] = useState(loadIncoming)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* modo privado */ }
  }, [items])

  useEffect(() => {
    try { localStorage.setItem(INCOMING_KEY, JSON.stringify(incoming)) } catch { /* modo privado */ }
  }, [incoming])

  const value = useMemo(() => {
    const setQty = (id, qty) => setItems((prev) => {
      const next = { ...prev }
      if (!qty || qty < 1) delete next[id]
      else next[id] = Math.min(Math.floor(qty), MAX_QTY)
      return next
    })

    return {
      items,
      count: Object.values(items).reduce((sum, q) => sum + q, 0),
      lines: PRODUCTS.filter((p) => items[p.id]).map((p) => ({ product: p, qty: items[p.id] })),
      add: (id) => setQty(id, (items[id] || 0) + 1),
      setQty,
      remove: (id) => setQty(id, 0),
      clear: () => setItems({}),
      open,
      setOpen,
      incoming,
      // Botón "Cotizar": lo agrega con 1 pieza (si no estaba) y avisa a Vico para preguntar la cantidad
      notify: (id) => {
        if (!items[id]) setQty(id, 1)
        setIncoming((list) => (list.includes(id) ? list : [...list, id]))
      },
      dismissIncoming: (id) => setIncoming((list) => list.filter((x) => x !== id)),
    }
  }, [items, open, incoming])

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}
