import { useEffect, useState } from 'react'
import logo from '../assets/logo-vehicolor-blanco.png'

const MAX_WAIT = 3000 // si el video tarda más, se muestra la página de todos modos
const MIN_SHOW = 500  // evita un parpadeo cuando el video ya está en caché
const FADE = 450

// Pantalla de carga: se va cuando el video del hero puede reproducirse (o al llegar a MAX_WAIT)
export default function Splash({ videoReady }) {
  const [minDone, setMinDone] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const [gone, setGone] = useState(false)
  const leaving = minDone && (videoReady || timedOut)

  useEffect(() => {
    const min = setTimeout(() => setMinDone(true), MIN_SHOW)
    const max = setTimeout(() => setTimedOut(true), MAX_WAIT)
    return () => { clearTimeout(min); clearTimeout(max) }
  }, [])

  // Bloquea el scroll mientras está visible y lo quita del DOM al terminar el fade
  useEffect(() => {
    if (!leaving) {
      document.documentElement.style.overflow = 'hidden'
      return
    }
    document.documentElement.style.overflow = ''
    const t = setTimeout(() => setGone(true), FADE)
    return () => clearTimeout(t)
  }, [leaving])

  if (gone) return null

  return (
    <div className={`splash${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <img src={logo} alt="" width="190" height="50" />
      <span className="splash__bar" aria-hidden="true" />
      <span className="sr-only">{leaving ? 'Página lista' : 'Cargando…'}</span>
    </div>
  )
}
