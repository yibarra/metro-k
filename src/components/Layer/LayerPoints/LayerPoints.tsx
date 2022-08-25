import React from 'react'
import { Shape } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import Point from '../../Point'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import type { LayerPointsProps } from './interfaces'
import type { PointTypePosition } from '../../Point/interfaces'

// layer points
const LayerPoints: React.FC<LayerPointsProps> = ({
  active,
  currentPoint,
  curve,
  deleteLayerPoint,
  isDragging,
  getCell,
  newPoint,
  points,
  properties,
  remove,
  setCurrentPoint,
  setIsDragging,
  setNewPoint,
  updateLayerPoint,
}) => {
  const point = points[currentPoint]

  // check adjacent point
  const checkAdjacentPoint = (point: PointTypePosition, position: number) => {
    if (point && (point.position - 1 === position || point.position + 1 === position)) {
      console.info(point.position, position, 'point index of')
    } else {
      console.error(`[POINT NOT ADJACENT TO CREATE CURVE] ${position}`)
    }
  }

  // draw points
  const drawPoints = (context: Context, shape: ShapeType) => {
    context.beginPath()

    const { innerHeight, innerWidth } = window

    for (const point of points) {
      const values = getCell(point.x, point.y, innerWidth, innerHeight)
        
      if (values) {
        const x = values[0] + values[2] / 2
        const y = values[1] + values[2] / 2

        shape.fill(properties.fill.toString())
        context.arc(x, y, properties.radius, 0, 2 * Math.PI, false)
      }
      
      context.closePath()
    }
    
    context.fillShape(shape)
  }

  // on click
  const onClickPoint = (event: KonvaEventObject<MouseEvent>) => {
    const { innerHeight, innerWidth } = window
    const { evt: { clientX, clientY }} = event

    const values = getCell(clientX, clientY, innerWidth, innerHeight)

    if (values) {
      for (const [index, point] of points.entries()) {
        const valuesPoint = getCell(point.x, point.y, innerWidth, innerHeight)

        if (valuesPoint[0] === values[0] && valuesPoint[1] === values[1]) {
          if (remove) {
            deleteLayerPoint(index)
          } else if (curve === true) {
            checkAdjacentPoint(points[currentPoint], point.position)
          } else {
            setCurrentPoint(index)
          }
        }
      }
    }
  }

  // render
  return (
    <>
      <Shape sceneFunc={drawPoints} onClick={onClickPoint} />

      {!remove && active && <Point
        {...point}
        active={active}
        currentPoint={currentPoint}
        index={currentPoint}
        isDragging={isDragging}
        getCell={getCell}
        newPoint={newPoint}
        properties={properties}
        setIsDragging={setIsDragging}
        setCurrentPoint={setCurrentPoint}
        updateLayerPoint={updateLayerPoint}
        setNewPoint={setNewPoint}
      />}
    </>
  )
}

export default LayerPoints
