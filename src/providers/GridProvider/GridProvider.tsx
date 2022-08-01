import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { MainContextProps } from '../MainProvider/interfaces'
import { MainContext } from '../MainProvider/MainProvider'
import type { AxisType } from '../../components/Grid/interfaces'
import type { GridProviderProps } from './interfaces'

// sizeBox context
const GridContext = createContext({})

// sizeBox provider
const GridProvider: React.FC<GridProviderProps> = ({ children }) => {
  const { size } = useContext<MainContextProps>(MainContext)

  const [boxes, setBoxes] = useState<AxisType[]>([])
  const [sizeBox, setSizeBox] = useState<number>(20)

  // calculate sizeBox width
  const calculateGridWidth = useCallback((size: number) => {
    return size >= sizeBox ? sizeBox : size
  }, [sizeBox])

  // fix position center
  const fixPositionCenter = useCallback(
    (value: number, sizeAxis: number, axis: number, sizeBox: number) => {
    return value + (sizeAxis - (axis * sizeBox)) / 2
  }, [])

  // get grid axis
  const getGridAxis = useCallback((width: number, height: number) => {
    const xGrid: number = Math.ceil(width / sizeBox)
    const yGrid: number = Math.ceil(height / sizeBox)

    return {
      xGrid,
      yGrid
    }
  }, [sizeBox])

  // create grid boxes
  const createGridBoxes = useCallback((width: number, height: number) => {
    const gridBox: AxisType[] = []
    const { xGrid, yGrid } = getGridAxis(width, height)
    
    for (let i = 0; i < xGrid; i++) {
      for (let j = 0; j < yGrid; j++) {
        const x = sizeBox * i
        const y = sizeBox * j

        gridBox.push([
          fixPositionCenter(x, width, xGrid, sizeBox),
          fixPositionCenter(y, height, yGrid, sizeBox),
          sizeBox,
        ])
      }
    }

    setBoxes(gridBox)
  }, [getGridAxis, fixPositionCenter, sizeBox])

  // get cell
  const getCell = (x: number, y: number): AxisType | void => {
    for (let i = 0; i < boxes.length; i++) {
      const block = boxes[i]

      if (
        x > block[0] &&
        x < block[0] + block[2] &&
        y > block[1] &&
        y < block[1] + block[2]
      ) {
        return block
      }
    }
  }

  // use effect
  useEffect(() => {
    if (size.width > 0 && size.height > 0) {
      createGridBoxes(size.width, size.height)
    }
  }, [createGridBoxes, size])

  // render
  return (
    <GridContext.Provider value={{
      boxes,
      calculateGridWidth,
      getCell,
      sizeBox,
      setSizeBox,
    }}>
      {children}
    </GridContext.Provider>
  )
}

export { GridContext, GridProvider }
export default GridProvider
