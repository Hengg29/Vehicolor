import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import QuoteProvider from './quote/QuoteProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuoteProvider>
      <App />
    </QuoteProvider>
  </StrictMode>,
)
