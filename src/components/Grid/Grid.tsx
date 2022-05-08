import React, { useCallback } from 'react'
import { Layer, Line } from 'react-konva'

import type { GridProps } from './interfaces'

// grid
const Grid: React.FC<GridProps> = ({ grid, width }) => {
  // create line
  const createLine = (index: string, points: number[]) => {
    return (
      <Line
        key={index}
        points={points}
        stroke="#222"
        strokeWidth={2}
      />
    )
  }

  // create axis
  const createGrid = useCallback(() => {
    const axis = []

    for (let i = 0; i < width / grid; i++) {
      axis.push(createLine(`${i}-h`, [i * grid, 0, i * grid, width]))
      axis.push(createLine(`${i}-v`, [0, i * grid, width, i * grid]))
    }

    return axis
  }, [grid, width])

  // render
  return (
    <Layer>
      {createGrid()}
    </Layer>
  )
}

export default Grid
