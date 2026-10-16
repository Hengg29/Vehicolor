import { createContext, useContext } from 'react'

export const QuoteContext = createContext(null)

export const useQuote = () => useContext(QuoteContext)
