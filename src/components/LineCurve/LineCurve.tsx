import React, { useState } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import LineCurveAnchorPoint from './LineCurveAnchorPoint'

// line curve
const LineCurve: React.FC<any> = ({
  active,
  curve,
  getCell,
  isDragging,
  index,
  point,
  pointInit,
  pointEnd,
  properties,
  setIsDragging,
  updateLayerCurvePoint,
}) => {
  const [x, y] = curve
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  const pointCurveInit = getCell(pointInit.x, pointInit.y)
  const pointCurveEnd = getCell(pointEnd.x, pointEnd.y)

  // draw lines
  const drawLines = (context: Context, shape: ShapeType) => {
    context.beginPath()
    
    context.moveTo(pointCurveInit[0], pointCurveInit[1])
    
    if (isDragging) {
      context.quadraticCurveTo(
        xy.x,
        xy.y,
        pointCurveEnd[0],
        pointCurveEnd[1],
      )
    } else {
      context.quadraticCurveTo(
        xy.x,
        xy.y,
        pointCurveEnd[0],
        pointCurveEnd[1],
      )
    }

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
          isDragging={isDragging}
          pointCurveInit={pointCurveInit}
          pointCurveEnd={pointCurveEnd}
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