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

  // create grid boxes
  const createGridBoxes = useCallback((width: number, height: number) => {
    const gridBox: AxisType[] = []
    const xGrid: number = Math.ceil(width / sizeBox)
    const yGrid: number = Math.ceil(height / sizeBox)
    
    for (let i = 0; i < xGrid; i++) {
      for (let j = 0; j < yGrid; j++) {
        const x = sizeBox * i
        const y = sizeBox * j

        gridBox.push([
          x + (width - (xGrid * sizeBox)) / 2,
          y + (height - (yGrid * sizeBox)) / 2,
          sizeBox,
        ])
      }
    }

    setBoxes(gridBox)
  }, [sizeBox])

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
