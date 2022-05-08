import React, { createContext, useState } from 'react'

// grid context
const GridContext = createContext({})

// grid provider
const GridProvider: React.FC<any> = ({ children }) => {
  const [grid, setGrid] = useState<number>(68)

  // calculate grid width
  const calculateGridWidth = (columns: number[]) => {
    if (columns) {
      return (100 / columns[1]) * columns[0]
    }
  }

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
