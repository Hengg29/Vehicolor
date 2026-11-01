import { useSyncExternalStore } from 'react'

// true mientras la media query se cumpla; se actualiza al girar o cambiar el tamaño de la pantalla
export function useMedia(query) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
  )
}
