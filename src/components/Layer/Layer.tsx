import React, { useState } from 'react'
import { Group } from 'react-konva'

import LayerLine from './LayerLine'
import LayerPoints from './LayerPoints'
import type { PointTypePosition } from '../Point/interfaces'

// layer
const Layer: React.FC<any> = ({
  active,
  deleteLayerPoint,
  getCell,
  index,
  layer,
  remove,
  updateLayer,
  updateLayerPoint,
}) => {
  const { lineProperties, points } = layer
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [newPoint, setNewPoint] = useState<PointTypePosition>({ x: 0, y: 0, position: 0 })

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
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            points={points}
            properties={lineProperties}
          />

          <LayerPoints
            active={active}
            deleteLayerPoint={deleteLayerPoint}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            layer={layer}
            points={points}
            remove={remove}
            setCurrentPoint={setCurrentPoint}
            setIsDragging={setIsDragging}
            setNewPoint={setNewPoint}
            updateLayerPoint={updateLayerPoint}
          />
        </>
      }
    </Group>
  )
}

export default Layer