import React from 'react'
import { Shape } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'

import Point from '../../Point'
import type { Context } from 'konva/lib/Context'
import type { Shape as ShapeType } from 'konva/lib/Shape'
import type { LayerPointsProps } from './interfaces'

// layer points
const LayerPoints: React.FC<LayerPointsProps> = ({
  active,
  currentPoint,
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

  // draw points
  const drawPoints = (context: Context, shape: ShapeType) => {
    context.beginPath()

    for (const point of points) {
      const values = getCell(point.x, point.y, window.innerWidth, window.innerHeight)
        
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
    const values = getCell(
      event.evt.clientX,
      event.evt.clientY,
      window.innerWidth,
      window.innerHeight
    )

    if (values) {
      for (const [index, point] of points.entries()) {
        const valuesPoint = getCell(point.x, point.y, window.innerWidth, window.innerHeight)

        if (valuesPoint[0] === values[0] && valuesPoint[1] === values[1]) {
          if (remove) {
            deleteLayerPoint(index)
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
      <Shape sceneFunc={drawPoints} onClick={onClickPoint}/>

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
