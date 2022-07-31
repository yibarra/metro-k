import React, { useCallback } from 'react'
import { Context } from 'konva/lib/Context'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import { Group, Shape as ShapeK } from 'react-konva'

import type { GridProps } from './interfaces'

// grid
const Grid: React.FC<GridProps> = ({ boxes, height, width }) => {
  // create axis
  const createAxis = useCallback((ctx: Context, size: number): false | void => {
    if (!Number.isInteger(size) && !Array.isArray(boxes)) {
      return false
    }

    for (const box of boxes) {
      ctx.rect(...box, box[2])
    }
  }, [boxes])

  // create grid scene
  const createGridScene = useCallback((ctx: Context, shape: Shape<ShapeConfig>): void => {
    const size = width > height ? width : height

    ctx.beginPath()
    createAxis(ctx, size) // x & y
    ctx.closePath()

    ctx.fillStrokeShape(shape)
  }, [createAxis, height, width])

  // render
  return <Group>
    <ShapeK
      fill="#FFFFFF"
      stroke="#222"
      strokeWidth={1}
      opacity={0.1}
      sceneFunc={createGridScene}
    />
  </Group>
}

export default Grid
