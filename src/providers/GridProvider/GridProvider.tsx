import React, { createContext, useCallback, useState } from 'react'

import { GridProviderProps } from './interfaces'

// grid context
const GridContext = createContext({})

// grid provider
const GridProvider: React.FC<GridProviderProps> = ({ children }) => {
  const [grid, setGrid] = useState<number>(100)

  // calculate grid width
  const calculateGridWidth = useCallback((columns: number, width: number) => {
    if (columns) {
      return width / columns
    }
  }, [])

  // render
  return (
    <GridContext.Provider value={{
      calculateGridWidth,
      grid,
      setGrid,
    }}>
      {children}
    </GridContext.Provider>
  )
}

export { GridContext, GridProvider }
export default GridProvider
