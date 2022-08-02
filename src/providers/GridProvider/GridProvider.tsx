import React, { createContext, useCallback, useState } from 'react'

import type { AxisType } from '../../components/Grid/interfaces'
import type { GridContextProps, GridProviderProps } from './interfaces'
import type { Context } from 'konva/lib/Context'

// sizeBox context
const GridContext = createContext({} as GridContextProps)

// sizeBox provider
const GridProvider: React.FC<GridProviderProps> = ({ children }) => {
  const [sizeBox, setSizeBox] = useState<number>(18)

  // fix position center
  const fixPositionCenter = useCallback(
    (value: number, sizeAxis: number, axis: number, sizeBox: number): number => {
    return Math.floor(value + (sizeAxis - Math.floor(axis * sizeBox)) / 2)
  }, [])

  // get grid axis
  const getGridAxis = useCallback((width: number, height: number) => {
    const xGrid: number = Math.floor(width / sizeBox)
    const yGrid: number = Math.floor(height / sizeBox)

    return {
      xGrid,
      yGrid
    }
  }, [sizeBox])

  // create grid boxes
  const createGridBoxes = useCallback((ctx: Context, width: number, height: number): void => {
    const { xGrid, yGrid } = getGridAxis(width, height)

    const size = width > height ? width : height
    const diffX = Math.floor(width / 2 - (xGrid / 2 * sizeBox))
    const diffY = Math.floor(height / 2 - (yGrid / 2 * sizeBox))
    
    for (let i = 0; i < size / sizeBox; i++) {
      const x = (i * sizeBox) + diffX
      const y = (i * sizeBox) + diffY

      ctx.moveTo(x, 0)
      ctx.lineTo(x, size)

      ctx.moveTo(0, y)
      ctx.lineTo(size, y)
    }
  }, [getGridAxis, sizeBox])

  // get cell
  const getCell = (x: number, y: number, width: number, height: number): AxisType | void => {
    const { xGrid, yGrid } = getGridAxis(width, height)

    if (xGrid && yGrid) {
      const posX = fixPositionCenter(Math.floor(Math.floor(x / sizeBox) * sizeBox), width, xGrid, sizeBox)
      const posY = fixPositionCenter(Math.floor(Math.floor(y / sizeBox) * sizeBox), height, yGrid, sizeBox)
      
      return [posX, posY, sizeBox]
    }
  }

  // render
  return (
    <GridContext.Provider value={{
      createGridBoxes,
      getCell,
      sizeBox,
      setSizeBox,
      fixPositionCenter,
    }}>
      {children}
    </GridContext.Provider>
  )
}

export { GridContext, GridProvider }
export default GridProvider
