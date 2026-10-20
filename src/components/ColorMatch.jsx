import { useEffect, useRef } from 'react'
import { COLOR_MATCH as C, waLink } from '../data/vehicolor.js'

// Igualación de color: escáner sobre la foto (color a la izquierda, gris a la derecha).
// La línea oscila sola y sigue al cursor o al dedo; con movimiento reducido queda fija en 62 %.
const START = 62
const AMP = 42
const PERIOD = 2200

function PointVisual({ type }) {
  if (type === 'finishes') {
    return (
      <span className="cm-vis" aria-hidden="true">
        <i style={{ background: 'linear-gradient(90deg,#8e1d18,#e0332b)' }} />
        <i style={{ background: 'linear-gradient(110deg,#6b6f76,#eceef1 40%,#9aa0a8)' }} />
        <i style={{ background: 'linear-gradient(110deg,#f3eae2,#e9c8d9 40%,#cfe3f2)' }} />
      </span>
    )
  }
  if (type === 'mixes') {
    return (
      <span className="cm-vis" aria-hidden="true">
        <span className="cm-key cm-key--y">1K</span>
        <span className="cm-key">2K</span>
      </span>
    )
  }
  return (
    <span className="cm-vis" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </span>
  )
}

export default function ColorMatch() {
  const stageRef = useRef(null)
  const pctRef = useRef(null)
  const chipsRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    const chips = [...chipsRef.current.children]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let x = START
    let auto = !reduce
    let t0 = performance.now()
    let frame

    // Mueve la línea, actualiza la lectura y enciende el chip de la franja que cruza
    const set = (v) => {
      x = Math.max(0, Math.min(100, v))
      stage.style.setProperty('--x', `${x}%`)
      pctRef.current.textContent = `${Math.round(x)}%`
      const k = Math.min(chips.length - 1, Math.floor(x / (100 / chips.length)))
      chips.forEach((c, i) => c.classList.toggle('on', i === k))
    }
    const loop = (t) => {
      if (auto) set(50 + AMP * Math.sin((t - t0) / PERIOD))
      frame = requestAnimationFrame(loop)
    }
    const onMove = (e) => {
      auto = false
      const r = stage.getBoundingClientRect()
      set(((e.clientX - r.left) / r.width) * 100)
    }
    // Al soltar, retoma la oscilación desde donde quedó la línea
    const onLeave = () => {
      if (reduce) return
      const s = Math.asin(Math.max(-1, Math.min(1, (x - 50) / AMP)))
      t0 = performance.now() - s * PERIOD
      auto = true
    }

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    set(x)
    if (!reduce) frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section id="color" className="cm">
      <div className="cm-grid">
        <figure className="cm-match">
          <div className="cm-frame">
            <span className="cm-br cm-br--tl" aria-hidden="true" />
            <span className="cm-br cm-br--tr" aria-hidden="true" />
            <span className="cm-br cm-br--bl" aria-hidden="true" />
            <span className="cm-br cm-br--br" aria-hidden="true" />
            <div ref={stageRef} className="cm-stage">
              <img src={C.image.src} alt={C.image.alt} width={C.image.width} height={C.image.height} loading="lazy" draggable="false" />
              <img className="cm-gray" src={C.image.src} alt="" aria-hidden="true" width={C.image.width} height={C.image.height} loading="lazy" draggable="false" />
              <div className="cm-scan" aria-hidden="true" />
              <div className="cm-readout" aria-hidden="true">LECTURA <b ref={pctRef}>{START}%</b></div>
              <div className="cm-tape" aria-hidden="true"><b>●</b> {C.tape}</div>
            </div>
          </div>
          <div ref={chipsRef} className="cm-chips" aria-hidden="true">
            {C.colors.map((c) => (
              <div key={c.name} className="cm-chip" style={{ '--c': c.hex }}><i /><span>{c.name}</span></div>
            ))}
          </div>
          <figcaption className="cm-hint">{C.hint}</figcaption>
        </figure>

        <div className="cm-copy">
          <p className="cm-eyebrow">{C.eyebrow}</p>
          <h2 className="cm-title">{C.title} <em>{C.titleMark}</em></h2>
          <p className="cm-lead">{C.lead.before}<strong>{C.lead.strong}</strong>{C.lead.after}</p>

          <ul className="cm-list">
            {C.points.map((p) => (
              <li key={p.text}><PointVisual type={p.visual} />{p.text}</li>
            ))}
          </ul>

          <a className="cm-cta" href={waLink(C.waText)} target="_blank" rel="noreferrer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z" />
            </svg>
            <span>{C.cta}</span>
          </a>
          <span className="cm-note">{C.note}</span>
        </div>
      </div>
    </section>
  )
}
