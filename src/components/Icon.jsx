// Iconos SVG estilo Lucide (24×24, trazo 2)
const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 21h14" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  play: <path d="M7 4l13 8-13 8z" />,
  pause: <path d="M8 4v16M16 4v16" />,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  zap: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  palette: <><circle cx="12" cy="12" r="9" /><circle cx="8" cy="10" r="1.2" /><circle cx="12" cy="7.5" r="1.2" /><circle cx="16" cy="10" r="1.2" /><path d="M12 21a3 3 0 010-6h2a3 3 0 003-3" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  list: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
  send: <path d="M4 12L20 4l-4 16-4-7z M12 13l8-9" />,
  chat: <path d="M21 12a8.5 8.5 0 01-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1121 12z" />,
}

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
