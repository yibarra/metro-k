import React, { useState } from 'react'
import { Shape } from 'react-konva'
import type { Context } from 'konva/lib/Context'

import LineCurveAnchorPoint from './LineCurveAnchorPoint'
import type { Shape as ShapeType } from 'konva/lib/Shape'

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
  const [isAnchor, setIsAnchor] = useState<boolean>(false)
  const [newPointAnchor, setNewPointAnchor] = useState<any>({ point: null, newPoint })
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  const pointCurveInit = getCell(pointInit.x, pointInit.y)
  const pointCurveEnd = getCell(pointEnd.x, pointEnd.y)

  // find point => 1: init 2: end 0: not point // retornar tambem a posicao pra comparar com o newpoint.position
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

    if (active === true && point > 0) {
      if (isAnchor) {
        console.info('anchor', isAnchor)
        context.moveTo(pointCurveInit[0], pointCurveInit[1])
        
        context.quadraticCurveTo(
          xy.x,
          xy.y,
          pointCurveEnd[0],
          pointCurveEnd[1],
        )
      } else {
        if (isDragging) {
          if (point === 1) {
            context.moveTo(pointCurveEnd[0], pointCurveEnd[1])

            context.quadraticCurveTo(
              xy.x,
              xy.y,
              newPoint.x,
              newPoint.y,
            )
          }

          if (point === 2) {
            context.moveTo(pointCurveInit[0], pointCurveInit[1])
            
            context.quadraticCurveTo(
              xy.x,
              xy.y,
              newPoint.x,
              newPoint.y,
            )
          }

          setNewPointAnchor({ point, newPoint })
        } else {
          context.moveTo(pointCurveInit[0], pointCurveInit[1])

          context.quadraticCurveTo(
            xy.x,
            xy.y,
            pointCurveEnd[0],
            pointCurveEnd[1],
          )
        }
      }
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
          {...newPointAnchor}
          {...xy}
          curve={curve}
          getCell={getCell}
          index={index}
          isAnchor={isAnchor}
          isDragging={isDragging}
          pointCurveInit={pointCurveInit}
          pointCurveEnd={pointCurveEnd}
          pointEnd={pointEnd}
          pointInit={pointInit}
          setIsAnchor={setIsAnchor}
          setIsDragging={setIsDragging}
          setXY={setXY}
          updateLayerCurvePoint={updateLayerCurvePoint}
        />
      )}

      <Shape {...properties} sceneFunc={drawLines} />
    </>
  )
}

export default LineCurve