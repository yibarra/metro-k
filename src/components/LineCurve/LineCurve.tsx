import React, { useState } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import LineCurveAnchorPoint from './LineCurveAnchorPoint'

// line curve
const LineCurve: React.FC<any> = ({
  active,
  curve,
  isDragging,
  index,
  getCell,
  setIsDragging,
  pointInit,
  pointEnd,
  properties,
  updateLayerCurvePoint,
}) => {
  const { innerHeight, innerWidth } = window

  const x = curve[0] ?? ((pointInit.x + pointEnd.x) / 2)
  const y = curve[1] ?? ((pointInit.y + pointEnd.y) / 2)

  const point = getCell(x, y, innerWidth, innerHeight)
  
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  // draw lines
  const drawLines = (context: Context, shape: ShapeType) => {
    context.beginPath()

    context.moveTo(pointInit.x, pointInit.y)

    context.quadraticCurveTo(
      xy.x,
      xy.y,
      pointEnd.x,
      pointEnd.y,
    )

    context.fillStrokeShape(shape)
  }

  // render
  return (
    <>
      {active && (
        <LineCurveAnchorPoint
          curve={curve}
          getCell={getCell}
          index={index}
          point={point}
          pointEnd={pointEnd}
          pointInit={pointInit}
          setIsDragging={setIsDragging}
          setXY={setXY}
          updateLayerCurvePoint={updateLayerCurvePoint}
          x={xy.x}
          y={xy.y}
        />
      )}

      <Shape {...properties} sceneFunc={drawLines} />
    </>
  )
}

export default LineCurve