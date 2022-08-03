import React, { useState } from 'react'
import { Group } from 'react-konva'

import LayerLine from './LayerLine'
import Point from '../Point'
import type { PointTypePosition } from '../Point/interfaces'

// layer
const Layer: React.FC<any> = ({
  active,
  index,
  layer,
  points,
  getCell,
  updateLayer,
  updateLayerPoint,
}) => {
  // color
  // name
  // properties: line - stroke, color, type: dash, linejoin, linecap ... point stroke, color

  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [newPoint, setNewPoint] = useState<PointTypePosition>({ x: 0, y: 0 })

  // set current point
  const setCurrentPoint = (value: number): void => {
    updateLayer(index, { currentPoint: value })
  }

  // render
  return (
    <Group>
      {Array.isArray(points) && 
        <>
          <LayerLine
            active={active}
            isDragging={isDragging}
            newPoint={newPoint}
            layer={layer}
            points={points}
          />

          {points.map((point: any, index: number) =>
            <Point
              {...point}
              active={active}
              currentPoint={layer.currentPoint}
              index={index}
              isDragging={isDragging}
              key={index}
              getCell={getCell}
              properties={layer.pointsProperties}
              setIsDragging={setIsDragging}
              setCurrentPoint={setCurrentPoint}
              updateLayerPoint={updateLayerPoint}
              newPoint={newPoint}
              setNewPoint={setNewPoint}
            />
          )}
        </>
      }
    </Group>
  )
}

export default Layer