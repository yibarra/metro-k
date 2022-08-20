import React from 'react'
import { Shape } from 'react-konva'

import Point from '../../Point'

// layer points
const LayerPoints: React.FC<any> = ({
  active,
  isDragging,
  getCell,
  layer,
  points,
  setIsDragging,
  setCurrentPoint,
  updateLayerPoint,
  newPoint,
  setNewPoint,
}) => {
  const point = points[layer.currentPoint]

  // render
  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath()

          for (const point of points) {
            const values = getCell(point.x, point.y, window.innerWidth, window.innerHeight)
              
            if (values) {
              const x = values[0] + values[2] / 2
              const y = values[1] + values[2] / 2

              shape.fill(layer.pointsProperties.fill)
              context.arc(x, y, layer.pointsProperties.radius, 0, 2 * Math.PI, false)
            }
            
            context.closePath()
          }
          
          context.fillShape(shape)
        }}
        onClick={(e) => {
          const values = getCell(e.evt.clientX, e.evt.clientY, window.innerWidth, window.innerHeight)

          if (values) {
            for (const [index, point] of points.entries()) {
              const valuesPoint = getCell(point.x, point.y, window.innerWidth, window.innerHeight)

              if (valuesPoint[0] === values[0] && valuesPoint[1] === values[1]) {
                setCurrentPoint(index)
              }
            }
          }
        }}
      />

      <Point
        {...point}
        active={active}
        currentPoint={layer.currentPoint}
        index={layer.currentPoint}
        isDragging={isDragging}
        getCell={getCell}
        properties={layer.pointsProperties}
        setIsDragging={setIsDragging}
        setCurrentPoint={setCurrentPoint}
        updateLayerPoint={updateLayerPoint}
        newPoint={newPoint}
        setNewPoint={setNewPoint}
      />
    </>
  )
}

export default LayerPoints
