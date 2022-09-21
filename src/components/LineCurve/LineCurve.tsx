import React, { useState } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import LineCurveAnchorPoint from './LineCurveAnchorPoint'

// line curve
const LineCurve: React.FC<any> = ({
  active,
  currentPoint,
  curve,
  getCell,
  isDragging,
  index,
  newPoint,
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

  // find point => 1: init 2: end 0: not point
  const findPoint = (): number => {
    if (currentPoint === pointInit.position) {
      return 1
    } else if (currentPoint === pointEnd.position) {
      return 2
    }

    return 0
  }

  // draw lines
  const drawLines = (context: Context, shape: ShapeType) => {
    context.beginPath()

    const point = findPoint()
    
    if (isDragging && active && point) {
      const postInit = point === 1 ? newPoint : pointInit

      context.moveTo(postInit.x, postInit.y)
      
      context.quadraticCurveTo(
        xy.x,
        xy.y,
        point === 1 ? pointCurveEnd[0] : newPoint.x,
        point === 1 ? pointCurveEnd[1] : newPoint.y,
      )
    } else {
      context.moveTo(pointCurveInit[0], pointCurveInit[1])

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