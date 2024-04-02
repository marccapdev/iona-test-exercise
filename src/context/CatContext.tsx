import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface CatContextType {
  selectedBreed: string
  setSelectedBreed: (breed: string) => void
  catDetails: any
  setCatDetails: (details: any) => void
}

const CatContext = createContext<CatContextType | undefined>(undefined)

export const useCatContext = (): CatContextType => {
  const context = useContext(CatContext)
  if (context === undefined) {
    throw new Error('useCatContext must be used within a CatProvider')
  }
  return context
}

export const CatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedBreed, setSelectedBreed] = useState('')
  const [catDetails, setCatDetails] = useState(null)

  return (
    <CatContext.Provider value={{ selectedBreed, setSelectedBreed, catDetails, setCatDetails }}>
      {children}
    </CatContext.Provider>
  )
}
