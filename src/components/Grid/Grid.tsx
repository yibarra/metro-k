import React, { useCallback } from 'react'
import { Group } from 'react-konva'

import GridLine from './GridLine'
import type { GridProps } from './interfaces'

// grid
const Grid: React.FC<GridProps> = ({ grid, height, width }) => {
  // create line
  const createLine = (index: string, points: number[]) => {
    return (
      <GridLine animation={true} key={index} index={index} points={points} />
    )
  }

  // create axis
  const createGrid = useCallback(() => {
    const axis = []
    const size = width > height ? width : height

    for (let i = 0; i < size / grid; i++) {
      axis.push(createLine(`${i}-h`, [i * grid, 0, i * grid, size]))
      axis.push(createLine(`${i}-v`, [0, i * grid, size, i * grid]))
    }

    return axis
  }, [grid, height, width])

  // render
  return <Group>{createGrid()}</Group>
}

export default Grid
