import React, { useState } from 'react'
import { Group } from 'react-konva'

import LayerLine from './LayerLine'
import LayerPoints from './LayerPoints'
import type { PointTypePosition } from '../Point/interfaces'
import type { LayerProps } from './interfaces'
import LayerPointCurve from './LayerPointCurve'

// layer
const Layer: React.FC<LayerProps> = ({
  active,
  curve = false,
  deleteLayerPoint,
  getCell,
  index,
  isDragging = false,
  layer,
  remove = false,
  setIsDragging,
  updateLayer,
  updateLayerPoint,
}) => {
  const { currentPoint, lineProperties, points, pointsProperties } = layer
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
            currentPoint={currentPoint}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            points={points}
            properties={lineProperties}
          />

          <LayerPoints
            active={active}
            curve={curve}
            currentPoint={currentPoint}
            deleteLayerPoint={deleteLayerPoint}
            getCell={getCell}
            isDragging={isDragging}
            newPoint={newPoint}
            points={points}
            properties={pointsProperties}
            remove={remove}
            setCurrentPoint={setCurrentPoint}
            setIsDragging={setIsDragging}
            setNewPoint={setNewPoint}
            updateLayerPoint={updateLayerPoint}
          />

          <LayerPointCurve
            isDragging={isDragging}
            getCell={getCell}
            pointInit={{ x: 10, y: 10, position: 0 }}
            pointEnd={{ x: 40, y: 140, position: 1 }}
            setIsDragging={setIsDragging}
          />
        </>
      }
    </Group>
  )
}

export default Layer