import React, { useCallback } from 'react'
import { Context } from 'konva/lib/Context'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import { Group, Shape as ShapeK } from 'react-konva'

import type { GridProps } from './interfaces'

// grid
const Grid: React.FC<GridProps> = ({ createGridBoxes, width, height }) => {
  // create axis
  const createAxis = useCallback((ctx: Context): false | void => {
    console.info('CREATE GRID ESCENE', width, height)
    createGridBoxes(ctx, width, height)

    /*
    for (const box of boxes) {
      ctx.rect(...box, box[2])
    }
    
    for (let i = 0; i < (size / 2) / boxSize; i++) {
      ctx.moveTo(i * grid, 0)
      ctx.lineTo(i * grid, size)
      
      ctx.moveTo(0, i * grid)
      ctx.lineTo(size, i * grid)
    }
    */
  }, [createGridBoxes, height, width])

  // create grid scene
  const createGridScene = useCallback((ctx: Context, shape: Shape<ShapeConfig>): void => {
    ctx.beginPath()
    createAxis(ctx) // x & y
    ctx.closePath()

    ctx.fillStrokeShape(shape)
  }, [createAxis])

  // render
  return <Group>
    <ShapeK
      fill="#FFFFFF"
      stroke="#222"
      strokeWidth={1}
      opacity={0.25}
      sceneFunc={createGridScene}
    />
  </Group>
}

export default Grid
