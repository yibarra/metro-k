import React, { useCallback, useState } from 'react'
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
  const [xy, setXY] = useState<{ x: number, y: number }>({ x, y })

  const pointCurveInit = getCell(pointInit.x, pointInit.y)
  const pointCurveEnd = getCell(pointEnd.x, pointEnd.y)

  // find point => 1: init 2: end 0: not point // retornar tambem a posicao pra comparar com o newpoint.position
  const findPoint = useCallback((): number => {
    if (currentPoint === pointInit.position) {
      return 1
    } else if (currentPoint === pointEnd.position) {
      return 2
    }

    return 0
  }, [currentPoint, pointEnd, pointInit])

  // draw lines
  const drawLines = useCallback((context: Context, shape: ShapeType) => {
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
  }, [active, findPoint, isAnchor, isDragging, newPoint, pointCurveEnd, pointCurveInit, xy])

  // render
  return (
    <>
      {active && (
        <LineCurveAnchorPoint
          curve={curve}
          getCell={getCell}
          index={index}
          setIsAnchor={setIsAnchor}
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