import React from 'react'
import { Context } from 'konva/lib/Context'
import { Shape, ShapeConfig } from 'konva/lib/Shape'
import { Group, Shape as ShapeK } from 'react-konva'

import type { GridProps } from './interfaces'

// grid
const Grid: React.FC<GridProps> = ({ grid, height, width }) => {
  // create axis
  const createAxis = (ctx: Context, size: number): false | void => {
    if (!Number.isInteger(size)) {
      return false
    }

    for (let i = 0; i < size / grid; i++) {
      ctx.moveTo(i * grid, 0)
      ctx.lineTo(i * grid, size)

      ctx.moveTo(0, i * grid)
      ctx.lineTo(size, i * grid)
    }
  }

  // create grid scene
  const createGridScene = (ctx: Context, shape: Shape<ShapeConfig>): void => {
    const size = width > height ? width : height

    ctx.beginPath()
    createAxis(ctx, size) // x & y
    ctx.closePath()

    ctx.fillStrokeShape(shape)
  }

  // render
  return <Group>
    <ShapeK
      fill="#00D2FF"
      stroke="black"
      strokeWidth={1}
      sceneFunc={createGridScene}
    />
  </Group>
}

export default Grid
