import { useQuote } from '../quote/QuoteContext.js'

export default function QtyStepper({ product }) {
  const { items, setQty } = useQuote()
  const qty = items[product.id] || 0

  return (
    <div className="stepper" role="group" aria-label={`Cantidad de ${product.name}`}>
      <button type="button" onClick={() => setQty(product.id, qty - 1)} aria-label="Quitar uno">−</button>
      <input
        type="number"
        inputMode="numeric"
        min="1"
        max="999"
        value={qty}
        onChange={(e) => setQty(product.id, Number(e.target.value) || 1)}
        aria-label="Cantidad"
      />
      <button type="button" onClick={() => setQty(product.id, qty + 1)} aria-label="Agregar uno">+</button>
    </div>
  )
}
