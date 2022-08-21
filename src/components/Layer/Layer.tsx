import React, { useState } from 'react'
import { Group } from 'react-konva'

import LayerLine from './LayerLine'
import LayerPoints from './LayerPoints'
import type { PointTypePosition } from '../Point/interfaces'

// layer
const Layer: React.FC<any> = ({
  active,
  getCell,
  index,
  layer,
  points,
  removeLayerPoint,
  removePoint,
  updateLayer,
  updateLayerPoint,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [newPoint, setNewPoint] = useState<PointTypePosition>({ x: 0, y: 0, position: 0 })

  // set current point
  const setCurrentPoint = (value: number): void => {
    updateLayer(index, { currentPoint: value })
  }

  // render
  return (
    <>
      {Array.isArray(points) && 
        <Group zIndex={index - 1000}>
          <LayerLine
            active={active}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            layer={layer}
            points={points}
          />

          <LayerPoints
            active={active}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            layer={layer}
            points={points}
            removeLayerPoint={removeLayerPoint}
            removePoint={removePoint}
            setCurrentPoint={setCurrentPoint}
            setIsDragging={setIsDragging}
            setNewPoint={setNewPoint}
            updateLayerPoint={updateLayerPoint}
          />
        </Group>
      }
    </>
  )
}

export default Layer